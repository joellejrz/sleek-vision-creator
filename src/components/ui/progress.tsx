
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progressColor?: string;
  goalType?: "spark" | "habit" | "lifestyle" | "custom";
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, progressColor, goalType, ...props }, ref) => {
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
          finalColorClass
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
