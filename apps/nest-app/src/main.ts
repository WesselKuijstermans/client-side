/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  Logger.log('====================================a;ljszdfhgflkzhjsdgblfkhjasgbdlfgvhjkavbsdkljhvb');
  Logger.log('DB_STRING:', process.env.DB_STRING || '❌ UNDEFINED ❌');
  Logger.log('====================================sz.kfjbglakshdbfvlkjzsdfldkfvbawsdljkhfvbas');

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://polite-water-03a063e03.6.azurestaticapps.net/', 'http://localhost:4200'],	
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
