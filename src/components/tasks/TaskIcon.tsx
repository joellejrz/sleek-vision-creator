
import { Task } from "./TaskItem";
import { CalendarDays, Pencil, Palette, Music, Film, Book, Globe, Smartphone } from "lucide-react";

interface TaskIconProps {
  task: Task;
  className?: string;
}

const TaskIcon = ({ task, className = "h-4 w-4" }: TaskIconProps) => {
  // Choose icon based on task category
  if (task.category) {
    switch(task.category.toLowerCase()) {
      case 'content':
        return <Pencil className={`text-white ${className}`} />;
      case 'design':
        return <Palette className={`text-white ${className}`} />;
      case 'music':
        return <Music className={`text-white ${className}`} />;
      case 'video':
        return <Film className={`text-white ${className}`} />;
      case 'reading':
        return <Book className={`text-white ${className}`} />;
      case 'social':
        return <Globe className={`text-white ${className}`} />;
      case 'mobile':
        return <Smartphone className={`text-white ${className}`} />;
      default:
        return <CalendarDays className={`text-white ${className}`} />;
    }
  }
  
  // Default icon if no category specified
  return <CalendarDays className={`text-white ${className}`} />;
};

export default TaskIcon;
