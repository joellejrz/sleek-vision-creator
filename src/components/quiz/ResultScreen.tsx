
import React from "react";
import { Check, PartyPopper, Star, Diamond, Sparkles, Share2 } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      
      <CardHeader className="text-center pb-4 bg-gradient-to-r from-deep-teal to-soft-emerald rounded-b-3xl">
        <div className="mx-auto bg-white/20 backdrop-blur-sm p-5 rounded-full mb-4 shadow-glow">
          {archetypeData?.icon || <Sparkles className="h-10 w-10 text-white" />}
        </div>
        <CardTitle className="text-4xl font-display font-bold text-white mb-2">
          You Are a{" "}
          <span className="block">
            {archetypeData?.title || "Content Creator"}
          </span>
        </CardTitle>
        <CardDescription className="text-lg text-white/90 font-medium">
          {archetypeData?.tagline || "Your content has unique potential."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-6 pt-6 pb-2">
        <div className="bg-muted/30 border border-primary/10 rounded-xl p-5 shadow-glow-subtle">
          <h3 className="font-medium mb-2 text-lg text-gradient-primary">AI-Generated Insight</h3>
          <p className="text-muted-foreground">
            {archetypeData?.description || "You have a unique voice in the content creation world. Your authentic perspective matters."}
          </p>
        </div>
        
        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roadmap">Roadmap Preview</TabsTrigger>
            <TabsTrigger value="share">Share Result</TabsTrigger>
          </TabsList>
          <TabsContent value="roadmap" className="mt-4">
            <div className="bg-gradient-to-br from-deep-blue/90 to-deep-teal/90 p-6 rounded-xl text-white">
              <h3 className="font-medium mb-4 text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> Your Creator Roadmap
              </h3>
              
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-white/90">Personal brand positioning strategy for your archetype</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-white/90">Content calendar tailored to your strengths</p>
                </div>
                <div className="flex items-start gap-2 opacity-60">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p>Monetization blueprint with 5+ revenue streams <span className="text-accent">(Premium)</span></p>
                </div>
                <div className="flex items-start gap-2 opacity-60">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p>AI-powered content templates <span className="text-accent">(Premium)</span></p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-all shadow-glow-button"
                onClick={onUpgrade}
              >
                Unlock Your Full Roadmap
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="share" className="mt-4">
            <div className="bg-muted/30 p-6 rounded-xl border border-muted">
              <h3 className="font-medium mb-4 text-lg flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" /> Share Your Creator Archetype
              </h3>
              <div className="flex justify-center gap-3 mb-4">
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path></svg>
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground">Share your results with your network and get personalized content strategies.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button variant="outline" onClick={onContinue} className="hover:bg-muted transition-colors">
          Continue with Free Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultScreen;
