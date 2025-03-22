
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Flame, Rocket, Star, Trophy } from "lucide-react";

interface StreakGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetGoal: (days: number) => void;
  currentStreak: number;
}

const goalOptions = [
  {
    days: 7,
    name: "7-Day Sprint",
    description: "Perfect for a quick boost!",
    icon: <Sparkles className="h-4 w-4 text-accent-gold" />,
  },
  {
    days: 14,
    name: "14-Day Boost",
    description: "Build consistency & confidence!",
    icon: <Flame className="h-4 w-4 text-orange-400" />,
  },
  {
    days: 30,
    name: "30-Day Mastery",
    description: "Form a lasting habit!",
    icon: <Rocket className="h-4 w-4 text-primary" />,
  },
  {
    days: 0,
    name: "Custom Goal",
    description: "Set your own ambitious target!",
    icon: <Star className="h-4 w-4 text-purple-400" />,
  },
];

const StreakGoalDialog = ({ open, onOpenChange, onSetGoal, currentStreak }: StreakGoalDialogProps) => {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [customGoal, setCustomGoal] = useState<string>("");

  const handleSetGoal = () => {
    if (selectedGoal === 0 && customGoal) {
      // Custom goal
      const days = parseInt(customGoal, 10);
      if (!isNaN(days) && days > 0) {
        onSetGoal(days);
        onOpenChange(false);
      }
    } else if (selectedGoal) {
      // Predefined goal
      onSetGoal(selectedGoal);
      onOpenChange(false);
    }
  };

  const handleSelectGoal = (days: number) => {
    setSelectedGoal(days);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Trophy className="h-5 w-5 text-accent-gold" />
            Set Your New Streak Goal!
          </DialogTitle>
          <DialogDescription>
            Pick a goal or set your own to keep your creative flow going!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Recommended Goals</Label>
            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal.days}
                  onClick={() => handleSelectGoal(goal.days)}
                  className={`flex flex-col items-start gap-1 rounded-lg border p-3 transition-all hover:bg-muted/50 text-left ${
                    selectedGoal === goal.days ? "border-primary bg-muted" : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {goal.icon}
                    <span className="font-medium">{goal.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{goal.description}</p>
                </button>
              ))}
            </div>
          </div>

          {selectedGoal === 0 && (
            <div className="space-y-2">
              <Label htmlFor="custom-goal">Custom Goal (days):</Label>
              <Input 
                id="custom-goal"
                type="number" 
                placeholder="Enter number of days"
                min="1"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
              />
            </div>
          )}

          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium">Current streak: {currentStreak} days</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSetGoal} disabled={!selectedGoal || (selectedGoal === 0 && !customGoal)}>
            Set Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StreakGoalDialog;
