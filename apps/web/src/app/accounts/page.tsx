'use client';

import { Landmark, Wallet2 } from 'lucide-react';
import { AppPageShell } from '@/components/app-page-shell';
import { useAccounts } from '@/lib/api/finance';
import { formatINR } from '@/lib/format';

export default function AccountsPage() {
  const { data = [] } = useAccounts();

  return (
    <AppPageShell eyebrow="Cash overview" title="Accounts" subtitle="Track every balance, bank, and card in one place." actionLabel="New account">
      <section className="stats-grid">
        {data.map((account) => (
          <div key={account.id} className="metric-card accent-card">
            <div className="metric-head">
              <div className="metric-icon">
                {account.type === 'CREDIT_CARD' ? <Wallet2 size={16} /> : <Landmark size={16} />}
              </div>
              <span className="tag">{account.type}</span>
            </div>
            <strong>{account.name}</strong>
            <small>{account.institution ?? 'Personal wallet'}</small>
            <div className="metric-value">{formatINR(account.balance)}</div>
            <div className="mini-row">
              <span>{account.isActive ? 'Active' : 'Paused'}</span>
              <span>{account.currency}</span>
            </div>
          </div>
        ))}
      </section>
    </AppPageShell>
  );
}
