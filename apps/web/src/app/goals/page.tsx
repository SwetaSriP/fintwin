'use client';

import { CalendarDays, Goal, Target } from 'lucide-react';
import { AppPageShell } from '@/components/app-page-shell';
import { useGoals } from '@/lib/api/finance';
import { formatINR } from '@/lib/format';

export default function GoalsPage() {
  const { data = [] } = useGoals();
  return <AppPageShell eyebrow="Long view" title="Goals" subtitle="Keep the future visible, measurable, and moving." actionLabel="Create goal">
    <section className="stats-grid">
      {data.map((goal) => <div key={goal.id} className="metric-card accent-card">
        <div className="metric-head"><div className="metric-icon"><Goal size={16} /></div><span className="tag">{goal.status}</span></div>
        <strong>{goal.name}</strong>
        <div className="metric-value small-value">{Math.round(goal.progress)}%</div>
        <div className="progress-bar"><span style={{ width: `${Math.min(goal.progress, 100)}%` }} /></div>
        <div className="mini-row"><span>{formatINR(goal.currentAmount)} saved</span><span>{formatINR(goal.targetAmount)} target</span></div>
        <small><CalendarDays size={13} /> {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'No target date'}</small>
      </div>)}
      <div className="metric-card"><div className="metric-head"><div className="metric-icon"><Target size={16} /></div><span className="tag">Next move</span></div><strong>Increase goal momentum</strong><small>Automate a monthly contribution and keep your next milestone in sight.</small></div>
    </section>
  </AppPageShell>;
}
