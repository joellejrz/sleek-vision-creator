
import { Task } from "./TaskItem";

export const colorToClass = (color: string = "green") => {
  const colorMap: {[key: string]: string} = {
    green: "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-l-green-400",
    blue: "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-400",
    purple: "bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-l-purple-400",
    red: "bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-l-red-400",
    yellow: "bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-l-yellow-400",
    teal: "bg-gradient-to-r from-teal-50 to-teal-100 border-l-4 border-l-teal-400",
    pink: "bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-l-pink-400",
    orange: "bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-l-orange-400",
  };
  
  return colorMap[color] || colorMap.green;
};

export const calculateBreakTime = (currentTask: Task, nextTask: Task) => {
  // Using start/end times if available, otherwise using due dates as approximation
  const currentEndTime = currentTask.endTime || currentTask.due;
  const nextStartTime = nextTask.startTime || nextTask.due;
  
  // Simple format check (this could be more sophisticated with proper date parsing)
  if (currentEndTime && nextStartTime) {
    // Extract hour value for simple comparison
    const currentHour = currentEndTime.match(/(\d+):(\d+)/);
    const nextHour = nextStartTime.match(/(\d+):(\d+)/);
    
    if (currentHour && nextHour) {
      const currentTimeMinutes = parseInt(currentHour[1]) * 60 + parseInt(currentHour[2]);
      const nextTimeMinutes = parseInt(nextHour[1]) * 60 + parseInt(nextHour[2]);
      
      // Calculate difference in minutes
      const diffMinutes = nextTimeMinutes - currentTimeMinutes;
      
      // Only show break if there's a meaningful gap (e.g., more than 15 minutes)
      if (diffMinutes > 15) {
        return `${Math.floor(diffMinutes / 60)}hr ${diffMinutes % 60}min break`;
      }
    }
  }
  
  return null;
};

export const sortTasksByTime = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    // Extract times for sorting
    const aTime = a.startTime || a.due;
    const bTime = b.startTime || b.due;
    return aTime.localeCompare(bTime);
  });
};
