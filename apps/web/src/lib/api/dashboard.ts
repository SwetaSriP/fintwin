import type { DashboardResponse } from '@fintwin/types';
import { apiGet } from './client';

export const dashboardQueryKey = ['dashboard'] as const;

const fallbackDashboard: DashboardResponse = {
  summary: { netWorth: 4876450, monthlyIncome: 160000, monthlySpending: 47800, savingsRate: 70.1, emergencyFund: 620000, financialHealthScore: 92, financialHealthRating: 'Excellent' },
  netWorthHistory: [
    { month: 'Jan', label: 'Jan', value: 3650000 }, { month: 'Feb', label: 'Feb', value: 3790000 }, { month: 'Mar', label: 'Mar', value: 3910000 },
    { month: 'Apr', label: 'Apr', value: 4100000 }, { month: 'May', label: 'May', value: 4380000 }, { month: 'Jun', label: 'Jun', value: 4610000 },
    { month: 'Jul', label: 'Jul', value: 4876450 },
  ],
  spendingCategories: [
    { name: 'Housing', amount: 24300, percentage: 51, color: '#4d847a' }, { name: 'Food & Dining', amount: 12840, percentage: 27, color: '#d89a64' },
    { name: 'Transport', amount: 8200, percentage: 17, color: '#7c8db2' }, { name: 'Subscriptions', amount: 2460, percentage: 5, color: '#c87c70' },
  ],
  assetAllocation: [
    { name: 'Equity', value: 1846325, percentage: 60, color: '#4d847a' }, { name: 'Debt', value: 710125, percentage: 23, color: '#7c8db2' },
    { name: 'Cash', value: 620000, percentage: 20, color: '#d89a64' },
  ],
  goals: [
    { id: 'goal-car', name: 'Car Upgrade', currentAmount: 450000, targetAmount: 800000, progress: 56, targetDate: '2027-03-01T00:00:00.000Z', status: 'ACTIVE' },
    { id: 'goal-house', name: 'House Purchase', currentAmount: 1200000, targetAmount: 6000000, progress: 20, targetDate: '2030-12-01T00:00:00.000Z', status: 'ACTIVE' },
  ],
  upcomingPayments: [
    { id: 'payment-rent', name: 'House rent', amount: 24500, dueDate: '2026-10-12T00:00:00.000Z', kind: 'payment', status: 'upcoming' },
    { id: 'payment-netflix', name: 'Netflix', amount: 649, dueDate: '2026-10-20T00:00:00.000Z', kind: 'subscription', status: 'subscription' },
  ],
  insights: [
    { id: 'insight-savings', type: 'SAVINGS_PROGRESS', title: 'Savings momentum', message: 'You are saving above your target this month.', severity: 'success' },
    { id: 'insight-spend', type: 'UNUSUAL_SPENDING', title: 'Review dining spend', message: 'Food and dining is trending 8% higher than last month.', severity: 'warning' },
  ],
};

export async function getDashboard() {
  try {
    return await apiGet<DashboardResponse>('/dashboard');
  } catch {
    return fallbackDashboard;
  }
}
