'use client';

import { ArrowRight, PiggyBank } from 'lucide-react';
import { AppPageShell } from '@/components/app-page-shell';

const budgets = [
  { category: 'Housing', spent: 24300, budget: 32000, status: 'On track' },
  { category: 'Food & Dining', spent: 12840, budget: 15000, status: 'Tight' },
  { category: 'Transport', spent: 8200, budget: 9250, status: 'Healthy' },
  { category: 'Shopping', spent: 7600, budget: 12000, status: 'Healthy' },
];

export default function BudgetsPage() {
  return (
    <AppPageShell eyebrow="Planning" title="Budgets" subtitle="Keep your monthly plan aligned with actual cash flow." actionLabel="Create budget">
      <section className="stats-grid">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.budget) * 100;
          return (
            <div key={budget.category} className="metric-card">
              <div className="metric-head">
                <div className="metric-icon"><PiggyBank size={16} /></div>
                <span className="tag">{budget.status}</span>
              </div>
              <strong>{budget.category}</strong>
              <div className="mini-row spaced">
                <span>Spent ₹{budget.spent.toLocaleString('en-IN')}</span>
                <span>of ₹{budget.budget.toLocaleString('en-IN')}</span>
              </div>
              <div className="progress-bar"><span style={{ width: `${Math.min(percentage, 100)}%` }} /></div>
              <div className="mini-row">
                <small>{Math.round(percentage)}% used</small>
                <small>₹{(budget.budget - budget.spent).toLocaleString('en-IN')} left</small>
              </div>
            </div>
          );
        })}
      </section>
    </AppPageShell>
  );
}
