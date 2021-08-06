import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './app.service';
import { BookCatalogueModule } from './books-catalogue';
import { BookRentalModule } from './book-rental';
import { BookSerializerService } from './api/book-serializer.service';

@Module({
  imports: [CqrsModule, BookCatalogueModule, BookRentalModule],
  controllers: [AppController],
  providers: [AppService, BookSerializerService],
})
export class AppModule {}
