
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import TaskDialog from "@/components/tasks/TaskDialog";
import TaskSuggestions from "@/components/tasks/TaskSuggestions";
import ProgressTracker from "@/components/tasks/ProgressTracker";
import TasksHeader from "@/components/tasks/TasksHeader";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskTabs from "@/components/tasks/TaskTabs";
import { useTasks } from "@/hooks/useTasks";
import { aiSuggestedTasks } from "@/components/tasks/TaskData";
import { useIsMobile } from "@/hooks/use-mobile";

const Tasks = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"feed" | "card">("feed");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Get user's first name for personalized greeting
  const userName = "Creator"; // This would come from user profile
  
  // Use the tasks hook to manage tasks state and operations
  const {
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
  } = useTasks();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateMoreTasks = () => {
    toast({
      title: "Generating New Suggestions",
      description: "Our AI is analyzing your content strategy for new task suggestions.",
    });
    // In a real app, this would call an API to generate new suggestions
  };

  return (
    <div className={`space-y-2 sm:space-y-8 px-3 sm:px-5 md:px-8 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      {/* Tasks header with user greeting and view mode toggle */}
      <TasksHeader 
        userName={userName} 
        tasksToday={tasksToday} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
      />

      {/* Task filtering UI */}
      <TaskFilters 
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsTaskDialogOpen={setIsTaskDialogOpen}
        handleFilterTasks={handleFilterTasks}
      />

      {/* Progress tracker */}
      <ProgressTracker completed={completedTasks.length} total={activeTasks.length + completedTasks.length} />

      <div className="grid gap-3 sm:gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {/* Tasks tabs for active/completed tasks */}
          <TaskTabs 
            activeTasks={activeTasks}
            completedTasks={completedTasks}
            handleToggleComplete={handleToggleComplete}
            handleDeleteTask={handleDeleteTask}
            viewMode={viewMode}
          />
        </div>

        {!isMobile && (
          <div>
            {/* AI task suggestions */}
            <TaskSuggestions 
              suggestions={aiSuggestedTasks}
              onAddTask={handleAddAiTask}
              onGenerateMore={handleGenerateMoreTasks}
            />
          </div>
        )}
      </div>

      {/* Task creation dialog */}
      <TaskDialog 
        open={isTaskDialogOpen} 
        onOpenChange={setIsTaskDialogOpen} 
        onAddTask={handleAddTask} 
      />
      
      {/* Show AI task suggestions at the bottom for mobile */}
      {isMobile && (
        <div className="mt-3">
          <TaskSuggestions 
            suggestions={aiSuggestedTasks}
            onAddTask={handleAddAiTask}
            onGenerateMore={handleGenerateMoreTasks}
          />
        </div>
      )}
    </div>
  );
};

export default Tasks;
