import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PromiseType } from 'utility-types';
import {
  limitReachedIsbn,
  outOfStockIsbn,
  paymentRequiredIsbn,
} from '../src/cheat-codes';

let fixtures: PromiseType<ReturnType<typeof getFixtures>>;

beforeEach(async () => {
  fixtures = await getFixtures();
});

test(`book catalogue`, async () => {
  const data = await fixtures.WhenGettingAllBooks();
  fixtures.ThenAllThreeBooksAreAvailable(data);
});

test(`borrow out of stock book`, async () => {
  const result = await fixtures.WhenBorrowingOutOfStockBook();
  fixtures.ThenNotFoundIsRaised(result);
});

test(`borrowing when user is at books limit`, async () => {
  const result = await fixtures.WhenBorrowingAtBooksLimit();
  fixtures.ThenForbiddenIsRaised(result);
});

test(`returning book after time limit expired`, async () => {
  const result = await fixtures.WhenReturningBookAfterTimeLimitExpired();
  fixtures.ThenItRemindsOfPaymentRequired(result);
});

const getFixtures = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return {
    WhenGettingAllBooks: async () =>
      await request(app.getHttpServer()).get('/'),
    ThenAllThreeBooksAreAvailable: (response: request.Response) => {
      expect(response.body.length).toEqual(3);
    },
    WhenBorrowingOutOfStockBook: async () =>
      await request(app.getHttpServer()).post(`/${outOfStockIsbn}`),
    ThenNotFoundIsRaised(response: request.Response) {
      expect(response.status).toEqual(404);
    },
    WhenBorrowingAtBooksLimit: async () =>
      await request(app.getHttpServer()).post(`/${limitReachedIsbn}`),
    ThenForbiddenIsRaised(response: request.Response) {
      expect(response.status).toEqual(403);
    },
    WhenReturningBookAfterTimeLimitExpired: async () =>
      await request(app.getHttpServer()).put(`/${paymentRequiredIsbn}`),
    ThenItRemindsOfPaymentRequired(response: request.Response) {
      expect(response.status).toEqual(402);
    },
  };
};
