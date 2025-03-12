
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Image, 
  Paintbrush, 
  Video, 
  Lightbulb, 
  Heart, 
  Dumbbell, 
  Dog, 
  DollarSign, 
  Sparkles, 
  Award, 
  Rocket, 
  Home, 
  Globe, 
  Wand2, 
  Crown, 
  BookOpen,
  ChevronRight
} from "lucide-react";

// Quiz questions and options
const quizQuestions = [
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

// Creator archetypes based on quiz answers
const creatorArchetypes = {
  "tech": {
    title: "Tech & AI Content Visionary",
    tagline: "Your beauty is an asset. Your mind is a weapon.",
    description: "Attractive people get 78% more engagement. What if you used that magnetism to dominate in tech?",
    cta: "Unlock the full blueprint",
    icon: <Lightbulb className="h-10 w-10 text-accent" />
  },
  "aesthetic": {
    title: "Aesthetic Lifestyle Icon",
    tagline: "People want your vibe, your aesthetic, your style. You are the IT Creator.",
    description: "Did you know high-status creators build 2x faster brand deals than others? Your lifestyle is a brand—let's monetize it.",
    cta: "Unlock how to make $$$ from your looks, content & presence",
    icon: <Sparkles className="h-10 w-10 text-accent" />
  },
  "wellness": {
    title: "Wellness Visionary",
    tagline: "Your transformation is power. Your mindset, your body, your energy—people want to learn from you.",
    description: "Wellness creators make 4x more revenue from coaching, brand deals & courses than entertainment influencers.",
    cta: "Unlock your fitness empire blueprint",
    icon: <Heart className="h-10 w-10 text-accent" />
  },
  "home": {
    title: "Home Aesthetic Guru",
    tagline: "Your sense of space, design & comfort is elite. You were born to curate beauty.",
    description: "Did you know interior creators earn the highest affiliate commissions per post? People spend more $$$ on home aesthetics than any other content niche.",
    cta: "Turn your passion into a monetized home brand",
    icon: <Home className="h-10 w-10 text-accent" />
  },
  "travel": {
    title: "Travel Experience Architect",
    tagline: "You were born to explore & share the world's magic.",
    description: "Travel creators can monetize 5+ ways (sponsorships, digital products, partnerships, tourism deals). Want the roadmap?",
    cta: "Unlock how to get paid to travel",
    icon: <Globe className="h-10 w-10 text-accent" />
  },
  "pet": {
    title: "Pet Content Whisperer",
    tagline: "Your connection with animals is powerful. Your content makes people feel warmth, happiness & love.",
    description: "Did you know pet content has the highest engagement rate across all platforms? That means serious monetization potential.",
    cta: "Unlock how to build a pet content empire",
    icon: <Dog className="h-10 w-10 text-accent" />
  },
  "entertainment": {
    title: "Entertainment & Comedy Icon",
    tagline: "People don't just watch you—they feel like they KNOW you. Your energy is magnetic.",
    description: "Relatable creators explode 5x faster on TikTok & Reels because humor = instant shareability.",
    cta: "Unlock your viral formula & how to monetize your personality",
    icon: <Sparkles className="h-10 w-10 text-accent" />
  },
  "development": {
    title: "Self-Development Mentor",
    tagline: "Your knowledge transforms people's minds. You don't just think differently—you MAKE people think differently.",
    description: "Self-improvement creators are the most trusted—and trust = high-ticket $$$ sales & brand deals.",
    cta: "Unlock how to build your coaching empire & monetize your wisdom",
    icon: <Rocket className="h-10 w-10 text-accent" />
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
    icon: <Crown className="h-10 w-10 text-accent" />
  },
  "digital": {
    title: "Digital Business Creator",
    tagline: "You are sitting on knowledge that can make you serious money. You just need the blueprint to package & sell it.",
    description: "Digital products have the highest profit margins—this is your passive income key.",
    cta: "Unlock how to turn your knowledge into automated income",
    icon: <BookOpen className="h-10 w-10 text-accent" />
  }
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState("loading");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [archetype, setArchetype] = useState("");
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle the loading stage animation timing
  useEffect(() => {
    if (stage === "loading") {
      const timer = setTimeout(() => {
        setStage("quiz");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Update progress when currentQuestion changes
  useEffect(() => {
    if (stage === "quiz") {
      setProgress(((currentQuestion) / quizQuestions.length) * 100);
    }
  }, [currentQuestion, stage]);

  // Determine user's archetype based on answers
  const determineArchetype = () => {
    // This is a simplified algorithm - in a real app, this would be more sophisticated
    const primaryInterest = answers[1];
    const monetizationFocus = answers[2];
    
    // Map answers to archetypes (simplified version)
    if (primaryInterest === "aesthetic") {
      return "aesthetic";
    } else if (primaryInterest === "knowledge") {
      return monetizationFocus === "monetize" ? "digital" : "development";
    } else if (primaryInterest === "transformation") {
      return "wellness";
    } else if (primaryInterest === "lifestyle") {
      return answers[3] === "nature-connection" ? "pet" : "brand";
    } else if (primaryInterest === "cinematic") {
      return monetizationFocus === "viral" ? "entertainment" : "travel";
    }
    
    // Default fallback
    return "digital";
  };

  const handleOptionSelect = (questionId: number, optionId: string) => {
    setIsAnimating(true);
    
    // Update answers
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
    
    setTimeout(() => {
      // Move to next question or results
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz completed, determine archetype
        const userArchetype = determineArchetype();
        setArchetype(userArchetype);
        setStage("result");
        setProgress(100);
      }
      setIsAnimating(false);
    }, 500);
  };

  const handleUpgrade = () => {
    setStage("premium");
  };

  const handleContinue = () => {
    // In a real app, you'd save the user's archetype to their profile
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4">
      {/* Loading Screen */}
      {stage === "loading" && (
        <div className="text-center animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-accent/20 animate-pulse-soft flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-accent/40 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent animate-float flex items-center justify-center">
                <Sparkles className="text-primary-foreground h-8 w-8" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-display font-bold text-primary-foreground animate-fade-in mb-4">
            Step into your power...
          </h2>
          <p className="text-primary-foreground/80 text-lg animate-fade-in animate-delay-300">
            Let's unlock your true content magic
          </p>
        </div>
      )}

      {/* Quiz Stage */}
      {stage === "quiz" && (
        <Card className="w-full max-w-3xl animate-scale-in">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-2xl font-display">
                Content Creator Archetype Quiz
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <CardDescription className="pt-4">
              {quizQuestions[currentQuestion].question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`space-y-4 ${isAnimating ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
              {quizQuestions[currentQuestion].options.map((option) => (
                <div
                  key={option.id}
                  className="p-4 border rounded-lg hover:border-accent hover:bg-accent/5 cursor-pointer transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-md"
                  onClick={() => handleOptionSelect(quizQuestions[currentQuestion].id, option.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 bg-muted rounded-full p-2">
                      {option.icon || <Sparkles className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{option.label}</h3>
                      {option.description && (
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      )}
                      {option.subtext && (
                        <p className="text-xs text-muted-foreground mt-1">{option.subtext}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Stage */}
      {stage === "result" && archetype && (
        <Card className="w-full max-w-3xl animate-scale-in">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-accent/10 p-5 rounded-full mb-4">
              {creatorArchetypes[archetype as keyof typeof creatorArchetypes]?.icon || <Award className="h-10 w-10 text-accent" />}
            </div>
            <CardTitle className="text-3xl font-display mb-2">
              You Are a{" "}
              <span className="text-gradient-primary">
                {creatorArchetypes[archetype as keyof typeof creatorArchetypes]?.title || "Content Creator"}
              </span>
            </CardTitle>
            <CardDescription className="text-lg">
              {creatorArchetypes[archetype as keyof typeof creatorArchetypes]?.tagline || "Your content has unique potential."}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6 pb-2">
            <p className="text-muted-foreground p-4 border border-muted rounded-lg bg-muted/30">
              {creatorArchetypes[archetype as keyof typeof creatorArchetypes]?.description || "You have a unique voice in the content creation world. Your authentic perspective matters."}
            </p>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
              <h3 className="font-medium mb-2">Your journey starts NOW</h3>
              <p className="text-sm text-muted-foreground mb-4">
                But most people stay stuck at the starting line. If you want to actually build this dream content career...
                you need the roadmap.
              </p>
              <Button className="w-full bg-gradient-primary" onClick={handleUpgrade}>
                {creatorArchetypes[archetype as keyof typeof creatorArchetypes]?.cta || "Unlock Your Full Potential"} → Premium Plan
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-2">
            <Button variant="outline" onClick={handleContinue}>
              Continue with Free Plan
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Premium Stage */}
      {stage === "premium" && (
        <Card className="w-full max-w-4xl animate-scale-in">
          <CardHeader className="text-center relative overflow-hidden pb-8">
            <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
            <div className="relative z-10">
              <div className="mx-auto bg-accent/20 p-4 rounded-full inline-flex mb-4">
                <Crown className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-3xl font-display mb-2">
                Unlock Your Full Content Creator Blueprint
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                You now know your power. The only difference between creators who make it & those who don't? Execution.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-muted/30 rounded-lg p-6 border border-muted">
              <h3 className="text-xl font-display mb-4">What Premium Unlocks:</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 bg-accent/20 rounded-full p-1">
                    <CheckIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-medium">Personalized step-by-step monetization roadmap</span>
                    <p className="text-sm text-muted-foreground">Customized for your specific content archetype</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 bg-accent/20 rounded-full p-1">
                    <CheckIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-medium">Algorithm mastery & brand building blueprint</span>
                    <p className="text-sm text-muted-foreground">Learn how to leverage social media algorithms</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 bg-accent/20 rounded-full p-1">
                    <CheckIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-medium">Insider cheat codes for brand deals & income</span>
                    <p className="text-sm text-muted-foreground">Digital products & high-ticket monetization</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 bg-accent/20 rounded-full p-1">
                    <CheckIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-medium">Access to exclusive community & mentorship</span>
                    <p className="text-sm text-muted-foreground">Network with successful creators in your niche</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground mb-6">Every day you wait, someone else is building the content empire you want.</p>
              
              <div className="flex flex-col gap-4">
                <Button size="lg" className="bg-gradient-primary">
                  Join the Premium Program Now! <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => navigate("/dashboard")}>
                    Compare Plans
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                    I'm Not Sure Yet
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// CheckIcon component for the premium page
const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export default Onboarding;
