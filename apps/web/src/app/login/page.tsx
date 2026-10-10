'use client';

import Link from 'next/link';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = login(email, password);
    if (message) setError(message);
    else router.push('/dashboard');
  }

  return <main className="auth-page"><section className="auth-card"><div className="auth-brand"><span>F</span> Fin<span>Twin</span></div><div className="auth-copy"><p className="eyebrow">Welcome back</p><h1>Your financial life, understood.</h1><p>Sign in to see your money, goals, and next best decisions in one calm workspace.</p></div><form className="auth-form" onSubmit={submit}><label>Email address<div className="auth-input"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required /></div></label><label>Password<div className="auth-input"><LockKeyhole size={16} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" autoComplete="current-password" required /></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="auth-submit" type="submit">Sign in <ArrowRight size={16} /></button></form><p className="auth-switch">New to FinTwin? <Link href="/signup">Create an account</Link></p></section><aside className="auth-aside"><span className="auth-aside-kicker">Private by design</span><h2>Make confident money moves with a clearer view.</h2><div className="auth-stat"><strong>92</strong><span>financial health score<br />for your demo workspace</span></div></aside></main>;
}
