import { useState, useCallback, useMemo } from 'react';
import { PassiveSignal } from '../types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  TrendingDown, 
  Info,
  DollarSign,
  Activity,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';

interface PassiveSignalSimulatorProps {
  onAddSignal: (signal: PassiveSignal) => void;
  sandboxSignals: PassiveSignal[];
  onClearSandbox: () => void;
}

// Realistic raw public parameters and uncertainty logic based on EPA/IPCC & UK DEFRA spend-based modeling
const presets = [
  {
    id: 'gas-pump',
    source: 'transaction' as const,
    label: 'Swipe at Shell Gas Station',
    value: '$45.00',
    estimatedCo2: 37.8, // Low uncertainty because fuel prices correlate directly with gallons burned
    uncertainty: 'Low' as const,
    uncertaintyExplanation: 'Fuel price maps directly to specific gallons burned (approx. 8.8 kg CO₂ per gallon of E10 pump gas). Highly accurate calculation.',
    coefficient: '0.84 kg CO₂ per $1 spent'
  },
  {
    id: 'fast-food',
    source: 'transaction' as const,
    label: 'Purchase at Burger Joint',
    value: '$18.50',
    estimatedCo2: 12.6, 
    uncertainty: 'High' as const,
    uncertaintyExplanation: 'Highly uncertain. Transaction cost does not tell us if you bought local lettuce/veggies or high-impact imported grain-fed beef burgers.',
    coefficient: '0.68 kg CO₂ per $1 spent (beef-weight weighted estimate)'
  },
  {
    id: 'local-metro',
    source: 'transaction' as const,
    label: 'Metro Transit Farecard Tap',
    value: '$2.75',
    estimatedCo2: 0.3,
    uncertainty: 'Low' as const,
    uncertaintyExplanation: 'Transit tickets denote a single journey. Mass transit carbon coefficient per passenger-mile is stable and highly optimized.',
    coefficient: '0.11 kg CO₂ per shared fare swipe'
  },
  {
    id: 'fast-fashion',
    source: 'transaction' as const,
    label: 'Order at Online Fashion Retailer',
    value: '$65.00',
    estimatedCo2: 52.0,
    uncertainty: 'High' as const,
    uncertaintyExplanation: 'Very high uncertainty. Price index does not indicate structural fabric material (organic linen vs petroleum-derived polyester) or supply chain origins.',
    coefficient: '0.80 kg CO₂ per $1 spent based on textiles'
  },
  {
    id: 'electric-bill',
    source: 'transaction' as const,
    label: 'Monthly Regional Electric Bill',
    value: '$110.00',
    estimatedCo2: 125.0,
    uncertainty: 'Medium' as const,
    uncertaintyExplanation: 'Spend approximates kWh consumed, but fluctuates depending on peak rate tariffs and your regional utility grid supply fuel mixture (coal vs hydro).',
    coefficient: '1.14 kg CO₂ per $1 base tariff billing'
  },
  {
    id: 'steps-active',
    source: 'device' as const,
    label: 'Active transport logged (Walking)',
    value: '5,000 steps',
    estimatedCo2: -1.2, // Avoided emissions by not driving
    uncertainty: 'Low' as const,
    uncertaintyExplanation: 'Health Kit logs motion directly. High structural accuracy since human physical locomotion does not use secondary fossil resources.',
    coefficient: '-0.24 kg CO₂ per km relative to light vehicle drive averages'
  },
  {
    id: 'flight-booking',
    source: 'transaction' as const,
    label: 'Airlines Flight Booking Swipe',
    value: '$280.00',
    estimatedCo2: 320.0,
    uncertainty: 'Medium' as const,
    uncertaintyExplanation: 'Aircraft flight duration and fuel flow rate depend on flight distance, airplane cargo weight, and fuel load, not strictly premium/economy ticket dollar amount.',
    coefficient: '1.14 kg CO₂ per standard air ticket dollar'
  }
];

