
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
      <CardHeader>
        <CardTitle>AI Content Suggestions</CardTitle>
        <CardDescription>
          Content ideas optimized for maximum engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="glass-card p-5 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">{suggestion.title}</h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <CalendarClock className="mr-2 h-4 w-4 text-primary" />
                      <span>Best time: {suggestion.bestTime}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Sparkles className="mr-2 h-4 w-4 text-accent-gold" />
                      <span>Expected engagement: {suggestion.engagementPrediction}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.reasoning}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="min-w-[100px]">
                  Use Idea
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Zap className="mr-2 h-4 w-4 text-accent-gold" />
            Generate More Ideas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
