
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Sparkles, Trash2 } from "lucide-react";

interface Subtask {
  text: string;
  completed: boolean;
}

interface Task {
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
}

interface TaskListProps {
  tasks: Task[];
  title: string;
  description: string;
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  emptyMessage: string;
}

const TaskList = ({
  tasks,
  title,
  description,
  onToggleComplete,
  onDeleteTask,
  emptyMessage,
}: TaskListProps) => {
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const toggleExpand = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const colorToClass = (color: string = "green") => {
    const colorMap: {[key: string]: string} = {
      green: "bg-green-100 border-green-300",
      blue: "bg-blue-100 border-blue-300",
      purple: "bg-purple-100 border-purple-300",
      red: "bg-red-100 border-red-300",
      yellow: "bg-yellow-100 border-yellow-300",
      teal: "bg-teal-100 border-teal-300"
    };
    
    return colorMap[color] || colorMap.green;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>{emptyMessage}</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className={`rounded-lg border p-4 ${expandedTask === task.id ? 'shadow-md' : ''} ${task.color ? colorToClass(task.color) : ''}`}
              >
                <div 
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleExpand(task.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => onToggleComplete(task.id)}
                        id={`task-${task.id}`}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`font-medium text-base ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {task.title}
                        {task.aiSuggested && (
                          <Badge variant="outline" className="ml-2">
                            <Sparkles className="mr-1 h-3 w-3 text-accent-gold" />
                            AI Suggested
                          </Badge>
                        )}
                      </label>
                      
                      {task.description && (
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <CalendarClock className="h-3 w-3" />
                        <span>{task.due}</span>
                        
                        {task.duration && (
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">
                            {task.duration}
                          </span>
                        )}
                        
                        {task.frequency && task.frequency !== "once" && (
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs capitalize">
                            {task.frequency}
                          </span>
                        )}
                        
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                          className="ml-auto capitalize"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTask(task.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete task</span>
                  </Button>
                </div>
                
                {expandedTask === task.id && task.subtasks && task.subtasks.length > 0 && (
                  <div className="mt-4 pl-10 space-y-2">
                    <h4 className="text-sm font-medium">Subtasks:</h4>
                    {task.subtasks.map((subtask, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Checkbox id={`subtask-${task.id}-${idx}`} />
                        <label htmlFor={`subtask-${task.id}-${idx}`}>{subtask.text}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
