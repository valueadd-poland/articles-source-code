import {
  Injectable,
  HttpException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Either, isRight } from 'fp-ts/Either';
import {
  BorrowError,
  ReturnError,
  TimeLimitExceeded,
  BooksLimitReached,
  OutOfStock,
} from '../book-rental';

type BookRentalError = ReturnError | BorrowError;

@Injectable()
export class BookSerializerService {
  serialize(response: Either<BookRentalError, void>): void {
    if (isRight(response)) {
      return;
    }
    const error = response.left;

    switch (error) {
      case TimeLimitExceeded:
        throw new HttpException('Pay debt first.', 402);
      case OutOfStock:
        throw new NotFoundException();
      case BooksLimitReached:
        throw new ForbiddenException();
      default:
        const _exhaustiveCheck: never = error;
        throw _exhaustiveCheck;
    }
  }
}
