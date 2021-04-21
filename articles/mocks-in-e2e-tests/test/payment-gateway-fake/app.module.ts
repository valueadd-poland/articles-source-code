import {Body, Controller, Get, Module, Param, Post} from "@nestjs/common";

import {PaymentStatus, OrderDto} from "../../src/orders";

@Controller()
export class PaymentProvider {

    private readonly orders: Record<string, PaymentStatus> = {};

    /**
     * depending on needs and complexity, you can plan any flow
     * or even let your "e2e" act on it behalf, as a user or other service
     * would do
     */
    fakeITNConfirmation(uuid: string) {
        this.orders[uuid] = PaymentStatus.Approved;
    }

    @Post()
    async createOrder(
        @Body() body: OrderDto,
    ): Promise<void> {
        this.orders[body.uuid] = PaymentStatus.Pending;
        return;
    }

    @Get(`:id`)
    async getOrderStatus(
        @Param("id") orderId: string
    ): Promise<{ status: PaymentStatus }> {
        return {
            status: this.orders[orderId]
        };
    }
}

@Module({
    controllers: [PaymentProvider]
})
export class ProviderModule {
}