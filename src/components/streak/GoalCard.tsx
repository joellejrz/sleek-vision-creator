
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle2 } from "lucide-react";
import { StreakGoalOption } from "./StreakGoalTypes";

interface GoalCardProps {
  goal: StreakGoalOption;
  isSelected: boolean;
  isCurrentGoal: boolean;
  onSelect: () => void;
}

export const GoalCard = ({ goal, isSelected, isCurrentGoal, onSelect }: GoalCardProps) => {
  return (
    <button
      onClick={onSelect}
      disabled={goal.locked}
      className={`flex items-start gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50 text-left ${
        isSelected ? "border-primary bg-muted" : 
        goal.locked ? "border-border bg-muted/10 opacity-70" : "border-border"
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {goal.locked ? <Lock className="h-5 w-5 text-muted-foreground" /> : goal.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{goal.name}</span>
          {isCurrentGoal && (
            <Badge variant="outline" className="ml-auto">
              <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
              Current
            </Badge>
          )}
          {goal.locked && (
            <Badge variant="outline" className="ml-auto">Locked</Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>
        <p className="text-xs mt-2">{goal.detailedDescription}</p>
        {goal.requiredStreak > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className="italic">
              Unlocks after a {goal.requiredStreak}-day streak
            </span>
          </p>
        )}
      </div>
    </button>
  );
};
