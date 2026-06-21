import { useState, useCallback, useEffect } from 'react';
import { 
  CommitLog, 
  PassiveSignal, 
  FootprintProgress, 
  Nudge 
} from '../types';
import { LoginRecord, ActivityRecord } from '../components/UserProfileAndSettings';
import { getPresetDatabaseRecord, PresetData } from '../lib/database';
import { calculateNewProgress, finalizeOnboardingProgress } from '../lib/calculations';

export interface UserInfo {
  name: string;
  email: string;
  preset?: string;
}

export function useAppStore() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [baseline, setBaseline] = useState<number>(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState<Record<string, number>>({});
  
  // Dashboard navigation state
  const [dashboardTab, setDashboardTab] = useState<'nudges' | 'sandbox' | 'progress' | 'theory' | 'about' | 'quiz_section'>('nudges');

  // Progressive state
  const [progress, setProgress] = useState<FootprintProgress>({
    baseline: 0,
    currentEstimated: 0,
    totalSavedKg: 0,
    streak: 0,
    achievements: [],
  });

  // Recent Commitments Log
  const [commits, setCommits] = useState<CommitLog[]>([]);

  // Local simulated passive data sandboxing stream
  const [sandboxSignals, setSandboxSignals] = useState<PassiveSignal[]>([]);

  // Profile-related Track lists
  const [loginTrack, setLoginTrack] = useState<LoginRecord[]>([]);
  const [activityTrack, setActivityTrack] = useState<ActivityRecord[]>([]);

  // Darkmode switch with persistent memory representation
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const logActivity = useCallback((action: string, type: 'auth' | 'quiz' | 'nudge' | 'simulation' | 'settings', details?: string) => {
    setActivityTrack(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        action,
        type,
        details
      },
      ...prev
    ]);
  }, []);

  const handleLogin = useCallback((userInfo: UserInfo) => {
    setCurrentUser(userInfo);
    setIsLoggedIn(true);

    const record: PresetData = getPresetDatabaseRecord(userInfo.preset, userInfo.name);
    
    setBaseline(record.baseline);
    setCategoryBreakdown(record.categoryBreakdown);
    setCommits(record.commits);
    setProgress(record.progress);
    setLoginTrack(record.loginTrack);
    setActivityTrack(record.activityTrack);
    
    // Specifically mapped rule for presets overriding logic
    setIsOnboarded(userInfo.preset ? false : false); 
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsOnboarded(false);
    setBaseline(0);
    setCategoryBreakdown({});
    setCommits([]);
    setSandboxSignals([]);
    setProgress({
      baseline: 0,
      currentEstimated: 0,
      totalSavedKg: 0,
      streak: 0,
      achievements: []
    });
    setDashboardTab('nudges');
  }, []);

  const handleOnboardingComplete = useCallback((calculatedBaseline: number, breakdown: Record<string, number>) => {
    setBaseline(calculatedBaseline);
    setCategoryBreakdown(breakdown);
    setIsOnboarded(true);

    logActivity(
      'Baseline footprint checked', 
      'quiz', 
      `Saved carbon rating baseline to ${calculatedBaseline.toFixed(2)} t CO₂e/yr via quiz section.`
    );

    setProgress(prev => finalizeOnboardingProgress(prev, calculatedBaseline));

    if (dashboardTab === 'quiz_section') {
      setDashboardTab('progress');
    }
  }, [dashboardTab, logActivity]);

  const handleCommitNudge = useCallback((nudge: Nudge) => {
    const log: CommitLog = {
      id: Math.random().toString(36).substr(2, 9),
      nudgeId: nudge.id,
      nudgeTitle: nudge.title,
      co2Saved: nudge.co2Savings,
      date: new Date(),
      coBenefitValue: nudge.coBenefit.metric,
      coBenefitType: nudge.coBenefit.type
    };

    setCommits(prev => {
      const newCommits = [log, ...prev];
      logActivity(
        'Behavioral Nudge Committed', 
        'nudge', 
        `Engaged in "${nudge.title}". Estimated CO₂ saved: ${nudge.co2Savings} kg. Co-benefit: ${nudge.coBenefit.text}.`
      );

      setProgress(p => calculateNewProgress(p, nudge, newCommits));
      return newCommits;
    });
  }, [logActivity]);

  const handleAddSignal = useCallback((signal: PassiveSignal) => {
    setSandboxSignals(prev => [signal, ...prev]);
    logActivity(
      'Passive Signal Registered', 
      'simulation', 
      `Parsed local telemetry tag "${signal.label}" representing ${signal.value} (${signal.estimatedCo2} kg estimated CO₂).`
    );
  }, [logActivity]);

  const handleClearSandbox = useCallback(() => {
    setSandboxSignals([]);
    logActivity('Sandbox Wiped', 'simulation', 'Purged all local mock telemetry tags from current session memory.');
  }, [logActivity]);

  const handleReset = useCallback(() => {
    setIsOnboarded(false);
    setBaseline(0);
    setCategoryBreakdown({});
    setCommits([]);
    setSandboxSignals([]);
    setProgress({
      baseline: 0,
      currentEstimated: 0,
      totalSavedKg: 0,
      streak: 0,
      achievements: []
    });
    setDashboardTab('nudges');
    logActivity('Dashboard State Reset', 'settings', 'Purged general baseline score and re-opened onboarding quiz.');
  }, [logActivity]);

  return {
    state: {
      isLoggedIn, currentUser, isOnboarded, baseline, categoryBreakdown,
      dashboardTab, progress, commits, sandboxSignals, loginTrack, activityTrack,
      darkMode
    },
    actions: {
      setDashboardTab, setDarkMode, setIsOnboarded,
      handleLogin, handleLogout, handleOnboardingComplete, 
      handleCommitNudge, handleAddSignal, handleClearSandbox, handleReset
    }
  };
}
