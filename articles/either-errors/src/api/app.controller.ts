import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAvailableBooks } from '../books-catalogue';
import { BorrowBook, DeleteBook, NotAnAdmin, ReturnBook } from '../book-rental';
import { BookSerializerService } from './book-serializer.service';
import { Delete } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly serializer: BookSerializerService,
  ) {}

  @Get()
  books() {
    return this.queryBus.execute(new GetAvailableBooks());
  }

  @Post(':isbn')
  async borrowBook(@Param('isbn') isbn: string) {
    const result = await this.commandBus.execute(new BorrowBook(isbn));
    return this.serializer.serialize(result);
  }

  @Put(':isbn')
  async returnBook(@Param('isbn') isbn: string) {
    const result = await this.commandBus.execute(new ReturnBook(isbn));
    return this.serializer.serialize(result);
  }

  @Delete(':isbn')
  async removeBook(@Param('isbn') isbn: string) {
    try {
      await this.commandBus.execute(new DeleteBook(isbn));
      return undefined;
    } catch (error) {
      if (error instanceof NotAnAdmin) {
        return {
          message: `How dare you? ${error}`,
        };
      } else {
        return {
          message: `Roaming?`,
        };
      }
    }
  }
}
