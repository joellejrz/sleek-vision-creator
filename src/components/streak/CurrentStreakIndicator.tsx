
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
  return (
    <div className="rounded-lg bg-muted p-4 space-y-2 border border-muted-foreground/20 shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-orange-400" />
        <span className="text-sm font-medium">Current streak: {currentStreak} days</span>
      </div>
      {progressMessage && (
        <p className="text-xs text-muted-foreground pl-6">
          {progressMessage}
        </p>
      )}
    </div>
  );
};
