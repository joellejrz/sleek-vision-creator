
export const useStreakTitles = (currentStreak: number) => {
  // Get the next target based on current streak
  const getNextStreakTarget = () => {
    if (currentStreak < 7) return 7;
    if (currentStreak < 14) return 14;
    if (currentStreak < 21) return 21;
    if (currentStreak < 30) return 30;
    if (currentStreak < 60) return 60;
    if (currentStreak < 90) return 90;
    return 90; // Already at max
  };

  // Get the title based on current streak
  const getStreakTitle = () => {
    if (currentStreak >= 90) return "90-Day Lifestyle Change";
    if (currentStreak >= 60) return "60-Day Deep Habit";
    if (currentStreak >= 30) return "30-Day Power Streak";
    if (currentStreak >= 21) return "21-Day Creator Mode";
    if (currentStreak >= 14) return "14-Day Momentum";
    if (currentStreak >= 7) return "7-Day Spark";
    return "Building Your Streak";
  };

  // Get the progress message based on current streak
  const getProgressMessage = () => {
    if (currentStreak >= 90) return "You've mastered the lifestyle change!";
    if (currentStreak >= 60) return `Building towards 90-Day Lifestyle (${90 - currentStreak} more days)`;
    if (currentStreak >= 30) return `Building towards 60-Day Deep Dive (${60 - currentStreak} more days)`;
    if (currentStreak >= 21) return `Building towards 30-Day Power Streak (${30 - currentStreak} more days)`;
    if (currentStreak >= 14) return `Building towards 21-Day Creator Mode (${21 - currentStreak} more days)`;
    if (currentStreak >= 7) return `Building towards 14-Day Momentum (${14 - currentStreak} more days)`;
    return `Building towards 7-Day Spark (${7 - currentStreak} more days)`;
  };

  // Get the current streak status message
  const getStreakStatusMessage = () => {
    if (currentStreak >= 90) return "90-Day Lifestyle Change";
    if (currentStreak >= 60) return "60-Day Deep Habit";
    if (currentStreak >= 30) return "30-Day Power Streak";
    if (currentStreak >= 21) return "21-Day Creator Mode";
    if (currentStreak >= 14) return "14-Day Momentum";
    if (currentStreak >= 7) return "7-Day Spark";
    if (currentStreak > 0) return `Building towards 7-Day Spark`;
    return "Start Your Streak";
  };

  return {
    getNextStreakTarget,
    getStreakTitle,
    getProgressMessage,
    getStreakStatusMessage
  };
};
