
import { 
  SunMedium, 
  Zap, 
  Brush, 
  GraduationCap, 
  Bed, 
  Coffee, 
  FileText, 
  Clock 
} from "lucide-react";
import { Task } from "./TaskItem";

interface TaskIconProps {
  task: Task;
  className?: string;
}

const TaskIcon = ({ task, className = "h-5 w-5 text-white" }: TaskIconProps) => {
  const title = task.title.toLowerCase();
  const category = task.category?.toLowerCase() || '';
  
  if (title.includes("gratitude") || title.includes("meditation"))
    return <SunMedium className={className} />;
  if (title.includes("stretch") || title.includes("workout") || title.includes("exercise"))
    return <Zap className={className} />;
  if (title.includes("skin") || title.includes("hair") || title.includes("care") || title.includes("massage"))
    return <Brush className={className} />;
  if (title.includes("uni") || title.includes("class") || title.includes("study") || title.includes("school"))
    return <GraduationCap className={className} />;
  if (title.includes("break") || title.includes("rest") || title.includes("nap"))
    return <Bed className={className} />;
  if (title.includes("coffee") || title.includes("breakfast") || title.includes("lunch") || title.includes("dinner"))
    return <Coffee className={className} />;
  if (title.includes("post") || title.includes("content") || title.includes("video"))
    return <FileText className={className} />;
    
  // Fall back to category or default
  if (category.includes("education"))
    return <GraduationCap className={className} />;
  if (category.includes("wellness"))
    return <SunMedium className={className} />;
    
  // Default icon
  return <Clock className={className} />;
};

export default TaskIcon;
