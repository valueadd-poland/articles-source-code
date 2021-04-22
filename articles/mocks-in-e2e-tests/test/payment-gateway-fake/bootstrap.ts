import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ProviderModule, PaymentProvider } from './app.module';

let app: INestApplication | undefined;

export const start = async (port: number): Promise<string> => {
  if (app) {
    return app.getUrl();
  }
  app = await NestFactory.create(ProviderModule);
  await app.init();
  await app.listen(port);
  return app.getUrl();
};

export const shutdown = async () => {
  if (app) {
    await app.close();
    app = undefined;
  }
};

export const confirmOrder = async (uuid: string) => {
  const service = app?.get(PaymentProvider);
  service?.fakeITNConfirmation(uuid);
};
