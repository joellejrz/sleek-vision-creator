
import { Sparkles } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="text-center animate-fade-in">
      <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-accent/20 animate-pulse-soft flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-accent/40 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent animate-float flex items-center justify-center">
            <Sparkles className="text-primary-foreground h-8 w-8" />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-display font-bold text-primary-foreground animate-fade-in mb-4">
        Step into your power...
      </h2>
      <p className="text-primary-foreground/80 text-lg animate-fade-in animate-delay-300">
        Let's unlock your true content magic
      </p>
    </div>
  );
};

export default LoadingScreen;
