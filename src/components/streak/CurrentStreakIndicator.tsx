
import React from "react";
import { Sparkles } from "lucide-react";

interface CurrentStreakIndicatorProps {
  currentStreak: number;
  progressMessage?: string;
}

export const CurrentStreakIndicator = ({ 
  currentStreak, 
  progressMessage 
}: CurrentStreakIndicatorProps) => {
  // Get the next target based on current streak
  const getNextStreakTarget = () => {
    if (currentStreak < 7) return 7;
    if (currentStreak < 21) return 21;
    if (currentStreak < 30) return 30;
    if (currentStreak < 60) return 60;
    if (currentStreak < 90) return 90;
    return 90; // Already at max
  };

  return (
    <div className="rounded-lg bg-muted p-4 space-y-2 border border-muted-foreground/20 shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-orange-400" />
        <span className="text-sm font-medium">
          Current streak: {currentStreak}/{getNextStreakTarget()} days
        </span>
      </div>
      {progressMessage && (
        <p className="text-xs text-muted-foreground pl-6">
          {progressMessage}
        </p>
      )}
    </div>
  );
};
