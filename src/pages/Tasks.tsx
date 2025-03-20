
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Filter, 
  ChevronDown, 
  Search,
  TrendingUp, 
  CalendarDays, 
  Clock, 
  CheckCircle, 
  Layout, 
  List,
  Grid,
  BellRing
} from "lucide-react";
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

// Mock data for tasks with more visual content
const tasksData = [
  {
    id: 1,
    title: "Create Instagram carousel post on feature benefits",
    completed: false,
    priority: "high" as const,
    due: "Today, 2:00 PM",
    aiSuggested: true,
    color: "blue",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Respond to comments on yesterday's post",
    completed: false,
    priority: "medium" as const,
    due: "Today, 4:00 PM",
    aiSuggested: false,
    color: "green",
  },
  {
    id: 3,
    title: "Film short tutorial video for TikTok",
    completed: false,
    priority: "medium" as const,
    due: "Tomorrow, 10:00 AM",
    aiSuggested: true,
    color: "purple",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Update content calendar for next week",
    completed: false,
    priority: "low" as const,
    due: "Friday, 12:00 PM",
    aiSuggested: false,
    color: "teal",
  },
  {
    id: 5,
    title: "Research trending hashtags for next campaign",
    completed: true,
    priority: "medium" as const,
    due: "Completed yesterday",
    aiSuggested: false,
    color: "yellow",
  },
];

// AI suggested tasks with more context
const aiSuggestedTasks = [
  {
    title: "Repurpose your top performing blog post into a carousel for Instagram",
    reasoning: "This content performed 47% better than average on your blog",
    priority: "high" as const,
    image: "/placeholder.svg",
  },
  {
    title: "Create a poll asking followers about their biggest challenge",
    reasoning: "Polls increase engagement by 23% on average",
    priority: "medium" as const,
  },
  {
    title: "Share a behind-the-scenes look at your workflow",
    reasoning: "Behind-the-scenes content gets 31% more saves",
    priority: "medium" as const,
    image: "/placeholder.svg",
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"feed" | "card">("feed");
  const { toast } = useToast();
  
  // Get user's first name for personalized greeting
  const userName = "Creator"; // This would come from user profile
  
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
      description: `"${newTask.title}" has been added to your content plan.`,
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
      description: "The task has been removed from your content plan.",
    });
  };

  const handleAddAiTask = (task: any) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      completed: false,
      priority: task.priority as "high" | "medium" | "low",
      due: "Today",
      aiSuggested: true,
      color: ["blue", "purple", "teal", "pink", "orange"][Math.floor(Math.random() * 5)],
      imageSrc: task.image,
    };

    setTasks([newTask, ...tasks]);
    toast({
      title: "AI Task Added",
      description: `"${task.title}" has been added to your content plan.`,
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

  // Apply filters and search
  const filteredTasks = tasks.filter(task => {
    // Apply search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply tag filters
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

  // Count tasks due today
  const tasksToday = tasks.filter(task => task.due.toLowerCase().includes('today')).length;

  return (
    <div className={`space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hey {userName}, your content plan for today is ready!
          </h1>
          <p className="text-muted-foreground">
            You have {tasksToday} tasks scheduled for today.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode("feed")} 
            className={viewMode === "feed" ? "bg-muted" : ""}>
            <List className="h-4 w-4 mr-2" />
            Feed
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode("card")}
            className={viewMode === "card" ? "bg-muted" : ""}>
            <Grid className="h-4 w-4 mr-2" />
            Board
          </Button>
        </div>
      </div>

      {/* Quick Filters Row */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'trending' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('trending')}
        >
          <TrendingUp className="h-4 w-4 text-rose-500" />
          Trending
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'dueToday' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('dueToday')}
        >
          <CalendarDays className="h-4 w-4 text-blue-500" />
          Today
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'upcoming' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('upcoming')}
        >
          <Clock className="h-4 w-4 text-purple-500" />
          Upcoming
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'completed' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('completed')}
        >
          <CheckCircle className="h-4 w-4 text-green-500" />
          Completed
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'aiSuggested' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('aiSuggested')}
        >
          <BellRing className="h-4 w-4 text-amber-500" />
          AI Suggested
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Find your next content task..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button onClick={() => setIsTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
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

      <ProgressTracker completed={completedTasks.length} total={tasks.length} />

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
                viewMode={viewMode}
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
                viewMode={viewMode}
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
