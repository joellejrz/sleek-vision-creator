
import { ArchetypeKey } from "./creatorArchetypes";

export interface KeepCalmContent {
  text: string;
  backgroundImage: string;
  icon: string;
  textColor: string;
}

const keepCalmContent: Record<ArchetypeKey, KeepCalmContent> = {
  "aesthetic": {
    text: "SERVE LOOKS",
    backgroundImage: "/lovable-uploads/e486a849-9117-4d49-b468-110ba548a755.png",
    icon: "👗",
    textColor: "text-white"
  },
  "tech": {
    text: "INNOVATE",
    backgroundImage: "/lovable-uploads/0bb0a683-227a-4f46-87ed-405491e935a9.png",
    icon: "💻",
    textColor: "text-white"
  },
  "wellness": {
    text: "KEEP PUSHING",
    backgroundImage: "/lovable-uploads/e486a849-9117-4d49-b468-110ba548a755.png",
    icon: "🏋️",
    textColor: "text-white"
  },
  "home": {
    text: "MAKE IT COZY",
    backgroundImage: "/lovable-uploads/0bb0a683-227a-4f46-87ed-405491e935a9.png",
    icon: "🏠",
    textColor: "text-white"
  },
  "travel": {
    text: "EXPLORE MORE",
    backgroundImage: "/lovable-uploads/e486a849-9117-4d49-b468-110ba548a755.png",
    icon: "✈️",
    textColor: "text-white"
  },
  "pet": {
    text: "PAW-SITIVELY SHINE",
    backgroundImage: "/lovable-uploads/0bb0a683-227a-4f46-87ed-405491e935a9.png",
    icon: "🐾",
    textColor: "text-white"
  },
  "business": {
    text: "BUILD EMPIRES",
    backgroundImage: "/lovable-uploads/e486a849-9117-4d49-b468-110ba548a755.png",
    icon: "📊",
    textColor: "text-white"
  },
  "entertainment": {
    text: "BE ICONIC",
    backgroundImage: "/lovable-uploads/0bb0a683-227a-4f46-87ed-405491e935a9.png",
    icon: "🎬",
    textColor: "text-white"
  },
  "development": {
    text: "GROW DAILY",
    backgroundImage: "/lovable-uploads/e486a849-9117-4d49-b468-110ba548a755.png",
    icon: "📚",
    textColor: "text-white"
  },
  "spiritual": {
    text: "MANIFEST IT",
    backgroundImage: "/lovable-uploads/0bb0a683-227a-4f46-87ed-405491e935a9.png",
    icon: "✨",
    textColor: "text-white"
  },
  "brand": {
    text: "DON'T CHASE, ATTRACT",
    backgroundImage: "/lovable-uploads/e486a849-9117-4d49-b468-110ba548a755.png",
    icon: "👑",
    textColor: "text-white"
  },
  "digital": {
    text: "CREATE VALUE",
    backgroundImage: "/lovable-uploads/0bb0a683-227a-4f46-87ed-405491e935a9.png",
    icon: "💎",
    textColor: "text-white"
  }
};

export default keepCalmContent;
