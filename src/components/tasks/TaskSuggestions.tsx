
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap } from "lucide-react";

interface TaskSuggestion {
  title: string;
  reasoning: string;
  priority: string;
}

interface TaskSuggestionsProps {
  suggestions: TaskSuggestion[];
  onAddTask: (task: TaskSuggestion) => void;
  onGenerateMore: () => void;
}

const TaskSuggestions = ({ suggestions, onAddTask, onGenerateMore }: TaskSuggestionsProps) => {
  return (
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
          {suggestions.map((task, index) => (
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
                  <Button size="sm" onClick={() => onAddTask(task)}>
                    Add Task
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Separator />
          <Button variant="outline" className="w-full" onClick={onGenerateMore}>
            <Zap className="mr-2 h-4 w-4 text-accent-gold" />
            Generate More Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskSuggestions;
