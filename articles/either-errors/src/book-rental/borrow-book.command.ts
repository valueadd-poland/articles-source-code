import { Command } from '@nestjs-architects/typed-cqrs';
import { Either } from 'fp-ts/Either';
import { BorrowError } from './borrow-errors';

export class BorrowBook extends Command<Either<BorrowError, void>> {
  constructor(public readonly isbn: string) {
    super();
  }
}
