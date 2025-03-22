
import React, { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GoalCard } from "./GoalCard";
import { CurrentStreakIndicator } from "./CurrentStreakIndicator";
import { useStreakGoalOptions } from "./useStreakGoalOptions";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface StreakGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetGoal: (days: number) => void;
  currentStreak: number;
  currentGoal?: number;
}

const StreakGoalDialog = ({ 
  open, 
  onOpenChange, 
  onSetGoal, 
  currentStreak,
  currentGoal 
}: StreakGoalDialogProps) => {
  const { toast } = useToast();
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  // Import goal options from hook
  const goalOptions = useStreakGoalOptions();
  
  // Check which goals should be locked based on current streak
  const processedGoalOptions = goalOptions.map(goal => ({
    ...goal,
    locked: goal.requiredStreak > currentStreak
  }));

  // Get the title based on current streak
  const getStreakTitle = () => {
    if (currentStreak >= 90) return "90 Day Lifestyle Change";
    if (currentStreak >= 60) return "60 Day Deep Habit";
    if (currentStreak >= 30) return "30 Day Challenge";
    if (currentStreak >= 21) return "21 Day Habit Builder";
    if (currentStreak >= 7) return "7 Day Spark";
    return "Streak Goals";
  };

  useEffect(() => {
    // Reset selected goal when dialog opens
    if (open) {
      setSelectedGoal(null);
    }
  }, [open]);

  const handleSetGoal = () => {
    if (selectedGoal) {
      // Predefined goal
      onSetGoal(selectedGoal);
      onOpenChange(false);

      // Show celebration toast based on goal level
      const selectedGoalOption = goalOptions.find(g => g.days === selectedGoal);
      if (selectedGoalOption) {
        toast({
          title: `Unlocked: ${selectedGoalOption.name}!`,
          description: `🎉 You've set a ${selectedGoal}-day streak goal. ${
            selectedGoal === 21 ? "Time to rewire your brain!" : 
            selectedGoal === 30 ? "A full month of consistency ahead!" :
            selectedGoal === 60 ? "Going deep with your habit!" :
            selectedGoal === 90 ? "Transform this habit into your lifestyle!" : 
            "Let's build some momentum!"
          }`,
        });
      }
    }
  };

  const handleSelectGoal = (days: number, locked: boolean | undefined) => {
    if (locked) {
      // Show a toast explaining why the goal is locked
      const goal = processedGoalOptions.find(g => g.days === days);
      if (goal) {
        toast({
          title: `Goal Locked`,
          description: `Complete a ${goal.requiredStreak}-day streak first to unlock this level!`,
          variant: "destructive",
        });
      }
      return;
    }
    setSelectedGoal(days);
  };

  const GoalContent = () => (
    <>
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Goal Levels</Label>
          <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {processedGoalOptions.map((goal) => (
              <GoalCard
                key={goal.days}
                goal={goal}
                isSelected={selectedGoal === goal.days}
                isCurrentGoal={currentGoal === goal.days}
                onSelect={() => handleSelectGoal(goal.days, goal.locked)}
              />
            ))}
          </div>
        </div>

        <CurrentStreakIndicator currentStreak={currentStreak} />
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="px-4 pb-6">
          <DrawerHeader className="px-0">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <span className="text-accent-gold">🏆</span>
              {getStreakTitle()}
            </DrawerTitle>
            <DrawerDescription>
              Start with a 7-day goal, then unlock more challenging levels as you progress!
            </DrawerDescription>
          </DrawerHeader>
          
          <GoalContent />

          <DrawerFooter className="px-0 gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetGoal} disabled={!selectedGoal}>
              Set Goal
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span className="text-accent-gold">🏆</span>
            {getStreakTitle()}
          </DialogTitle>
          <DialogDescription>
            Start with a 7-day goal, then unlock more challenging levels as you progress!
          </DialogDescription>
        </DialogHeader>
        
        <GoalContent />

        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSetGoal} disabled={!selectedGoal}>
            Set Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StreakGoalDialog;
