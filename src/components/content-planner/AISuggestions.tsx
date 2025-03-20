
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, Sparkles, ArrowRight, Zap } from "lucide-react";

interface Suggestion {
  title: string;
  bestTime: string;
  engagementPrediction: string;
  reasoning: string;
}

interface AISuggestionsProps {
  suggestions: Suggestion[];
}

const AISuggestions = ({ suggestions }: AISuggestionsProps) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Content Suggestions</CardTitle>
        <CardDescription className="text-sm">
          Content ideas optimized for maximum engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="glass-card p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-medium text-base">{suggestion.title}</h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-xs">
                      <CalendarClock className="mr-1.5 h-3.5 w-3.5 text-primary" />
                      <span>Best time: {suggestion.bestTime}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5 text-accent-gold" />
                      <span>Expected engagement: {suggestion.engagementPrediction}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {suggestion.reasoning}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="min-w-[90px] h-8 text-xs">
                  Use Idea
                  <ArrowRight className="ml-1.5 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full h-8 text-xs">
            <Zap className="mr-1.5 h-3.5 w-3.5 text-accent-gold" />
            Generate More Ideas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
