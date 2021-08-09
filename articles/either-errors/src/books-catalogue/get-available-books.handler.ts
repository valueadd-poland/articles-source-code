import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Book } from './book';
import { GetAvailableBooks } from './get-available-books.query';

import {
  limitReachedIsbn,
  outOfStockIsbn,
  paymentRequiredIsbn,
} from '../cheat-codes';

@QueryHandler(GetAvailableBooks)
export class GetAvailableBooksHandler
  implements IInferredQueryHandler<GetAvailableBooks>
{
  async execute(): Promise<Book[]> {
    return [
      {
        isbn: outOfStockIsbn,
        title: `Lord of the Rings`,
      },
      {
        isbn: limitReachedIsbn,
        title: `Game of Thrones`,
      },
      {
        isbn: paymentRequiredIsbn,
        title: `Bajki Robotów`,
      },
    ];
  }
}
