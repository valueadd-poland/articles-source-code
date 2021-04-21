import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {ApiNoContentResponse} from "@nestjs/swagger";
import {OrderDto} from "./order.dto";
import {Service, PaymentStatus} from "./service";

@Controller()
export class OrdersController {

    constructor(
        private readonly gateway: Service
    ) {
    }

    @ApiNoContentResponse()
    @Post()
    async createOrder(
        @Body() body: OrderDto
    ): Promise<void> {
        return this.gateway.createOrder(body.uuid);
    }

    @Get(`:id`)
    async getOrderStatus(
        @Param("id") orderId: string
    ): Promise<{ status: PaymentStatus }> {
        return {
            status: await this.gateway.getOrderStatus(orderId)
        };
    }
}