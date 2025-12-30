import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import {
  TransactionSlipResponse,
  TransactionSlipRow,
} from './dtos/transaction-slip.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      company: { id: createTransactionDto.company_id } as any,
      lenders: createTransactionDto.lender_ids.map((id) => ({ id })),
      borrowers: createTransactionDto.borrower_ids.map((id) => ({ id })),
    });

    return await this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      relations: ['company', 'lenders', 'borrowers'],
      order: { transaction_date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['company', 'lenders', 'borrowers'],
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async remove(id: number): Promise<void> {
    const transaction = await this.findOne(id);
    await this.transactionRepository.remove(transaction);
  }

  async getTransactionSlip(id: number, type: 'lender' | 'borrower') {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['company', 'lenders', 'borrowers'],
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    const parties =
      type === 'lender' ? transaction.lenders : transaction.borrowers;
    const months = transaction.transaction_number_type;

    // 🔹 LOGIC: Split the total amount by the number of parties
    const partyCount = parties.length || 1;
    const splitAmt = transaction.amount_in_thousands / partyCount;
    const splitCash = splitAmt * 200; // Multiplier of 200

    const rows = parties.map((party) => {
      const dueDate = new Date(transaction.transaction_date);
      const upToDate = new Date(dueDate);
      upToDate.setMonth(upToDate.getMonth() + months);

      return {
        chq: '-',
        cash: splitCash, // Individual share of cash
        partyName: party.fullName,
        partyStatus: `Active - #${party.id}`,
        due: dueDate.toLocaleDateString('en-GB'),
        upTo: upToDate.toLocaleDateString('en-GB'),
        m: months,
        ap: transaction.a_p_status === 'advanced' ? 'A' : 'P',
        amt: splitAmt, // Individual share of amount (e.g., 50 if total is 100)
      };
    });

    return {
      header: {
        name: transaction.company.companyName,
        date: new Date(transaction.transaction_date).toLocaleDateString(
          'en-GB',
        ),
      },
      rows,
      // 🔹 Ensure these are calculated as Numbers, not Strings
      subtotalCash: rows.reduce((sum, row) => sum + Number(row.cash), 0),
      subtotalAmt: rows.reduce((sum, row) => sum + Number(row.amt), 0),
      generatedAt: new Date().toLocaleString(),
    };
  }

  async getCashbookData(
    companyId?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.company', 'company')
      .orderBy('transaction.transaction_date', 'ASC');

    // Only apply filter if companyId is a valid string/number
    if (companyId && companyId !== 'undefined' && companyId !== '') {
      query.andWhere('company.id = :companyId', {
        companyId: parseInt(companyId),
      });
    }

    const transactions = await query.getMany();

    // Logic to prevent "Double AMT" string concatenation
    let balance = 0;
    const data = transactions.map((tx) => {
      const receiving = Number(tx.interest_recieved || 0);
      const deduction = Number(tx.interest_paid || 0);
      balance += receiving - deduction;

      return {
        id: tx.id,
        date: tx.transaction_date,
        description: tx.company?.companyName || 'N/A',
        reference: `TXN-${tx.id}`,
        receiving: receiving > 0 ? receiving : '-',
        deduction: deduction > 0 ? deduction : '-',
        balance: balance,
      };
    });

    return { data }; // Wrap in data object for frontend
  }
}
