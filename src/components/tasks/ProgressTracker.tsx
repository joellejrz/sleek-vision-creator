
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  completed: number;
  total: number;
  progressColor?: string;
  goalType?: "spark" | "habit" | "lifestyle" | "custom";
}

const ProgressTracker = ({ completed, total, progressColor, goalType }: ProgressTrackerProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="space-y-4 mb-4 px-6 py-6 rounded-lg bg-background/60 backdrop-blur-sm shadow-sm">
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
        goalType={goalType}
      />
    </div>
  );
};

export default ProgressTracker;
