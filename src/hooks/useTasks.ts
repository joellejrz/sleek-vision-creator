
import { useState } from "react";
import { Task } from "@/components/tasks/TaskItem";
import { tasksData } from "@/components/tasks/TaskData";
import { useToast } from "@/hooks/use-toast";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleAddTask = (newTask: Task) => {
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
      priority: task.priority,
      due: "Today",
      startTime: task.startTime || "09:00",
      endTime: task.endTime || "10:00",
      duration: task.duration || "1 hr",
      category: task.category || "content",
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

  return {
    tasks,
    activeTasks,
    completedTasks,
    tasksToday,
    activeFilter,
    searchQuery,
    setSearchQuery,
    handleAddTask,
    handleToggleComplete,
    handleDeleteTask,
    handleAddAiTask,
    handleFilterTasks
  };
};
