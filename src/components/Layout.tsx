
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./theme-provider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";

const Layout = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

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
        <main className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          {/* Show a floating hamburger menu button when sidebar is closed */}
          {!isSidebarOpen && (
            <Button 
              variant="secondary" 
              size="icon" 
              className="fixed bottom-6 left-6 z-50 shadow-lg rounded-full h-12 w-12 bg-gradient-primary hover:bg-primary/90" 
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open Sidebar</span>
            </Button>
          )}
          
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
