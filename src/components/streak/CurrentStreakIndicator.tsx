
import React from "react";
import { Sparkles } from "lucide-react";

interface CurrentStreakIndicatorProps {
  currentStreak: number;
}

export const CurrentStreakIndicator = ({ currentStreak }: CurrentStreakIndicatorProps) => {
  return (
    <div className="rounded-lg bg-muted p-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-orange-400" />
        <span className="text-sm font-medium">Current streak: {currentStreak} days</span>
      </div>
    </div>
  );
};
