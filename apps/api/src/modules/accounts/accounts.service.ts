import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DemoUserService } from '../../common/demo-user.service';
import { demoAccounts } from '../../common/demo-data';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService, private readonly demoUser: DemoUserService) {}
  async findAll() {
    try {
      const user = await this.demoUser.getUser();
      const accounts = await this.prisma.account.findMany({ where: { userId: user.id, isActive: true }, orderBy: { name: 'asc' } });
      return accounts.map(account => ({ ...account, balance: Number(account.balance) }));
    } catch {
      return demoAccounts.map(account => ({ ...account, balance: Number(account.balance) }));
    }
  }
}
