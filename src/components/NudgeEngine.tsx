import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { dailyNudges } from '../data/nudges';
import { Nudge, CommitLog } from '../types';
import { 
  DollarSign, 
  Heart, 
  Clock, 
  Compass, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Info,
  Car,
  Utensils,
  Home,
  ShoppingBag,
  Plane
} from 'lucide-react';

interface NudgeEngineProps {
  onCommit: (nudge: Nudge) => void;
  recentCommits: CommitLog[];
}

export default function NudgeEngine({ onCommit, recentCommits }: NudgeEngineProps) {
  const [currentNudgeIndex, setCurrentNudgeIndex] = useState(0);
  const [committedToday, setCommittedToday] = useState(false);
  const [activeTab, setActiveTab] = useState<'nudges' | 'history'>('nudges');

  const currentNudge = dailyNudges[currentNudgeIndex];

  const handleNextNudge = useCallback(() => {
    setCurrentNudgeIndex((prevIndex) => (prevIndex + 1) % dailyNudges.length);
  }, []);

  const handleCommit = useCallback(() => {
    onCommit(currentNudge);
    setCommittedToday(true);
    setTimeout(() => {
      setCommittedToday(false);
      // Automatically cycle to the next option after committing to keep things fresh
      handleNextNudge();
    }, 2800);
  }, [currentNudge, onCommit, handleNextNudge]);

  const getCoBenefitIcon = (type: string) => {
    switch (type) {
      case 'money':
        return <div className="p-2.5 bg-brand-light text-brand-orange rounded-lg" aria-hidden="true"><DollarSign className="w-5 h-5" /></div>;
      case 'health':
        return <div className="p-2.5 bg-brand-light text-brand-green rounded-lg" aria-hidden="true"><Heart className="w-5 h-5" /></div>;
      case 'time':
        return <div className="p-2.5 bg-brand-light text-brand-dark rounded-lg" aria-hidden="true"><Clock className="w-5 h-5" /></div>;
      case 'mindfulness':
        return <div className="p-2.5 bg-brand-light text-brand-green rounded-lg" aria-hidden="true"><Compass className="w-5 h-5" /></div>;
      default:
        return <div className="p-2.5 bg-brand-light text-brand-muted rounded-lg" aria-hidden="true"><Info className="w-5 h-5" /></div>;
    }
  };

  const getCoBenefitTheme = (type: string) => {
    switch (type) {
      case 'money': return 'bg-brand-extralight border-brand-orange/30 text-brand-dark';
      case 'health': return 'bg-brand-extralight border-brand-green/30 text-brand-dark';
      case 'time': return 'bg-brand-extralight border-brand-border text-brand-dark';
      case 'mindfulness': return 'bg-brand-extralight border-brand-green/30 text-brand-dark';
      default: return 'bg-brand-extralight border-brand-border text-brand-dark';
    }
  };

  const getCategoryIcon = (category: string) => {
    const classStyle = "w-5 h-5";
    switch (category) {
      case 'commute': return <Car className={classStyle} aria-hidden="true" />;
      case 'diet': return <Utensils className={classStyle} aria-hidden="true" />;
      case 'home': return <Home className={classStyle} aria-hidden="true" />;
      case 'shopping': return <ShoppingBag className={classStyle} aria-hidden="true" />;
      case 'travel': return <Plane className={classStyle} aria-hidden="true" />;
      default: return <Sparkles className={classStyle} aria-hidden="true" />;
    }
  };

  return (
    <section aria-labelledby="nudge-engine-title" className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden flex flex-col h-full">
      <h2 id="nudge-engine-title" className="sr-only">Nudge Engine Options</h2>
      {/* Tabs Menu */}
      <div className="flex border-b border-brand-border bg-brand-light/70 p-1.5 animate-fade-in" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'nudges'}
          onClick={() => setActiveTab('nudges')}
          id="nudge-tab-action"
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
            activeTab === 'nudges' 
              ? 'bg-white text-brand-dark shadow-sm border border-brand-border/50' 
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          Daily Action Engine
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'history'}
          onClick={() => setActiveTab('history')}
          id="nudge-tab-history"
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
            activeTab === 'history' 
              ? 'bg-white text-brand-dark shadow-sm border border-brand-border/50' 
              : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          Commitment Log ({recentCommits.length})
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between" role="tabpanel">
        {activeTab === 'nudges' ? (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Card Header information */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-brand-green bg-brand-light border border-brand-border uppercase tracking-wide">
                  {getCategoryIcon(currentNudge.category)}
                  <span>{currentNudge.category}</span>
                </span>
                <span className={`text-[10px] px-2.5 py-1 rounded-full border uppercase font-bold tracking-wider ${
                  currentNudge.intensity === 'easy' ? 'bg-brand-light border-brand-border text-brand-green' :
                  currentNudge.intensity === 'medium' ? 'bg-brand-extralight border-brand-orange/35 text-brand-orange' :
                  'bg-brand-dark border-brand-dark text-white'
                }`}>
                  {currentNudge.intensity} Intensity
                </span>
              </div>

              {/* Nudge title and actions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNudge.id}
                  initial={{ opacity: 0, scale: 0.98, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-dark">
                    {currentNudge.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed sm:text-base">
                    {currentNudge.nudgeText}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div className="bg-brand-green/10 border border-brand-green/20 p-4 rounded-xl">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-brand-green block mb-0.5">Estimated Savings</span>
                      <span className="text-xl sm:text-2xl font-black text-brand-green block">-{currentNudge.co2Savings} kg</span>
                      <span className="text-[10px] text-brand-muted tracking-tight">avoided CO₂ emissions</span>
                    </div>

                    <div className="bg-brand-light/30 border border-brand-border p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-brand-muted block mb-0.5">Benefit Factor</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-xs font-bold text-brand-dark capitalize">{currentNudge.coBenefit.type} Lift</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-brand-subtle block mt-1">Saves you money or stress</span>
                    </div>
                  </div>

                  {/* Co-benefits Display Module (Highly focused on health, money, time) */}
                  <div className={`p-4 rounded-xl border flex items-start gap-4 mt-2 ${getCoBenefitTheme(currentNudge.coBenefit.type)}`}>
                    {getCoBenefitIcon(currentNudge.coBenefit.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[10px] text-brand-subtle uppercase tracking-wider">Tangible Impact</span>
                        <span className="bg-white border border-brand-border px-1.5 py-0.5 rounded text-[10px] font-black text-brand-green">
                          {currentNudge.coBenefit.metric}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-brand-dark mt-1">
                        {currentNudge.coBenefit.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action buttons and feedback */}
            <div className="mt-8 pt-4 border-t border-brand-border">
              {committedToday ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-4 bg-brand-green text-white rounded-xl gap-2 shadow"
                >
                  <CheckCircle2 className="w-8 h-8 text-brand-accent animate-bounce" />
                  <span className="text-base font-bold">Commitment Confirmed!</span>
                  <span className="text-[11px] opacity-90 font-medium">Added to cumulative records & stats</span>
                </motion.div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleCommit}
                    id="btn-commit-nudge"
                    className="flex-1 bg-brand-green hover:bg-brand-dark text-white py-3.5 px-6 rounded-xl font-bold hover:shadow transition-all text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>I will do this today</span>
                  </button>

                  <button
                    onClick={handleNextNudge}
                    id="btn-next-nudge"
                    className="flex-1 bg-white border border-brand-border hover:border-brand-muted text-brand-dark py-3.5 px-6 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Give me another option</span>
                    <ChevronRight className="w-4 h-4 text-brand-green" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-1.5 mt-4 justify-center text-brand-muted">
                <Info className="w-3.5 h-3.5 text-brand-green" />
                <span className="text-[11px] tracking-tight text-center">
                  One realistic commitment per day keeps motivation high and building habits fun.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            {/* Commitment History list */}
            <div>
              <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-brand-green" />
                <span>Your Habit Runway</span>
              </h3>
              
              {recentCommits.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-xl border border-dashed border-brand-border bg-brand-light/30">
                  <p className="text-sm text-brand-dark font-bold">No active commits logged yet.</p>
                  <p className="text-[11px] text-brand-muted mt-1 leading-relaxed max-w-xs mx-auto">Tap `I will do this today` on the adjacent nudge card to see them recorded here!</p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[295px] overflow-y-auto pr-1">
                  {recentCommits.map((commit) => (
                    <div 
                      key={commit.id}
                      className="p-3 rounded-lg border border-brand-border bg-brand-light/40 text-xs flex justify-between items-center"
                    >
                      <div>
                        <p className="font-bold text-brand-dark">{commit.nudgeTitle}</p>
                        <p className="text-[10px] text-brand-subtle font-medium">
                          Logged on {new Date(commit.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-brand-green block">-{commit.co2Saved} kg CO₂</span>
                        <span className="text-[9px] uppercase tracking-wide inline-block text-brand-green bg-white border border-brand-border/60 px-1.5 py-0.5 rounded font-black mt-0.5 text-center">
                          {commit.coBenefitValue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-brand-border pt-4 mt-6">
              <button
                onClick={() => setActiveTab('nudges')}
                className="w-full text-center text-xs font-bold text-brand-green hover:text-brand-dark cursor-pointer"
              >
                ← Back to Daily Nudge Engine
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
