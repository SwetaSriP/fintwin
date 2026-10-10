'use client';

import { BrainCircuit, Send, Sparkles, UserRound } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { AppPageShell } from '@/components/app-page-shell';

type Message = { role: 'assistant' | 'user'; text: string };

const starterPrompts = ['How can I improve my savings rate?', 'Can I afford a ₹80 lakh house?', 'Where did I spend the most this month?'];

function localReply(message: string) {
  const value = message.toLowerCase();
  if (/hello|hi|hey|good morning|good evening/.test(value)) return 'Hi. I can help with spending, saving, investments, debt, taxes, goals, cash flow, and everyday money decisions. What are you trying to decide?';
  if (value.includes('house') || value.includes('home') || value.includes('afford') || value.includes('emi')) return 'Based on your demo cash flow, keep a home EMI below roughly ₹56,000 and build a 20% down payment before committing. Keep six months of expenses untouched as your emergency buffer.';
  if (value.includes('save') || value.includes('saving') || value.includes('savings')) return 'Your demo savings rate is strong. Automate your investment contribution just after payday, then review dining and subscriptions monthly so lifestyle costs do not quietly absorb the surplus.';
  if (value.includes('spend') || value.includes('expense') || value.includes('money out')) return 'Housing is your largest recurring outflow, followed by food and dining. Set a category ceiling, review subscriptions, and compare actual spending with your plan every week.';
  if (value.includes('invest') || value.includes('stock') || value.includes('mutual') || value.includes('sip') || value.includes('portfolio')) return 'Keep a diversified core across equity, debt, and emergency cash. Increase a SIP only after your emergency buffer is protected, and review risk based on your time horizon rather than short-term returns.';
  if (value.includes('budget') || value.includes('plan')) return 'Start with take-home income, reserve essentials first, then assign a clear limit to flexible categories. Leave a small buffer so one unusual month does not break the plan.';
  if (value.includes('debt') || value.includes('loan') || value.includes('credit card')) return 'Prioritise high-interest debt, keep card balances paid on time, and avoid adding a new EMI until the monthly payment remains comfortably below your income.';
  if (value.includes('tax') || value.includes('taxes')) return 'Keep income records, investment statements, and deductible expenses together. Before filing, compare your tax regime options and confirm details with a qualified tax professional.';
  if (value.includes('goal') || value.includes('emergency') || value.includes('future')) return 'Turn the goal into a target amount, date, and monthly contribution. Keep emergency savings separate from long-term investments so an urgent expense does not force a bad sale.';
  if (value.includes('salary') || value.includes('income') || value.includes('raise')) return 'When income changes, send the increase to priorities first: emergency reserves, expensive debt, and automated investing. Upgrade lifestyle gradually after the new plan is stable.';
  if (value.includes('transaction') || value.includes('bank') || value.includes('account')) return 'Use Transactions to record the amount, category, and date. Clean categories make the spending patterns and dashboard recommendations much more reliable.';
  return `For “${message.trim()}”, start with three checks: what is the amount, when do you need the money, and what trade-off are you comfortable with? I can give a more specific answer if you include those details. This is educational guidance, not regulated financial advice.`;
}

export default function AiAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: 'Hi, I am your FinTwin advisor. Ask me anything about your money, goals, or next decision.' }]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  async function ask(message: string) {
    const trimmed = message.trim();
    if (!trimmed || isThinking) return;
    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    setInput('');
    setIsThinking(true);
    try {
      const response = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: trimmed }) });
      const result = await response.json() as { reply?: string; error?: string };
      setMessages((current) => [...current, { role: 'assistant', text: result.reply ?? localReply(trimmed) }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', text: localReply(trimmed) }]);
    } finally {
      setIsThinking(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return <AppPageShell eyebrow="AI intelligence" title="AI advisor" subtitle="Ask questions, explore trade-offs, and turn your financial data into a next step." actionLabel="Ask AI">
    <section className="advisor-layout">
      <div className="advisor-chat panel">
        <div className="advisor-chat-header"><div className="advisor-avatar-large"><BrainCircuit size={20} /></div><div><strong>FinTwin advisor</strong><small><span className="online-dot" /> Ready to help</small></div><Sparkles className="advisor-sparkle" size={18} /></div>
        <div className="chat-messages">{messages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}><div className="chat-avatar">{message.role === 'assistant' ? <BrainCircuit size={14} /> : <UserRound size={14} />}</div><p>{message.text}</p></div>)}{isThinking && <div className="chat-message assistant"><div className="chat-avatar"><BrainCircuit size={14} /></div><p className="thinking-dots">Thinking<span>.</span><span>.</span><span>.</span></p></div>}</div>
        <div className="prompt-row">{starterPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => void ask(prompt)}>{prompt}</button>)}</div>
        <form className="advisor-composer" onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your finances..." aria-label="Ask your AI financial advisor" /><button type="submit" aria-label="Send question"><Send size={16} /></button></form>
      </div>
      <aside className="advisor-side"><div className="advisor-score"><span className="hero-eyebrow">Opportunity score</span><strong>92</strong><small>Strong financial momentum</small><div className="score-track"><span /></div></div><div className="advisor-side-card"><span className="hero-eyebrow">Suggested focus</span><h3>Increase your SIP by 8%</h3><p>Your current cash flow can support a small automated increase without affecting your emergency buffer.</p><button type="button" onClick={() => void ask('Should I increase my SIP by 8%?')}>Explore this idea <Sparkles size={14} /></button></div></aside>
    </section>
  </AppPageShell>;
}
