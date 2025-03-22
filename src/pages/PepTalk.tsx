
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import StreakGoalDialog from "@/components/streak/StreakGoalDialog";
import ChatContainer from "@/components/pep-talk/ChatContainer";
import ContentGrowthCard from "@/components/pep-talk/ContentGrowthCard";
import CreatorStreakCard from "@/components/pep-talk/CreatorStreakCard";

const PepTalk = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [streakData, setStreakData] = useState({
    current: 12,
    target: 30,
    percentage: 40,
  });
  const [streakDialogOpen, setStreakDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSetStreakGoal = (days: number) => {
    setStreakData(prev => ({
      ...prev,
      target: days,
      percentage: Math.round((prev.current / days) * 100)
    }));
    
    toast.success(`New streak goal set: ${days} days!`, {
      description: "Keep up the momentum to reach your goal!",
    });
  };

  return (
    <div className={`space-y-6 px-4 py-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Pep-Talk Coach</h1>
          <p className="text-muted-foreground">
            Get motivation, content advice, and engagement strategies
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="general">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Coaching</SelectItem>
              <SelectItem value="motivation">Motivation Boost</SelectItem>
              <SelectItem value="engagement">Engagement Recovery</SelectItem>
              <SelectItem value="growth">Growth Strategy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col">
          <ChatContainer />
        </div>

        <div className="space-y-6">
          <CreatorStreakCard 
            streakData={streakData} 
            onOpenStreakDialog={() => setStreakDialogOpen(true)} 
          />
          <ContentGrowthCard />
        </div>
      </div>
      
      <StreakGoalDialog 
        open={streakDialogOpen}
        onOpenChange={setStreakDialogOpen}
        onSetGoal={handleSetStreakGoal}
        currentStreak={streakData.current}
        currentGoal={streakData.target}
      />
    </div>
  );
};

export default PepTalk;
