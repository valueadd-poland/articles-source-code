import { IsDefined, IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  @IsDefined()
  uuid!: string;
}
