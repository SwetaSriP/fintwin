import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}
  @Get()
  getTransactions() { return this.service.findRecent(); }
  @Post()
  createTransaction(@Body() body: CreateTransactionDto) { return this.service.create(body); }
}
