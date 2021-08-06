import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { Either, left, right } from 'fp-ts/Either';
import { BorrowBook } from './borrow-book.command';
import { BooksLimitReached, BorrowError, OutOfStock } from './borrow-errors';

import { limitReachedIsbn, outOfStockIsbn } from '../cheat-codes';

@CommandHandler(BorrowBook)
export class BorrowBookHandler implements IInferredCommandHandler<BorrowBook> {
  async execute({ isbn }: BorrowBook): Promise<Either<BorrowError, void>> {
    if (isbn === outOfStockIsbn) {
      return left(OutOfStock);
    }
    if (isbn === limitReachedIsbn) {
      return left(BooksLimitReached);
    }

    return right(undefined);
  }
}
