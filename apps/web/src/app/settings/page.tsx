'use client';

import { Bell, KeyRound, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppPageShell } from '@/components/app-page-shell';
import { useAuth } from '@/components/auth';

const settings = [
  { label: 'Notifications', value: 'Enabled', icon: Bell },
  { label: 'Privacy', value: 'Strict', icon: ShieldCheck },
  { label: 'Automation', value: 'Adaptive', icon: SlidersHorizontal },
  { label: 'API access', value: 'Configured', icon: KeyRound },
];

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  return (
    <AppPageShell eyebrow="Control center" title="Settings" subtitle="Tune your data, automation, and security preferences." actionLabel="Save changes">
      <section className="stats-grid">
        {settings.map(({ label, value, icon: Icon }) => (
          <div key={label} className="metric-card">
            <div className="metric-head">
              <div className="metric-icon"><Icon size={16} /></div>
              <span className="tag">Profile</span>
            </div>
            <strong>{label}</strong>
            <div className="metric-value small-value">{value}</div>
          </div>
        ))}
      </section>
      <button className="ghost-button" type="button" onClick={() => { logout(); router.replace('/login'); }}>Sign out of this workspace</button>
    </AppPageShell>
  );
}
