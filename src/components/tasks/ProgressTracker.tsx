
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  completed: number;
  total: number;
  progressColor?: string;
  goalType?: "spark" | "habit" | "power" | "deep" | "lifestyle" | "custom";
}

const ProgressTracker = ({ completed, total, progressColor, goalType }: ProgressTrackerProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Determine goal type based on total days if not provided
  let derivedGoalType = goalType;
  if (!goalType && total) {
    if (total === 7) derivedGoalType = "spark";
    else if (total === 21) derivedGoalType = "habit";
    else if (total === 30) derivedGoalType = "power";
    else if (total === 60) derivedGoalType = "deep";
    else if (total === 90) derivedGoalType = "lifestyle";
  }
  
  return (
    <div className="space-y-4 mb-4 px-6 py-6 rounded-lg bg-gradient-to-br from-gray-50/70 to-white/50 dark:from-gray-900/70 dark:to-gray-800/50 backdrop-blur-sm shadow-sm border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Task Progress</h3>
        <span className="text-sm text-muted-foreground">
          {completed} of {total} tasks completed ({percentage}%)
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-3.5" 
        progressColor={progressColor}
        goalType={derivedGoalType}
        animate={true}
      />
    </div>
  );
};

export default ProgressTracker;
