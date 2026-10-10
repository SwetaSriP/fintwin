'use client';

import { ArrowUpRight, BarChart3, CircleDollarSign } from 'lucide-react';
import { AppPageShell } from '@/components/app-page-shell';
import { useInvestments } from '@/lib/api/finance';
import { formatINR } from '@/lib/format';

export default function InvestmentsPage() {
  const { data = [] } = useInvestments();
  return <AppPageShell eyebrow="Wealth engine" title="Investments" subtitle="Understand where your capital is working and how it is growing." actionLabel="Add investment">
    <section className="stats-grid">
      {data.map((investment) => {
        const gain = investment.currentValue - investment.investedAmount;
        return <div key={investment.id} className="metric-card accent-card">
          <div className="metric-head"><div className="metric-icon"><CircleDollarSign size={16} /></div><span className="tag">{investment.type}</span></div>
          <strong>{investment.name}</strong><div className="metric-value small-value">{formatINR(investment.currentValue)}</div>
          <div className="mini-row"><span>Invested {formatINR(investment.investedAmount)}</span><span className="trend-inline"><ArrowUpRight size={13} /> {formatINR(gain)}</span></div>
        </div>;
      })}
      <div className="metric-card"><div className="metric-head"><div className="metric-icon"><BarChart3 size={16} /></div><span className="tag">Portfolio</span></div><strong>Allocation health</strong><small>Your portfolio is diversified across equity, debt, and long-term retirement assets.</small></div>
    </section>
  </AppPageShell>;
}
