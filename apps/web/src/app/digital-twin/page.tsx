'use client';

import { Sparkles, Target } from 'lucide-react';
import { AppPageShell } from '@/components/app-page-shell';

export default function DigitalTwinPage() {
  return (
    <AppPageShell eyebrow="Virtual model" title="Digital Twin" subtitle="A live financial model of your current decisions and future scenarios." actionLabel="Run scenario">
      <section className="content-stack">
        <div className="hero-panel twin-panel">
          <div>
            <span className="eyebrow small">Forecast</span>
            <h2>Net worth projected to grow 19.4% in 12 months</h2>
          </div>
          <div className="mini-cta">
            <Target size={16} />
            Based on current cash flow and savings plan
          </div>
        </div>

        <div className="stats-grid two-up">
          <div className="metric-card">
            <div className="metric-head">
              <div className="metric-icon"><Sparkles size={16} /></div>
              <span className="tag">Scenario</span>
            </div>
            <strong>Best case</strong>
            <div className="metric-value small-value">₹63.2L</div>
            <small>Projected net worth with an additional SIP of ₹8k</small>
          </div>
          <div className="metric-card">
            <div className="metric-head">
              <div className="metric-icon"><Sparkles size={16} /></div>
              <span className="tag">Scenario</span>
            </div>
            <strong>Base case</strong>
            <div className="metric-value small-value">₹48.7L</div>
            <small>Stable growth based on current spending and incomes</small>
          </div>
        </div>
      </section>
    </AppPageShell>
  );
}
