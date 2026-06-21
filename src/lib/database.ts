import { CommitLog, FootprintProgress } from '../types';
import { LoginRecord, ActivityRecord } from '../components/UserProfileAndSettings';

export interface PresetData {
  baseline: number;
  categoryBreakdown: Record<string, number>;
  commits: CommitLog[];
  progress: FootprintProgress;
  loginTrack: LoginRecord[];
  activityTrack: ActivityRecord[];
}

export function getPresetDatabaseRecord(presetId?: string, userName?: string): PresetData {
  const now = Date.now();

  const defaultEmptyState: PresetData = {
    baseline: 0,
    categoryBreakdown: {},
    commits: [],
    progress: {
      baseline: 0,
      currentEstimated: 0,
      totalSavedKg: 0,
      streak: 0,
      achievements: []
    },
    loginTrack: [
      {
        id: 'log-u1',
        timestamp: new Date(),
        browser: 'Chrome 125.0',
        device: 'Generic Desktop Client',
        location: 'San Francisco, USA',
        ip: '192.0.2.1'
      }
    ],
    activityTrack: [
      {
        id: 'act-u1',
        timestamp: new Date(),
        action: 'Account Form Registered',
        type: 'auth',
        details: `Enrolled new human participant: ${userName || 'User'}. Ready for footprint evaluating.`
      }
    ]
  };

  if (presetId === 'jane') {
    const bl = 16.5;
    return {
      baseline: bl,
      categoryBreakdown: { commute: 3.5, diet: 4.8, home: 3.5, shopping: 2.2, travel: 2.5 },
      commits: [
        {
          id: 'pre-j1',
          nudgeId: 'nudge-j1',
          nudgeTitle: 'Swapped beef dinner for plant-based alternative',
          co2Saved: 6.2,
          date: new Date(now - 3 * 24 * 3600 * 1000),
          coBenefitValue: 'Lower saturated fat & vascular benefit',
          coBenefitType: 'health'
        },
        {
          id: 'pre-j2',
          nudgeId: 'nudge-j2',
          nudgeTitle: 'Turned off standby appliances at wall',
          co2Saved: 1.8,
          date: new Date(now - 2 * 24 * 3600 * 1000),
          coBenefitValue: '$18 saved on current cycle',
          coBenefitType: 'money'
        },
        {
          id: 'pre-j3',
          nudgeId: 'nudge-j3',
          nudgeTitle: 'Conducted virtual conference over short flight',
          co2Saved: 12.5,
          date: new Date(now - 1 * 24 * 3600 * 1000),
          coBenefitValue: 'Reclaimed 8 hours of tight calendar fatigue',
          coBenefitType: 'time'
        }
      ],
      progress: {
        baseline: bl,
        currentEstimated: bl,
        totalSavedKg: 20.5,
        streak: 3,
        achievements: ['First-Commit', 'Streak-Hero', 'Carbon-Avenger']
      },
      loginTrack: [
        {
          id: 'log-j1',
          timestamp: new Date(),
          browser: 'Safari 17.5 on Apple MBP 16',
          device: 'MacBook Pro',
          location: 'New York, USA',
          ip: '198.51.100.41'
        },
        {
          id: 'log-j2',
          timestamp: new Date(now - 2 * 24 * 3600 * 1000 - 4 * 3600 * 1000),
          browser: 'Safari 17.4 Mobile on iOS',
          device: 'iPhone 15 Pro',
          location: 'New York, USA',
          ip: '198.51.100.12'
        },
        {
          id: 'log-j3',
          timestamp: new Date(now - 5 * 24 * 3600 * 1000 - 1 * 3600 * 1000),
          browser: 'Google Chrome on Windows 11',
          device: 'ThinkPad X1',
          location: 'Boston, USA',
          ip: '203.0.113.88'
        }
      ],
      activityTrack: [
        {
          id: 'act-j-now',
          timestamp: new Date(),
          action: 'Workspace Session Initiated',
          type: 'auth',
          details: 'Logged in as Jane Cooper (Urban Executive). Preset loaded.'
        },
        {
          id: 'act-j1',
          timestamp: new Date(now - 1 * 24 * 3600 * 1000),
          action: 'Nudge Committed',
          type: 'nudge',
          details: 'Conducted virtual conference over short flight (Saved 12.5 kg CO₂e).'
        },
        {
          id: 'act-j2',
          timestamp: new Date(now - 2 * 24 * 3600 * 1000),
          action: 'Nudge Committed',
          type: 'nudge',
          details: 'Turned off standby appliances at wall (Saved 1.8 kg CO₂e).'
        },
        {
          id: 'act-j3',
          timestamp: new Date(now - 3 * 24 * 3600 * 1000),
          action: 'Nudge Committed',
          type: 'nudge',
          details: 'Swapped beef dinner for plant-based alternative (Saved 6.2 kg CO₂e).'
        },
        {
          id: 'act-j4',
          timestamp: new Date(now - 7 * 24 * 3600 * 1000),
          action: 'Profile Onboarding Quiz',
          type: 'quiz',
          details: 'Evaluated initial annual carbon footprint baseline to 16.5 t CO₂e.'
        }
      ]
    };
  }

  if (presetId === 'carlos') {
    const bl = 12.2;
    return {
      baseline: bl,
      categoryBreakdown: { commute: 4.5, diet: 2.5, home: 4.2, shopping: 1.0, travel: 0.0 },
      commits: [
        {
          id: 'pre-c1',
          nudgeId: 'nudge-c1',
          nudgeTitle: 'Eco laundry batch run at 30°C',
          co2Saved: 2.2,
          date: new Date(now - 2 * 24 * 3600 * 1000),
          coBenefitValue: '$8 saved on gas & water',
          coBenefitType: 'money'
        },
        {
          id: 'pre-c2',
          nudgeId: 'nudge-c2',
          nudgeTitle: 'Carpokeled with suburban neighbor',
          co2Saved: 5.4,
          date: new Date(now - 1 * 24 * 3600 * 1000),
          coBenefitValue: 'reclaims driving isolation stress',
          coBenefitType: 'health'
        }
      ],
      progress: {
        baseline: bl,
        currentEstimated: bl,
        totalSavedKg: 7.6,
        streak: 2,
        achievements: ['First-Commit']
      },
      loginTrack: [
        {
          id: 'log-c1',
          timestamp: new Date(),
          browser: 'Google Chrome on Windows 11',
          device: 'HP Pavilion Desktop',
          location: 'Madrid, Spain',
          ip: '82.165.15.112'
        },
        {
          id: 'log-c2',
          timestamp: new Date(now - 3 * 24 * 3600 * 1000),
          browser: 'Firefox on Android Mobile',
          device: 'Samsung Galaxy S23',
          location: 'Madrid, Spain',
          ip: '82.165.12.9'
        }
      ],
      activityTrack: [
        {
          id: 'act-c-now',
          timestamp: new Date(),
          action: 'Workspace Session Initiated',
          type: 'auth',
          details: 'Logged in as Carlos Ruiz (Family Steward). Preset loaded.'
        },
        {
          id: 'act-c1',
          timestamp: new Date(now - 1 * 24 * 3600 * 1000),
          action: 'Nudge Committed',
          type: 'nudge',
          details: 'Carpokeled with suburban neighbor (Saved 5.4 kg CO₂e).'
        },
        {
          id: 'act-c2',
          timestamp: new Date(now - 2 * 24 * 3600 * 1000),
          action: 'Nudge Committed',
          type: 'nudge',
          details: 'Eco laundry batch run at 30°C (Saved 2.2 kg CO₂e).'
        },
        {
          id: 'act-c3',
          timestamp: new Date(now - 3 * 24 * 3600 * 1000),
          action: 'Profile Onboarding Quiz',
          type: 'quiz',
          details: 'Evaluated initial annual carbon footprint baseline to 12.2 t CO₂e.'
        }
      ]
    };
  }

  if (presetId === 'anya') {
    const bl = 4.1;
    return {
      baseline: bl,
      categoryBreakdown: { commute: 0.8, diet: 1.2, home: 1.5, shopping: 0.6, travel: 0.0 },
      commits: [
        {
          id: 'pre-a1',
          nudgeId: 'nudge-a1',
          nudgeTitle: 'Repaired secondary canvas boots',
          co2Saved: 4.1,
          date: new Date(now - 1 * 24 * 3600 * 1000),
          coBenefitValue: 'Kept $60 in savings bank and spared water footprint',
          coBenefitType: 'money'
        }
      ],
      progress: {
        baseline: bl,
        currentEstimated: bl,
        totalSavedKg: 4.1,
        streak: 1,
        achievements: ['First-Commit']
      },
      loginTrack: [
        {
          id: 'log-a1',
          timestamp: new Date(),
          browser: 'Firefox on macOS Sonoma',
          device: 'Apple MacBook Air 13',
          location: 'Berlin, Germany',
          ip: '46.113.2.140'
        }
      ],
      activityTrack: [
        {
          id: 'act-a-now',
          timestamp: new Date(),
          action: 'Workspace Session Initiated',
          type: 'auth',
          details: 'Logged in as Anya Volkova (Eco Student). Preset loaded.'
        },
        {
          id: 'act-a1',
          timestamp: new Date(now - 1 * 24 * 3600 * 1000),
          action: 'Nudge Committed',
          type: 'nudge',
          details: 'Repaired secondary canvas boots (Saved 4.1 kg CO₂e).'
        },
        {
          id: 'act-a2',
          timestamp: new Date(now - 2 * 24 * 3600 * 1000),
          action: 'Profile Onboarding Quiz',
          type: 'quiz',
          details: 'Evaluated initial annual carbon footprint baseline into ultra-low 4.1 t CO₂e.'
        }
      ]
    };
  }

  return defaultEmptyState;
}
