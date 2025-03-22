
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
