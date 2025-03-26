
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progressColor?: string;
  goalType?: "spark" | "habit" | "power" | "deep" | "lifestyle" | "custom";
  animate?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, progressColor, goalType, animate = false, ...props }, ref) => {
  // Select color based on goal type
  let colorClass = "";
  
  if (goalType) {
    switch (goalType) {
      case "spark":
        colorClass = "from-accent-gold to-amber-400";
        break;
      case "habit":
        colorClass = "from-orange-400 to-red-500";
        break;
      case "power":
        colorClass = "from-yellow-400 to-yellow-600";
        break;
      case "deep":
        colorClass = "from-blue-400 to-blue-600";
        break;
      case "lifestyle":
        colorClass = "from-primary to-indigo-500";
        break;
      default:
        colorClass = "from-primary to-primary/70";
    }
  }
  
  // Use provided color or selected color based on goal type
  const finalColorClass = progressColor || (goalType ? colorClass : "from-primary to-primary/70");

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all bg-gradient-to-r",
            finalColorClass,
            animate && "shadow-glow-streak"
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      
      {animate && (
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <div 
            className="h-full animate-spark-travel"
            style={{ 
              width: "15px",
              left: `-15px`,
              transform: `translateX(${(value || 0)}%)`,
              position: "absolute",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
              filter: "blur(3px)"
            }}
          />
          <div className="absolute" style={{ 
            left: `calc(${value}% - 10px)`, 
            top: "-3px"
          }}>
            <Sparkles 
              className="h-4 w-4 text-white animate-pulse-soft" 
              style={{ filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))" }} 
            />
          </div>
        </div>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
