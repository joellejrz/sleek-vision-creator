
import { Clock } from "lucide-react";

interface TaskTimeIndicatorProps {
  startTime?: string;
  endTime?: string;
  due: string;
  duration?: string;
}

const TaskTimeIndicator = ({ startTime, endTime, due, duration }: TaskTimeIndicatorProps) => {
  return (
    <div className="text-xs text-slate-500 mb-1">
      {startTime && endTime ? (
        <>
          {startTime} — {endTime}
          {duration && ` (${duration})`}
        </>
      ) : (
        <>{due}</>
      )}
      <span className="ml-2 inline-flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        {duration || "10 min"}
      </span>
    </div>
  );
};

export default TaskTimeIndicator;
