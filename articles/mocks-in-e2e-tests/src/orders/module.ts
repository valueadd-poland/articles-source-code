import { HttpModule, Module } from '@nestjs/common';
import { Service } from './service';
import { OrdersController } from './controller';

@Module({
  imports: [HttpModule],
  providers: [Service],
  controllers: [OrdersController],
})
export class OrdersModule {}
