// src/main.ts

import { config } from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

config();

async function bootstrap() {
  // NestJS initializes all modules, connects to DB, 
  // and performs schema sync/migrations automatically here.
  const app = await NestFactory.create(AppModule); 

  app.enableCors({
    origin: [
      process.env.BUYER_URL,
      process.env.SELLER_URL,
      process.env.ADMIN_URL,
      "https://symspacelabs.com",
      "https://festaging.symspacelabs.com"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH',],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  });

  await app.listen(process.env.PORT);

}
bootstrap();
