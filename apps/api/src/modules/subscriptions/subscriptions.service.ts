import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DemoUserService } from '../../common/demo-user.service';
import { demoSubscriptions } from '../../common/demo-data';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService, private readonly demoUser: DemoUserService) {}
  async findActive() {
    try {
      const user = await this.demoUser.getUser();
      const subscriptions = await this.prisma.subscription.findMany({ where: { userId: user.id, isActive: true }, orderBy: { nextBillingDate: 'asc' } });
      return subscriptions.map(subscription => ({ ...subscription, amount: Number(subscription.amount) }));
    } catch {
      return demoSubscriptions.map(subscription => ({ ...subscription, amount: Number(subscription.amount) }));
    }
  }
}
