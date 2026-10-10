export type Currency = 'INR';

export interface Money {
  amount: number;
  currency: Currency;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  tone: 'teal' | 'indigo' | 'sage' | 'amber' | 'coral';
  icon?: string;
  subtitle?: string;
}

export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
}

export interface TrendPoint {
  month: string;
  value: number;
}

export interface NetWorthPoint extends TrendPoint {
  label: string;
}

export interface AllocationItem {
  name: string;
  value: number;
  color: string;
  amount?: number;
}

export interface FinancialGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  dueLabel: string;
  color: string;
  status?: 'completed' | 'on-track' | 'needs-attention';
}

export interface UpcomingPayment {
  name: string;
  dueLabel: string;
  amount: number;
  kind: 'payment' | 'subscription';
  icon: string;
  status?: 'upcoming' | 'subscription' | 'review';
}

export interface FinancialInsight {
  id: string;
  title: string;
  detail: string;
  tone: 'sage' | 'teal' | 'coral' | 'amber';
  icon: string;
}

export interface SimulationScenario {
  id: 'salary-increase' | 'buy-house' | 'increase-sip';
  label: string;
}

export interface DashboardSummary {
  netWorth: number;
  monthlyIncome: number;
  monthlySpending: number;
  savingsRate: number;
  emergencyFund: number;
  financialHealthScore: number;
  financialHealthRating?: string;
}

export interface DashboardCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface DashboardAllocation {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface DashboardGoal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  targetDate: string | null;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
}

export interface DashboardPayment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  kind: 'payment' | 'subscription';
  status: 'upcoming' | 'subscription' | 'review';
}

export interface DashboardInsight {
  id: string;
  type: 'UNUSUAL_SPENDING' | 'SAVINGS_PROGRESS' | 'SUBSCRIPTION_SUMMARY';
  title: string;
  message: string;
  severity: 'info' | 'success' | 'warning';
}

export interface DashboardResponse {
  summary: DashboardSummary;
  netWorthHistory: NetWorthPoint[];
  spendingCategories: DashboardCategory[];
  assetAllocation: DashboardAllocation[];
  goals: DashboardGoal[];
  upcomingPayments: DashboardPayment[];
  insights: DashboardInsight[];
}
