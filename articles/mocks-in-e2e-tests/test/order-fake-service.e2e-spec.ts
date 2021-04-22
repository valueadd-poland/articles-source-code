import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { OrdersModule, PaymentStatus } from '../src/orders';

import {
  start,
  shutdown,
  confirmOrder,
} from './payment-gateway-fake/bootstrap';

let app: INestApplication;

/**
 * for brevity
 */
const paymentGatewayUrl = 'http://localhost:1337';
process.env.PAYMENT_GATEWAY = paymentGatewayUrl;

beforeAll(async () => {
  process.env.PAYMENT_GATEWAY = await start(1337);
  const moduleFixture = await Test.createTestingModule({
    imports: [OrdersModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
  await shutdown();
});

describe(`when order was submitted`, () => {
  const uuid = 'test-order-uuid';
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
      beforeEach(() => {
        confirmOrder(uuid); // clear intention
      });

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
