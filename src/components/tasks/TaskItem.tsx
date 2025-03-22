
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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const priorityToIcon = (priority: string) => {
    switch(priority) {
      case "high":
        return <Badge variant="destructive" className="capitalize flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {priority}
        </Badge>;
      case "medium":
        return <Badge variant="default" className="capitalize flex items-center gap-1">
          {priority}
        </Badge>;
      default:
        return <Badge variant="secondary" className="capitalize flex items-center gap-1">
          {priority}
        </Badge>;
    }
  };

  return (
    <div 
      className={`rounded-lg p-4 mb-2 hover:shadow-md transition-all cursor-pointer ${
        expanded ? 'shadow-md' : ''
      } ${task.completed ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
      onClick={toggleExpand}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            id={`task-${task.id}`}
          />
        </div>
        
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`task-${task.id}`}
              className={`font-medium text-base ${task.completed ? 'line-through text-muted-foreground' : ''}`}
            >
              {task.title}
              {task.aiSuggested && (
                <Badge variant="outline" className="ml-2">
                  <Sparkles className="mr-1 h-3 w-3 text-amber-400" />
                  AI
                </Badge>
              )}
            </label>
            
            <div className="flex space-x-1">
              {priorityToIcon(task.priority)}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground">{task.description}</p>
          )}
          
          {task.imageSrc && expanded && (
            <div className="rounded-md overflow-hidden my-2">
              <img 
                src={task.imageSrc} 
                alt={`${task.title} preview`} 
                className="w-full h-32 object-cover"
              />
            </div>
          )}
          
          {expanded && (
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="text-xs">
                <MessageCircle className="h-3 w-3 mr-1" />
                Add Comment
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Image className="h-3 w-3 mr-1" />
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
