import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DemoUserService } from '../../common/demo-user.service';
import { demoInvestments } from '../../common/demo-data';

@Injectable()
export class InvestmentsService {
  constructor(private readonly prisma: PrismaService, private readonly demoUser: DemoUserService) {}
  async findAll() {
    try {
      const user = await this.demoUser.getUser();
      const investments = await this.prisma.investment.findMany({ where: { userId: user.id }, orderBy: { currentValue: 'desc' } });
      return investments.map(investment => ({ ...investment, currentValue: Number(investment.currentValue), investedAmount: Number(investment.investedAmount) }));
    } catch {
      return demoInvestments.map(investment => ({ ...investment, currentValue: Number(investment.currentValue), investedAmount: Number(investment.investedAmount) }));
    }
  }
}