export default function PassiveSignalSimulator({ onAddSignal, sandboxSignals, onClearSandbox }: PassiveSignalSimulatorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('all');

  const handleSimulate = useCallback((presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      const newSignal: PassiveSignal = {
        id: Math.random().toString(36).substr(2, 9),
        source: preset.source,
        timestamp: new Date(),
        label: preset.label,
        value: preset.value,
        estimatedCo2: preset.estimatedCo2,
        uncertainty: preset.uncertainty,
        uncertaintyExplanation: preset.uncertaintyExplanation
      };
      onAddSignal(newSignal);
    }
  }, [onAddSignal]);

  const filteredPresets = useMemo(() => {
    return selectedPreset === 'all' 
      ? presets 
      : presets.filter(p => p.source === selectedPreset);
  }, [selectedPreset]);

  const totalSimulatedSavings = useMemo(() => {
    return sandboxSignals.reduce((acc, curr) => acc + curr.estimatedCo2, 0);
  }, [sandboxSignals]);

  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-border pb-5 gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-green bg-brand-light px-2.5 py-1 rounded-full border border-brand-border mb-2 inline-block">
            Data Model & Passive Integration
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
            Privacy-Safe Passive Signal Estimator
          </h2>
          <p className="text-xs text-brand-muted mt-1">
            How does GreenPulse approximate emissions without manual daily chores or linking live personal accounts? Test presets below.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 text-xs text-brand-green bg-brand-light border border-brand-border px-3 py-1.5 rounded-lg font-bold">
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <span className="font-bold">Local Sandbox Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Sandbox explanation & trigger panel */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-brand-light/30 p-4 rounded-xl border border-brand-border">
            <h3 className="text-[10px] font-bold uppercase text-brand-muted tracking-wider mb-2">Theoretical Principle</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We leverage **locally cached on-device metadata** to analyze lifestyle events. GreenPulse categorizes merchant descriptors and health buffers, translating them directly using public coefficient factors.
            </p>
            <div className="mt-3 flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-brand-border">
              <AlertTriangle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <div className="text-[10px] text-brand-subtle leading-normal">
                <span className="font-bold text-brand-dark">Accuracy Notice: </span>
                Large spend categories (such as fast fashion & dining) present <strong>high uncertainty</strong> (e.g. they lack itemized ingredient details). GreenPulse flags this to avoid false confidence.
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wider">Simulate Passive Feed</label>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => setSelectedPreset('all')} 
                  className={`px-2.5 py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${selectedPreset === 'all' ? 'bg-brand-green text-white' : 'bg-white border border-brand-border text-brand-muted hover:text-brand-dark'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setSelectedPreset('transaction')} 
                  className={`px-2.5 py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${selectedPreset === 'transaction' ? 'bg-brand-green text-white' : 'bg-white border border-brand-border text-brand-muted hover:text-brand-dark'}`}
                >
                  Spend
                </button>
                <button 
                  onClick={() => setSelectedPreset('device')} 
                  className={`px-2.5 py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${selectedPreset === 'device' ? 'bg-brand-green text-white' : 'bg-white border border-brand-border text-brand-muted hover:text-brand-dark'}`}
                >
                  HealthKit
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {filteredPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSimulate(preset.id)}
                  id={`preset-${preset.id}`}
                  className="w-full text-left p-2.5 rounded-lg border border-brand-border bg-white hover:border-brand-green hover:bg-brand-extralight transition-all flex justify-between items-center group cursor-pointer shadow-sm"
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${preset.source === 'transaction' ? 'bg-brand-orange animate-pulse' : 'bg-brand-accent'}`} />
                      <span className="font-bold text-xs text-brand-dark group-hover:text-brand-green transition-colors">
                        {preset.label}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-1 text-[10px] text-brand-muted">
                      <span>Value: <strong className="text-brand-dark">{preset.value}</strong></span>
                      <span>•</span>
                      <span>Factor: <strong className="text-brand-dark">{preset.coefficient}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      preset.uncertainty === 'Low' ? 'bg-brand-light text-brand-green border border-brand-border' :
                      preset.uncertainty === 'Medium' ? 'bg-brand-light text-brand-orange border border-brand-border/40' :
                      'bg-brand-dark text-white'
                    }`}>
                      {preset.uncertainty} Error
                    </span>
                    <span className="bg-brand-light text-brand-green p-1.5 rounded-md group-hover:bg-brand-green group-hover:text-white transition-all">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display results list & uncertainty flag readout */}
        <div className="lg:col-span-12 xl:col-span-7 bg-brand-light/20 rounded-xl border border-brand-border p-5 flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex justify-between items-center border-b border-brand-border pb-3 mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-brand-green" />
                <span>Simulated Micro-Savings Feed</span>
              </h3>
              {sandboxSignals.length > 0 && (
                <button 
                  onClick={onClearSandbox}
                  id="btn-clear-sandbox"
                  className="text-[10px] font-bold text-brand-orange hover:text-brand-dark cursor-pointer uppercase tracking-wider"
                >
                  Clear Sandbox
                </button>
              )}
            </div>

            {sandboxSignals.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center justify-center text-brand-subtle">
                <HelpCircle className="w-10 h-10 text-brand-muted stroke-[1.5] mb-23 animate-pulse" />
                <p className="text-xs font-bold text-brand-dark">No simulated signals in feed yet.</p>
                <p className="text-[10px] text-brand-muted mt-1.5 max-w-xs leading-normal">
                  Click any of the on-device presets on the left side to add them to your localized passive data pipeline!
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[230px] overflow-y-auto pr-1">
                {sandboxSignals.map((sig) => (
                  <div 
                    key={sig.id}
                    className="p-3 bg-white rounded-lg border border-brand-border shadow-sm text-xs flex justify-between items-start gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-dark">{sig.label}</span>
                        <span className="bg-brand-light/60 text-brand-green px-1.5 py-0.2 rounded font-black text-[10px] border border-brand-border/40">
                          {sig.value}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-1.5 mt-2 bg-brand-extralight p-2 rounded border border-brand-border text-[10px] text-brand-muted leading-relaxed">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold shrink-0 ${
                          sig.uncertainty === 'Low' ? 'bg-brand-light text-brand-green border border-brand-border' :
                          sig.uncertainty === 'Medium' ? 'bg-brand-extralight text-brand-orange border border-brand-orange/20' :
                          'bg-brand-dark text-white'
                        }`}>
                          {sig.uncertainty} Uncertainty
                        </span>
                        <span>{sig.uncertaintyExplanation}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`font-semibold text-xs ${sig.estimatedCo2 > 0 ? 'text-brand-orange' : 'text-brand-green font-bold'}`}>
                        {sig.estimatedCo2 > 0 ? `+${sig.estimatedCo2}` : sig.estimatedCo2} kg
                      </span>
                      <span className="text-[9px] text-brand-subtle block font-medium">CO₂e</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-brand-border pt-4 mt-4 flex items-center justify-between text-xs font-bold text-brand-dark">
            <div>
              <span>Simulated Accumulated CO₂ Impact:</span>
              <p className="text-[10px] text-brand-subtle font-normal">Based on local model aggregates</p>
            </div>
            <span className={`text-base font-black px-3 py-1 rounded border border-brand-border/30 ${totalSimulatedSavings > 0 ? 'bg-white text-brand-orange' : 'bg-brand-green text-white'}`}>
              {totalSimulatedSavings.toFixed(1)} kg CO₂
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
