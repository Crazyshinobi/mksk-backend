import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { GetCashbookQueryDto } from './dtos/get-cashbook-query.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('cashbook')
  async getCashbook(@Query() query: GetCashbookQueryDto) {
    // Convert companyId to number if it exists
    const companyId = query.companyId ? parseInt(query.companyId) : undefined;

    return this.transactionsService.getCashbookData(
      query.companyId,
      query.startDate,
      query.endDate,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.remove(id);
  }

  @Get(':id/slip')
  async getSlip(
    @Param('id', ParseIntPipe) id: number,
    @Query('type') type: 'lender' | 'borrower',
  ) {
    return this.transactionsService.getTransactionSlip(id, type);
  }
}
