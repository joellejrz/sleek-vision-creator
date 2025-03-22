
import { Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskTimeIndicatorProps {
  startTime?: string;
  endTime?: string;
  due: string;
  duration?: string;
}

const TaskTimeIndicator = ({ startTime, endTime, due, duration }: TaskTimeIndicatorProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="text-[9px] text-slate-500 mb-0 flex flex-wrap items-center">
      <span className="inline-block mr-1">
        {startTime && endTime ? (
          <>
            {startTime} — {endTime}
            {duration && ` (${duration})`}
          </>
        ) : (
          <>{due}</>
        )}
      </span>
      <span className="inline-flex items-center">
        <Clock className="h-2 w-2 mr-0.5" />
        {duration || "10 min"}
      </span>
    </div>
  );
};

export default TaskTimeIndicator;
