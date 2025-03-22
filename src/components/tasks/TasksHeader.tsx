
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { List, Grid } from "lucide-react";

interface TasksHeaderProps {
  userName: string;
  tasksToday: number;
  viewMode: "feed" | "card";
  setViewMode: (mode: "feed" | "card") => void;
}

const TasksHeader = ({ userName, tasksToday, viewMode, setViewMode }: TasksHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Hey {userName}, your content plan for today is ready!
        </h1>
        <p className="text-muted-foreground">
          You have {tasksToday} tasks scheduled for today.
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setViewMode("feed")} 
          className={viewMode === "feed" ? "bg-muted text-foreground" : ""}
        >
          <List className="h-4 w-4 mr-2" />
          Feed
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setViewMode("card")}
          className={viewMode === "card" ? "bg-muted text-foreground" : ""}
        >
          <Grid className="h-4 w-4 mr-2" />
          Board
        </Button>
      </div>
    </div>
  );
};

export default TasksHeader;
