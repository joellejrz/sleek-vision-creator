import React from "react";
import { Crown, CheckIcon, Rocket, TrendingUp, DollarSign, ChevronRight } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PremiumScreen: React.FC = () => {
  const navigate = useNavigate();
  
  return (
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
        <div className="bg-muted/20 p-6 rounded-lg">
          <h3 className="text-xl font-display mb-4 text-center">Your Success Path</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg border border-muted relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <Rocket className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium text-center">Get the roadmap</h4>
              <p className="text-xs text-center mt-1 text-muted-foreground">Personalized content monetization plan</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg border border-muted relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <Crown className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium text-center">Build your brand</h4>
              <p className="text-xs text-center mt-1 text-muted-foreground">Attract followers & brand deals</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg border border-muted relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <DollarSign className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium text-center">Monetize your content</h4>
              <p className="text-xs text-center mt-1 text-muted-foreground">Earn from multiple revenue streams</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg border border-muted relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">4</div>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium text-center">Scale & grow</h4>
              <p className="text-xs text-center mt-1 text-muted-foreground">Turn content into a long-term business</p>
            </div>
          </div>
        </div>

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
          <p className="text-muted-foreground mb-6">
            <span className="font-medium text-foreground">Fast-forward 6 months:</span> You're living your dream, monetizing effortlessly. The only thing between you and that future? The roadmap.
          </p>
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
  );
};

export default PremiumScreen;
