import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LoginPage from './components/LoginPage';
import OnboardingQuiz from './components/OnboardingQuiz';
import NudgeEngine from './components/NudgeEngine';
import PassiveSignalSimulator from './components/PassiveSignalSimulator';
import ProgressUI from './components/ProgressUI';
import TheoryAndMetrics from './components/TheoryAndMetrics';
import AboutMission from './components/AboutMission';
import UserProfileAndSettings from './components/UserProfileAndSettings';
import { useAppStore } from './hooks/useAppStore';
import { 
  Sparkles, 
  Info, 
  RefreshCw, 
  Flame, 
  TrendingDown, 
  LayoutDashboard, 
  Compass, 
  Sliders, 
  TrendingUp, 
  ShieldCheck,
  Award,
  LogOut,
  LogIn,
  UserCheck,
  User,
  Settings,
  History,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';

export default function App() {
  const { state, actions } = useAppStore();
  
  const {
    isLoggedIn, currentUser, isOnboarded, baseline, categoryBreakdown,
    dashboardTab, progress, commits, sandboxSignals, loginTrack, activityTrack,
    darkMode
  } = state;

  const {
    setDashboardTab, setDarkMode, setIsOnboarded,
    handleLogin, handleLogout, handleOnboardingComplete, 
    handleCommitNudge, handleAddSignal, handleClearSandbox, handleReset
  } = actions;

  // Custom dropdown & drawer overlays
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [profileTabRequested, setProfileTabRequested] = useState<'overview' | 'login' | 'activity' | 'settings'>('overview');

  return (
    <div className={`min-h-screen bg-brand-bg text-brand-dark dark:bg-zinc-950 dark:text-zinc-100 font-sans flex flex-col justify-between transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Top Navbar */}
      <header className="bg-white dark:bg-zinc-900 border-b border-brand-border dark:border-zinc-800 py-4 px-8 sticky top-0 z-40 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-green dark:bg-emerald-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-brand-accent dark:bg-emerald-300 rounded-full"></div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-brand-dark dark:text-zinc-100 flex items-center gap-1">
                GreenPulse
              </span>
              <p className="text-[10px] text-brand-subtle dark:text-zinc-400 font-semibold tracking-wider uppercase">Personal Carbon Companion</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn && isOnboarded && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-green dark:text-emerald-400 bg-brand-light dark:bg-zinc-850/60 border border-brand-border dark:border-zinc-800 px-3 py-1.5 rounded-lg">
                <Flame className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                <span>Streak: <strong>{progress.streak} days</strong></span>
                <span className="text-brand-border dark:text-zinc-700">|</span>
                <span>Baseline: <strong>{baseline.toFixed(1)} t/yr</strong></span>
              </div>
            )}

            {/* About / Mission button */}
            {isLoggedIn && isOnboarded && (
              <button
                onClick={() => setDashboardTab('about')}
                id="btn-header-about"
                className={`flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  dashboardTab === 'about'
                    ? 'bg-brand-green text-white dark:bg-emerald-600 dark:text-white border border-brand-green dark:border-emerald-600 font-bold shadow'
                    : 'bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-brand-muted dark:text-zinc-300 hover:text-brand-dark'
                }`}
                aria-label="About GreenPulse & Philosophical Mission"
                title="About"
              >
                <Info className="w-3.5 h-3.5" aria-hidden="true" />
                <span>What & Why?</span>
              </button>
            )}

            {/* Reset control */}
            {isLoggedIn && isOnboarded && (
              <button
                onClick={handleReset}
                id="btn-reset-onboarding"
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted dark:text-zinc-300 border border-brand-border dark:border-zinc-800 rounded-lg px-3 py-1.5 transition-all bg-white dark:bg-zinc-900 cursor-pointer hover:bg-brand-light/30 dark:hover:bg-zinc-800/50"
                aria-label="Restart Baseline Quiz"
                title="Reset Quiz"
              >
                <RefreshCw className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400" aria-hidden="true" />
                <span className="hidden md:inline">Reset Baseline</span>
              </button>
            )}

            {/* Interactive User Session Dropdown */}
            {isLoggedIn && currentUser && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  id="user-profile-button"
                  aria-haspopup="menu"
                  aria-expanded={isDropdownOpen}
                  aria-label={`Profile details for ${currentUser.name}`}
                  className="flex items-center gap-2 pl-2.5 py-1 pr-1.5 border border-brand-border dark:border-zinc-800 rounded-xl bg-brand-light/30 dark:bg-zinc-900/60 transition-colors hover:bg-brand-light/70 dark:hover:bg-zinc-850/80 cursor-pointer"
                >
                  <div 
                    className="w-7 h-7 rounded-full bg-brand-dark dark:bg-zinc-800 text-brand-accent flex items-center justify-center font-bold text-xs ring-2 ring-brand-green/30 dark:ring-emerald-500/30 shrink-0"
                    aria-hidden="true"
                  >
                    {currentUser.preset === 'jane' ? '🥑' : currentUser.preset === 'carlos' ? '🚗' : currentUser.preset === 'anya' ? '🚲' : currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:block text-left max-w-[80px]">
                    <span className="text-[10px] font-bold text-brand-dark dark:text-zinc-100 block truncate">{currentUser.name}</span>
                    <span className="text-[8px] text-brand-muted dark:text-zinc-400 block font-medium truncate">{currentUser.email}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-brand-muted dark:text-zinc-400" aria-hidden="true" />
                  </motion.div>
                </motion.button>

                {/* Dropdown Popover */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <>
                      {/* Invisible clickaway handler */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 shadow-xl overflow-hidden py-2 text-xs z-50"
                      >
                        <div className="px-4 py-2 border-b border-brand-border/60 dark:border-zinc-800/60 pb-3 mb-1.5">
                          <span className="text-[10px] text-brand-muted dark:text-zinc-500 uppercase tracking-wider font-extrabold block">Active Account</span>
                          <span className="font-bold text-brand-dark dark:text-zinc-100 mt-1 block truncate text-sm">{currentUser.name}</span>
                          <span className="text-[10px] text-brand-subtle dark:text-zinc-400 block truncate font-mono">{currentUser.email}</span>
                        </div>

                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setProfileTabRequested('overview');
                            setIsProfileOpen(true);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-brand-light/50 dark:hover:bg-zinc-800/60 text-brand-dark dark:text-zinc-200 font-semibold flex items-center gap-2.5 cursor-pointer"
                        >
                          <User className="w-4 h-4 text-brand-green dark:text-emerald-400" />
                          <span>👤 My Profile & Badges</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setProfileTabRequested('login');
                            setIsProfileOpen(true);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-brand-light/50 dark:hover:bg-zinc-800/60 text-brand-dark dark:text-zinc-200 font-semibold flex items-center gap-2.5 cursor-pointer"
                        >
                          <LogIn className="w-4 h-4 text-brand-green dark:text-emerald-400" />
                          <span>🔑 View Login Track</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setProfileTabRequested('activity');
                            setIsProfileOpen(true);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-brand-light/50 dark:hover:bg-zinc-800/60 text-brand-dark dark:text-zinc-200 font-semibold flex items-center gap-2.5 cursor-pointer"
                        >
                          <History className="w-4 h-4 text-brand-green dark:text-emerald-400" />
                          <span>📜 View Activity Track</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setProfileTabRequested('settings');
                            setIsProfileOpen(true);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-brand-light/50 dark:hover:bg-zinc-800/60 text-brand-dark dark:text-zinc-200 font-semibold flex items-center gap-2.5 cursor-pointer border-b border-brand-border/40 dark:border-zinc-800/40 pb-2.5 mb-1"
                        >
                          <Settings className="w-4 h-4 text-brand-green dark:text-emerald-400" />
                          <span>⚙️ Theme Settings</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setDashboardTab('quiz_section');
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-brand-light/50 dark:hover:bg-zinc-800/60 text-brand-dark dark:text-zinc-200 font-semibold flex items-center gap-2.5 cursor-pointer"
                        >
                          <Compass className="w-4 h-4 text-brand-orange" />
                          <span>📊 Evaluate Carbon Quiz</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-450 font-bold flex items-center gap-2.5 cursor-pointer mt-1"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-zinc-950">
        {!isLoggedIn ? (
          /* Locked/Login tab view, with entry animations */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <LoginPage onLogin={handleLogin} />
          </motion.div>
        ) : !isOnboarded ? (
          /* Onboarding State: Baseline Quiz */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OnboardingQuiz 
              presetId={currentUser?.preset || undefined} 
              onComplete={handleOnboardingComplete} 
            />
          </motion.div>
        ) : (
          /* Post-onboard Dashboard State */
          <div className="space-y-6">
            {/* Quick Metrics Sub-Header */}
            <div className="bg-brand-dark text-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-brand-border relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-brand-green text-brand-accent text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                  Active Overview
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Welcome to GreenPulse
                </h2>
                <p className="text-sm text-brand-accent/80 mt-1 max-w-xl">
                  Your baseline annual footprint is estimated at <strong>{baseline} t CO₂e</strong>. Commit to positive side-benefit action nudges below to shrink your climate runway.
                </p>
              </div>

              <div className="flex gap-6 items-center bg-brand-green/30 px-6 py-4 rounded-xl border border-brand-green/50 w-full md:w-auto relative z-10">
                <div className="text-center flex-1">
                  <span className="text-xs text-brand-accent uppercase tracking-wider font-semibold block">Total Saved</span>
                  <span className="text-2xl font-black text-white block mt-0.5">{progress.totalSavedKg.toFixed(1)} <small className="text-xs font-medium">kg</small></span>
                </div>
                <div className="w-px bg-brand-border/40 h-8 self-center" />
                <div className="text-center flex-1">
                  <span className="text-xs text-brand-accent uppercase tracking-wider font-semibold block">Active Streak</span>
                  <span className="text-2xl font-black text-brand-orange block mt-0.5">{progress.streak} <small className="text-xs font-medium">days</small></span>
                </div>
              </div>
            </div>

            {/* Tab Controls */}
            <div className="flex overflow-x-auto gap-8 border-b border-brand-border dark:border-zinc-800 pb-px" role="tablist" aria-label="Dashboard views">
              <button
                role="tab"
                aria-selected={dashboardTab === 'nudges'}
                onClick={() => setDashboardTab('nudges')}
                id="dashboard-tab-nudges"
                className={`py-3 px-1 text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                  dashboardTab === 'nudges' 
                    ? 'border-brand-green text-brand-green dark:text-emerald-400 dark:border-emerald-400 font-bold' 
                    : 'border-transparent text-brand-muted dark:text-zinc-400 hover:text-brand-green'
                }`}
              >
                Daily Nudges
              </button>
              <button
                role="tab"
                aria-selected={dashboardTab === 'sandbox'}
                onClick={() => setDashboardTab('sandbox')}
                id="dashboard-tab-sandbox"
                className={`py-3 px-1 text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                  dashboardTab === 'sandbox' 
                    ? 'border-brand-green text-brand-green dark:text-emerald-400 dark:border-emerald-400 font-bold' 
                    : 'border-transparent text-brand-muted dark:text-zinc-400 hover:text-brand-green'
                }`}
              >
                Passive Sandbox Simulator
              </button>
              <button
                role="tab"
                aria-selected={dashboardTab === 'progress'}
                onClick={() => setDashboardTab('progress')}
                id="dashboard-tab-progress"
                className={`py-3 px-1 text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                  dashboardTab === 'progress' 
                    ? 'border-brand-green text-brand-green dark:text-emerald-400 dark:border-emerald-400 font-bold' 
                    : 'border-transparent text-brand-muted dark:text-zinc-400 hover:text-brand-green'
                }`}
              >
                Progress & Rewards
              </button>
              <button
                role="tab"
                aria-selected={dashboardTab === 'theory'}
                onClick={() => setDashboardTab('theory')}
                id="dashboard-tab-theory"
                className={`py-3 px-1 text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                  dashboardTab === 'theory' 
                    ? 'border-brand-green text-brand-green dark:text-emerald-400 dark:border-emerald-400 font-bold' 
                    : 'border-transparent text-brand-muted dark:text-zinc-400 hover:text-brand-green'
                }`}
              >
                Behavioral Design Framework
              </button>
              <button
                role="tab"
                aria-selected={dashboardTab === 'quiz_section'}
                onClick={() => setDashboardTab('quiz_section')}
                id="dashboard-tab-quiz_section"
                className={`py-3 px-1 text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                  dashboardTab === 'quiz_section' 
                    ? 'border-brand-green text-brand-green dark:text-emerald-400 dark:border-emerald-400 font-bold' 
                    : 'border-transparent text-brand-muted dark:text-zinc-400 hover:text-brand-green'
                }`}
              >
                Carbon Quiz Selector 📊
              </button>
              <button
                role="tab"
                aria-selected={dashboardTab === 'about'}
                onClick={() => setDashboardTab('about')}
                id="dashboard-tab-about"
                className={`py-3 px-1 text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                  dashboardTab === 'about' 
                    ? 'border-brand-green text-brand-green dark:text-emerald-400 dark:border-emerald-400 font-bold' 
                    : 'border-transparent text-brand-muted dark:text-zinc-400 hover:text-brand-green'
                }`}
              >
                About & Mission 🍀
              </button>
            </div>

            {/* Dashboard Workspace */}
            <div role="tabpanel">
              {dashboardTab === 'nudges' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left core nudge deck */}
                  <div className="lg:col-span-7">
                    <NudgeEngine onCommit={handleCommitNudge} recentCommits={commits} />
                  </div>
                  
                  {/* Right helper summary card */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
                      <h3 className="text-sm font-bold text-brand-dark dark:text-zinc-100 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-brand-green dark:text-emerald-400" />
                        <span>Sustainability Principle</span>
                      </h3>
                      <p className="text-xs text-brand-muted dark:text-zinc-400 leading-relaxed">
                        Instead of daily manual entry (which causes fatigue and quickly ruins app adoption), GreenPulse focuses on <strong>one actionable choice per day</strong>. By shifting focus onto real physical savings and life upgrades, we sustain long-term commitment.
                      </p>

                      <div className="mt-5 space-y-3.5">
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-brand-light dark:bg-zinc-800 text-brand-green dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">1</span>
                          <span className="text-xs text-brand-muted dark:text-zinc-400">The baseline quiz identifies your large direct lifestyle emission categories.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-brand-light dark:bg-zinc-800 text-brand-green dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">2</span>
                          <span className="text-xs text-brand-muted dark:text-zinc-400">Commit to actions focusing on positive <strong>side benefits</strong> (cash, wellness, focus time).</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-brand-light dark:bg-zinc-800 text-brand-green dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">3</span>
                          <span className="text-xs text-brand-muted dark:text-zinc-400">Simulate passive inputs in our mock pipeline sandbox to understand data flow in a privacy-first manner.</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-brand-dark dark:bg-zinc-900 text-white rounded-2xl p-5 border border-slate-950 dark:border-zinc-800 shadow-sm flex items-center gap-4 transition-colors duration-300">
                      <div className="p-2 bg-brand-green dark:bg-emerald-600 text-brand-accent dark:text-emerald-100 rounded-xl">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-accent dark:text-emerald-300 uppercase font-bold tracking-wider">Passive Signal Security</span>
                        <p className="text-xs text-slate-300 dark:text-zinc-300 mt-1">
                          No databases or linked credit cards. Your device evaluates merchant tags locally, securely, and completely offline.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'sandbox' && (
                <PassiveSignalSimulator 
                  onAddSignal={handleAddSignal} 
                  sandboxSignals={sandboxSignals} 
                  onClearSandbox={handleClearSandbox}
                />
              )}

              {dashboardTab === 'progress' && (
                <ProgressUI progress={progress} commits={commits} categoryBreakdown={categoryBreakdown} />
              )}

              {dashboardTab === 'theory' && (
                <TheoryAndMetrics />
              )}

              {dashboardTab === 'quiz_section' && (
                <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
                  <div className="mb-6">
                    <span className="text-[10px] text-brand-subtle dark:text-zinc-500 uppercase tracking-widest font-black block">Retake & Recalibrate</span>
                    <h2 className="text-2xl font-bold text-brand-dark dark:text-zinc-100">Carbon Footprint Quiz</h2>
                    <p className="text-xs text-brand-muted dark:text-zinc-400 mt-1">
                      Instantly recalculate your annual carbon footprint baseline. Modify the questions to match your recent lifestyle changes.
                    </p>
                  </div>
                  <OnboardingQuiz 
                    presetId={currentUser?.preset || undefined}
                    onComplete={(calculatedBaseline, breakdown) => {
                      handleOnboardingComplete(calculatedBaseline, breakdown);
                    }}
                  />
                </div>
              )}

              {dashboardTab === 'about' && (
                <AboutMission 
                  onGoToNudges={() => setDashboardTab('nudges')}
                  onGoToSandbox={() => setDashboardTab('sandbox')}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-brand-border dark:border-zinc-800 py-4 px-8 text-center mt-12 text-[10px] text-brand-subtle dark:text-zinc-400 font-bold uppercase tracking-wider transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Privacy Status: Local-Only Data Model</span>
          <div className="flex gap-6">
            <span>90-Day Retention Target: 62%</span>
            <span>Avg. Footprint Reduction Goal: 12.4%</span>
            <span>Positive Behavior Framework</span>
          </div>
        </div>
      </footer>

      {/* Custom User Profile Overlay Modal */}
      <UserProfileAndSettings
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        loginTrack={loginTrack}
        activityTrack={activityTrack}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        streak={progress.streak}
        totalSavedKg={progress.totalSavedKg}
        initialTab={profileTabRequested}
        onRetakeQuiz={() => {
          setIsProfileOpen(false);
          setDashboardTab('quiz_section');
        }}
      />
    </div>
  );
}

