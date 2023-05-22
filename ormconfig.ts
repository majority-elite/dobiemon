import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.BILL_DB_USERNAME,
  password: process.env.BILL_DB_PASSWORD,
  database: process.env.BILL_DB_NAME,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: true,
  logging: false,
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  subscribers: ['./src/subscribers/**/*.ts'],
});
