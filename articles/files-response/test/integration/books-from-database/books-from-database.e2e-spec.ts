import { Response } from 'supertest';
import { PromiseType } from 'utility-types';
import { getFixtures } from './fixtures';

let fixtures: PromiseType<ReturnType<typeof getFixtures>>;

beforeEach(async () => {
  fixtures = await getFixtures();
});

describe(`getting all books`, () => {
  let result: Response;

  beforeEach(async () => {
    await fixtures.GivenBooksAreAvailable();
    result = await fixtures.WhenGettingAllBooks();
  });

  it(`contains all books in CSV format`, () => {
    fixtures.ThenCsvWithEntriesIsReturned(result);
  });
});

afterEach(async () => {
  await fixtures?.cleanup();
});
