
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

const ProgressTracker = ({ completed, total }: ProgressTrackerProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="space-y-3 mb-4 px-3 py-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Task Progress</h3>
        <span className="text-xs text-muted-foreground">
          {completed} of {total} tasks completed ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-2.5" />
    </div>
  );
};

export default ProgressTracker;
