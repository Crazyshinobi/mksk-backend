import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { User } from '../users/entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Company, User, Customer, Transaction],
  migrations: ['src/database/migrations/*.ts'],
});
