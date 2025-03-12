
import { Paintbrush, Video, Lightbulb, Dumbbell, Dog } from "lucide-react";
import { ReactNode } from "react";

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  subtext?: string;
  icon?: ReactNode;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "If money & time didn't exist, what would you create?",
    options: [
      { id: "aesthetic", label: "🎨 Aesthetic Artistry", description: "Photography, Interior Design, Fashion, Beauty, Visual Content", icon: <Paintbrush className="h-5 w-5" /> },
      { id: "cinematic", label: "🎥 Cinematic & Storytelling", description: "Travel, Documentary, Short Films, Emotional Narratives", icon: <Video className="h-5 w-5" /> },
      { id: "knowledge", label: "💡 High-Value Knowledge", description: "Business, Finance, Self-Development, Psychology, Science", icon: <Lightbulb className="h-5 w-5" /> },
      { id: "transformation", label: "🏋️‍♀️ Transformation & Wellness", description: "Fitness, Health, Nutrition, Mindset, Biohacking", icon: <Dumbbell className="h-5 w-5" /> },
      { id: "lifestyle", label: "🐶 Lifestyle & Vibes", description: "Daily Life, Pets, Relationships, Community Building", icon: <Dog className="h-5 w-5" /> },
    ]
  },
  {
    id: 2,
    question: "What matters most in your content journey?",
    options: [
      { id: "monetize", label: "💰 I want to monetize & make serious $$$", description: "Financial freedom through content creation" },
      { id: "express", label: "✨ I want to express myself & build a community", description: "Connection and authentic self-expression" },
      { id: "viral", label: "🎭 I want to go viral & become a personality", description: "Fame, reach, and widespread influence" },
      { id: "value", label: "🛠 I want to create something high-value & long-term", description: "Lasting impact and sustained growth" },
    ]
  },
  {
    id: 3,
    question: "What makes you magnetic to people?",
    options: [
      { id: "aesthetic-vibe", label: "⚡ My unique aesthetic & vibes", description: "People want to be me", subtext: "Fashion, Beauty, Lifestyle" },
      { id: "knowledge-insight", label: "📚 My knowledge & insights", description: "People trust my brain", subtext: "Business, Self-Improvement, Tech" },
      { id: "transformation-story", label: "💪 My transformation story", description: "People want my results", subtext: "Fitness, Health, Wellness" },
      { id: "humor-authenticity", label: "😂 My humor & authenticity", description: "People love my energy", subtext: "Entertainment, Relatable Content" },
      { id: "nature-connection", label: "🐾 My connection with animals & nature", description: "People love the warmth", subtext: "Pet Content, Nature Vlogs" },
    ]
  }
];

export default quizQuestions;
