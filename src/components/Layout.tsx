
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./theme-provider";
import Navbar from "./Navbar";
import SmartSidebar from "./SmartSidebar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Layout = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation purposes
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Greeting based on time of day with more creative style
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Rise and shine, creator! ☀️";
    if (hour < 18) return "Keep the creativity flowing! 🌊";
    return "Evening inspiration awaits! ✨";
  };

  // Show welcome toast when layout is first mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: `${getGreeting()}`,
        description: "Your AI content assistant is ready to help you create amazing content today.",
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SmartSidebar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300">
          <div className={`max-w-7xl mx-auto ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Quick AI assistant shortcut */}
            <Button 
              variant="outline"
              className="fixed bottom-6 right-6 z-50 shadow-md rounded-full px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none hover:from-indigo-600 hover:to-purple-600"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Assistant</span>
            </Button>
            
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
