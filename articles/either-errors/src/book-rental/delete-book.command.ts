import { Command } from '@nestjs-architects/typed-cqrs';

export class NotAnAdmin extends Error {}

export class UnknownError extends Error {}

export class DeleteBook extends Command<void> {
  constructor(public readonly isbn: string) {
    super();
  }
}
