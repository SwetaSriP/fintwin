'use client';

import { Bell, ChevronDown, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../auth';

export function DashboardHeader() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const initials = user?.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() ?? 'AS';
  return <><header className="topbar"><div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-separator">/</span><strong>Overview</strong></div><div className="topbar-actions"><label className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && search.trim()) router.push(`/transactions?search=${encodeURIComponent(search.trim())}`); }} aria-label="Search transactions, goals, or ask anything" placeholder="Search transactions, goals, ask anything..." /></label><Link className="icon-button notification-button" href="/settings" aria-label="Notifications"><Bell size={18} /><i /></Link><div className="profile-block"><div className="avatar">{initials}</div><div><strong>{user?.name ?? 'Arjun Shah'}</strong><small>{user?.email ?? 'Free plan'}</small></div><Link className="top-chevron" href="/settings" aria-label="Open profile menu"><ChevronDown size={16} /></Link></div></div></header><section className="page-heading"><div><p className="eyebrow">Thursday, 9 October 2026</p><h1>Your financial life, understood <span>✦</span></h1><p className="page-subtitle">A clearer view of your money today, and the future you’re building.</p></div><Link className="primary-button" href="/transactions?add=1"><Plus size={17} /> Add transaction</Link></section></>;
}
