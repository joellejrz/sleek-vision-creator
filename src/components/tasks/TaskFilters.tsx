
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Filter,
  ChevronDown,
  Search,
  TrendingUp,
  CalendarDays,
  Clock,
  CheckCircle,
  BellRing
} from "lucide-react";

interface TaskFiltersProps {
  activeFilter: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsTaskDialogOpen: (isOpen: boolean) => void;
  handleFilterTasks: (filter: string) => void;
}

const TaskFilters = ({ 
  activeFilter, 
  searchQuery, 
  setSearchQuery, 
  setIsTaskDialogOpen, 
  handleFilterTasks 
}: TaskFiltersProps) => {
  return (
    <>
      {/* Quick Filters Row */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'trending' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('trending')}
        >
          <TrendingUp className="h-4 w-4 text-rose-500" />
          Trending
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'dueToday' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('dueToday')}
        >
          <CalendarDays className="h-4 w-4 text-blue-500" />
          Today
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'upcoming' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('upcoming')}
        >
          <Clock className="h-4 w-4 text-purple-500" />
          Upcoming
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'completed' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('completed')}
        >
          <CheckCircle className="h-4 w-4 text-green-500" />
          Completed
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${activeFilter === 'aiSuggested' ? 'bg-muted' : ''}`}
          onClick={() => handleFilterTasks('aiSuggested')}
        >
          <BellRing className="h-4 w-4 text-amber-500" />
          AI Suggested
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Find your next content task..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button onClick={() => setIsTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleFilterTasks('high')}>
              Priority: High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterTasks('medium')}>
              Priority: Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterTasks('low')}>
              Priority: Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterTasks('aiSuggested')}>
              AI Suggested
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterTasks('dueToday')}>
              Due Today
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default TaskFilters;
