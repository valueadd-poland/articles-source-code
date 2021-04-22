import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import AxiosMockAdapter from 'axios-mock-adapter';

import { OrdersModule, PaymentStatus } from '../src/orders';

let app: INestApplication;
let axiosMock: AxiosMockAdapter;

/**
 * for brevity
 */
const paymentGatewayUrl = 'http://localhost:1337';
process.env.PAYMENT_GATEWAY = paymentGatewayUrl;

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [OrdersModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  // bind interceptor, force throw on any non-mocked route
  axiosMock = new AxiosMockAdapter(app.get('AXIOS_INSTANCE_TOKEN'), {
    onNoMatch: 'throwException',
  });
});

describe(`when order was submitted`, () => {
  const uuid = 'test-order-uuid';

  beforeEach(() => {
    // "configure" responses
    axiosMock
      .onPost(paymentGatewayUrl, {
        uuid,
      })
      .replyOnce(200, {})
      .onGet(paymentGatewayUrl + `/${uuid}`)
      .replyOnce(200, {
        status: PaymentStatus.Pending,
      })
      .onGet(paymentGatewayUrl + `/${uuid}`)
      .replyOnce(200, {
        status: PaymentStatus.Approved,
      });
  });

  it('should ACK the order', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        uuid,
      })
      .expect(201);
  });

  describe(`when asking for a status immediately`, () => {
    it(`should return \`pending\` state`, () => {
      return request(app.getHttpServer())
        .get(`/${uuid}`)
        .expect(200)
        .then((res) => {
          expect(res.body.status).toEqual(PaymentStatus.Pending);
        });
    });

    describe(`when asking for a status after it was completed`, () => {
      it(`should return \`approved\` state`, () => {
        return request(app.getHttpServer())
          .get(`/${uuid}`)
          .expect(200)
          .then((res) => {
            expect(res.body.status).toEqual(PaymentStatus.Approved);
          });
      });
    });
  });
});
