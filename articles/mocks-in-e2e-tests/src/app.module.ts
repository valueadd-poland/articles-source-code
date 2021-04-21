import {Module} from '@nestjs/common';
import {OrdersModule} from "./orders";

@Module({
    imports: [OrdersModule],
})
export class AppModule {
}
