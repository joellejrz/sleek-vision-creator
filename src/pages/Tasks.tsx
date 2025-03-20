
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskDialog from "@/components/tasks/TaskDialog";
import TaskList from "@/components/tasks/TaskList";
import TaskSuggestions from "@/components/tasks/TaskSuggestions";
import ProgressTracker from "@/components/tasks/ProgressTracker";
import { useToast } from "@/hooks/use-toast";

// Mock data for tasks
const tasksData = [
  {
    id: 1,
    title: "Create Instagram carousel post on feature benefits",
    completed: false,
    priority: "high",
    due: "Today, 2:00 PM",
    aiSuggested: true,
  },
  {
    id: 2,
    title: "Respond to comments on yesterday's post",
    completed: false,
    priority: "medium",
    due: "Today, 4:00 PM",
    aiSuggested: false,
  },
  {
    id: 3,
    title: "Film short tutorial video for TikTok",
    completed: false,
    priority: "medium",
    due: "Tomorrow, 10:00 AM",
    aiSuggested: true,
  },
  {
    id: 4,
    title: "Update content calendar for next week",
    completed: false,
    priority: "low",
    due: "Friday, 12:00 PM",
    aiSuggested: false,
  },
  {
    id: 5,
    title: "Research trending hashtags for next campaign",
    completed: true,
    priority: "medium",
    due: "Completed yesterday",
    aiSuggested: false,
  },
];

// AI suggested tasks
const aiSuggestedTasks = [
  {
    title: "Repurpose your top performing blog post into a carousel for Instagram",
    reasoning: "This content performed 47% better than average on your blog",
    priority: "high",
  },
  {
    title: "Create a poll asking followers about their biggest challenge",
    reasoning: "Polls increase engagement by 23% on average",
    priority: "medium",
  },
  {
    title: "Share a behind-the-scenes look at your workflow",
    reasoning: "Behind-the-scenes content gets 31% more saves",
    priority: "medium",
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = (newTask: any) => {
    setTasks([newTask, ...tasks]);
    toast({
      title: "Task Created",
      description: `"${newTask.title}" has been added to your tasks.`,
    });
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "The task has been removed from your list.",
    });
  };

  const handleAddAiTask = (task: any) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      completed: false,
      priority: task.priority,
      due: "Today",
      aiSuggested: true,
    };

    setTasks([newTask, ...tasks]);
    toast({
      title: "AI Task Added",
      description: `"${task.title}" has been added to your tasks.`,
    });
  };

  const handleFilterTasks = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleGenerateMoreTasks = () => {
    toast({
      title: "Generating New Suggestions",
      description: "Our AI is analyzing your content strategy for new task suggestions.",
    });
    // In a real app, this would call an API to generate new suggestions
  };

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    if (!activeFilter) return true;
    if (activeFilter === 'high' || activeFilter === 'medium' || activeFilter === 'low') {
      return task.priority === activeFilter;
    }
    if (activeFilter === 'aiSuggested') {
      return task.aiSuggested;
    }
    if (activeFilter === 'dueToday') {
      return task.due.toLowerCase().includes('today');
    }
    return true;
  });

  const activeTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  return (
    <div className={`space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Tasks</h1>
          <p className="text-muted-foreground">
            Manage and prioritize your content creation tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {activeFilter ? `Filter: ${activeFilter}` : "Filter"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleFilterTasks('high')}>
                Priority: High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterTasks('medium')}>
                Priority: Medium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterTasks('low')}>
                Priority: Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterTasks('aiSuggested')}>
                AI Suggested
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterTasks('dueToday')}>
                Due Today
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ProgressTracker completed={completedTasks.length} total={tasks.length} />

      <div className="flex items-center gap-2">
        <Button onClick={() => setIsTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Tasks ({activeTasks.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4 mt-6">
              <TaskList 
                tasks={activeTasks} 
                title="Active Tasks"
                description="Tasks that need your attention, prioritized by importance"
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                emptyMessage="All caught up! Add new tasks to get started."
              />
            </TabsContent>
            <TabsContent value="completed" className="space-y-4 mt-6">
              <TaskList 
                tasks={completedTasks} 
                title="Completed Tasks"
                description="Tasks you've successfully completed"
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                emptyMessage="No completed tasks yet."
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <TaskSuggestions 
            suggestions={aiSuggestedTasks}
            onAddTask={handleAddAiTask}
            onGenerateMore={handleGenerateMoreTasks}
          />
        </div>
      </div>

      <TaskDialog 
        open={isTaskDialogOpen} 
        onOpenChange={setIsTaskDialogOpen} 
        onAddTask={handleAddTask} 
      />
    </div>
  );
};

export default Tasks;
