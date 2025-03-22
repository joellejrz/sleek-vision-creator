
import { Fragment } from "react";
import TaskItem, { Task } from "./TaskItem";
import TaskTimeIndicator from "./TaskTimeIndicator";
import TaskIcon from "./TaskIcon";
import BreakIndicator from "./BreakIndicator";
import { calculateBreakTime, sortTasksByTime } from "./TaskUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskTimelineProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskTimeline = ({ tasks, onToggleComplete, onDeleteTask }: TaskTimelineProps) => {
  const sortedTasks = sortTasksByTime(tasks);
  const isMobile = useIsMobile();
  
  return (
    <div className="relative">
      {/* Left sidebar with times */}
      <div className="absolute left-0 top-0 w-10 sm:w-14 bottom-0 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center">
        {sortedTasks.map((task) => (
          <div 
            key={`time-${task.id}`}
            className="text-[10px] sm:text-xs text-slate-500 py-8 sm:py-10 first:pt-0"
          >
            {task.startTime || task.due.split(',')[0]}
          </div>
        ))}
      </div>
      
      {/* Timeline content */}
      <div className="ml-10 sm:ml-14 pl-6 sm:pl-10 relative">
        {/* Vertical timeline line */}
        <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
        
        {/* Tasks with timeline nodes */}
        {sortedTasks.map((task, index) => (
          <Fragment key={task.id}>
            <div className="relative mb-4 sm:mb-8">
              {/* Timeline node */}
              <div 
                className={`absolute left-3 sm:left-5 w-6 h-6 sm:w-10 sm:h-10 rounded-full -translate-x-1/2 flex items-center justify-center ${task.color ? `bg-${task.color}-500` : 'bg-green-500'}`}
              >
                <TaskIcon task={task} className={isMobile ? "h-3 w-3" : "h-4 w-4"} />
              </div>
              
              {/* Task content */}
              <div className="ml-6 sm:ml-10 pt-0.5 sm:pt-1">
                <TaskTimeIndicator 
                  startTime={task.startTime} 
                  endTime={task.endTime}
                  due={task.due}
                  duration={task.duration}
                />
                
                <TaskItem 
                  task={task} 
                  onToggleComplete={onToggleComplete} 
                  onDeleteTask={onDeleteTask} 
                />
                
                {/* Break time indicator */}
                {index < sortedTasks.length - 1 && 
                  calculateBreakTime(task, sortedTasks[index + 1]) && (
                    <BreakIndicator 
                      duration={calculateBreakTime(task, sortedTasks[index + 1])!} 
                    />
                  )
                }
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default TaskTimeline;
