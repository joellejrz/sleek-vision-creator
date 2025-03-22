
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
    <div className="text-[10px] sm:text-xs text-slate-500 mb-0.5 sm:mb-1 flex flex-wrap items-center">
      <span className="inline-block mr-2">
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
        <Clock className={`${isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'} mr-0.5`} />
        {duration || "10 min"}
      </span>
    </div>
  );
};

export default TaskTimeIndicator;
