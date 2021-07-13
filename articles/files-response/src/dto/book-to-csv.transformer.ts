import { Transform } from 'stronger-typed-streams';
import { TransformCallback } from 'stream';
import { Book } from '../books/book';

export class BookToCsvTransformer extends Transform<Book, string> {
  private firstChunk = true;

  constructor() {
    super({
      objectMode: true,
    });
  }

  _transform(
    chunk: Book,
    encoding: BufferEncoding,
    callback: TransformCallback,
  ) {
    let output = '';
    if (this.firstChunk) {
      output += `isbn,title\n`;
      this.firstChunk = false;
    }
    output += [chunk.isbn, chunk.name].join(',') + '\n';
    callback(null, output);
  }
}
