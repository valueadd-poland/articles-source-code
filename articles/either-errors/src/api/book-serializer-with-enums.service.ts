import { Either, isRight } from 'fp-ts/Either';
import {
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

enum BorrowErrorViaEnum {
  OutOfStock = 'out-of-stock',
  BooksLimitReached = 'books-limit-reached',
}

enum ReturnErrorViaEnum {
  PaymentRequired = 'payment-required',
}

export class BookSerializerWithEnumsService {
  serialize(
    result: Either<
      BorrowErrorViaEnum | ReturnErrorViaEnum /** | and others...*/,
      void
    >,
  ) {
    if (isRight(result)) {
      return;
    }
    const error = result.left;

    switch (error) {
      case ReturnErrorViaEnum.PaymentRequired:
        throw new HttpException('Pay debt first.', 402);
      case BorrowErrorViaEnum.OutOfStock:
        throw new NotFoundException();
      case BorrowErrorViaEnum.BooksLimitReached:
        throw new ForbiddenException();
      default:
        const _exhaustiveCheck: never = error;
        throw _exhaustiveCheck;
    }
  }
}
