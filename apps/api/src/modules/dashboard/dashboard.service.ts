import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DemoUserService } from '../../common/demo-user.service';
import { demoDashboard } from '../../common/demo-data';
import { allocationColors, categoryColors, essentialExpenseCategories } from './financial-config';
import { calculateFinancialHealth, calculateGoalProgress, calculateNetWorth, calculateSavingsRate, groupAmounts } from './financial-calculations';

const monthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const nextMonthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);
const number = (value: unknown) => Number(value ?? 0);

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private readonly prisma: PrismaService, private readonly demoUser: DemoUserService) {}

  async getDashboard() {
    try {
      const user = await this.demoUser.getUser();
      const now = new Date();
      const currentStart = monthStart(now);
      const currentEnd = nextMonthStart(now);
      const historyStart = new Date(currentStart.getFullYear(), currentStart.getMonth() - 12, 1);
      const userData = await this.prisma.user.findUniqueOrThrow({ where: { id: user.id }, include: { accounts: true, investments: true, assets: true, liabilities: true, goals: true, subscriptions: true, financialSnapshots: { orderBy: { snapshotDate: 'asc' } }, transactions: { where: { transactionDate: { gte: historyStart, lt: currentEnd } }, include: { category: true }, orderBy: { transactionDate: 'asc' } } } });

      const currentTransactions = userData.transactions.filter(transaction => transaction.transactionDate >= currentStart && transaction.transactionDate < currentEnd);
      const income = currentTransactions.filter(transaction => transaction.type === 'INCOME').reduce((sum, transaction) => sum + number(transaction.amount), 0);
      const spending = currentTransactions.filter(transaction => transaction.type === 'EXPENSE').reduce((sum, transaction) => sum + number(transaction.amount), 0);
      const savingsRate = calculateSavingsRate(income, spending);
      const accountTotal = userData.accounts.filter(account => account.isActive && account.type !== 'CREDIT_CARD').map(account => number(account.balance));
      const investmentValues = userData.investments.map(investment => number(investment.currentValue));
      const assetValues = userData.assets.map(asset => number(asset.currentValue));
      const liabilityValues = userData.liabilities.map(liability => number(liability.outstandingAmount));
      const netWorth = Math.round(calculateNetWorth(accountTotal, investmentValues, assetValues, liabilityValues));
      const emergencyFund = number(userData.accounts.find(account => account.name === 'Emergency Fund')?.balance);
      const essentialCurrent = currentTransactions.filter(transaction => transaction.type === 'EXPENSE' && essentialExpenseCategories.has(transaction.category?.name ?? '')).reduce((sum, transaction) => sum + number(transaction.amount), 0);
      const previousEssential = userData.transactions.filter(transaction => transaction.type === 'EXPENSE' && transaction.transactionDate < currentStart && essentialExpenseCategories.has(transaction.category?.name ?? '')).reduce((sum, transaction) => sum + number(transaction.amount), 0) / 3;
      const emergencyCoverage = previousEssential > 0 ? emergencyFund / previousEssential : 0;
      const averageGoalProgress = userData.goals.length > 0 ? userData.goals.reduce((sum, goal) => sum + calculateGoalProgress(number(goal.currentAmount), number(goal.targetAmount)) / 100, 0) / userData.goals.length : 0;
      const averageSpending = userData.transactions.filter(transaction => transaction.type === 'EXPENSE' && transaction.transactionDate < currentStart).reduce((sum, transaction) => sum + number(transaction.amount), 0) / 3;
      const expenseStability = averageSpending > 0 ? Math.max(0, 1 - Math.abs(spending - averageSpending) / averageSpending) : 0;
      const health = calculateFinancialHealth({ savingsRate, emergencyCoverageMonths: emergencyCoverage, monthlyIncome: income, monthlyDebtPayments: userData.liabilities.reduce((sum, liability) => sum + number(liability.emiAmount), 0), investmentRatio: netWorth > 0 ? investmentValues.reduce((sum, amount) => sum + amount, 0) / netWorth : 0, averageGoalProgress, expenseStability });

      const categoryTotals = groupAmounts(currentTransactions.filter(transaction => transaction.type === 'EXPENSE').map(transaction => ({ name: transaction.category?.name ?? 'Other', amount: number(transaction.amount) })));
      const allocationTotals = groupAmounts(userData.investments.map(investment => ({ name: investment.type, amount: number(investment.currentValue) })));
      const previousDining = userData.transactions.filter(transaction => transaction.type === 'EXPENSE' && transaction.category?.name === 'Food & Dining' && transaction.transactionDate < currentStart).reduce((sum, transaction) => sum + number(transaction.amount), 0) / 3;
      const currentDining = categoryTotals.find(category => category.name === 'Food & Dining')?.amount ?? 0;
      const subscriptionCost = userData.subscriptions.filter(subscription => subscription.isActive).reduce((sum, subscription) => sum + number(subscription.amount), 0);

      this.logger.debug(`Calculated dashboard for ${user.email}: net worth ${netWorth}`);
      return {
        summary: { netWorth, monthlyIncome: Math.round(income), monthlySpending: Math.round(spending), savingsRate, emergencyFund, financialHealthScore: health.score, financialHealthRating: health.rating },
        netWorthHistory: userData.financialSnapshots.map(snapshot => ({ month: snapshot.snapshotDate.toLocaleString('en-US', { month: 'short' }), label: snapshot.snapshotDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }), value: number(snapshot.netWorth) / 100000 })),
        spendingCategories: categoryTotals.map(category => ({ ...category, amount: Math.round(category.amount), color: categoryColors[category.name] ?? categoryColors.Other })),
        assetAllocation: allocationTotals.map(item => ({ name: item.name, value: Math.round(item.amount), percentage: item.percentage, color: allocationColors[item.name] ?? allocationColors.OTHER })),
        goals: userData.goals.map(goal => ({ id: goal.id, name: goal.name, currentAmount: number(goal.currentAmount), targetAmount: number(goal.targetAmount), progress: calculateGoalProgress(number(goal.currentAmount), number(goal.targetAmount)), targetDate: goal.targetDate?.toISOString() ?? null, status: goal.status })),
        upcomingPayments: [...userData.liabilities.filter(liability => liability.emiAmount && liability.nextPaymentDate).map(liability => ({ id: liability.id, name: liability.name, amount: number(liability.emiAmount), dueDate: liability.nextPaymentDate?.toISOString() ?? '', kind: 'payment', status: 'upcoming' })), ...userData.subscriptions.filter(subscription => subscription.isActive).map(subscription => ({ id: subscription.id, name: subscription.name, amount: number(subscription.amount), dueDate: subscription.nextBillingDate.toISOString(), kind: 'subscription', status: 'subscription' }))].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
        insights: [
          ...(previousDining > 0 && currentDining > previousDining * 1.3 ? [{ id: 'unusual-dining', type: 'UNUSUAL_SPENDING', title: 'Unusual spending', message: `Dining expenses are ${Math.round((currentDining / previousDining - 1) * 100)}% above your recent average.`, severity: 'warning' }] : []),
          ...(savingsRate > 25 ? [{ id: 'savings-progress', type: 'SAVINGS_PROGRESS', title: 'Great progress', message: `You saved ${savingsRate}% of your income this month.`, severity: 'success' }] : []),
          { id: 'subscriptions', type: 'SUBSCRIPTION_SUMMARY', title: 'Subscription overview', message: `You currently have ${userData.subscriptions.filter(subscription => subscription.isActive).length} active subscriptions costing ₹${Math.round(subscriptionCost).toLocaleString('en-IN')}/month.`, severity: 'info' },
        ],
      };
    } catch {
      return demoDashboard;
    }
  }
}
