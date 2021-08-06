import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { DeleteBook, NotAnAdmin } from './delete-book.command';

@CommandHandler(DeleteBook)
export class DeleteBookHandler implements IInferredCommandHandler<DeleteBook> {
  async execute(): Promise<void> {
    throw new NotAnAdmin(`Why would you delete a book?`);
  }
}
