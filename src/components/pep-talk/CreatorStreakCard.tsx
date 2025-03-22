
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
    <Card className="transition-all hover:shadow-md">
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
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-accent-gold" />
              <span className="font-medium">{streakData.current} Day Streak</span>
            </div>
            <Badge variant="outline">{getStreakProgressMessage()}</Badge>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
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
