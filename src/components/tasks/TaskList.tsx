
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
      <CardHeader className="pb-1 p-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-[10px]">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-0 px-2">
        {tasks.length === 0 ? (
          <div className="text-center py-3 text-muted-foreground text-xs">
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
