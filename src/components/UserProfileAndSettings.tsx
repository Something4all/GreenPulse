import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  History, 
  LogIn, 
  Moon, 
  Sun, 
  Laptop, 
  X, 
  Check, 
  ShieldCheck, 
  Flame, 
  Award, 
  Search, 
  Filter, 
  Chrome, 
  Calendar,
  Smartphone,
  Navigation,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { CommitLog, PassiveSignal } from '../types';

export interface LoginRecord {
  id: string;
  timestamp: Date;
  browser: string;
  device: string;
  location: string;
  ip: string;
}

export interface ActivityRecord {
  id: string;
  timestamp: Date;
  action: string;
  type: 'auth' | 'quiz' | 'nudge' | 'simulation' | 'settings';
  details?: string;
}

interface UserProfileAndSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string; preset?: string } | null;
  loginTrack: LoginRecord[];
  activityTrack: ActivityRecord[];
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  streak: number;
  totalSavedKg: number;
  onRetakeQuiz: () => void;
  initialTab?: 'overview' | 'login' | 'activity' | 'settings';
}

export default function UserProfileAndSettings({
  isOpen,
  onClose,
  currentUser,
  loginTrack,
  activityTrack,
  darkMode,
  setDarkMode,
  streak,
  totalSavedKg,
  onRetakeQuiz,
  initialTab
}: UserProfileAndSettingsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'login' | 'activity' | 'settings'>('overview');
  const [loginSearch, setLoginSearch] = useState('');
  const [activityFilter, setActivityFilter] = useState<string>('all');

  // Sync tab when opening from external triggers
  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Filter Logins
  const filteredLogins = React.useMemo(() => {
    return loginTrack.filter(log => 
      log.location.toLowerCase().includes(loginSearch.toLowerCase()) ||
      log.browser.toLowerCase().includes(loginSearch.toLowerCase()) ||
      log.device.toLowerCase().includes(loginSearch.toLowerCase())
    );
  }, [loginTrack, loginSearch]);

  // Filter Activities
  const filteredActivities = React.useMemo(() => {
    return activityTrack.filter(act => 
      activityFilter === 'all' ? true : act.type === activityFilter
    );
  }, [activityTrack, activityFilter]);

  if (!isOpen || !currentUser) return null;

  // Render Preset Badge Emoji
  const getAvatarEmoji = () => {
    switch (currentUser.preset) {
      case 'jane': return '🥑';
      case 'carlos': return '🚗';
      case 'anya': return '🚲';
      default: return '👤';
    }
  };

  const getPresetDescription = () => {
    switch (currentUser.preset) {
      case 'jane': return 'Urban Executive • High travel & energy budget, focusing on high-impact busy lifestyle adjustments.';
      case 'carlos': return 'Family Steward • Balancing utility savings, transportation alternatives, and family-friendly home routines.';
      case 'anya': return 'Eco Student • Maintain lowest baseline, focusing on vegetarian/vegan diets, public transit, and repair projects.';
      default: return 'General GreenPulse Citizen • Tracking custom personal carbon footprint reductions.';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm dark:bg-black/60"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden relative z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-brand-border dark:border-zinc-800 flex items-center justify-between bg-brand-extralight/30 dark:bg-zinc-950/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-light dark:bg-zinc-800 flex items-center justify-center text-xl font-bold ring-2 ring-brand-green/30 dark:ring-emerald-500/30">
                {getAvatarEmoji()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-brand-dark dark:text-zinc-100 flex items-center gap-2">
                  {currentUser.name}
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-light dark:bg-zinc-800 text-brand-green dark:text-brand-accent border border-brand-green/20">
                    {currentUser.preset ? `Preset: ${currentUser.preset.toUpperCase()}` : 'Custom Profile'}
                  </span>
                </h2>
                <p className="text-xs text-brand-subtle dark:text-zinc-400">{currentUser.email}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-brand-light dark:hover:bg-zinc-800 rounded-full text-brand-muted dark:text-zinc-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Tab Controls */}
          <div className="flex border-b border-brand-border dark:border-zinc-800 overflow-x-auto bg-brand-bg/50 dark:bg-zinc-900/50 px-4" role="tablist" aria-label="Profile Sections">
            <button
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                activeTab === 'overview'
                  ? 'border-brand-green text-brand-green dark:border-emerald-500 dark:text-emerald-400 font-extrabold'
                  : 'border-transparent text-brand-subtle dark:text-zinc-400 hover:text-brand-green dark:hover:text-emerald-400'
              }`}
            >
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              Overview & Badges
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'login'}
              onClick={() => setActiveTab('login')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                activeTab === 'login'
                  ? 'border-brand-green text-brand-green dark:border-emerald-500 dark:text-emerald-400 font-extrabold'
                  : 'border-transparent text-brand-subtle dark:text-zinc-400 hover:text-brand-green dark:hover:text-emerald-400'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
              Login Track
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'activity'}
              onClick={() => setActiveTab('activity')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                activeTab === 'activity'
                  ? 'border-brand-green text-brand-green dark:border-emerald-500 dark:text-emerald-400 font-extrabold'
                  : 'border-transparent text-brand-subtle dark:text-zinc-400 hover:text-brand-green dark:hover:text-emerald-400'
              }`}
            >
              <History className="w-3.5 h-3.5" aria-hidden="true" />
              Activity Track
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                activeTab === 'settings'
                  ? 'border-brand-green text-brand-green dark:border-emerald-500 dark:text-emerald-400 font-extrabold'
                  : 'border-transparent text-brand-subtle dark:text-zinc-400 hover:text-brand-green dark:hover:text-emerald-400'
              }`}
            >
              <Settings className="w-3.5 h-3.5" aria-hidden="true" />
              Settings
            </button>
          </div>

          {/* Modal Body / Tab Content */}
          <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-zinc-900" role="tabpanel">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Motivation Box */}
                <div className="bg-brand-extralight/40 dark:bg-zinc-950/30 border border-brand-border/80 dark:border-zinc-800 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold text-brand-dark dark:text-zinc-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" />
                    Resident Demographics & Goals
                  </h4>
                  <p className="text-xs text-brand-muted dark:text-zinc-300 italic">
                    "{getPresetDescription()}"
                  </p>
                </div>

                {/* Main Action Analytics Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-light/30 dark:bg-zinc-950/20 border border-brand-border/60 dark:border-zinc-800/80 p-4 rounded-xl flex items-center gap-3">
                    <div className="p-2.5 bg-brand-light dark:bg-zinc-800 rounded-lg text-brand-orange">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-subtle dark:text-zinc-400 block font-semibold uppercase tracking-wider">Active Streak</span>
                      <span className="text-lg font-black text-brand-dark dark:text-zinc-100">{streak} days</span>
                    </div>
                  </div>

                  <div className="bg-brand-light/30 dark:bg-zinc-950/20 border border-brand-border/60 dark:border-zinc-800/80 p-4 rounded-xl flex items-center gap-3">
                    <div className="p-2.5 bg-brand-light dark:bg-zinc-800 rounded-lg text-brand-green dark:text-emerald-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-subtle dark:text-zinc-400 block font-semibold uppercase tracking-wider">Total CO₂ Saved</span>
                      <span className="text-lg font-black text-brand-dark dark:text-zinc-100">{totalSavedKg.toFixed(1)} kg</span>
                    </div>
                  </div>
                </div>

                {/* Badges and Milestones Unlocked */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-300 mb-3 block">
                    Citizen Footprint Status & Milestones
                  </h3>
                  <div className="space-y-3">
                    {/* Badge 1 */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-brand-border/50 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50">
                      <div className="w-9 h-9 rounded-full bg-brand-light dark:bg-zinc-800 text-brand-green dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                        🌱
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-brand-dark dark:text-zinc-200">First-Commit Savior</h4>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">UNLOCKED</span>
                        </div>
                        <p className="text-[10px] text-brand-muted dark:text-zinc-400 leading-normal">
                          Granted upon taking your first behavioral nudge challenge to reduce direct footprint output.
                        </p>
                      </div>
                    </div>

                    {/* Badge 2 */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-brand-border/50 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50">
                      <div className="w-9 h-9 rounded-full bg-brand-light dark:bg-zinc-800 text-brand-green dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                        🔥
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-brand-dark dark:text-zinc-200">Streak-Hero Status</h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                            streak >= 3
                              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500/20'
                              : 'text-brand-subtle dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 border-zinc-200'
                          }`}>
                            {streak >= 3 ? 'UNLOCKED' : `${streak}/3 DAYS`}
                          </span>
                        </div>
                        <p className="text-[10px] text-brand-muted dark:text-zinc-400 leading-normal">
                          Maintain a 3-day streak of committing to sustainable activities.
                        </p>
                      </div>
                    </div>

                    {/* Badge 3 */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-brand-border/50 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50">
                      <div className="w-9 h-9 rounded-full bg-brand-light dark:bg-zinc-800 text-brand-green dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                        🛡️
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-brand-dark dark:text-zinc-200">Carbon Avenger</h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                            totalSavedKg >= 10
                              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500/20'
                              : 'text-brand-subtle dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 border-zinc-200'
                          }`}>
                            {totalSavedKg >= 10 ? 'UNLOCKED' : `${totalSavedKg.toFixed(0)}/10 KG`}
                          </span>
                        </div>
                        <p className="text-[10px] text-brand-muted dark:text-zinc-400 leading-normal">
                          Accumulate more than 10.0 kilograms of absolute verified offset savings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retake baseline quiz promoter */}
                <div className="bg-brand-dark/5 dark:bg-zinc-800/40 p-4 rounded-xl flex items-center justify-between border border-brand-border/40 dark:border-zinc-800">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-brand-dark dark:text-zinc-200 block">Evaluate Footprint Emissions</span>
                    <p className="text-[10px] text-brand-muted dark:text-zinc-400">Establish a fresh, highly accurate annual carbon footprint baseline rating.</p>
                  </div>
                  <button
                    onClick={() => {
                      onRetakeQuiz();
                      onClose();
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold bg-brand-green text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg hover:bg-brand-green/90 transition-all shadow cursor-pointer uppercase tracking-wider"
                  >
                    Quick Quiz
                  </button>
                </div>
              </div>
            )}

            {/* TAB: LOGIN TRACK */}
            {activeTab === 'login' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-light/30 dark:bg-zinc-950/40 border border-brand-border/50 dark:border-zinc-800">
                  <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0" />
                  <span className="text-[11px] text-brand-muted dark:text-zinc-300 leading-normal">
                    This login sequence measures secure user onboarding patterns. No tracking data is sent to external cloud nodes. Evaluated completely on-device.
                  </span>
                </div>

                {/* Searchbar wrapper */}
                <div className="relative">
                  <Search className="w-4 h-4 text-brand-subtle dark:text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={loginSearch}
                    onChange={(e) => setLoginSearch(e.target.value)}
                    placeholder="Search logins by city, device, browser, etc..."
                    className="w-full text-xs pl-9 pr-4 py-2 bg-brand-bg dark:bg-zinc-950 text-brand-dark dark:text-zinc-200 rounded-xl border border-brand-border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
                  />
                </div>

                {/* Log list */}
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {filteredLogins.length > 0 ? (
                    filteredLogins.map((entry) => (
                      <div 
                        key={entry.id} 
                        className="p-3 bg-white dark:bg-zinc-950 border border-brand-border/60 dark:border-zinc-800/80 rounded-xl flex items-center justify-between hover:border-brand-green/40 dark:hover:border-emerald-500/50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-light dark:bg-zinc-850 text-brand-green dark:text-emerald-400 flex items-center justify-center shrink-0">
                            {entry.device.toLowerCase().includes('phone') ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <Laptop className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-brand-dark dark:text-zinc-100">{entry.location}</span>
                              <span className="text-[9px] text-brand-muted dark:text-zinc-400 border border-brand-border dark:border-zinc-800 rounded px-1">{entry.ip}</span>
                            </div>
                            <span className="text-[9px] text-brand-muted dark:text-zinc-500 font-mono block mt-0.5">{entry.browser} • {entry.device}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-brand-dark dark:text-zinc-200 font-bold block">
                            {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-[8px] text-brand-muted dark:text-zinc-550 block font-semibold uppercase tracking-wider mt-0.5">
                            {new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <span className="text-xs text-brand-muted dark:text-zinc-400 italic">No matched login records.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: ACTIVITY TRACK */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                {/* Filter chip bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-brand-muted dark:text-zinc-400 shrink-0">
                    <Filter className="w-3 h-3 text-brand-green" />
                    <span>Filter:</span>
                  </div>
                  {['all', 'auth', 'quiz', 'nudge', 'simulation', 'settings'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActivityFilter(type)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                        activityFilter === type
                          ? 'bg-brand-green text-white dark:bg-emerald-600 dark:text-white font-extrabold shadow-sm'
                          : 'bg-brand-bg text-brand-muted dark:bg-zinc-800 dark:text-zinc-400 hover:text-brand-dark'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Sequence timeline */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((act) => (
                      <div 
                        key={act.id}
                        className="p-3 bg-white dark:bg-zinc-950 border border-brand-border/50 dark:border-zinc-800/80 rounded-xl relative overflow-hidden group hover:border-brand-green/30"
                      >
                        {/* Categorized colored sidebar indicator */}
                        <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                          act.type === 'auth' ? 'bg-indigo-500' :
                          act.type === 'quiz' ? 'bg-brand-green' :
                          act.type === 'nudge' ? 'bg-emerald-500' :
                          act.type === 'simulation' ? 'bg-brand-orange' :
                          'bg-zinc-400'
                        }`} />

                        <div className="pl-2 flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-brand-dark dark:text-zinc-200">{act.action}</span>
                              <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 select-none tracking-wider rounded ${
                                act.type === 'auth' ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 border border-indigo-400/25' :
                                act.type === 'quiz' ? 'text-brand-green bg-brand-light dark:text-brand-accent dark:bg-emerald-950/40 border border-emerald-400/25' :
                                act.type === 'nudge' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 border border-emerald-500/25' :
                                act.type === 'simulation' ? 'text-brand-orange bg-orange-50 dark:text-orange-400 dark:bg-orange-950/40 border border-orange-400/25' :
                                'text-zinc-500 bg-zinc-100 dark:text-zinc-300 dark:bg-zinc-800 border border-zinc-500/25'
                              }`}>
                                {act.type}
                              </span>
                            </div>
                            {act.details && (
                              <p className="text-[10px] text-brand-subtle dark:text-zinc-400 font-sans tracking-wide leading-normal">
                                {act.details}
                              </p>
                            )}
                          </div>

                          <span className="text-[9px] text-brand-muted dark:text-zinc-500 font-medium shrink-0 font-mono text-right">
                            {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <span className="text-xs text-brand-muted dark:text-zinc-400 italic">No matched logged activities.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-300 mb-4 block">
                    Visual Layout & Color Themes
                  </h3>

                  <div className="space-y-4">
                    {/* Darkmode Toggle Row */}
                    <div className="flex items-center justify-between p-4 bg-brand-bg dark:bg-zinc-950 rounded-2xl border border-brand-border/60 dark:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-zinc-800 rounded-xl text-brand-green dark:text-brand-accent border border-brand-border dark:border-zinc-700 shadow-sm">
                          {darkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-dark dark:text-zinc-100 block">Editorial Dark Mode</span>
                          <span className="text-[10px] text-brand-muted dark:text-zinc-400 block mt-0.5">Adjust contrast and ambient shades for screen-friendly browsing.</span>
                        </div>
                      </div>

                      {/* Cool Visual Switch Slider for Darkmode */}
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer ${
                          darkMode ? 'bg-brand-green' : 'bg-zinc-300'
                        }`}
                        aria-label="Toggle Dark Mode"
                      >
                        <motion.div
                          layout
                          className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center text-[8px]"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          {darkMode ? <Check className="w-2.5 h-2.5 text-brand-green" /> : <X className="w-2.5 h-2.5 text-zinc-400" />}
                        </motion.div>
                      </button>
                    </div>

                    {/* Passive notifications mock setting */}
                    <div className="flex items-center justify-between p-4 bg-brand-bg dark:bg-zinc-950 rounded-2xl border border-brand-border/60 dark:border-zinc-800 opacity-80">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-zinc-800 rounded-xl text-brand-green dark:text-brand-accent border border-brand-border dark:border-zinc-700 shadow-sm">
                          <Laptop className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-dark dark:text-zinc-100 block">Auto-Sync Presets</span>
                          <span className="text-[10px] text-brand-muted dark:text-zinc-400 block mt-0.5">Prefill daily logs automatically with simulated passive signals.</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-brand-green bg-brand-light border border-brand-green/20 dark:bg-emerald-950/50 dark:text-brand-accent px-2.5 py-1 rounded-lg">
                        AUTO-ENABLED
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-300 mb-3 block">
                    Security & Sandbox Keys
                  </h3>
                  <div className="p-4 rounded-xl border border-dashed border-brand-border dark:border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                      <span className="text-[10px] text-brand-dark dark:text-zinc-200 font-extrabold uppercase tracking-wide">Client-Side Sandbox Integrity</span>
                    </div>
                    <p className="text-[10px] text-brand-muted dark:text-zinc-400 leading-relaxed font-sans">
                      All calculations are powered entirely locally in React state buffers. No tracking cookies are injected, keeping your footprint logs private and sandbox keys offline.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer block */}
          <div className="p-4 border-t border-brand-border dark:border-zinc-800 flex items-center justify-between text-[10px] font-bold text-brand-subtle dark:text-zinc-500 uppercase tracking-widest bg-brand-extralight/10 dark:bg-zinc-950/20">
            <span>Identity Offline-First</span>
            <span>Version 1.0.8 • GreenPulse</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
