
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Trash2, 
  Clock, 
  MessageCircle, 
  Image,
  TrendingUp
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Subtask {
  text: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  due: string;
  category?: string;
  color?: string;
  duration?: string;
  frequency?: string;
  startTime?: string;
  endTime?: string;
  alerts?: {
    start: boolean;
    end: boolean;
    fiveMin: boolean;
  };
  subtasks?: Subtask[];
  aiSuggested: boolean;
  imageSrc?: string;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskItem = ({ task, onToggleComplete, onDeleteTask }: TaskItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const priorityToIcon = (priority: string) => {
    switch(priority) {
      case "high":
        return <Badge variant="destructive" className={`capitalize flex items-center gap-1 ${isMobile ? 'text-[9px] px-1 py-0 h-4' : 'text-xs'}`}>
          <TrendingUp className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} mr-0.5`} />
          {priority}
        </Badge>;
      case "medium":
        return <Badge variant="default" className={`capitalize flex items-center gap-1 ${isMobile ? 'text-[9px] px-1 py-0 h-4' : 'text-xs'}`}>
          {priority}
        </Badge>;
      default:
        return <Badge variant="secondary" className={`capitalize flex items-center gap-1 ${isMobile ? 'text-[9px] px-1 py-0 h-4' : 'text-xs'}`}>
          {priority}
        </Badge>;
    }
  };

  return (
    <div 
      className={`rounded-lg p-1.5 sm:p-4 mb-1 sm:mb-2 hover:shadow-md transition-all cursor-pointer ${
        expanded ? 'shadow-sm' : ''
      } ${task.completed ? 'bg-muted text-muted-foreground' : 'bg-card text-card-foreground dark:bg-card/90 dark:text-card-foreground'}`}
      onClick={toggleExpand}
    >
      <div className="flex items-start gap-1.5 sm:gap-3">
        <div className="mt-0.5 sm:mt-1" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            id={`task-${task.id}`}
            className="w-3 h-3 sm:w-4 sm:h-4"
          />
        </div>
        
        <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`task-${task.id}`}
              className={`font-medium text-xs sm:text-base truncate ${task.completed ? 'line-through text-muted-foreground' : ''}`}
            >
              {task.title}
              {task.aiSuggested && (
                <Badge variant="outline" className="ml-1 text-[0.6rem] sm:text-xs px-1 sm:px-2 py-0">
                  <Sparkles className="mr-0.5 h-2 w-2 sm:h-3 sm:w-3 text-amber-400" />
                  AI
                </Badge>
              )}
            </label>
            
            <div className="flex space-x-1 shrink-0 ml-1">
              {priorityToIcon(task.priority)}
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 sm:h-8 sm:w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-[10px] sm:text-sm text-muted-foreground line-clamp-1">{task.description}</p>
          )}
          
          {task.imageSrc && expanded && (
            <div className="rounded-md overflow-hidden my-1 sm:my-2">
              <img 
                src={task.imageSrc} 
                alt={`${task.title} preview`} 
                className="w-full h-16 sm:h-32 object-cover"
              />
            </div>
          )}
          
          {expanded && (
            <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2">
              <Button variant="outline" size="sm" className="text-[0.6rem] sm:text-xs h-5 sm:h-8 px-1.5 sm:px-2">
                <MessageCircle className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                Add Comment
              </Button>
              <Button variant="outline" size="sm" className="text-[0.6rem] sm:text-xs h-5 sm:h-8 px-1.5 sm:px-2">
                <Image className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                Add Image
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
