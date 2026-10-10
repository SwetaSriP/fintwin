import { ArrowUpRight, MoreHorizontal, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { formatINR } from '@/lib/format';
import type { DashboardAllocation } from '@fintwin/types';

export function AssetAllocationChart({ data, total }: { data: DashboardAllocation[]; total: number }) {
  return <article className="panel allocation-panel"><div className="panel-header"><div><h2>Investment & Asset Allocation</h2><p className="panel-caption">A balanced portfolio across six asset classes</p></div><Link className="icon-button" href="/investments" aria-label="More allocation options"><MoreHorizontal size={18} /></Link></div><div className="allocation-content"><div className="allocation-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" innerRadius={62} outerRadius={82} paddingAngle={3} stroke="none">{data.map(item => <Cell key={item.name} fill={item.color} />)}</Pie></PieChart></ResponsiveContainer><div className="donut-center"><strong>{formatINR(total, true)}</strong><span>Total invested</span></div></div><div className="allocation-list">{data.map(item => <div className="allocation-row" key={item.name}><span><i className="legend-dot" style={{ background: item.color }} />{item.name}</span><strong>{item.percentage}%</strong><em>{formatINR(item.value)}</em></div>)}</div></div><div className="allocation-footer"><span><TrendingUp size={14} /> Portfolio growth <strong>+11.2%</strong> this year</span><Link className="text-link" href="/investments">View details <ArrowUpRight size={14} /></Link></div></article>;
}
