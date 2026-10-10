import { ArrowUpRight, ChevronRight, CircleAlert, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { DashboardInsight } from '@fintwin/types';

const icons = { coral: CircleAlert, sage: TrendingUp, amber: Sparkles, teal: Sparkles };

export function AlertsInsights({ insights }: { insights: DashboardInsight[] }) {
  return <article className="panel insights-panel"><div className="panel-header"><div><h2>Alerts & Insights</h2><p className="panel-caption">Context for your next good decision</p></div><Link className="text-link" href="/reports">View all <ArrowUpRight size={14} /></Link></div><div className="insights-list">{insights.map(insight => { const tone = insight.severity === 'warning' ? 'coral' : insight.severity === 'success' ? 'sage' : 'amber'; const Icon = icons[tone]; return <Link href="/reports" className={`insight-row ${tone}`} key={insight.id}><div className="insight-icon"><Icon size={15} /></div><div><strong>{insight.title}</strong><p>{insight.message}</p></div><ChevronRight size={16} /></Link>; })}</div></article>;
}
