
import { ReactNode } from "react";

export interface StreakGoalOption {
  days: number;
  name: string;
  description: string;
  icon: ReactNode;
  requiredStreak: number;
  detailedDescription: string;
  articleLink?: string;
  articleTitle?: string;
  locked?: boolean;
}
