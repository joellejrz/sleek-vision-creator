
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b backdrop-blur-lg bg-background/80">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-display font-bold text-gradient-primary tracking-tight">
              Vision<span className="text-deep-teal">Creator</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-gradient-primary hover:bg-primary/90" asChild>
              <Link to="/onboarding">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight text-gradient-primary">
                  AI-Powered Content Creation Assistant
                </h1>
                <p className="text-lg text-muted-foreground">
                  Create better content, faster. Our AI assistant helps you plan, prioritize, and perfect your content strategy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-gradient-primary hover:bg-primary/90" onClick={() => navigate('/onboarding')}>
                    Get Started Free
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    See How It Works
                  </Button>
                </div>
                <div className="pt-6">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-accent-gold" />
                    Join 10,000+ content creators using VisionCreator
                  </p>
                </div>
              </div>
              <div className={`${isLoaded ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
                <div className="glass-card rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all duration-300">
                  <img 
                    src="/lovable-uploads/c5efe662-2188-4abb-9a3d-953225b34702.png" 
                    alt="VisionCreator Dashboard" 
                    className="w-full h-auto rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-medium">AI Content Planner</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Get intelligent recommendations for your content strategy based on audience engagement data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-4">
                Supercharge Your Content Creation
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered features help you create better content while saving time.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Content Planner",
                  description: "Get optimal posting times, content ideas, and smart task prioritization.",
                  delay: 100,
                  icon: "📅"
                },
                {
                  title: "AI Pep-Talk Coach",
                  description: "Receive motivational affirmations and actionable engagement strategies.",
                  delay: 200,
                  icon: "🎤"
                },
                {
                  title: "Smart To-Do Lists",
                  description: "AI-suggested daily priorities and consistent task management.",
                  delay: 300,
                  icon: "✅"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`glass-card p-6 rounded-xl transform hover:translate-y-[-5px] transition-all duration-300 ${isLoaded ? `animate-slide-up animate-delay-${feature.delay}` : 'opacity-0'}`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-4">
                Ready to Transform Your Content Creation?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of content creators who are saving time and creating better content with VisionCreator.
              </p>
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-primary hover:bg-primary/90" onClick={() => navigate('/onboarding')}>
                Get Started Free
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-display font-bold text-gradient-primary tracking-tight">
                Vision<span className="text-deep-teal">Creator</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                AI-powered content creation assistant
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} VisionCreator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
