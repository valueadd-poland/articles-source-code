import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BorrowBookHandler } from './borrow-book.handler';
import { ReturnBookHandler } from './return-book.handler';
import { DeleteBookHandler } from './delete-book.handler';

@Module({
  imports: [CqrsModule],
  providers: [BorrowBookHandler, ReturnBookHandler, DeleteBookHandler],
})
export class BookRentalModule {}
