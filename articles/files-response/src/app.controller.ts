import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LibraryService } from './library/library.service';
import { BookToCsvTransformer } from './dto/book-to-csv.transformer';

@Controller()
export class AppController {
  constructor(private readonly libraryService: LibraryService) {}

  @Header('Content-Type', 'text/csv')
  @Get()
  async getBooks(@Res() response: Response) {
    const data = (await this.libraryService.getAll()).pipe(
      new BookToCsvTransformer(),
    );
    data.pipe(response);
  }

  @Header('Content-Type', 'text/csv')
  @Get('books.csv')
  async getBooksFromFile(@Res() response: Response) {
    const data = await this.libraryService.getFromStorage();
    data.pipe(response);
  }
}
