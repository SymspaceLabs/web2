import { config } from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SeederService } from './database/seeders/seeder.service';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seeder = app.get(SeederService);
  await seeder.seed();

  app.enableCors({
    origin: [process.env.BUYER_URL, process.env.SELLER_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH',],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  });

  await app.listen(3000);
}
bootstrap();
