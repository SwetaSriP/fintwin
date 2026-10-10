import { Check, ChevronRight, Circle, Home, ShieldCheck, Sparkles, Target } from 'lucide-react';
import type { DashboardGoal } from '@fintwin/types';
import { formatINRCompact } from '@/lib/format';

const goalIcons = { emergency: ShieldCheck, car: Circle, home: Home, wealth: Sparkles };

export function FinancialGoalCard({ goal }: { goal: DashboardGoal }) {
  const progress = goal.progress;
  const Icon = goalIcons[goal.id as keyof typeof goalIcons] ?? Target;
  const color = goal.status === 'COMPLETED' ? '#659879' : goal.status === 'PAUSED' ? '#c99b57' : '#4f948a';
  return <article className="goal-card"><div className="goal-card-top"><div className="goal-icon" style={{ color, background: `${color}18` }}><Icon size={17} /></div><div className="goal-title"><strong>{goal.name}</strong><span>{goal.targetDate ? new Date(goal.targetDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'No target date'}</span></div><ChevronRight size={15} className="goal-chevron" /></div><div className="goal-amount"><strong>{formatINRCompact(goal.currentAmount)}</strong><span>of {formatINRCompact(goal.targetAmount)}</span><b>{progress}%</b></div><div className="progress-track"><i style={{ width: `${progress}%`, background: color }} /></div><div className="goal-status"><span className={goal.status.toLowerCase()}>{goal.status === 'COMPLETED' ? <Check size={11} /> : <Circle size={8} />}{goal.status === 'COMPLETED' ? 'Completed' : goal.status === 'PAUSED' ? 'Paused' : 'On track'}</span><span>{Math.max(0, goal.targetAmount - goal.currentAmount) > 0 ? `${formatINRCompact(Math.max(0, goal.targetAmount - goal.currentAmount))} to go` : 'Target reached'}</span></div></article>;
}
