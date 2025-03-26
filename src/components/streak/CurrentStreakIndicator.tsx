
import React, { useState } from "react";
import { Sparkles, CheckSquare, Square } from "lucide-react";

interface CurrentStreakIndicatorProps {
  currentStreak: number;
  progressMessage?: string;
}

export const CurrentStreakIndicator = ({ 
  currentStreak, 
  progressMessage 
}: CurrentStreakIndicatorProps) => {
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  
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

  // Get the appropriate milestone message
  const getMilestoneMessage = () => {
    if (currentStreak >= 90) return "Unlimited streak achieved!";
    if (currentStreak >= 60) return "Building towards 90-Day Lifestyle";
    if (currentStreak >= 30) return "Building towards 60-Day Deep Dive";
    if (currentStreak >= 21) return "Building towards 30-Day Creator Mode";
    if (currentStreak >= 14) return "Building towards 14-Day Momentum";
    if (currentStreak >= 7) return "Building towards 7-Day Spark";
    return "Building towards 7-Day Spark";
  };

  const toggleChallenge = () => {
    setChallengeCompleted(!challengeCompleted);
  };

  return (
    <div className="rounded-lg bg-muted p-4 space-y-2 border border-muted-foreground/20 shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-orange-400" />
        <span className="text-sm font-medium">
          Current streak: {currentStreak}/{getNextStreakTarget()} days
        </span>
      </div>
      {progressMessage ? (
        <p className="text-xs text-muted-foreground pl-6">
          {progressMessage}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground pl-6">
          {getMilestoneMessage()}
        </p>
      )}
      
      {/* Daily Mini-Challenge */}
      <div className="mt-4 pt-3 border-t border-muted-foreground/10">
        <button
          onClick={toggleChallenge}
          className="flex items-start gap-2 w-full text-left group"
        >
          <div className="mt-0.5 flex-shrink-0">
            {challengeCompleted ? (
              <CheckSquare className="h-5 w-5 text-primary" />
            ) : (
              <Square className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
          <div>
            <div className="text-sm font-medium flex items-center">
              <span className="text-amber-500 mr-1">✨</span> 
              Day {currentStreak}: Film a 15-sec reel with trending audio!
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {challengeCompleted 
                ? "Great work! Challenge completed." 
                : "Complete this daily challenge to maintain your streak"}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
