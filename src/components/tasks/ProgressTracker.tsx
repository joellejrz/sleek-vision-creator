
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

const ProgressTracker = ({ completed, total }: ProgressTrackerProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="space-y-4 mb-4 px-5 py-5 rounded-lg bg-background/60 backdrop-blur-sm shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Task Progress</h3>
        <span className="text-sm text-muted-foreground">
          {completed} of {total} tasks completed ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
};

export default ProgressTracker;
