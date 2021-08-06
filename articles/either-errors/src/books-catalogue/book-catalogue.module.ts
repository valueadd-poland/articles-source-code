import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GetAvailableBooksHandler } from './get-available-books.handler';

@Module({
  imports: [CqrsModule],
  providers: [GetAvailableBooksHandler],
})
export class BookCatalogueModule {}
