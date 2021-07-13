import * as request from 'supertest';
import { bootstrap } from '../../bootstrap';

export const getFixtures = async () => {
  const app = await bootstrap();

  return {
    cleanup: async () => {
      await app.close();
    },
    GivenBooksAreAvailable: () => {
      // for brevity, done in OnModuleInit
    },
    WhenGettingAllBooks: () =>
      request(app.getHttpServer()).get('/').responseType('blob'),
    ThenCsvWithEntriesIsReturned: (response: request.Response) => {
      expect(response.header['content-type']).toEqual(
        'text/csv; charset=utf-8',
      );
      const content = response.body.toString();
      expect(content).toEqual(`isbn,title
0-5018-4109-1,Lord of the Rings 1
0-4221-6988-9,Lord of the Rings 2
0-9557-4103-3,Lord of the Rings 3
0-3066-6754-1,Lord of the Rings 4
`);
    },
  };
};
