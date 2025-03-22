
import React from "react";
import { Sparkles, Brain, Zap, Waves, Rocket } from "lucide-react";
import { StreakGoalOption } from "./StreakGoalTypes";

export const useStreakGoalOptions = (): StreakGoalOption[] => {
  // Define the goal options with the new progressive approach
  const goalOptions: StreakGoalOption[] = [
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
      icon: <Waves className="h-4 w-4 text-blue-500" />,
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

  return goalOptions;
};
