
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

const ProgressTracker = ({ completed, total }: ProgressTrackerProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xs sm:text-sm font-medium">Task Progress</h3>
        <span className="text-[10px] sm:text-sm text-muted-foreground">
          {completed} of {total} tasks completed ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-1.5 sm:h-2" />
    </div>
  );
};

export default ProgressTracker;
