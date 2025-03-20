
import { Link } from "react-router-dom";
import { Bell, Calendar, Menu, MessageCircle, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ isSidebarOpen, toggleSidebar }: NavbarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 w-full border-b backdrop-blur-lg bg-background/80 transition-colors duration-300">
      <div className="flex h-12 md:h-16 items-center px-2 md:px-4 justify-between">
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            className="h-7 w-7 md:h-9 md:w-9"
          >
            <Menu className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link to="/dashboard" className="flex items-center gap-1 md:gap-2">
            <div className="hidden md:block">
              <h1 className="text-lg md:text-xl font-display font-bold text-gradient-primary tracking-tight">
                Vision<span className="text-deep-teal">Creator</span>
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex items-center gap-0.5 md:gap-2">
            <Button variant="ghost" size="icon" className="relative h-7 w-7 md:h-9 md:w-9" asChild>
              <Link to="/content-planner">
                <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Content Planner</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative h-7 w-7 md:h-9 md:w-9" asChild>
              <Link to="/pep-talk">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 h-1.5 w-1.5 rounded-full bg-accent-neon animate-pulse-soft" />
                <span className="sr-only">AI Coach</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative h-7 w-7 md:h-9 md:w-9">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 h-1.5 w-1.5 rounded-full bg-accent-gold" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 md:h-9 md:w-9">
                  {theme === "dark" ? (
                    <Moon className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <Sun className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-xs md:text-sm">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-7 w-7 md:h-9 md:w-9">
              <User className="h-4 w-4 md:h-5 md:w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
          <Button size="sm" className="text-xs h-7 md:h-8 bg-gradient-primary hover:bg-primary/90 px-2 md:px-3">
            Premium
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
