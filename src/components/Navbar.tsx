
import { Link } from "react-router-dom";
import { Bell, Calendar, MessageCircle, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 w-full border-b backdrop-blur-lg bg-background/80 transition-colors duration-300">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2 md:hidden">
            <h1 className="text-xl font-display font-bold text-gradient-primary tracking-tight">
              Vision<span className="text-deep-teal">Creator</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/content-planner">
                <Calendar className="h-5 w-5" />
                <span className="sr-only">Content Planner</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/pep-talk">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent-neon animate-pulse-soft" />
                <span className="sr-only">AI Coach</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent-gold" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
          <Button size="sm" className="bg-gradient-primary hover:bg-primary/90">
            Try Premium
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
