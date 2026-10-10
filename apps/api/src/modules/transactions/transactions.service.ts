import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DemoUserService } from '../../common/demo-user.service';
import { demoTransactions } from '../../common/demo-data';
import type { CreateTransactionDto } from './transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService, private readonly demoUser: DemoUserService) {}
  async findRecent() {
    try {
      const user = await this.demoUser.getUser();
      const transactions = await this.prisma.transaction.findMany({ where: { userId: user.id }, include: { category: true, account: true }, orderBy: { transactionDate: 'desc' }, take: 200 });
      return transactions.map(transaction => ({ ...transaction, amount: Number(transaction.amount) }));
    } catch {
      return demoTransactions.map(transaction => ({ ...transaction, amount: Number(transaction.amount) }));
    }
  }

  async create(input: CreateTransactionDto) {
    const user = await this.demoUser.getUser();
    const account = await this.prisma.account.findFirst({ where: { userId: user.id, isActive: true }, orderBy: { createdAt: 'asc' } });
    if (!account) throw new Error('Create an active account before adding a transaction.');

    const categoryName = input.category?.trim() || 'Other';
    const category = await this.prisma.category.upsert({
      where: { userId_name_type: { userId: user.id, name: categoryName, type: input.type === 'INCOME' ? 'INCOME' : 'EXPENSE' } },
      update: {},
      create: { userId: user.id, name: categoryName, type: input.type === 'INCOME' ? 'INCOME' : 'EXPENSE' },
    });
    const transaction = await this.prisma.transaction.create({
      data: { userId: user.id, accountId: account.id, categoryId: category.id, type: input.type, amount: input.amount, description: input.description.trim(), merchant: input.merchant?.trim() || null, transactionDate: new Date(input.transactionDate) },
      include: { category: true, account: true },
    });
    return { ...transaction, amount: Number(transaction.amount) };
  }
}
