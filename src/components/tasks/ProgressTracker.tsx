
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

const ProgressTracker = ({ completed, total }: ProgressTrackerProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="space-y-0.5 sm:space-y-2 mb-1 sm:mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xs sm:text-sm font-medium">Task Progress</h3>
        <span className="text-[9px] sm:text-sm text-muted-foreground">
          {completed} of {total} tasks completed ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-1 sm:h-2" />
    </div>
  );
};

export default ProgressTracker;
