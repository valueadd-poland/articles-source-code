import { Transform } from 'stronger-typed-streams';
import { TransformCallback } from 'stream';
import { VolumeEntity } from './volume.entity';
import { Book } from '../books/book';

export class ToBookTransformer extends Transform<VolumeEntity, Book> {
  constructor() {
    super({
      objectMode: true,
    });
  }

  _transform(
    chunk: VolumeEntity,
    encoding: BufferEncoding,
    callback: TransformCallback,
  ) {
    const book: Book = {
      isbn: chunk.isbn,
      name: chunk.title,
    };
    callback(null, book);
  }
}
