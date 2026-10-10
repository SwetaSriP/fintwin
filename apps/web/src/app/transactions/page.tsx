'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ArrowDownLeft, ArrowUpRight, CalendarDays, Check, Filter, Plus, Search, TrendingUp, X } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppPageShell } from '@/components/app-page-shell';
import { createTransaction, FinanceTransaction, useTransactions } from '@/lib/api/finance';
import { formatINR } from '@/lib/format';

type TransactionFilter = 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER';

type TransactionForm = {
  type: FinanceTransaction['type'];
  amount: string;
  description: string;
  category: string;
  date: string;
};

const initialForm = (): TransactionForm => ({ type: 'EXPENSE', amount: '', description: '', category: 'General', date: new Date().toISOString().slice(0, 10) });

export default function TransactionsPage() {
  const { data = [] } = useTransactions();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [transactions, setTransactions] = useState(data);
  const [filter, setFilter] = useState<TransactionFilter>('ALL');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<TransactionForm>(initialForm);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => setTransactions(data), [data]);
  useEffect(() => {
    if (searchParams.get('add') === '1') setShowForm(true);
    const query = searchParams.get('search');
    if (query) setSearch(query);
    const queryFilter = searchParams.get('filter') as TransactionFilter | null;
    if (queryFilter && ['ALL', 'INCOME', 'EXPENSE', 'TRANSFER'].includes(queryFilter)) setFilter(queryFilter);
  }, [searchParams]);

  const filteredData = useMemo(() => transactions.filter((transaction) => {
    const matchesType = filter === 'ALL' || transaction.type === filter;
    const haystack = `${transaction.description} ${transaction.merchant ?? ''} ${transaction.category?.name ?? ''}`.toLowerCase();
    return matchesType && haystack.includes(search.trim().toLowerCase());
  }), [filter, search, transactions]);
  const income = transactions.filter((transaction) => transaction.type === 'INCOME').reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenses = transactions.filter((transaction) => transaction.type === 'EXPENSE').reduce((sum, transaction) => sum + transaction.amount, 0);
  const net = income - expenses;
  const categoryTotals = transactions.filter((transaction) => transaction.type === 'EXPENSE').reduce<Record<string, number>>((totals, transaction) => {
    const category = transaction.category?.name ?? 'General';
    totals[category] = (totals[category] ?? 0) + transaction.amount;
    return totals;
  }, {});
  const topCategories = Object.entries(categoryTotals).sort(([, first], [, second]) => second - first).slice(0, 4);

  function closeForm() {
    setShowForm(false);
    setFormError('');
    setForm(initialForm());
  }

  async function addTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(form.amount);
    if (!form.description.trim() || !amount || amount <= 0) {
      setFormError('Add a description and an amount greater than zero.');
      return;
    }

    const localTransaction: FinanceTransaction = {
      id: `local-${Date.now()}`,
      type: form.type,
      amount,
      description: form.description.trim(),
      merchant: 'Manual entry',
      transactionDate: `${form.date}T12:00:00.000Z`,
      category: { name: form.category },
      account: { name: 'Personal workspace' },
    };

    setIsSaving(true);
    try {
      const saved = await createTransaction({ type: form.type, amount, description: localTransaction.description, merchant: localTransaction.merchant ?? undefined, category: form.category, transactionDate: localTransaction.transactionDate });
      setTransactions((current) => [saved, ...current]);
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    } catch {
      setTransactions((current) => [localTransaction, ...current]);
    } finally {
      setIsSaving(false);
    }
    closeForm();
  }

  return (
    <AppPageShell eyebrow="Financial engine" title="Transactions" subtitle="Every movement, categorized and ready to act on." actionLabel="Add transaction">
      <section className="transaction-dashboard">
        <div className="transaction-hero">
          <div className="transaction-hero-copy"><span className="hero-eyebrow">Cash flow command center</span><h2>See every move. Make the next one count.</h2><p>Track incoming money, understand outflow, and keep your financial story current.</p><button className="hero-button" type="button" onClick={() => setShowForm(true)}><Plus size={15} /> Record a transaction</button></div>
          <img src="/transaction-hero.svg" alt="Abstract cash flow line illustration" />
        </div>

        <div className="transaction-metrics">
          <div className="transaction-metric"><span className="metric-label"><ArrowDownLeft size={14} /> Money in</span><strong className="positive">{formatINR(income)}</strong><small>Income recorded</small><i className="metric-accent income-accent" /></div>
          <div className="transaction-metric"><span className="metric-label"><ArrowUpRight size={14} /> Money out</span><strong className="negative">{formatINR(expenses)}</strong><small>{transactions.filter((item) => item.type === 'EXPENSE').length} expenses recorded</small><i className="metric-accent expense-accent" /></div>
          <div className="transaction-metric"><span className="metric-label"><TrendingUp size={14} /> Net movement</span><strong className={net >= 0 ? 'positive' : 'negative'}>{net >= 0 ? '+' : '-'}{formatINR(Math.abs(net))}</strong><small>{net >= 0 ? 'Healthy cash flow' : 'Review your outflow'}</small><i className="metric-accent net-accent" /></div>
          <div className="transaction-metric"><span className="metric-label"><CalendarDays size={14} /> Activity</span><strong>{transactions.length}</strong><small>Movements this period</small><i className="metric-accent activity-accent" /></div>
        </div>

        <div className="transaction-workspace-grid">
          <section className="transaction-table-card">
            <div className="transaction-section-heading"><div><span className="section-overline">Activity feed</span><h2>Latest transactions</h2><p>{filteredData.length} movements in this view</p></div><div className="live-indicator"><span /> Live view</div></div>
            <div className="transaction-controls"><div className="transaction-tabs">{([['ALL', 'All'], ['INCOME', 'Income'], ['EXPENSE', 'Expenses'], ['TRANSFER', 'Transfers']] as const).map(([value, label]) => <button key={value} type="button" className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div><div className="transaction-tools"><label className="transaction-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search activity" aria-label="Search transactions" /></label><button className="icon-text-button" type="button" onClick={() => { setFilter('ALL'); setSearch(''); }}><Filter size={14} /> Reset</button></div></div>
            <div className="transaction-table-head"><span>Movement</span><span>Category</span><span>Date</span><span>Amount</span></div>
            <div className="transaction-list">
              {filteredData.map((transaction) => {
                const isIncome = transaction.type === 'INCOME';
                return <div key={transaction.id} className="transaction-row"><div className="transaction-icon" data-kind={isIncome ? 'income' : 'expense'}>{isIncome ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}</div><div className="transaction-copy"><strong>{transaction.description}</strong><span>{transaction.merchant ?? transaction.account?.name ?? 'Manual entry'}</span></div><div className="transaction-meta"><span>{transaction.category?.name ?? 'General'}</span></div><div className="transaction-meta"><small>{new Date(transaction.transactionDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</small></div><div className={`transaction-amount ${isIncome ? 'positive' : 'negative'}`}>{isIncome ? '+' : '-'} {formatINR(transaction.amount)}</div></div>;
              })}
              {filteredData.length === 0 && <div className="empty-state">No transactions match this filter.</div>}
            </div>
          </section>

          <aside className="transaction-insights"><div className="quick-add-card"><div className="quick-add-icon"><Plus size={18} /></div><span className="section-overline">Quick capture</span><h3>Add a movement</h3><p>Record income or spending while the detail is fresh.</p><button type="button" onClick={() => setShowForm(true)}>Open entry form <ArrowUpRight size={14} /></button></div><div className="category-card"><div className="transaction-section-heading"><div><span className="section-overline">Spending mix</span><h3>Where money goes</h3></div><span className="category-total">{formatINR(expenses)}</span></div><div className="category-bars">{topCategories.map(([category, amount], index) => <div className="category-bar-row" key={category}><div className="category-bar-label"><span className={`category-dot dot-${index}`} />{category}<strong>{formatINR(amount)}</strong></div><div className="category-track"><span style={{ width: `${expenses ? Math.max(8, (amount / expenses) * 100) : 0}%` }} /></div></div>)}{topCategories.length === 0 && <small>No spending categories yet.</small>}</div></div></aside>
        </div>
        <div className="activity-note"><CalendarDays size={15} /><span>New entries sync to your workspace when the API is available.</span><Check size={15} /></div>
      </section>

      {showForm && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeForm(); }}><form className="transaction-modal" onSubmit={addTransaction}><div className="modal-heading"><div><span className="hero-eyebrow">Manual entry</span><h2>Add transaction</h2></div><button className="modal-close" type="button" onClick={closeForm} aria-label="Close add transaction form"><X size={18} /></button></div><div className="entry-type"><button type="button" className={form.type === 'EXPENSE' ? 'selected expense' : ''} onClick={() => setForm((current) => ({ ...current, type: 'EXPENSE' }))}>Expense</button><button type="button" className={form.type === 'INCOME' ? 'selected income' : ''} onClick={() => setForm((current) => ({ ...current, type: 'INCOME' }))}>Income</button></div><label className="form-field">Amount<input type="number" min="1" step="0.01" value={form.amount} onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))} placeholder="0.00" autoFocus required /></label><label className="form-field">Description<input value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="e.g. Apartment rent" required /></label><div className="form-grid"><label className="form-field">Category<select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}><option>General</option><option>Housing</option><option>Food & Dining</option><option>Transport</option><option>Shopping</option><option>Subscriptions</option></select></label><label className="form-field">Date<input type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} required /></label></div>{formError && <p className="form-error">{formError}</p>}<button className="auth-submit" type="submit" disabled={isSaving}><Check size={16} /> {isSaving ? 'Saving...' : 'Save transaction'}</button></form></div>}
    </AppPageShell>
  );
}
