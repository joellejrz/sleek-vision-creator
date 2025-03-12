
import { Monitor, Diamond, Leaf, House, Plane, PawPrint, TrendingUp, Theater, BookOpen, Wand2, Trophy, ShoppingBag } from "lucide-react";
import { ReactNode } from "react";

export interface CreatorArchetype {
  title: string;
  tagline: string;
  description: string;
  cta: string;
  icon: ReactNode;
}

export type ArchetypeKey = "tech" | "aesthetic" | "wellness" | "home" | "travel" | "pet" | "business" | "entertainment" | "development" | "spiritual" | "brand" | "digital";

const creatorArchetypes: Record<ArchetypeKey, CreatorArchetype> = {
  "tech": {
    title: "Tech & AI Content Visionary",
    tagline: "Your beauty is an asset. Your mind is a weapon.",
    description: "Attractive people get 78% more engagement. What if you used that magnetism to dominate in tech?",
    cta: "Unlock the full blueprint",
    icon: <Monitor className="h-10 w-10 text-accent" />
  },
  "aesthetic": {
    title: "Aesthetic Lifestyle Icon",
    tagline: "People want your vibe, your aesthetic, your style. You are the IT Creator.",
    description: "Did you know high-status creators build 2x faster brand deals than others? Your lifestyle is a brand—let's monetize it.",
    cta: "Unlock how to make $$$ from your looks, content & presence",
    icon: <Diamond className="h-10 w-10 text-accent" />
  },
  "wellness": {
    title: "Wellness Visionary",
    tagline: "Your transformation is power. Your mindset, your body, your energy—people want to learn from you.",
    description: "Wellness creators make 4x more revenue from coaching, brand deals & courses than entertainment influencers.",
    cta: "Unlock your fitness empire blueprint",
    icon: <Leaf className="h-10 w-10 text-accent" />
  },
  "home": {
    title: "Home Aesthetic Guru",
    tagline: "Your sense of space, design & comfort is elite. You were born to curate beauty.",
    description: "Did you know interior creators earn the highest affiliate commissions per post? People spend more $$$ on home aesthetics than any other content niche.",
    cta: "Turn your passion into a monetized home brand",
    icon: <House className="h-10 w-10 text-accent" />
  },
  "travel": {
    title: "Travel Experience Architect",
    tagline: "You were born to explore & share the world's magic.",
    description: "Travel creators can monetize 5+ ways (sponsorships, digital products, partnerships, tourism deals). Want the roadmap?",
    cta: "Unlock how to get paid to travel",
    icon: <Plane className="h-10 w-10 text-accent" />
  },
  "pet": {
    title: "Pet Content Whisperer",
    tagline: "Your connection with animals is powerful. Your content makes people feel warmth, happiness & love.",
    description: "Did you know pet content has the highest engagement rate across all platforms? That means serious monetization potential.",
    cta: "Unlock how to build a pet content empire",
    icon: <PawPrint className="h-10 w-10 text-accent" />
  },
  "business": {
    title: "Business & Finance Powerhouse",
    tagline: "Your analytical mind and valuable insights can transform people's finances and businesses.",
    description: "Finance creators earn 6x higher CPM rates than lifestyle creators. Your knowledge is literally worth more.",
    cta: "Unlock your finance content empire strategy",
    icon: <TrendingUp className="h-10 w-10 text-accent" />
  },
  "entertainment": {
    title: "Entertainment & Comedy Icon",
    tagline: "People don't just watch you—they feel like they KNOW you. Your energy is magnetic.",
    description: "Relatable creators explode 5x faster on TikTok & Reels because humor = instant shareability.",
    cta: "Unlock your viral formula & how to monetize your personality",
    icon: <Theater className="h-10 w-10 text-accent" />
  },
  "development": {
    title: "Self-Development Mentor",
    tagline: "Your knowledge transforms people's minds. You don't just think differently—you MAKE people think differently.",
    description: "Self-improvement creators are the most trusted—and trust = high-ticket $$$ sales & brand deals.",
    cta: "Unlock how to build your coaching empire & monetize your wisdom",
    icon: <BookOpen className="h-10 w-10 text-accent" />
  },
  "spiritual": {
    title: "Esoteric & Spiritual Creator",
    tagline: "Your energy is rare. You are meant to guide others toward awakening & empowerment.",
    description: "Spiritual creators build hyper-loyal audiences—this means lifelong brand & product opportunities.",
    cta: "Unlock how to turn your esoteric wisdom into a movement",
    icon: <Wand2 className="h-10 w-10 text-accent" />
  },
  "brand": {
    title: "Personal Brand Powerhouse",
    tagline: "You don't just create content—you create a PRESENCE. People are drawn to you.",
    description: "Personal branding is the highest-income skill of the digital era. You become the product, the movement, the business.",
    cta: "Unlock how to position yourself as a high-status brand & build long-term influence",
    icon: <Trophy className="h-10 w-10 text-accent" />
  },
  "digital": {
    title: "Digital Business Creator",
    tagline: "You are sitting on knowledge that can make you serious money. You just need the blueprint to package & sell it.",
    description: "Digital products have the highest profit margins—this is your passive income key.",
    cta: "Unlock how to turn your knowledge into automated income",
    icon: <ShoppingBag className="h-10 w-10 text-accent" />
  }
};

export default creatorArchetypes;
