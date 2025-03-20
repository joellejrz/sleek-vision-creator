
import { NavLink } from "react-router-dom";
import { CalendarDays, ChevronLeft, LayoutDashboard, ListTodo, MessagesSquare, Settings, Image, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r bg-background transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between h-12 md:h-16 px-3 md:px-4 border-b">
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <h1 className="text-lg md:text-xl font-display font-bold text-gradient-primary tracking-tight">
            Vision<span className="text-deep-teal">Creator</span>
          </h1>
        </NavLink>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-7 w-7 md:h-8 md:w-8">
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 md:py-6 px-2 md:px-4">
        <ul className="space-y-1 md:space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 md:px-3 md:py-2 transition-colors hover:bg-muted text-xs md:text-sm",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <LayoutDashboard className="h-4 w-4 md:h-5 md:w-5" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/content-planner"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 md:px-3 md:py-2 transition-colors hover:bg-muted text-xs md:text-sm",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <CalendarDays className="h-4 w-4 md:h-5 md:w-5" />
              <span>Content Planner</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/moodboard"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 md:px-3 md:py-2 transition-colors hover:bg-muted text-xs md:text-sm",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <Image className="h-4 w-4 md:h-5 md:w-5" />
              <span>Moodboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/creator-articles"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 md:px-3 md:py-2 transition-colors hover:bg-muted text-xs md:text-sm",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <Newspaper className="h-4 w-4 md:h-5 md:w-5" />
              <span>Articles</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-gold" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pep-talk"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 md:px-3 md:py-2 transition-colors hover:bg-muted text-xs md:text-sm",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <MessagesSquare className="h-4 w-4 md:h-5 md:w-5" />
              <span>AI Pep Talk Coach</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-neon animate-pulse-soft" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 md:px-3 md:py-2 transition-colors hover:bg-muted text-xs md:text-sm",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <ListTodo className="h-4 w-4 md:h-5 md:w-5" />
              <span>Tasks</span>
            </NavLink>
          </li>
        </ul>

        <div className="mt-4 pt-4 md:mt-6 md:pt-6 border-t">
          <ul className="space-y-1 md:space-y-2">
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 md:px-3 md:py-2 transition-colors hover:bg-muted text-xs md:text-sm",
                    isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                  )
                }
              >
                <Settings className="h-4 w-4 md:h-5 md:w-5" />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-3 md:p-4 mt-auto">
        <div className="glass-card rounded-lg md:rounded-xl p-3 md:p-4 space-y-2 md:space-y-3">
          <h3 className="font-medium text-xs md:text-sm">Upgrade to Premium</h3>
          <p className="text-xs text-muted-foreground">Unlock advanced AI content tools.</p>
          <Button size="sm" className="w-full text-xs h-7 md:h-8 bg-gradient-primary hover:bg-primary/90">
            Try Premium
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
