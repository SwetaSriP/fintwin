import { ArrowUpRight, CalendarClock, CreditCard, Dumbbell, Home, Music2, PlaySquare } from 'lucide-react';
import Link from 'next/link';
import type { DashboardPayment } from '@fintwin/types';
import { formatINR } from '@/lib/format';

const icons = { 'Home Loan EMI': Home, 'Credit Card': CreditCard, Netflix: PlaySquare, Spotify: Music2, 'Gym Membership': Dumbbell };

export function UpcomingPayments({ payments }: { payments: DashboardPayment[] }) {
  return <article className="panel payments-panel"><div className="panel-header"><div><h2>Upcoming Payments</h2><p className="panel-caption">Stay ahead of what’s next</p></div><Link className="icon-button" href="/reports" aria-label="View payment calendar"><CalendarClock size={18} /></Link></div><div className="payments-list">{payments.map(payment => { const Icon = icons[payment.name as keyof typeof icons] ?? CreditCard; return <div className="payment-row" key={payment.name}><div className={`payment-icon ${payment.kind}`}><Icon size={15} /></div><div className="payment-main"><strong>{payment.name}</strong><small>{payment.dueLabel}</small></div><span className={`payment-badge ${payment.status}`}>{payment.status === 'review' ? 'Review' : payment.kind === 'subscription' ? 'Subscription' : 'Upcoming'}</span><strong className="payment-amount">{formatINR(payment.amount)}</strong></div>; })}</div><Link className="text-link" href="/reports">Manage payments <ArrowUpRight size={14} /></Link></article>;
}
