
import { Button } from "@/components/ui/button";
import { List, Grid } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TasksHeaderProps {
  userName: string;
  tasksToday: number;
  viewMode: "feed" | "card";
  setViewMode: (mode: "feed" | "card") => void;
}

const TasksHeader = ({ userName, tasksToday, viewMode, setViewMode }: TasksHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 sm:gap-4">
      <div>
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">
          Hey {userName}, {isMobile ? 'your plan' : 'your content plan for today is ready'}!
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          You have {tasksToday} tasks scheduled for today.
        </p>
      </div>
      
      <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setViewMode("feed")} 
          className={`text-xs px-2 h-8 ${viewMode === "feed" ? "bg-muted text-foreground" : ""}`}
        >
          <List className="h-3.5 w-3.5 mr-1 sm:mr-2" />
          Feed
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setViewMode("card")}
          className={`text-xs px-2 h-8 ${viewMode === "card" ? "bg-muted text-foreground" : ""}`}
        >
          <Grid className="h-3.5 w-3.5 mr-1 sm:mr-2" />
          Board
        </Button>
      </div>
    </div>
  );
};

export default TasksHeader;
