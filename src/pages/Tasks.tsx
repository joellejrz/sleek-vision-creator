
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarClock, 
  Check, 
  ChevronDown, 
  Filter, 
  Plus, 
  Sparkles, 
  Trash2, 
  Zap, 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
      priority: "medium",
      due: "Today",
      aiSuggested: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
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
  };

  const handleAddAiTask = (task: any) => {
    const newTask = {
      id: tasks.length + 1,
      title: task.title,
      completed: false,
      priority: task.priority,
      due: "Today",
      aiSuggested: true,
    };

    setTasks([newTask, ...tasks]);
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

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
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuItem>Priority: High</DropdownMenuItem>
              <DropdownMenuItem>Priority: Medium</DropdownMenuItem>
              <DropdownMenuItem>Priority: Low</DropdownMenuItem>
              <DropdownMenuItem>AI Suggested</DropdownMenuItem>
              <DropdownMenuItem>Due Today</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
          className="flex-1"
        />
        <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
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
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Active Tasks</CardTitle>
                  <CardDescription>
                    Tasks that need your attention, prioritized by importance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeTasks.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Check className="mx-auto h-8 w-8 mb-2" />
                        <p>All caught up! Add new tasks to get started.</p>
                      </div>
                    ) : (
                      activeTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={() => handleToggleComplete(task.id)}
                              className="mt-1"
                              id={`task-${task.id}`}
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor={`task-${task.id}`}
                                className="font-medium"
                              >
                                {task.title}
                                {task.aiSuggested && (
                                  <Badge variant="outline" className="ml-2">
                                    <Sparkles className="mr-1 h-3 w-3 text-accent-gold" />
                                    AI Suggested
                                  </Badge>
                                )}
                              </label>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <CalendarClock className="mr-1 h-3 w-3" />
                                {task.due}
                                <Badge
                                  variant={
                                    task.priority === "high"
                                      ? "destructive"
                                      : task.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="ml-2 capitalize"
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete task</span>
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed" className="space-y-4 mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Completed Tasks</CardTitle>
                  <CardDescription>
                    Tasks you've successfully completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedTasks.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No completed tasks yet.</p>
                      </div>
                    ) : (
                      completedTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={() => handleToggleComplete(task.id)}
                              className="mt-1"
                              id={`task-${task.id}`}
                            />
                            <div className="space-y-1">
                              <label
                                htmlFor={`task-${task.id}`}
                                className="font-medium line-through text-muted-foreground"
                              >
                                {task.title}
                              </label>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <CalendarClock className="mr-1 h-3 w-3" />
                                {task.due}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete task</span>
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="transition-all hover:shadow-md h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-accent-gold" />
                  AI Task Suggestions
                </CardTitle>
              </div>
              <CardDescription>
                AI-recommended tasks based on your content strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiSuggestedTasks.map((task, index) => (
                  <div key={index} className="glass-card p-4 rounded-lg">
                    <div className="flex flex-col space-y-2">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        <Sparkles className="inline-block mr-1 h-3 w-3 text-accent-gold" />
                        {task.reasoning}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {task.priority} priority
                        </Badge>
                        <Button size="sm" onClick={() => handleAddAiTask(task)}>
                          Add Task
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Separator />
                <Button variant="outline" className="w-full">
                  <Zap className="mr-2 h-4 w-4 text-accent-gold" />
                  Generate More Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
