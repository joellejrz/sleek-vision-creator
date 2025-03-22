
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TaskTimeline from "./TaskTimeline";
import { Task } from "./TaskItem";

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
  return (
    <Card className="border dark:border-slate-700">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
        <CardTitle className="text-lg sm:text-2xl">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        {tasks.length === 0 ? (
          <div className="text-center py-4 sm:py-8 text-muted-foreground text-sm">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <TaskTimeline 
            tasks={tasks}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
