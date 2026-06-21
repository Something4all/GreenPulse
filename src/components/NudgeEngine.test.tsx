import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NudgeEngine from './NudgeEngine';
import { Nudge } from '../types';

const mockNudgeData: Nudge[] = [
  {
    id: 'n1',
    category: 'diet',
    title: 'Eat a Plant-Based Meal',
    nudgeText: 'Swap your usual meat dish for a plant-based alternative.',
    co2Savings: 5.5,
    coBenefit: { type: 'health', text: 'Improves heart health', metric: 'Lower cholesterol', icon: 'heart' },
    intensity: 'easy',
  },
  {
    id: 'n2',
    category: 'commute',
    title: 'Walk to Work',
    nudgeText: 'Leave the car and walk instead.',
    co2Savings: 2.1,
    coBenefit: { type: 'health', text: 'Cardio exercise', metric: 'Burn 200 kcal', icon: 'activity' },
    intensity: 'medium',
  }
];

// Mock the nudges data so we have predictable tests
vi.mock('../data/nudges', () => {
  return {
    dailyNudges: [
      {
        id: 'n1',
        category: 'diet',
        title: 'Eat a Plant-Based Meal',
        nudgeText: 'Swap your usual meat dish for a plant-based alternative.',
        co2Savings: 5.5,
        coBenefit: { type: 'health', text: 'Improves heart health', metric: 'Lower cholesterol', icon: 'heart' },
        intensity: 'easy',
      },
      {
        id: 'n2',
        category: 'commute',
        title: 'Walk to Work',
        nudgeText: 'Leave the car and walk instead.',
        co2Savings: 2.1,
        coBenefit: { type: 'health', text: 'Cardio exercise', metric: 'Burn 200 kcal', icon: 'activity' },
        intensity: 'medium',
      }
    ]
  };
});

describe('NudgeEngine', () => {
  it('renders correctly and allows user to commit or pass', () => {
    const onCommit = vi.fn();
    
    render(<NudgeEngine onCommit={onCommit} recentCommits={[]} />);
    
    // Test if the first nudge is rendered
    expect(screen.getByText('Eat a Plant-Based Meal')).toBeInTheDocument();
    
    // Commit the nudge
    const commitBtn = screen.getByText('I will do this today');
    fireEvent.click(commitBtn);
    
    expect(onCommit).toHaveBeenCalled();
  });
});
