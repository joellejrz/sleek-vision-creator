
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold tracking-tight sm:text-5xl">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-deep-blue">
              Become a Successful
            </span>
            <br />
            <span className="inline-block">Content Creator</span>
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover your unique creator archetype and unlock your path to influence & wealth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {[
            {
              title: "Find Your Archetype",
              description: "Take our 2-minute quiz to uncover your natural strengths",
              icon: <Sparkles className="h-5 w-5 text-primary" />
            },
            {
              title: "Get Your Roadmap",
              description: "Receive a personalized content strategy built for your style",
              icon: <CheckCircle2 className="h-5 w-5 text-primary" />
            },
            {
              title: "Growth Framework",
              description: "Follow proven steps to grow your audience and income",
              icon: <ArrowRight className="h-5 w-5 text-primary" />
            }
          ].map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="pt-6">
          <Link to="/onboarding">
            <Button className="rounded-full px-8 py-6 h-auto text-base font-medium">
              Take the Creator Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Join 12,000+ creators who found their path
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
