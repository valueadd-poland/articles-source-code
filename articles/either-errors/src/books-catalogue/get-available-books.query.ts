import { Query } from '@nestjs-architects/typed-cqrs';
import { Book } from './book';

export class GetAvailableBooks extends Query<Book[]> {
  constructor() {
    super();
  }
}
