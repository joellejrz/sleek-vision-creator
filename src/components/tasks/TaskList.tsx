
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarClock, 
  Sparkles, 
  Trash2, 
  Clock, 
  MessageCircle, 
  Image, 
  ArrowRight, 
  TrendingUp,
  GripVertical 
} from "lucide-react";

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
  imageSrc?: string;
}

interface TaskListProps {
  tasks: Task[];
  title: string;
  description: string;
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  emptyMessage: string;
  viewMode?: "feed" | "card";
}

const TaskList = ({
  tasks,
  title,
  description,
  onToggleComplete,
  onDeleteTask,
  emptyMessage,
  viewMode = "feed",
}: TaskListProps) => {
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const toggleExpand = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const colorToClass = (color: string = "green") => {
    const colorMap: {[key: string]: string} = {
      green: "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-l-green-400",
      blue: "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-400",
      purple: "bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-l-purple-400",
      red: "bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-l-red-400",
      yellow: "bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-l-yellow-400",
      teal: "bg-gradient-to-r from-teal-50 to-teal-100 border-l-4 border-l-teal-400",
      pink: "bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-l-pink-400",
      orange: "bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-l-orange-400",
    };
    
    return colorMap[color] || colorMap.green;
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

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("text/plain", taskId.toString());
    setDraggingId(taskId);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
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
                className={`rounded-lg border p-4 transition-all duration-200 ${
                  expandedTask === task.id ? 'shadow-md' : ''
                } ${task.color ? colorToClass(task.color) : ''} ${
                  draggingId === task.id ? 'opacity-50' : ''
                } ${viewMode === "feed" ? "hover:shadow-md hover:translate-y-[-2px]" : ""}`}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
              >
                <div className="flex items-start gap-2">
                  <div 
                    className="cursor-grab p-1 text-muted-foreground hover:text-foreground mt-1"
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
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
                        
                        <div className="space-y-2 flex-1">
                          <div>
                            <label
                              htmlFor={`task-${task.id}`}
                              className={`font-medium text-base ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                              {task.title}
                              {task.aiSuggested && (
                                <Badge variant="outline" className="ml-2">
                                  <Sparkles className="mr-1 h-3 w-3 text-accent-gold" />
                                  AI
                                </Badge>
                              )}
                            </label>
                          </div>
                          
                          {viewMode === "feed" && task.imageSrc && (
                            <div className="rounded-md overflow-hidden my-2">
                              <img 
                                src={task.imageSrc} 
                                alt={`${task.title} preview`} 
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          )}
                          
                          {task.description && (
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarClock className="h-3 w-3" />
                              <span>{task.due}</span>
                            </div>
                            
                            {task.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">
                                  {task.duration}
                                </span>
                              </div>
                            )}
                            
                            {task.frequency && task.frequency !== "once" && (
                              <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs capitalize">
                                {task.frequency}
                              </span>
                            )}
                            
                            {priorityToIcon(task.priority)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="sr-only">Comment</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Image className="h-4 w-4" />
                          <span className="sr-only">Add image</span>
                        </Button>
                        
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
                    
                    {expandedTask === task.id && (
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="gap-1">
                          <ArrowRight className="h-3 w-3" />
                          Move to Next Stage
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
