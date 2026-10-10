import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { DemoUserModule } from './common/demo-user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { GoalsModule } from './modules/goals/goals.module';
import { InvestmentsModule } from './modules/investments/investments.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';

@Module({ imports: [PrismaModule, DemoUserModule, DashboardModule, AccountsModule, TransactionsModule, GoalsModule, InvestmentsModule, SubscriptionsModule], controllers: [HealthController] })
export class AppModule {}
