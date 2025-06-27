// src/data-source.ts
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST_DB,
  port: parseInt(process.env.HOST_DB_PORT || '3306'),
  username: process.env.DB_UNAME,
  password: process.env.DB_UPASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity.js'],
  synchronize: false,
});
