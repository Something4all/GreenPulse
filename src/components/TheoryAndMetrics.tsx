import { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  HelpCircle, 
  TrendingUp, 
  Smile, 
  PlusCircle, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function TheoryAndMetrics() {
  const [activeSection, setActiveSection] = useState<'retention' | 'metrics' | 'factors'>('retention');

  // Interactive Live Metrics Telemetry Simulation State as diagnostic proof
  const [nudgeCommitLimit, setNudgeCommitLimit] = useState(48); // % commit rate
  const [retentionLimit, setRetentionLimit] = useState(38); // % 90day retention

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 pb-4 mb-5">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Product Design & Sustainability Framework</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Deep dive into the methodologies powering GreenPulse, including onboarding statistics, retention psychology, and success metrics.
        </p>
      </div>

      {/* Internal Tabs Switcher */}
      <div className="flex bg-gray-50 p-1 rounded-xl mb-6 max-w-md">
        <button
          onClick={() => setActiveSection('retention')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'retention' 
              ? 'bg-white text-emerald-950 shadow-sm border border-gray-200/50' 
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Retention Mechanisms
        </button>
        <button
          onClick={() => setActiveSection('metrics')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'metrics' 
              ? 'bg-white text-emerald-950 shadow-sm border border-gray-200/50' 
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Success Metrics
        </button>
        <button
          onClick={() => setActiveSection('factors')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'factors' 
              ? 'bg-white text-emerald-950 shadow-sm border border-gray-200/50' 
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Emissions Factors
        </button>
      </div>

      {/* Section Content */}
      {activeSection === 'retention' && (
        <div className="space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 rounded-full border border-emerald-100">Behavioral Loop Design</span>
            <h3 className="text-base font-bold text-gray-900 mt-2">Overcoming the Novelty Curve</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Carbon footprint apps often suffer from high drop-off once users complete the initial quick quiz. GreenPulse is designed directly around habit loop repetition (Cue → Action → Variable Reward → Investment). Here are our 3 primary structural retention plans:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Mechanism 1 */}
            <div className="p-4 rounded-xl border border-gray-150 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-rose-600 uppercase block mb-1">Mechanism 1</span>
                <h4 className="text-sm font-bold text-gray-900">Contextual Habit Stacking</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Avoid forcing completely new routines. Prompt users to anchor a carbon choice directly to an existing habit (e.g. `When I boil water for tea, I will unplug my desk strip`).
                </p>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-4 space-y-2 text-[11px]">
                <div className="text-emerald-800"><strong className="font-extrabold text-[#0D9488]">PRO:</strong> Seamless integration; requires very low willpower.</div>
                <div className="text-rose-800"><strong className="font-extrabold text-rose-700">CON:</strong> Highly self-reported; difficult to verify automatically.</div>
              </div>
            </div>

            {/* Mechanism 2 */}
            <div className="p-4 rounded-xl border border-gray-150 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-rose-600 uppercase block mb-1">Mechanism 2</span>
                <h4 className="text-sm font-bold text-gray-900">Co-Benefit Milestones</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Tie achievements strictly to tangible personal incentives (gas money saved, stress reduced, hours of sleep claimed) instead of pure atmospheric science or guilt.
                </p>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-4 space-y-2 text-[11px]">
                <div className="text-emerald-800"><strong className="font-extrabold text-[#0D9488]">PRO:</strong> Extremely motivating; speaks directly to daily personal needs.</div>
                <div className="text-rose-800"><strong className="font-extrabold text-rose-700">CON:</strong> Valuation metrics vary by region and socioeconomic status.</div>
              </div>
            </div>

            {/* Mechanism 3 */}
            <div className="p-4 rounded-xl border border-gray-150 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-rose-600 uppercase block mb-1">Mechanism 3</span>
                <h4 className="text-sm font-bold text-gray-900">Non-Competitive Collective Hub</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Avoid leaderboard shaming where users compete on who has the lowest footprint (which promotes privilege bias). Focus instead on community-wide aggregate achievements.
                </p>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-4 space-y-2 text-[11px]">
                <div className="text-emerald-800"><strong className="font-extrabold text-[#0D9488]">PRO:</strong> Supports psychological safety and fosters collective momentum.</div>
                <div className="text-rose-800"><strong className="font-extrabold text-rose-700">CON:</strong> Lacks the intense competitive drive that active gamification fans love.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'metrics' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 rounded-full border border-emerald-100">Product Analytics</span>
              <h3 className="text-base font-bold text-gray-900 mt-2">Core Success Telemetry</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We define success through habit adoption and genuine, tangible footprints saved, not through vanity pageviews or clicks.
              </p>
            </div>
            
            {/* Interactive sliders simulating diagnostic dashboards */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl w-full md:w-[260px] space-y-3 shrink-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Live Dashboard Simulation</span>
              
              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                  <span>Nudge Commit Rate</span>
                  <span className="font-bold text-emerald-700">{nudgeCommitLimit}%</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="90" 
                  value={nudgeCommitLimit}
                  onChange={(e) => setNudgeCommitLimit(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                  <span>90-Day Retention</span>
                  <span className="font-bold text-emerald-700">{retentionLimit}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="80" 
                  value={retentionLimit}
                  onChange={(e) => setRetentionLimit(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="p-3 bg-white rounded-lg border border-gray-150 text-xs shadow-sm flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-900 block">1. Nudge Action Commitment Rate</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Ratio of total daily nudge impressions that translate directly into active commitments.</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded font-bold text-slate-800">Target: &gt;45%</span>
                <span className="text-[10px] text-emerald-700 font-medium block mt-1">Current Sim: {nudgeCommitLimit}%</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-150 text-xs shadow-sm flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-900 block">2. Average annual footprint reduction at 90 days</span>
                <p className="text-[11px] text-gray-500 mt-0.5">The average personal carbon saving per user. Measured through lifestyle cohort audits at month 3.</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded font-bold text-slate-800">Target: -1.5 t CO₂e</span>
                <span className="text-[10px] text-gray-400 block mt-1">Estimations validated</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-150 text-xs shadow-sm flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-900 block">3. 90-Day Habit Retention Rate</span>
                <p className="text-[11px] text-gray-500 mt-0.5">The percentage of onboarded users who still interactively commit to 2+ lifestyle nudges per week after 90 days.</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded font-bold text-slate-800">Target: &gt;35%</span>
                <span className="text-[10px] text-emerald-700 font-medium block mt-1">Current Sim: {retentionLimit}%</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-150 text-xs shadow-sm flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-900 block">4. Co-Benefit Realization Multiplier</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Measures real dollar/resource returns earned back by active households, boosting user motivation.</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded font-bold text-slate-800">Target: &gt;$60/yr</span>
                <span className="text-[10px] text-gray-400 block mt-1">Strong correlation</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'factors' && (
        <div className="space-y-4 text-xs text-gray-600">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 rounded-full border border-emerald-100">IPCC & EPA Standards</span>
            <h3 className="text-sm font-bold text-gray-900 mt-2">Public Emissions Models & Calculation Factors</h3>
            <p className="mt-1 leading-relaxed text-slate-500">
              Our emissions modeling avoids simulated guess-work. We employ standard, public-facing carbon coefficients sourced directly from regional regulatory bodies (IPCC, US Environmental Protection Agency (EPA), and UK Department for Environment, Food & Rural Affairs (DEFRA)).
            </p>
          </div>

          <table className="min-w-full divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden mt-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Input Signal Category</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Standard Coefficient Value</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Primary Source Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-2.5 font-semibold text-gray-900">1 gal Lead-Free Gasoline</td>
                <td className="px-4 py-2.5 font-mono text-emerald-700">8.89 kg CO₂e / gallon</td>
                <td className="px-4 py-2.5 text-gray-400">EPA Greenhouse Emission Hub</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-gray-900">1 kWh General Power Grid</td>
                <td className="px-4 py-2.5 font-mono text-emerald-700">0.37 kg CO₂e / kWh</td>
                <td className="px-4 py-2.5 text-gray-400">EPA eGRID regional mix</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-gray-900">Beef Meat (Supply Chain)</td>
                <td className="px-4 py-2.5 font-mono text-emerald-700">27.00 kg CO₂e / kg meat</td>
                <td className="px-4 py-2.5 text-gray-400">IPCC AFOLU report</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-gray-900">Air Travel Short-Haul Passenger</td>
                <td className="px-4 py-2.5 font-mono text-emerald-700">0.15 kg CO₂e / passenger-mile</td>
                <td className="px-4 py-2.5 text-gray-400">UK DEFRA Aviation Index</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-gray-900">Urban Subway Train (Transit)</td>
                <td className="px-4 py-2.5 font-mono text-emerald-700">0.03 kg CO₂e / passenger-mile</td>
                <td className="px-4 py-2.5 text-gray-400">US National Transit database</td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-[10px] text-gray-400 leading-normal">
              <strong>Open and Audit-Ready:</strong> Calculations are computed locally on device, preserving user privacy without cloud leakages. This methodology handles typical smartphone configurations safely without third-party web trackers.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
