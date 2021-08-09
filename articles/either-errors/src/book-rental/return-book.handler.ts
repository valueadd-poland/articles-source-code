import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { Either, left, right } from 'fp-ts/Either';

import { ReturnBook } from './return-book.command';
import { ReturnError, TimeLimitExceeded } from './return-error';

import { outOfStockIsbn, limitReachedIsbn } from '../cheat-codes';

@CommandHandler(ReturnBook)
export class ReturnBookHandler implements IInferredCommandHandler<ReturnBook> {
  async execute({ isbn }: ReturnBook): Promise<Either<ReturnError, void>> {
    if (isbn !== outOfStockIsbn && isbn !== limitReachedIsbn) {
      return left(TimeLimitExceeded);
    }
    return right(null);
  }
}
