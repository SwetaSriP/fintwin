'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Bell, ChevronLeft, CircleDollarSign, FileText, Goal, LayoutDashboard, Menu, Settings, Sparkles, WalletCards, X } from 'lucide-react';
import { useAuth } from './auth';

const routes = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Transactions', icon: FileText, href: '/transactions' },
  { label: 'Digital twin', icon: Sparkles, href: '/digital-twin', badge: 'New' },
  { label: 'Accounts', icon: WalletCards, href: '/accounts' },
  { label: 'Budgets', icon: BarChart3, href: '/budgets' },
  { label: 'Goals', icon: Goal, href: '/goals' },
  { label: 'Investments', icon: CircleDollarSign, href: '/investments' },
  { label: 'AI advisor', icon: Sparkles, href: '/ai-advisor' },
  { label: 'Reports', icon: FileText, href: '/reports' },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const initials = user?.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() ?? 'AS';
  return <>
    <button className="mobile-menu" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu size={20} /></button>
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><div className="brand-mark">F</div><span className="brand-name">Fin<span>Twin</span></span><button className="close-menu" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={19} /></button></div>
      <div className="workspace-switcher"><div className="avatar avatar-small">{initials}</div><div><strong>{user?.name ?? 'Your'}'s finances</strong><small>Personal workspace</small></div><ChevronLeft size={16} className="switcher-chevron" /></div>
      <nav className="nav-list" aria-label="Main navigation">
        <span className="nav-heading">Workspace</span>
        {routes.map(({ label, icon: Icon, href, badge }) => <Link key={label} className={`nav-item ${pathname === href ? 'active' : ''}`} href={href} onClick={() => setOpen(false)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{badge && <em>{badge}</em>}</Link>)}
      </nav>
        <div className="sidebar-footer"><Link className={`nav-item ${pathname === '/settings' ? 'active' : ''}`} href="/settings"><Settings size={18} strokeWidth={1.8} /><span>Settings</span></Link><div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={16} /></div><strong>Your AI Finance Companion</strong><p>Model your today.<br />Build your tomorrow.</p><Link href="/digital-twin">Explore your twin <span>→</span></Link></div><div className="sidebar-user"><div className="avatar">{initials}</div><div><strong>{user?.name ?? 'Arjun Shah'}</strong><small>{user?.email ?? 'Free plan'}</small></div><Bell size={17} /></div></div>
    </aside>
    {open && <button className="sidebar-overlay" aria-label="Close navigation" onClick={() => setOpen(false)} />}
  </>;
}
