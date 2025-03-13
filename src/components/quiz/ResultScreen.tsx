
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.005 17.52h1.829L7.661 4.04H5.967z"></path></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766c-1.566-.43-7.83-.437-7.83-.437s-6.265-.007-7.832.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.51 2.51 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"></path></svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 2.98 1.75 3.99 1.12 1.05 2.72 1.5 4.26 1.45.06 1.17.11 2.35.12 3.52-.59.06-1.18.1-1.76.16-.32.04-.65.1-.96.19-.33.1-.65.24-.93.45-.3.22-.53.5-.72.81-.3.52-.39 1.12-.21 1.69.18.57.57 1.06 1.09 1.38.37.22.77.36 1.19.44.43.07.86.09 1.3.08.9-.01 1.8-.05 2.7-.15.42-.05.83-.12 1.24-.2v8.8c-1.09.12-2.18.22-3.28.3-.96.07-1.92.13-2.88.16-.96.02-1.91.03-2.87.01-1.14-.02-2.28-.1-3.41-.25-.69-.09-1.37-.21-2.05-.35-.87-.18-1.72-.42-2.53-.79-.48-.22-.94-.48-1.35-.85-.41-.37-.77-.8-1.03-1.3-.31-.59-.44-1.26-.37-1.92.05-.51.22-.99.52-1.39.29-.39.67-.71 1.09-.95.42-.24.87-.4 1.33-.5.46-.09.92-.13 1.39-.13-.17-.77-.45-1.5-.85-2.17-.4-.67-.9-1.27-1.48-1.76-.58-.49-1.23-.89-1.92-1.19-.01-1.34 0-2.69-.01-4.03.05-.02.1-.03.15-.05 1.22-.33 2.41-.77 3.48-1.48.97-.64 1.81-1.47 2.31-2.52.62-.74 1.08-1.61 1.33-2.55.24-1 .29-2.04.14-3.05 1.19-.03 2.39-.01 3.58-.02M10.94 3.38c.02.23.05.45.1.67.07.36.19.71.35 1.04.24.47.59.87 1.03 1.16.43.29.93.43 1.44.42.51-.01 1.01-.16 1.45-.45.44-.29.79-.7 1.03-1.17.15-.31.27-.65.34-1 .06-.2.09-.42.1-.63.02-.32.02-.65 0-.97-.02-.25-.06-.5-.12-.74-.07-.29-.18-.58-.32-.85-.22-.44-.54-.83-.94-1.12-.4-.3-.86-.49-1.35-.53-.5-.05-1.01.03-1.46.24-.45.21-.84.54-1.13.96-.15.22-.28.46-.37.71-.09.25-.15.51-.2.77-.07.46-.09.93-.04 1.39.03.35.09.71.19 1.05-.11.01-.22.01-.33.02-.25.02-.5.05-.74.1-.97.18-1.89.58-2.65 1.19-.19.15-.36.31-.53.48-.21-.1-.41-.22-.61-.35-1.09-.72-2.18-1.45-3.28-2.17.01-.96.01-1.93.02-2.89.11-.08.22-.17.32-.27.75-.79 1.27-1.75 1.53-2.78.26-1.04.26-2.14-.02-3.17 0-.01 0-.02.01-.03 1.05-.01 2.1-.01 3.15 0M7.92 9.04c.4.56.91 1.03 1.49 1.39.78.48 1.65.79 2.54.95.89.17 1.8.17 2.69.03.9-.15 1.77-.46 2.56-.95.58-.36 1.1-.82 1.51-1.37.02-.02.04-.05.06-.07 0 1.03-.01 2.05.01 3.08-.33.07-.67.12-1 .2-.82.2-1.62.49-2.34.92-.73.42-1.37.97-1.83 1.68-.46.7-.74 1.52-.79 2.36v.04c-1.73.01-3.45.01-5.18 0-.05-.68-.23-1.34-.54-1.94-.31-.6-.73-1.14-1.24-1.57-.5-.43-1.07-.75-1.68-.98-.67-.24-1.37-.37-2.08-.4v-3.43c1.85.34 3.7.68 5.56 1.03.28.05.57.1.85.15.05-.01.08-.04.11-.07M8.81 17.71c.04.14.08.28.14.41.11.25.27.48.45.69.18.21.38.4.6.57.22.16.44.31.69.43.24.12.49.22.76.3.25.07.5.13.76.16.26.03.53.05.79.05h.21c.26 0 .53-.01.79-.05s.52-.09.77-.16c.25-.08.5-.17.74-.29.24-.12.47-.27.69-.43.22-.16.42-.35.59-.56.18-.21.33-.44.44-.69.06-.13.1-.27.14-.41.27.25.56.47.88.65.32.18.67.33 1.02.45.35.11.71.2 1.08.26.36.06.73.1 1.1.12v4.08c-3.84.01-7.68.02-11.52 0V19.2c.38-.02.75-.06 1.12-.12.37-.06.73-.15 1.08-.26.36-.12.7-.27 1.02-.45.32-.19.6-.41.87-.66M20.52 20c.8-.36 1.48-.9 2.02-1.57.53-.67.91-1.44 1.11-2.27.2-.83.22-1.7.06-2.54-.16-.84-.49-1.63-.96-2.32-.47-.7-1.08-1.3-1.78-1.76-.7-.46-1.5-.77-2.32-.92-.84-.16-1.7-.14-2.53.06-.16.04-.32.08-.47.13-.04-.17-.08-.33-.13-.49-.15-.5-.38-.97-.68-1.38-.3-.42-.67-.79-1.09-1.09-.41-.3-.88-.52-1.37-.67-.49-.14-1-.22-1.51-.22-.52 0-1.03.07-1.52.22-.5.15-.96.37-1.38.67-.42.3-.79.67-1.09 1.09-.3.41-.52.88-.67 1.38-.05.16-.09.32-.12.49-.16-.05-.31-.1-.47-.13-.83-.2-1.69-.22-2.53-.06-.82.15-1.62.46-2.32.92-.7.46-1.31 1.06-1.78 1.76-.47.69-.8 1.48-.96 2.32-.16.84-.14 1.71.06 2.54.2.83.58 1.6 1.11 2.27.54.67 1.22 1.21 2.02 1.57 0 .96 0 1.91.01 2.87-1.1 0-2.21-.01-3.31-.02-.42-1.85-1.5-3.55-3.02-4.67-1.52-1.12-3.45-1.69-5.37-1.59v-7.73c1.79.11 3.57-.34 5.05-1.29 1.48-.94 2.59-2.38 3.12-4.03.49.46 1.1.77 1.75.9.65.12 1.33.04 1.93-.23.32-.14.62-.34.86-.59.24-.25.43-.55.56-.87.12-.32.18-.66.17-1.01-.01-.34-.07-.69-.21-1.01-.13-.31-.33-.6-.58-.83-.25-.24-.55-.42-.87-.53-.33-.11-.67-.16-1.02-.14-.34.02-.68.09-.99.24-.31.14-.6.34-.83.6-.23.25-.42.55-.54.87-.12.32-.17.67-.15 1.01.01.23.06.45.14.66-1.6.39-2.91 1.64-3.43 3.22-.51 1.58-.3 3.38.57 4.77-.87.07-1.74.26-2.54.59V2.33c.65.15 1.3.3 1.94.48.65.18 1.3.37 1.94.57.66.21 1.31.44 1.96.67.66.24 1.32.48 1.98.74.01-.43.07-.86.18-1.27.25-.97.75-1.87 1.45-2.59.69-.72 1.56-1.24 2.5-1.5.95-.26 1.96-.26 2.91 0 .94.26 1.81.78 2.5 1.5.7.72 1.2 1.62 1.45 2.59.11.41.17.84.18 1.27.66-.26 1.32-.5 1.98-.74.65-.23 1.3-.46 1.96-.67.64-.2 1.29-.39 1.94-.57.64-.18 1.29-.33 1.94-.48v9.54c-.8-.33-1.67-.52-2.54-.59.87-1.39 1.08-3.19.57-4.77-.52-1.58-1.83-2.83-3.43-3.22.08-.21.13-.43.14-.66.02-.34-.03-.69-.15-1.01-.12-.32-.31-.62-.54-.87-.23-.26-.52-.46-.83-.6-.31-.15-.65-.22-.99-.24-.35-.02-.69.03-1.02.14-.32.11-.62.29-.87.53-.25.23-.45.52-.58.83-.14.32-.2.67-.21 1.01-.01.35.05.69.17 1.01.13.32.32.62.56.87.24.25.54.45.86.59.6.27 1.28.35 1.93.23.65-.13 1.26-.44 1.75-.9.53 1.65 1.64 3.09 3.12 4.03 1.48.95 3.26 1.4 5.05 1.29v7.73c-1.92-.1-3.85.47-5.37 1.59-1.52 1.12-2.6 2.82-3.02 4.67-1.1.01-2.21.02-3.31.02.01-.96.01-1.91.01-2.87"></path></svg>
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
