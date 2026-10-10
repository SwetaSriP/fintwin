import { ArrowDownRight, ArrowUpRight, CircleDollarSign, HeartPulse, PiggyBank, ShieldCheck, TrendingUp, WalletCards } from 'lucide-react';
import Link from 'next/link';
import type { KpiMetric } from '@fintwin/types';

const iconMap = { wallet: WalletCards, income: TrendingUp, spending: CircleDollarSign, savings: PiggyBank, shield: ShieldCheck, health: HeartPulse } as const;

export function KpiCard({ metric }: { metric: KpiMetric }) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] ?? WalletCards;
  const TrendIcon = metric.trend === 'down' ? ArrowDownRight : metric.trend === 'up' ? ArrowUpRight : TrendingUp;
  const href = metric.id === 'spending' ? '/transactions?filter=EXPENSE' : metric.id === 'income' ? '/transactions?filter=INCOME' : metric.id === 'health' ? '/ai-advisor' : metric.id === 'net-worth' ? '/reports' : metric.id === 'emergency' ? '/goals' : '/investments';
  return <article className={`kpi-card tone-${metric.tone}`}><div className="kpi-topline"><div className="kpi-icon"><Icon size={16} strokeWidth={1.8} /></div><Link className="kpi-menu" href={href} aria-label={`Open ${metric.label}`}>•••</Link></div><span className="kpi-label">{metric.label}</span><strong className="kpi-value">{metric.value}</strong><div className={`kpi-change ${metric.trend}`}><TrendIcon size={13} />{metric.change}<span>{metric.subtitle}</span></div></article>;
}
