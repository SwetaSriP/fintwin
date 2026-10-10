'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Plus, Search, ArrowUpRight, BarChart3, BrainCircuit, FileText, Goal, Landmark, Sparkles, WalletCards } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';
import { Sidebar } from './sidebar';
import { useAuth } from './auth';

type AppPageShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  children: React.ReactNode;
};

export function AppPageShell({ eyebrow, title, subtitle, actionLabel = 'Add transaction', children }: AppPageShellProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const pageMeta: Record<string, { href: string; label: string; icon: typeof Plus }> = {
    Transactions: { href: '/transactions?add=1', label: 'Add transaction', icon: Plus },
    Accounts: { href: '/accounts', label: 'New account', icon: Landmark },
    Budgets: { href: '/budgets', label: 'Create budget', icon: BarChart3 },
    Goals: { href: '/goals', label: 'Create goal', icon: Goal },
    Investments: { href: '/investments', label: 'Add investment', icon: WalletCards },
    Reports: { href: '/reports', label: 'Export report', icon: FileText },
    'AI advisor': { href: '/ai-advisor', label: 'Ask AI', icon: BrainCircuit },
    'Digital Twin': { href: '/digital-twin', label: 'Run scenario', icon: Sparkles },
    Settings: { href: '/settings', label: 'Save changes', icon: ArrowUpRight },
  };
  const meta = pageMeta[title] ?? { href: '/transactions', label: actionLabel, icon: Plus };
  const ActionIcon = meta.icon;
  const initials = user?.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() ?? 'AS';
  function searchOnEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && search.trim()) router.push(`/transactions?search=${encodeURIComponent(search.trim())}`);
  }
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{title}</strong>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={searchOnEnter} aria-label="Search transactions, goals, or ask anything" placeholder="Search transactions, goals, ask anything..." />
            </label>
            <Link className="icon-button notification-button" href="/settings" aria-label="Notifications">
              <Bell size={18} />
              <i />
            </Link>
            <div className="profile-block">
              <div className="avatar">{initials}</div>
              <div>
                <strong>{user?.name ?? 'Arjun Shah'}</strong>
                <small>{user?.email ?? 'Free plan'}</small>
              </div>
              <Link className="top-chevron" href="/settings" aria-label="Open profile menu">
                <ChevronDown size={16} />
              </Link>
            </div>
          </div>
        </header>

        <section className="page-heading page-heading-modern">
          <div>
            <div className="page-kicker"><span className="page-kicker-dot" /> {eyebrow}</div>
            <h1>{title}<span className="page-title-mark">/</span></h1>
            <p className="page-subtitle">{subtitle}</p>
          </div>
          <Link className="primary-button page-action" href={meta.href}>
            <ActionIcon size={16} />
            {meta.label}
          </Link>
        </section>

        <div className="page-context"><span><span className="status-dot" /> Workspace synced</span><span>Updated just now</span></div>
        <section className="page-body">{children}</section>
      </main>
    </div>
  );
}
