import { Writable } from 'stronger-typed-streams';
import { PassThrough } from 'stream';

import { Book } from '../books/book';
import { VolumeEntity } from './volume.entity';

import { ToBookTransformer } from './to-book-transformer';

let sut: ToBookTransformer;

beforeEach(() => {
  sut = new ToBookTransformer();
});

describe(`when piping volume entities`, () => {
  let inputStream: Writable<VolumeEntity>;
  beforeEach(() => {
    inputStream = new PassThrough({
      objectMode: true,
    });
  });

  it(`should transform into book`, (done) => {
    const result = inputStream.pipe(sut);
    const books: Book[] = [];

    result.on('data', (book) => books.push(book));

    result.on('end', () => {
      expect(books).toEqual([
        {
          isbn: `isbn-1`,
          name: `book-title-1`,
        },
        {
          isbn: `isbn-2`,
          name: `book-title-2`,
        },
      ]);
      done();
    });

    inputStream.write({
      isbn: `isbn-1`,
      title: `book-title-1`,
    });
    inputStream.write({
      isbn: `isbn-2`,
      title: `book-title-2`,
    });
    inputStream.end();
  });
});
