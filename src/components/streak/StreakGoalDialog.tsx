
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
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Zap, Wave, Rocket, Lock, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StreakGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetGoal: (days: number) => void;
  currentStreak: number;
  currentGoal?: number;
}

interface GoalOption {
  days: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  requiredStreak: number;
  detailedDescription: string;
  locked?: boolean;
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
  
  // Define the goal options with the new progressive approach
  const goalOptions: GoalOption[] = [
    {
      days: 7,
      name: "7-Day Spark",
      description: "Your first streak, let's get you hooked!",
      icon: <Sparkles className="h-4 w-4 text-accent-gold" />,
      requiredStreak: 0,
      detailedDescription: "Initial quick win to get momentum rolling. Perfect for building initial confidence."
    },
    {
      days: 21,
      name: "21-Day Habit Builder",
      description: "Make consistency second nature.",
      icon: <Brain className="h-4 w-4 text-orange-400" />,
      requiredStreak: 7,
      detailedDescription: "21 days creates a new habit by literally rewiring your brain. Based on neuroscientific research, this period helps solidify neural pathways."
    },
    {
      days: 30,
      name: "30-Day Power Streak",
      description: "One month down, unstoppable creativity ahead!",
      icon: <Zap className="h-4 w-4 text-yellow-500" />,
      requiredStreak: 21,
      detailedDescription: "Solidifies habit after the initial 21-day milestone. A full month of consistent action builds tremendous confidence."
    },
    {
      days: 60,
      name: "60-Day Deep Dive",
      description: "Two months strong—you're killing it!",
      icon: <Wave className="h-4 w-4 text-blue-500" />,
      requiredStreak: 30,
      detailedDescription: "Sustained consistency for deeper habit integration. At this point, your habit is becoming deeply ingrained in your daily routine."
    },
    {
      days: 90,
      name: "90-Day Lifestyle Lock",
      description: "Officially part of your lifestyle now!",
      icon: <Rocket className="h-4 w-4 text-primary" />,
      requiredStreak: 60,
      detailedDescription: "90 days transforms your new habit into an automatic lifestyle. Neural pathways significantly strengthen after ~3 months of consistent behavior."
    }
  ];

  // Check which goals should be locked based on current streak
  const processedGoalOptions = goalOptions.map(goal => ({
    ...goal,
    locked: goal.requiredStreak > currentStreak
  }));

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span className="text-accent-gold">🏆</span>
            Set Your Streak Goal!
          </DialogTitle>
          <DialogDescription>
            Start with a 7-day goal, then unlock more challenging levels as you progress!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Goal Levels</Label>
            <div className="grid grid-cols-1 gap-3">
              {processedGoalOptions.map((goal) => (
                <button
                  key={goal.days}
                  onClick={() => handleSelectGoal(goal.days, goal.locked)}
                  disabled={goal.locked}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50 text-left ${
                    selectedGoal === goal.days ? "border-primary bg-muted" : 
                    goal.locked ? "border-border bg-muted/10 opacity-70" : "border-border"
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {goal.locked ? <Lock className="h-5 w-5 text-muted-foreground" /> : goal.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{goal.name}</span>
                      {currentGoal === goal.days && (
                        <Badge variant="outline" className="ml-auto">
                          <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                          Current
                        </Badge>
                      )}
                      {goal.locked && (
                        <Badge variant="outline" className="ml-auto">Locked</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>
                    <p className="text-xs mt-2">{goal.detailedDescription}</p>
                    {goal.requiredStreak > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="italic">
                          Unlocks after a {goal.requiredStreak}-day streak
                        </span>
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium">Current streak: {currentStreak} days</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
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
