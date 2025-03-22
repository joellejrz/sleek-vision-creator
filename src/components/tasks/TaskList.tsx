
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CalendarClock, 
  Sparkles, 
  Trash2, 
  Clock, 
  MessageCircle, 
  Image,
  TrendingUp,
  GraduationCap,
  Bed,
  SunMedium,
  Coffee,
  Brush,
  FileText,
  Zap
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

  // Sort tasks by their start time if available, otherwise by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Extract times for sorting
    const aTime = a.startTime || a.due;
    const bTime = b.startTime || b.due;
    return aTime.localeCompare(bTime);
  });

  // Generate icon based on title or category
  const getTaskIcon = (task: Task) => {
    const title = task.title.toLowerCase();
    const category = task.category?.toLowerCase() || '';
    
    if (title.includes("gratitude") || title.includes("meditation"))
      return <SunMedium className="h-5 w-5 text-white" />;
    if (title.includes("stretch") || title.includes("workout") || title.includes("exercise"))
      return <Zap className="h-5 w-5 text-white" />;
    if (title.includes("skin") || title.includes("hair") || title.includes("care") || title.includes("massage"))
      return <Brush className="h-5 w-5 text-white" />;
    if (title.includes("uni") || title.includes("class") || title.includes("study") || title.includes("school"))
      return <GraduationCap className="h-5 w-5 text-white" />;
    if (title.includes("break") || title.includes("rest") || title.includes("nap"))
      return <Bed className="h-5 w-5 text-white" />;
    if (title.includes("coffee") || title.includes("breakfast") || title.includes("lunch") || title.includes("dinner"))
      return <Coffee className="h-5 w-5 text-white" />;
    if (title.includes("post") || title.includes("content") || title.includes("video"))
      return <FileText className="h-5 w-5 text-white" />;
      
    // Fall back to category or default
    if (category.includes("education"))
      return <GraduationCap className="h-5 w-5 text-white" />;
    if (category.includes("wellness"))
      return <SunMedium className="h-5 w-5 text-white" />;
      
    // Default icon
    return <Clock className="h-5 w-5 text-white" />;
  };

  // Helper to calculate breaks between tasks
  const calculateBreakTime = (currentTask: Task, nextTask: Task) => {
    // Using start/end times if available, otherwise using due dates as approximation
    const currentEndTime = currentTask.endTime || currentTask.due;
    const nextStartTime = nextTask.startTime || nextTask.due;
    
    // Simple format check (this could be more sophisticated with proper date parsing)
    if (currentEndTime && nextStartTime) {
      // Extract hour value for simple comparison
      const currentHour = currentEndTime.match(/(\d+):(\d+)/);
      const nextHour = nextStartTime.match(/(\d+):(\d+)/);
      
      if (currentHour && nextHour) {
        const currentTimeMinutes = parseInt(currentHour[1]) * 60 + parseInt(currentHour[2]);
        const nextTimeMinutes = parseInt(nextHour[1]) * 60 + parseInt(nextHour[2]);
        
        // Calculate difference in minutes
        const diffMinutes = nextTimeMinutes - currentTimeMinutes;
        
        // Only show break if there's a meaningful gap (e.g., more than 15 minutes)
        if (diffMinutes > 15) {
          return `${Math.floor(diffMinutes / 60)}hr ${diffMinutes % 60}min break`;
        }
      }
    }
    
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className="relative">
            {/* Left sidebar with times */}
            <div className="absolute left-0 top-0 w-14 bottom-0 border-r border-slate-200 flex flex-col items-center">
              {sortedTasks.map((task, index) => (
                <div 
                  key={`time-${task.id}`}
                  className="text-xs text-slate-500 py-10 first:pt-0"
                >
                  {task.startTime || task.due.split(',')[0]}
                </div>
              ))}
            </div>
            
            {/* Timeline content */}
            <div className="ml-14 pl-10 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
              
              {/* Tasks with timeline nodes */}
              {sortedTasks.map((task, index) => (
                <div key={task.id} className="relative mb-8">
                  {/* Timeline node */}
                  <div 
                    className={`absolute left-5 w-10 h-10 rounded-full -translate-x-1/2 flex items-center justify-center ${task.color ? `bg-${task.color}-500` : 'bg-green-500'}`}
                  >
                    {getTaskIcon(task)}
                  </div>
                  
                  {/* Task content */}
                  <div className="ml-10 pt-1">
                    <div className="text-xs text-slate-500 mb-1">
                      {task.startTime && task.endTime ? (
                        <>
                          {task.startTime} — {task.endTime}
                          {task.duration && ` (${task.duration})`}
                        </>
                      ) : (
                        <>{task.due}</>
                      )}
                      <span className="ml-2 inline-flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.duration || "10 min"}
                      </span>
                    </div>
                    
                    <div 
                      className={`rounded-lg p-4 mb-2 hover:shadow-md transition-all cursor-pointer ${
                        expandedTask === task.id ? 'shadow-md' : ''
                      } ${task.completed ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
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
                          
                          {task.imageSrc && expandedTask === task.id && (
                            <div className="rounded-md overflow-hidden my-2">
                              <img 
                                src={task.imageSrc} 
                                alt={`${task.title} preview`} 
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          )}
                          
                          {expandedTask === task.id && (
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
                    
                    {/* Break time indicator */}
                    {index < sortedTasks.length - 1 && (
                      calculateBreakTime(task, sortedTasks[index + 1]) && (
                        <div className="pl-7 py-4 text-sm text-slate-500 flex items-center">
                          <div className="w-7 h-0.5 bg-amber-300 mr-4 flex-shrink-0"></div>
                          <Bed className="h-4 w-4 mr-2 text-amber-500" />
                          <span>A well-deserved break.</span>
                          <span className="ml-2 text-xs opacity-70">
                            {calculateBreakTime(task, sortedTasks[index + 1])}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
