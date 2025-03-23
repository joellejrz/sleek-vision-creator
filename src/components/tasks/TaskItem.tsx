
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
        return <Badge variant="destructive" className={`capitalize flex items-center gap-0.5 ${isMobile ? 'text-[10px] px-1 py-0 h-3.5' : 'text-xs'}`}>
          <TrendingUp className={`${isMobile ? 'h-1.5 w-1.5' : 'h-3 w-3'} mr-0.5`} />
          {priority}
        </Badge>;
      case "medium":
        return <Badge variant="default" className={`capitalize flex items-center gap-0.5 ${isMobile ? 'text-[10px] px-1 py-0 h-3.5' : 'text-xs'}`}>
          {priority}
        </Badge>;
      default:
        return <Badge variant="secondary" className={`capitalize flex items-center gap-0.5 ${isMobile ? 'text-[10px] px-1 py-0 h-3.5' : 'text-xs'}`}>
          {priority}
        </Badge>;
    }
  };

  return (
    <div 
      className={`rounded-lg p-1 mb-1 hover:shadow-md transition-all cursor-pointer ${
        expanded ? 'shadow-sm' : ''
      } ${task.completed ? 'bg-muted text-muted-foreground' : 'glass-card'}`}
      onClick={toggleExpand}
    >
      <div className="flex items-start gap-1">
        <div className="mt-0.5" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            id={`task-${task.id}`}
            className="w-3.5 h-3.5"
          />
        </div>
        
        <div className="space-y-0.5 flex-1 min-w-0 pr-1">
          <div className="flex items-start justify-between gap-y-1">
            <div className="flex items-center gap-1 flex-grow min-w-0 pr-1 flex-wrap">
              <label
                htmlFor={`task-${task.id}`}
                className={`font-medium text-[12px] break-all ${task.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {task.title}
                {task.aiSuggested && (
                  <Badge variant="outline" className="ml-1 text-[0.65rem] px-1 py-0">
                    <Sparkles className="mr-0.5 h-2 w-2 text-amber-400" />
                    AI
                  </Badge>
                )}
              </label>
            </div>
            
            <div className="flex ml-auto gap-0.5 shrink-0">
              {priorityToIcon(task.priority)}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
              >
                <Trash2 className="h-2.5 w-2.5" />
                <span className="sr-only">Delete task</span>
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-[10px] text-muted-foreground line-clamp-1">{task.description}</p>
          )}
          
          {task.imageSrc && expanded && (
            <div className="rounded-md overflow-hidden my-1">
              <img 
                src={task.imageSrc} 
                alt={`${task.title} preview`} 
                className="w-full h-16 object-cover"
              />
            </div>
          )}
          
          {expanded && (
            <div className="flex gap-1 mt-1">
              <Button variant="outline" size="sm" className="text-[0.7rem] h-5 px-1 shadow-glow-subtle">
                <MessageCircle className="h-2.5 w-2.5 mr-0.5" />
                Add Comment
              </Button>
              <Button variant="outline" size="sm" className="text-[0.7rem] h-5 px-1 shadow-glow-subtle">
                <Image className="h-2.5 w-2.5 mr-0.5" />
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
