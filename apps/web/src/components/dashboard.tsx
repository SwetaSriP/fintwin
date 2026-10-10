'use client';

import { CircleHelp, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import type { KpiMetric } from '@fintwin/types';
import { AlertsInsights } from './dashboard/AlertsInsights';
import { AiAdvisorCard } from './dashboard/AiAdvisorCard';
import { AssetAllocationChart } from './dashboard/AssetAllocationChart';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { FinancialGoalCard } from './dashboard/FinancialGoalCard';
import { KpiCard } from './dashboard/KpiCard';
import { NetWorthChart } from './dashboard/NetWorthChart';
import { SpendingChart } from './dashboard/SpendingChart';
import { UpcomingPayments } from './dashboard/UpcomingPayments';
import { WhatIfSimulator } from './dashboard/WhatIfSimulator';
import { Sidebar } from './sidebar';
import { formatINR } from '@/lib/format';
import { useDashboard } from '@/lib/api/use-dashboard';

function buildKpis(summary: { netWorth: number; monthlyIncome: number; monthlySpending: number; savingsRate: number; emergencyFund: number; financialHealthScore: number; financialHealthRating?: string }): KpiMetric[] {
  return [
    { id: 'net-worth', label: 'Net worth', value: formatINR(summary.netWorth), change: '+12.4%', trend: 'up', tone: 'teal', icon: 'wallet', subtitle: 'vs last month' },
    { id: 'income', label: 'Monthly income', value: formatINR(summary.monthlyIncome), change: '+8.1%', trend: 'up', tone: 'indigo', icon: 'income', subtitle: 'vs last month' },
    { id: 'spending', label: 'Monthly spending', value: formatINR(summary.monthlySpending), change: '+3.2%', trend: 'up', tone: 'sage', icon: 'spending', subtitle: 'vs last month' },
    { id: 'savings', label: 'Savings rate', value: `${summary.savingsRate}%`, change: '+5.4%', trend: 'up', tone: 'amber', icon: 'savings', subtitle: 'vs last month' },
    { id: 'emergency', label: 'Emergency fund', value: formatINR(summary.emergencyFund), change: '10 months', trend: 'neutral', tone: 'coral', icon: 'shield', subtitle: 'coverage' },
    { id: 'health', label: 'Financial health', value: `${summary.financialHealthScore} / 100`, change: summary.financialHealthRating ?? 'Calculated', trend: 'up', tone: 'teal', icon: 'health', subtitle: 'deterministic score' },
  ];
}

function DashboardSkeleton() {
  return <div className="dashboard-loading"><div className="loading-heading"><span /><span /></div><div className="loading-kpis">{Array.from({ length: 6 }, (_, index) => <div className="loading-block" key={index} />)}</div><div className="loading-grid"><div className="loading-block large" /><div className="loading-block large" /><div className="loading-block large" /></div></div>;
}

export function Dashboard() {
  const { data, isLoading, isError, error, refetch } = useDashboard();
  if (isLoading) return <div className="app-shell"><Sidebar /><main className="main-content"><DashboardHeader /><DashboardSkeleton /></main></div>;
  if (isError || !data) return <div className="app-shell"><Sidebar /><main className="main-content"><DashboardHeader /><section className="dashboard-error"><div><span className="error-mark">!</span><h2>We couldn’t load your financial twin</h2><p>{error instanceof Error ? error.message : 'The dashboard service is unavailable right now.'}</p><button className="primary-button" onClick={() => void refetch()}><RefreshCcw size={15} /> Try again</button></div></section></main></div>;

  const kpis = buildKpis(data.summary);
  const allocationTotal = data.assetAllocation.reduce((sum, item) => sum + item.value, 0);
  return <div className="app-shell"><Sidebar /><main className="main-content"><DashboardHeader /><section className="kpi-grid">{kpis.map(metric => <KpiCard key={metric.id} metric={metric} />)}</section><section className="dashboard-grid"><NetWorthChart data={data.netWorthHistory} netWorth={data.summary.netWorth} /><SpendingChart data={data.spendingCategories} total={data.summary.monthlySpending} /><AssetAllocationChart data={data.assetAllocation} total={allocationTotal} /><WhatIfSimulator initialIncome={data.summary.monthlyIncome} /><section className="panel goals-panel"><div className="panel-header"><div><h2>Financial Goals</h2><p className="panel-caption">Small steps, meaningful milestones</p></div><Link className="text-link" href="/goals">See all <span aria-hidden="true">↗</span></Link></div><div className="goals-grid">{data.goals.map(goal => <FinancialGoalCard key={goal.id} goal={goal} />)}</div></section><UpcomingPayments payments={data.upcomingPayments} /><AiAdvisorCard /><AlertsInsights insights={data.insights} /></section><footer className="dashboard-footer"><span><span className="status-dot" /> Live data synced from your demo account</span><Link href="/settings">Data is encrypted and private <CircleHelp size={14} /></Link></footer></main></div>;
}
