import { motion } from 'motion/react';
import { 
  Globe, 
  Compass, 
  Flame, 
  ShieldCheck, 
  Heart, 
  DollarSign, 
  Leaf, 
  ArrowRight, 
  Sparkles, 
  ThumbsUp, 
  Clock, 
  AlertTriangle,
  Lightbulb,
  Workflow
} from 'lucide-react';

interface AboutMissionProps {
  onGoToNudges: () => void;
  onGoToSandbox: () => void;
}

export default function AboutMission({ onGoToNudges, onGoToSandbox }: AboutMissionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-12"
    >
      {/* Editorial Hero Layout */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-green text-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,230,207,0.15),transparent_45%)]" />
        <div className="max-w-3xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-accent/20 text-brand-accent uppercase tracking-wider border border-brand-accent/30 animate-pulse">
            <Leaf className="w-3.5 h-3.5" />
            <span>Our Core Manifesto</span>
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Climate Action Built Around <span className="text-brand-accent underline decoration-brand-orange/45 decoration-wavy underline-offset-4">Human Context</span>, Not Spreadsheet Chores.
          </h1>
          <p className="text-sm md:text-base text-brand-light/90 leading-relaxed font-medium max-w-2xl">
            GreenPulse was designed to dismantle the barriers of traditional environmental tracking. We believe sustainability shouldn't require cognitive exhausting audits or invasive account linking. It should be a responsive, encouraging daily partner.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button 
              onClick={onGoToNudges}
              className="px-5 py-3 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow hover:shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Try Today's Nudge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onGoToSandbox}
              className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Simulate Passive Feed</span>
              <Compass className="w-4 h-4 text-brand-accent" />
            </button>
          </div>
        </div>
      </div>

      {/* The What & The Why Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: What is GreenPulse */}
        <div className="bg-white rounded-3xl border border-brand-border p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-light text-brand-green rounded-2xl">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider block">Overview</span>
                <h2 className="text-xl font-bold text-brand-dark tracking-tight">What is GreenPulse?</h2>
              </div>
            </div>
            
            <p className="text-sm text-brand-muted leading-relaxed">
              GreenPulse is a <strong>privacy-first, micro-incentive carbon companion</strong>. It operates entirely as an offline-capable client application that analyzes your estimated baseline footprint and dynamically prescribes <strong>one realistic daily sustainability action nudge</strong>. 
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3.5 items-start">
                <div className="w-5 h-5 rounded-full bg-brand-light text-brand-green text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-dark">Baseline Estimation</h4>
                  <p className="text-xs text-brand-muted mt-0.5">An effortless 5-point calculator establishes your range, replacing hundreds of complex input variables.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-5 h-5 rounded-full bg-brand-light text-brand-green text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-dark">Singular Native Focus</h4>
                  <p className="text-xs text-brand-muted mt-0.5">No endless lists. You receive one personalized opportunity each day to avoid choice overload and decision paralysis.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-5 h-5 rounded-full bg-brand-light text-brand-green text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-dark">Local Metadata Sandbox</h4>
                  <p className="text-xs text-brand-muted mt-0.5">A simulation pipeline demonstrating how your smartphone could securely evaluate merchant descriptor codes without leaking transactions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-border flex items-center gap-3 bg-brand-extralight -mx-8 -mb-8 p-6 rounded-b-[22px]">
            <ShieldCheck className="w-5 h-5 text-brand-green shrink-0" />
            <p className="text-[11px] text-brand-muted leading-relaxed">
              <strong>100% Zero Database Footprint:</strong> Calculated entirely inside your local browser. No credit cards, live emails, or server authentication required.
            </p>
          </div>
        </div>

        {/* Right: Why was GreenPulse Built */}
        <div className="bg-white rounded-3xl border border-brand-border p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-light text-brand-orange rounded-2xl">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider block">The Motive</span>
                <h2 className="text-xl font-bold text-brand-dark tracking-tight">Why was it built?</h2>
              </div>
            </div>
            
            <p className="text-sm text-brand-muted leading-relaxed">
              Traditional carbon offset platforms act like retroactive accounting services. They expect busy individuals to log their utilities, flight miles, and daily organic scrap ounces. This triggers **eco-guilt, friction exhaustion, and rapid drop-off** (typically within 7 days).
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-brand-light/30 border border-brand-border/60">
                <span className="text-[10px] uppercase font-bold text-brand-orange block mb-1">Old trackers (Audit)</span>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Requires manual gas bill entry, causes high carbon anxiety, focuses on previous mistakes, and results in rapid fatigue.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-extralight border border-brand-green/25">
                <span className="text-[10px] uppercase font-bold text-brand-green block mb-1">GreenPulse (Habit)</span>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Asks for a 5-step estimate, offers a forward-looking action, links to wallet side benefits, and nurtures long-term commitment.
                </p>
              </div>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed bg-brand-light/40 p-4 rounded-xl border border-brand-border/50">
              <strong className="text-brand-dark">The Discovery:</strong> Behavioral science shows humans adopt sustainable routines not by reading climate crisis metrics, but by stacking micro-actions that save them money, reclaim personal time, or reduce stress.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-border flex items-center gap-3">
            <span className="text-xs font-bold text-brand-muted">A project of:</span>
            <span className="text-xs bg-brand-green/15 text-brand-green px-2.5 py-1 rounded-md font-bold uppercase tracking-wider text-[10px]">
              Behavioral Climatology Framework v1.4
            </span>
          </div>
        </div>
      </div>

      {/* The Four Core Pillars of GreenPulse */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-bold text-brand-green tracking-wider bg-brand-light px-3 py-1 rounded-full border border-brand-border">Development Design System</span>
          <h2 className="text-2xl font-bold text-brand-dark tracking-tight">The 4 Pillars of Shame-Free Living</h2>
          <p className="text-xs text-brand-muted">
            How we translate global climate targets into immediate, realistic household habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-brand-light text-brand-green rounded-xl flex items-center justify-center">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-brand-dark">1. Nudge Over Friction</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Rather than expecting a user to audit their life, we suggest one easy, actionable daily change with an automated habit track.
              </p>
            </div>
            <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wide mt-4 block">Habit Stacking Loop</span>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-brand-light text-brand-green rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-brand-orange" />
              </div>
              <h3 className="text-sm font-bold text-brand-dark">2. Personal Co-Benefits</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Every action shows you its physical side-impact. Save money, consume healthier meals, or reclaim distraction-free time.
              </p>
            </div>
            <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wide mt-4 block">Incentive Realism</span>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-brand-light text-brand-green rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-brand-dark" />
              </div>
              <h3 className="text-sm font-bold text-brand-dark">3. Safe Pipeline Sandbox</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                By calculating statistics locally, we eliminate data harvesting. We simulate tags locally with zero server leakages.
              </p>
            </div>
            <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wide mt-4 block">Privacy Authoritative</span>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-brand-light text-brand-green rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-green" />
              </div>
              <h3 className="text-sm font-bold text-brand-dark">4. Shame-Free runway</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                We track a target runway matching UN Paris Alignment. No climate-shame; just proactive improvement milestones.
              </p>
            </div>
            <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wide mt-4 block">Target Optimized</span>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl border border-brand-border p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-brand-dark tracking-tight">Mission Q&A (Frequently Sourced Questions)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-brand-dark">Q: Is my carbon baseline accurate?</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              It is a localized estimation mapped directly to your lifestyle scales (transport, diet, residential energy, consumption patterns). By using standard coefficients from the EPA and IPCC, it filters out noise to identify your primary focus classes.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-brand-dark">Q: Why isn't there real credit card syncing?</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Account sync introduces high privacy hazards, financial costs, and API failures. We built a local sandbox feed instead to prove that high-fidelity predictions can be modeled completely on-device without invasive third-party analytics.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-brand-dark">Q: What are co-benefits?</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              A co-benefit represents an immediate, personal wellness bonus earned alongside atmospheric carbon savings. For example: reducing beef consumption yields vascular health benefits; unplugging appliances lowers your electrical bill.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-brand-dark">Q: Can I use this completely offline?</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Yes, absolutely. GreenPulse stores your state local to your device using standard sandbox keys. No data leaks, no telemetry tracking, and zero account dependencies.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-bold text-brand-dark">Ready to take immediate action with no friction?</span>
          </div>
          <button 
            onClick={onGoToNudges}
            className="px-4 py-2 bg-brand-green hover:bg-brand-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer self-start md:self-auto"
          >
            Start Nudge Journey
          </button>
        </div>
      </div>
    </motion.div>
  );
}
