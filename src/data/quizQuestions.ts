
import { Paintbrush, Video, Lightbulb, Dumbbell, Dog, Clock, Instagram, Youtube, Twitter, Smartphone, Mail, Users, Megaphone, Globe } from "lucide-react";
import React from "react";

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  subtext?: string;
  icon?: React.ReactNode;
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
      { 
        id: "aesthetic", 
        label: "🎨 Aesthetic Artistry", 
        description: "Photography, Interior Design, Fashion, Beauty, Visual Content", 
        icon: React.createElement(Paintbrush, { className: "h-5 w-5" }) 
      },
      { 
        id: "cinematic", 
        label: "🎥 Cinematic & Storytelling", 
        description: "Travel, Documentary, Short Films, Emotional Narratives", 
        icon: React.createElement(Video, { className: "h-5 w-5" }) 
      },
      { 
        id: "knowledge", 
        label: "💡 High-Value Knowledge", 
        description: "Business, Finance, Self-Development, Psychology, Science", 
        icon: React.createElement(Lightbulb, { className: "h-5 w-5" }) 
      },
      { 
        id: "transformation", 
        label: "🏋️‍♀️ Transformation & Wellness", 
        description: "Fitness, Health, Nutrition, Mindset, Biohacking", 
        icon: React.createElement(Dumbbell, { className: "h-5 w-5" }) 
      },
      { 
        id: "lifestyle", 
        label: "🐶 Lifestyle & Vibes", 
        description: "Daily Life, Pets, Relationships, Community Building", 
        icon: React.createElement(Dog, { className: "h-5 w-5" }) 
      },
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
  },
  {
    id: 4,
    question: "How long have you been creating content?",
    options: [
      { 
        id: "newbie", 
        label: "🔰 Just getting started", 
        description: "Less than 6 months of experience",
        icon: React.createElement(Clock, { className: "h-5 w-5" }) 
      },
      { 
        id: "beginner", 
        label: "🌱 Building momentum", 
        description: "6 months to 1 year of experience",
        icon: React.createElement(Clock, { className: "h-5 w-5" }) 
      },
      { 
        id: "intermediate", 
        label: "⚡ Gaining traction", 
        description: "1-2 years of consistent content creation",
        icon: React.createElement(Clock, { className: "h-5 w-5" }) 
      },
      { 
        id: "experienced", 
        label: "🔥 Established creator", 
        description: "2-5 years in the content game",
        icon: React.createElement(Clock, { className: "h-5 w-5" }) 
      },
      { 
        id: "veteran", 
        label: "🏆 Seasoned pro", 
        description: "5+ years of content creation experience",
        icon: React.createElement(Clock, { className: "h-5 w-5" }) 
      },
    ]
  },
  {
    id: 5,
    question: "What platforms do you primarily use for content?",
    options: [
      { 
        id: "instagram", 
        label: "📸 Instagram", 
        description: "Visual content, Stories, Reels",
        icon: React.createElement(Instagram, { className: "h-5 w-5" }) 
      },
      { 
        id: "youtube", 
        label: "🎬 YouTube", 
        description: "Long-form video content",
        icon: React.createElement(Youtube, { className: "h-5 w-5" }) 
      },
      { 
        id: "twitter", 
        label: "🐦 Twitter/X", 
        description: "Text-based content, threads, engagement",
        icon: React.createElement(Twitter, { className: "h-5 w-5" }) 
      },
      { 
        id: "tiktok", 
        label: "📱 TikTok", 
        description: "Short-form video content",
        icon: React.createElement(Smartphone, { className: "h-5 w-5" }) 
      },
      { 
        id: "multi", 
        label: "🌐 Multiple platforms", 
        description: "Omnichannel content strategy",
        icon: React.createElement(Globe, { className: "h-5 w-5" }) 
      },
    ]
  },
  {
    id: 6,
    question: "How did you hear about us?",
    options: [
      { 
        id: "social", 
        label: "📱 Social media", 
        description: "Instagram, Twitter, TikTok, etc.",
        icon: React.createElement(Users, { className: "h-5 w-5" }) 
      },
      { 
        id: "friend", 
        label: "👥 Friend or colleague", 
        description: "Word of mouth recommendation",
        icon: React.createElement(Users, { className: "h-5 w-5" }) 
      },
      { 
        id: "email", 
        label: "📧 Email newsletter", 
        description: "You received an email about us",
        icon: React.createElement(Mail, { className: "h-5 w-5" }) 
      },
      { 
        id: "ad", 
        label: "🔊 Advertisement", 
        description: "You saw an ad for our platform",
        icon: React.createElement(Megaphone, { className: "h-5 w-5" }) 
      },
      { 
        id: "search", 
        label: "🔍 Search engine", 
        description: "You found us through a web search",
        icon: React.createElement(Globe, { className: "h-5 w-5" }) 
      },
    ]
  }
];

export default quizQuestions;
