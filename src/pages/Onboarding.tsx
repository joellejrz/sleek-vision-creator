
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Onboarding = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Vision Creator</CardTitle>
          <CardDescription>Let's set up your content creation workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Onboarding content will be implemented soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
