import { Writable } from 'stronger-typed-streams';
import { PassThrough } from 'stream';

import { Book } from '../books/book';

import { BookToCsvTransformer } from './book-to-csv.transformer';

let sut: BookToCsvTransformer;

beforeEach(() => {
  sut = new BookToCsvTransformer();
});

describe(`when piping books`, () => {
  let inputStream: Writable<Book>;
  beforeEach(() => {
    inputStream = new PassThrough({
      objectMode: true,
    });
  });

  it(`should transform into csv`, (done) => {
    const result = inputStream.pipe(sut);
    let output = '';

    result.on('data', (book) => (output += book));

    result.on('end', () => {
      expect(output).toEqual(`isbn,title
isbn-1,book-title-1
isbn-2,book-title-2
`);
      done();
    });

    inputStream.write({
      isbn: `isbn-1`,
      name: `book-title-1`,
    });
    inputStream.write({
      isbn: `isbn-2`,
      name: `book-title-2`,
    });
    inputStream.end();
  });
});
