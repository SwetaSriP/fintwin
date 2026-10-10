'use client';

import { useState } from 'react';
import { ArrowUpRight, Home, LineChart, Percent, Sparkles } from 'lucide-react';
import { formatINR, formatINRCompact } from '@/lib/format';

const tabs = [{ id: 'salary', label: 'Salary increase', icon: Percent }, { id: 'house', label: 'Buy a house', icon: Home }, { id: 'sip', label: 'Increase SIP', icon: LineChart }];

export function WhatIfSimulator({ initialIncome = 160000 }: { initialIncome?: number }) {
  const [activeTab, setActiveTab] = useState('salary');
  const [increase, setIncrease] = useState(50);
  const [period, setPeriod] = useState(3);
  const currentIncome = initialIncome;
  const projectedIncome = currentIncome * (1 + increase / 100);
  const projectedNetWorth = 4275660 + ((projectedIncome - currentIncome) * period * 12 * 0.72);
  const savingsRate = Math.min(65, 28.6 + increase * 0.12);
  return <article className="panel simulator-panel"><div className="panel-header"><div><div className="panel-title-row"><h2>What-if Simulator</h2><span className="new-pill">BETA</span></div><p className="panel-caption">Explore how one decision changes your financial future</p></div><Sparkles size={20} className="sparkle-icon" /></div><div className="simulator-tabs" role="tablist">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)} role="tab" aria-selected={activeTab === id}><Icon size={14} />{label}</button>)}</div>{activeTab === 'salary' ? <div className="simulator-body"><div className="simulator-fields"><label>Current monthly income<strong>{formatINR(currentIncome)}</strong></label><label>Salary increase <output>{increase}%</output><input aria-label="Salary increase percentage" type="range" min="0" max="100" step="5" value={increase} onChange={event => setIncrease(Number(event.target.value))} /></label><label>Period <select value={period} onChange={event => setPeriod(Number(event.target.value))}><option value={1}>1 year</option><option value={3}>3 years</option><option value={5}>5 years</option><option value={10}>10 years</option></select></label></div><div className="simulator-results"><div><span>Projected monthly income</span><strong>{formatINR(projectedIncome)}</strong></div><div><span>Projected net worth</span><strong>{formatINRCompact(projectedNetWorth)}</strong><small>after {period} years</small></div><div><span>Projected savings rate</span><strong>{savingsRate.toFixed(1)}%</strong><small>goal acceleration +{Math.round(increase * 0.8)}%</small></div></div></div> : <div className="simulator-placeholder"><Sparkles size={18} /><strong>{tabs.find(tab => tab.id === activeTab)?.label} scenario</strong><p>This scenario is ready for the deterministic simulation engine in Phase 4.</p></div>}<button className="outline-button">Open full simulator <ArrowUpRight size={15} /></button></article>;
}
