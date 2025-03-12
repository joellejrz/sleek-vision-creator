
import React from "react";
import { Check, PartyPopper, Star, Diamond, Sparkles } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import creatorArchetypes from "@/data/creatorArchetypes";
import { ArchetypeKey } from "@/data/creatorArchetypes";

interface ResultScreenProps {
  archetype: string;
  showConfetti: boolean;
  onUpgrade: () => void;
  onContinue: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ 
  archetype, 
  showConfetti, 
  onUpgrade, 
  onContinue 
}) => {
  const archetypeData = creatorArchetypes[archetype as ArchetypeKey];

  return (
    <Card className="w-full max-w-3xl animate-scale-in relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4">
            <PartyPopper className="h-8 w-8 text-accent animate-float" />
          </div>
          <div className="absolute top-10 right-1/4">
            <Star className="h-6 w-6 text-primary animate-float animate-delay-200" />
          </div>
          <div className="absolute top-20 left-1/3">
            <Diamond className="h-5 w-5 text-accent animate-float animate-delay-300" />
          </div>
          <div className="absolute top-5 right-1/3">
            <Sparkles className="h-7 w-7 text-primary animate-float animate-delay-100" />
          </div>
        </div>
      )}
      
      <CardHeader className="text-center pb-2">
        <div className="mx-auto bg-accent/10 p-5 rounded-full mb-4">
          {archetypeData?.icon || <Sparkles className="h-10 w-10 text-accent" />}
        </div>
        <CardTitle className="text-3xl font-display mb-2">
          You Are a{" "}
          <span className="text-gradient-primary">
            {archetypeData?.title || "Content Creator"}
          </span>
        </CardTitle>
        <CardDescription className="text-lg">
          {archetypeData?.tagline || "Your content has unique potential."}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6 pb-2">
        <p className="text-muted-foreground p-4 border border-muted rounded-lg bg-muted/30">
          {archetypeData?.description || "You have a unique voice in the content creation world. Your authentic perspective matters."}
        </p>
        
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
          <h3 className="font-medium mb-2">Your journey starts NOW</h3>
          <p className="text-sm text-muted-foreground mb-4">
            But most people stay stuck at the starting line. If you want to actually build this dream content career...
            you need the roadmap.
          </p>
          <Button className="w-full bg-gradient-primary" onClick={onUpgrade}>
            Your dream career is waiting. Get the roadmap & start earning now → Unlock Premium
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-2">
        <Button variant="outline" onClick={onContinue}>
          Continue with Free Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultScreen;
