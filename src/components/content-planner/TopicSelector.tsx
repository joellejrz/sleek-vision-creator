
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  BarChart,
  Code,
  Briefcase,
  Music,
  Dumbbell,
  Feather,
  BookOpen,
  Film,
  Diamond,
  Home,
  Plane,
  Dog,
  Gamepad,
  PaintBucket,
} from "lucide-react";

interface TopicSelectorProps {
  onTopicSelect: (topic: string) => void;
}

const topicCategories = [
  {
    id: "beauty",
    name: "Beauty & Makeup",
    description: "Skincare, Hair, Makeup Tutorials, Reviews",
    icon: <PaintBucket className="h-5 w-5 text-pink-500" />,
  },
  {
    id: "fashion",
    name: "Fashion & Style",
    description: "OOTDs, Hauls, Trend Reports, Luxury Fashion",
    icon: <Feather className="h-5 w-5 text-purple-500" />,
  },
  {
    id: "tech",
    name: "Tech & AI",
    description: "Latest Tech, AI Innovations, Coding, Reviews",
    icon: <Code className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "politics",
    name: "Politics & News",
    description: "Hot Topics, Social Issues, Breaking News",
    icon: <BarChart className="h-5 w-5 text-red-500" />,
  },
  {
    id: "entertainment",
    name: "Entertainment & Pop Culture",
    description: "Movies, TV, Celebrities, Music",
    icon: <Music className="h-5 w-5 text-purple-500" />,
  },
  {
    id: "fitness",
    name: "Fitness & Wellness",
    description: "Workouts, Nutrition, Biohacking, Self-Improvement",
    icon: <Dumbbell className="h-5 w-5 text-green-500" />,
  },
  {
    id: "spirituality",
    name: "Spirituality & Manifestation",
    description: "Affirmations, Energy Work, Higher Self",
    icon: <Sparkles className="h-5 w-5 text-accent-gold" />,
  },
  {
    id: "development",
    name: "Self-Development & Success",
    description: "Entrepreneurship, Mindset, Motivation",
    icon: <BookOpen className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "filmmaking",
    name: "Filmmaking & Storytelling",
    description: "Cinematic Content, Short Films, Narrative Videos",
    icon: <Film className="h-5 w-5 text-red-500" />,
  },
  {
    id: "luxury",
    name: "Luxury & Lifestyle",
    description: "High-End Brands, Wealth, Success Vlogs",
    icon: <Diamond className="h-5 w-5 text-accent-gold" />,
  },
  {
    id: "home",
    name: "Home & Interior Design",
    description: "Home Aesthetic, Decor, DIY, Home Tours",
    icon: <Home className="h-5 w-5 text-green-500" />,
  },
  {
    id: "travel",
    name: "Travel & Digital Nomad Life",
    description: "Vlogs, Exotic Locations, Remote Work",
    icon: <Plane className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "pets",
    name: "Pets & Animal Content",
    description: "Dog Training, Cute Animal Clips, Pet Products",
    icon: <Dog className="h-5 w-5 text-orange-500" />,
  },
  {
    id: "gaming",
    name: "Gaming & Esports",
    description: "Gameplays, Reviews, Streaming Content",
    icon: <Gamepad className="h-5 w-5 text-purple-500" />,
  },
];

export const TopicSelector: React.FC<TopicSelectorProps> = ({ onTopicSelect }) => {
  return (
    <div className="py-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Choose Your Content Niche</h3>
        <p className="text-muted-foreground">
          Select a general topic before describing your content to receive more accurate AI suggestions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {topicCategories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="flex items-start p-4 h-auto justify-start gap-3 transition-all hover:bg-accent/50 hover:border-primary"
            onClick={() => onTopicSelect(category.name)}
          >
            <div className="mt-0.5">{category.icon}</div>
            <div className="text-left">
              <div className="font-medium">{category.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{category.description}</div>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200 dark:border-purple-900">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-accent-gold flex-shrink-0" />
          <p className="text-sm">
            Selecting a niche ensures your AI suggestions for captions, hashtags, and engagement insights are tailored to your specific content area.
          </p>
        </div>
      </div>
    </div>
  );
};
