
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
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { GoalCardsContainer } from "./GoalCardsContainer";
import { CurrentStreakIndicator } from "./CurrentStreakIndicator";
import { useStreakTitles } from "./useStreakTitles";

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
  
  const { 
    getStreakTitle, 
    getProgressMessage, 
    getStreakStatusMessage 
  } = useStreakTitles(currentStreak);

  useEffect(() => {
    // Reset selected goal when dialog opens
    if (open) {
      setSelectedGoal(null);
    }
  }, [open]);

  const handleSetGoal = () => {
    if (selectedGoal) {
      onSetGoal(selectedGoal);
      onOpenChange(false);
    }
  };

  const GoalContent = () => (
    <div className="space-y-4 py-2">
      <GoalCardsContainer 
        currentStreak={currentStreak}
        currentGoal={currentGoal}
        selectedGoal={selectedGoal}
        onSelectGoal={setSelectedGoal}
      />
      <CurrentStreakIndicator 
        currentStreak={currentStreak} 
        progressMessage={getProgressMessage()}
      />
    </div>
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
              Current: {getStreakStatusMessage()} ({currentStreak} days)
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
            Current: {getStreakStatusMessage()} ({currentStreak} days)
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
