
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Zap } from "lucide-react";

interface CreatorStreakCardProps {
  streakData: {
    current: number;
    target: number;
    percentage: number;
  };
  onOpenStreakDialog: () => void;
}

const CreatorStreakCard = ({ streakData, onOpenStreakDialog }: CreatorStreakCardProps) => {
  // Get the next target based on current streak
  const getNextStreakTarget = () => {
    if (streakData.current < 7) return 7;
    if (streakData.current < 21) return 21;
    if (streakData.current < 30) return 30;
    if (streakData.current < 60) return 60;
    if (streakData.current < 90) return 90;
    return 90; // Already at max
  };

  // Get the streak progress message
  const getStreakProgressMessage = () => {
    const nextTarget = getNextStreakTarget();
    
    if (streakData.current >= 90) return "Unlimited streak achieved!";
    if (streakData.current >= 60) return `Building towards 90-Day Lifestyle`;
    if (streakData.current >= 30) return `Building towards 60-Day Deep Dive`;
    if (streakData.current >= 21) return `Building towards 30-Day Power Streak`;
    if (streakData.current >= 7) return `Building towards 21-Day Habit Builder`;
    return `Building towards 7-Day Spark`;
  };

  // Get the current streak status message
  const getStreakStatusMessage = () => {
    if (streakData.current >= 90) return "90-Day Lifestyle Change";
    if (streakData.current >= 60) return "60-Day Deep Habit";
    if (streakData.current >= 30) return "30-Day Challenge";
    if (streakData.current >= 21) return "21-Day Habit Builder";
    if (streakData.current >= 7) return "7-Day Spark";
    if (streakData.current > 0) return `Building towards 7-Day Spark`;
    return "Start Your Streak";
  };

  return (
    <Card className="transition-all hover:shadow-md bg-gradient-to-br from-gray-50/70 to-white/50 dark:from-gray-900/70 dark:to-gray-800/50 backdrop-blur-md border-white/20 dark:border-gray-700/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-accent-gold" />
          Creator Streak
        </CardTitle>
        <CardDescription>
          Track your content creation consistency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Current Streak</span>
                <span className="text-sm">{streakData.current}/{getNextStreakTarget()} days</span>
              </div>
              <Progress 
                value={(streakData.current / getNextStreakTarget()) * 100} 
                className="h-2.5"
                animate={true}
                goalType={
                  streakData.current >= 90 ? "lifestyle" :
                  streakData.current >= 60 ? "deep" :
                  streakData.current >= 30 ? "power" :
                  streakData.current >= 21 ? "habit" :
                  streakData.current >= 7 ? "spark" : "custom"
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/70 backdrop-blur-md rounded-lg">
            <div className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-accent-gold" />
              <span className="font-medium">{streakData.current} Day Streak</span>
            </div>
            <Badge variant="outline" className="bg-background/30 backdrop-blur-sm">{getStreakProgressMessage()}</Badge>
          </div>
          <Button 
            variant="outline" 
            className="w-full bg-background/30 backdrop-blur-sm hover:bg-background/50"
            onClick={onOpenStreakDialog}
          >
            <Target className="mr-2 h-4 w-4" />
            {getStreakStatusMessage()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorStreakCard;
