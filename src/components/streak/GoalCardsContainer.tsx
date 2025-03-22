
import React from "react";
import { Label } from "@/components/ui/label";
import { GoalCard } from "./GoalCard";
import { useStreakGoalOptions } from "./useStreakGoalOptions";
import { toast } from "sonner";

interface GoalCardsContainerProps {
  currentStreak: number;
  currentGoal?: number;
  selectedGoal: number | null;
  onSelectGoal: (goal: number) => void;
}

export const GoalCardsContainer = ({ 
  currentStreak, 
  currentGoal, 
  selectedGoal, 
  onSelectGoal 
}: GoalCardsContainerProps) => {
  // Import goal options from hook
  const goalOptions = useStreakGoalOptions();
  
  // Check which goals should be locked based on current streak
  const processedGoalOptions = goalOptions.map(goal => ({
    ...goal,
    locked: goal.requiredStreak > currentStreak
  }));

  const handleSelectGoal = (days: number, locked: boolean | undefined) => {
    if (locked) {
      // Show a toast explaining why the goal is locked
      const goal = processedGoalOptions.find(g => g.days === days);
      if (goal) {
        toast.error(`Goal Locked`, {
          description: `Complete a ${goal.requiredStreak}-day streak first to unlock this level!`,
        });
      }
      return;
    }
    onSelectGoal(days);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground">Goal Levels</Label>
      <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-1">
        {processedGoalOptions.map((goal) => (
          <GoalCard
            key={goal.days}
            goal={goal}
            isSelected={selectedGoal === goal.days}
            isCurrentGoal={currentGoal === goal.days}
            onSelect={() => handleSelectGoal(goal.days, goal.locked)}
          />
        ))}
      </div>
    </div>
  );
};
