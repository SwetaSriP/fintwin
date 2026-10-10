import { ChevronDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatINR } from '@/lib/format';
import type { DashboardCategory } from '@fintwin/types';

export function SpendingChart({ data, total }: { data: DashboardCategory[]; total: number }) {
  return <article className="panel spending-panel"><div className="panel-header"><div><h2>Spending Categories</h2><p className="panel-caption">A clear view of this month’s outflow</p></div><div className="panel-actions"><Link className="select-button" href="/transactions?filter=EXPENSE">View expenses <ChevronDown size={14} /></Link><Link className="icon-button" href="/transactions?filter=EXPENSE" aria-label="More spending options"><MoreHorizontal size={18} /></Link></div></div><div className="spending-content"><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="amount" nameKey="name" innerRadius={61} outerRadius={81} paddingAngle={3} stroke="none">{data.map(item => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip contentStyle={{ background: '#293231', border: 'none', borderRadius: 9, color: '#fff', fontSize: 12 }} formatter={(value) => [formatINR(Number(value)), 'Spent']} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>{formatINR(total)}</strong><span>Total spent</span></div></div><div className="category-list">{data.map(item => <div className="category-row" key={item.name}><span><i className="legend-dot" style={{ background: item.color }} />{item.name}</span><strong>{formatINR(item.amount)}</strong><em>{item.percentage}%</em></div>)}</div></div></article>;
}
