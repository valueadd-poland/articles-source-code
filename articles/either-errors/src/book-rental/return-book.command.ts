import { Command } from '@nestjs-architects/typed-cqrs';
import { Either } from 'fp-ts/Either';
import { ReturnError } from './return-error';

export class ReturnBook extends Command<Either<ReturnError, void>> {
  constructor(public readonly isbn: string) {
    super();
  }
}
