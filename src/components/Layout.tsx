import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./theme-provider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    // Simulate loading delay for animation purposes
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

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
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 p-2 md:p-6 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} pb-16 md:pb-6`}>
          {/* Show a floating hamburger menu button when sidebar is closed */}
          {!isSidebarOpen && (
            <Button 
              variant="secondary" 
              size="icon" 
              className="fixed bottom-4 left-4 z-50 shadow-lg rounded-full h-9 w-9 md:h-12 md:w-12 bg-gradient-primary hover:bg-primary/90" 
              onClick={toggleSidebar}
            >
              <Menu className="h-4 w-4 md:h-5 md:w-5" />
              <span className="sr-only">Open Sidebar</span>
            </Button>
          )}
          
          <div className={`max-w-7xl mx-auto ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Quick AI assistant shortcut - smaller on mobile */}
            <Button 
              variant="outline"
              className="fixed bottom-20 md:bottom-4 right-4 z-50 shadow-md rounded-full p-1.5 md:px-4 md:py-2 flex items-center gap-1 md:gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none hover:from-indigo-600 hover:to-purple-600"
            >
              <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden md:inline text-xs md:text-sm">AI Assistant</span>
            </Button>
            
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Layout;
