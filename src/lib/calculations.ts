import { CommitLog, Nudge, FootprintProgress } from '../types';

export function calculateNewProgress(
  currentProgress: FootprintProgress,
  nudge: Nudge,
  commits: CommitLog[]
): FootprintProgress {
  const newSaved = currentProgress.totalSavedKg + nudge.co2Savings;
  const newStreak = currentProgress.streak + 1;
  const achievements = [...currentProgress.achievements];

  if (commits.length === 1 && !achievements.includes('First-Commit')) {
    achievements.push('First-Commit');
  }
  if (newStreak >= 3 && !achievements.includes('Streak-Hero')) {
    achievements.push('Streak-Hero');
  }
  if (newSaved >= 10 && !achievements.includes('Carbon-Avenger')) {
    achievements.push('Carbon-Avenger');
  }

  return {
    ...currentProgress,
    totalSavedKg: Number(newSaved.toFixed(2)),
    streak: newStreak,
    achievements
  };
}

export function finalizeOnboardingProgress(
  currentProgress: FootprintProgress,
  calculatedBaseline: number
): FootprintProgress {
  const finalSavedKg = currentProgress.totalSavedKg > 0 ? currentProgress.totalSavedKg : 0;
  const finalStreak = currentProgress.streak > 0 ? currentProgress.streak : 0;
  const finalAchievements = currentProgress.achievements.length > 0 ? currentProgress.achievements : [];
  return {
    ...currentProgress,
    baseline: calculatedBaseline,
    currentEstimated: calculatedBaseline,
    totalSavedKg: finalSavedKg,
    streak: finalStreak,
    achievements: finalAchievements
  };
}
