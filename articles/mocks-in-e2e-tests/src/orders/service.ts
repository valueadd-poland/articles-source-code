import { HttpService, Injectable } from "@nestjs/common";

export enum PaymentStatus {
  Started,
  Pending,
  Rejected,
  Approved
}

@Injectable()
export class Service {

  constructor(
    private readonly httpService: HttpService
  ) {
  }

  async createOrder(
    uuid: string,
    /**
     * for brevity, skip real configs
     */
    paymentServiceUrl = process.env.PAYMENT_GATEWAY ?? ""
  ): Promise<void> {
    await this.httpService.post(paymentServiceUrl, {
      uuid,
    }).toPromise();
  }

  async getOrderStatus(
    uuid: string,
    /**
     * for brevity, skip real configs
     */
    paymentServiceUrl = process.env.PAYMENT_GATEWAY ?? ""
  ): Promise<PaymentStatus> {
    const { status } = (await this.httpService.get(paymentServiceUrl + `/${uuid}`).toPromise()).data;
    return status as PaymentStatus;
  };
}