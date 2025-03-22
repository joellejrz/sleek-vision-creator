
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, BarChart2, Sparkles } from "lucide-react";

const ContentGrowthCard = () => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BarChart2 className="mr-2 h-5 w-5 text-primary" />
          Content Growth Insights
        </CardTitle>
        <CardDescription>
          AI analysis of your content performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-muted/60 rounded-lg">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="font-medium text-sm">Engagement Up 23%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your tutorial content is performing better than other formats
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Quick Optimization Tips</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 text-accent-gold shrink-0" />
                <span>Post between 1-3pm for 34% higher reach</span>
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 text-accent-gold shrink-0" />
                <span>Use more video content to increase engagement</span>
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 text-accent-gold shrink-0" />
                <span>Respond to comments within 1 hour for best results</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentGrowthCard;
