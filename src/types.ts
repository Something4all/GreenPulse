// GreenPulse Application Shared Types

export interface QuizAnswer {
  text: string;
  value: number; // tons of CO2e per year
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  category: 'commute' | 'diet' | 'home' | 'shopping' | 'travel';
  title: string;
  iconName: string;
  description: string;
  options: QuizAnswer[];
}

export interface CoBenefit {
  type: 'money' | 'health' | 'time' | 'mindfulness';
  icon: string;
  metric: string; // e.g., "$4.50", "25 mins", "Heart benefits"
  text: string;   // e.g., "Saved by skipping latte and brewing at home"
}

export interface Nudge {
  id: string;
  category: 'commute' | 'diet' | 'home' | 'shopping' | 'travel';
  title: string;
  nudgeText: string;
  co2Savings: number; // kg of CO2 saved per instance
  coBenefit: CoBenefit;
  intensity: 'easy' | 'medium' | 'hard';
}

export interface PassiveSignal {
  id: string;
  source: 'transaction' | 'device' | 'calendar';
  timestamp: Date;
  label: string; // e.g., "Gas Station Transaction", "10k steps logged"
  value: string; // e.g., "$35.00", "5 km"
  estimatedCo2: number; // kg CO2
  uncertainty: 'Low' | 'Medium' | 'High';
  uncertaintyExplanation: string;
}

export interface CommitLog {
  id: string;
  nudgeId: string;
  nudgeTitle: string;
  co2Saved: number;
  date: Date;
  coBenefitValue: string;
  coBenefitType: 'money' | 'health' | 'time' | 'mindfulness';
}

export interface FootprintProgress {
  baseline: number; // annual baseline tone
  currentEstimated: number; // current annualized progress
  totalSavedKg: number;
  streak: number;
  lastCommitDate?: Date;
  achievements: string[];
}
