
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./theme-provider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useToast } from "@/hooks/use-toast";

const Layout = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation purposes
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Show welcome toast when layout is first mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: `${getGreeting()}!`,
        description: "Your AI content assistant is ready to help you create amazing content today.",
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
          <div className={`max-w-7xl mx-auto space-y-6 ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
