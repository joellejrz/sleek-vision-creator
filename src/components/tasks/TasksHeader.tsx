
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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1 sm:gap-4">
      <div>
        <h1 className="text-lg sm:text-3xl font-bold tracking-tight text-foreground">
          Hey {userName}, {isMobile ? 'your plan' : 'your content plan for today is ready'}!
        </h1>
        <p className="text-[10px] sm:text-sm text-muted-foreground">
          You have {tasksToday} tasks scheduled for today.
        </p>
      </div>
      
      <div className="flex gap-1 sm:gap-2 mt-0.5 sm:mt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setViewMode("feed")} 
          className={`text-[10px] px-1.5 h-6 sm:h-8 sm:text-xs sm:px-2 ${viewMode === "feed" ? "bg-muted text-foreground" : ""}`}
        >
          <List className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-0.5 sm:mr-2" />
          Feed
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setViewMode("card")}
          className={`text-[10px] px-1.5 h-6 sm:h-8 sm:text-xs sm:px-2 ${viewMode === "card" ? "bg-muted text-foreground" : ""}`}
        >
          <Grid className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-0.5 sm:mr-2" />
          Board
        </Button>
      </div>
    </div>
  );
};

export default TasksHeader;
