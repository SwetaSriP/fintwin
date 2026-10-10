'use client';

import Link from 'next/link';
import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = signup(form.name, form.email, form.password, form.confirmPassword);
    if (message) setError(message);
    else router.push('/dashboard');
  }

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  }

  return <main className="auth-page"><section className="auth-card"><div className="auth-brand"><span>F</span> Fin<span>Twin</span></div><div className="auth-copy"><p className="eyebrow">Start with clarity</p><h1>Build your financial twin.</h1><p>Create your private workspace and turn scattered money data into a plan you can act on.</p></div><form className="auth-form" onSubmit={submit}><label>Full name<div className="auth-input"><UserRound size={16} /><input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Arjun Shah" autoComplete="name" required /></div></label><label>Email address<div className="auth-input"><Mail size={16} /><input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" autoComplete="email" required /></div></label><label>Password<div className="auth-input"><LockKeyhole size={16} /><input type="password" value={form.password} onChange={(event) => update('password', event.target.value)} placeholder="8+ chars, uppercase and number" autoComplete="new-password" required /></div></label><label>Confirm password<div className="auth-input"><LockKeyhole size={16} /><input type="password" value={form.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)} placeholder="Repeat your password" autoComplete="new-password" required /></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="auth-submit" type="submit">Create workspace <ArrowRight size={16} /></button></form><p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p></section><aside className="auth-aside"><span className="auth-aside-kicker">Your money, one view</span><h2>See what is happening today and model what happens next.</h2><div className="auth-checks"><span>✓ Cash flow clarity</span><span>✓ Goals that stay visible</span><span>✓ Decisions backed by context</span></div></aside></main>;
}
