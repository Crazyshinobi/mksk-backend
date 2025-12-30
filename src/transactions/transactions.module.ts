import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Customer, Company])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
