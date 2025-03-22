
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/tasks/TaskList";
import { Task } from "@/components/tasks/TaskItem";

interface TaskTabsProps {
  activeTasks: Task[];
  completedTasks: Task[];
  handleToggleComplete: (taskId: number) => void;
  handleDeleteTask: (taskId: number) => void;
  viewMode: "feed" | "card";
}

const TaskTabs = ({ 
  activeTasks, 
  completedTasks, 
  handleToggleComplete, 
  handleDeleteTask,
  viewMode
}: TaskTabsProps) => {
  return (
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
  );
};

export default TaskTabs;
