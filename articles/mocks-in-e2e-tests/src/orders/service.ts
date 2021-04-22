import { HttpService, Injectable } from '@nestjs/common';

export enum PaymentStatus {
  Started,
  Pending,
  Rejected,
  Approved,
}

@Injectable()
export class Service {
  /**
   * for brevity, skip real configs
   */
  private paymentServiceUrl = process.env.PAYMENT_GATEWAY ?? ""

  constructor(private readonly httpService: HttpService) {}

  async createOrder(
    uuid: string,
  ): Promise<void> {
    await this.httpService
      .post(this.paymentServiceUrl, {
        uuid,
      })
      .toPromise();
  }

  async getOrderStatus(
    uuid: string
  ): Promise<PaymentStatus> {
    const { status } = (
      await this.httpService.get(this.paymentServiceUrl + `/${uuid}`).toPromise()
    ).data;
    return status as PaymentStatus;
  }
}
