
import { NavLink } from "react-router-dom";
import { CalendarDays, ChevronLeft, LayoutDashboard, ListTodo, MessagesSquare, Settings } from "lucide-react";
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
        "fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r bg-background transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <h1 className="text-xl font-display font-bold text-gradient-primary tracking-tight">
            Vision<span className="text-deep-teal">Creator</span>
          </h1>
        </NavLink>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/content-planner"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <CalendarDays className="h-5 w-5" />
              <span>Content Planner</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pep-talk"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <MessagesSquare className="h-5 w-5" />
              <span>AI Pep Talk Coach</span>
              <span className="ml-auto h-2 w-2 rounded-full bg-accent-neon animate-pulse-soft" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted",
                  isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                )
              }
            >
              <ListTodo className="h-5 w-5" />
              <span>Tasks</span>
            </NavLink>
          </li>
        </ul>

        <div className="mt-6 pt-6 border-t">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted",
                    isActive ? "bg-muted font-medium text-primary" : "text-foreground/70"
                  )
                }
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass-card rounded-xl p-4 space-y-3">
          <h3 className="font-medium">Upgrade to Premium</h3>
          <p className="text-sm text-muted-foreground">Unlock advanced AI content tools and analytics.</p>
          <Button size="sm" className="w-full bg-gradient-primary hover:bg-primary/90">
            Try Premium
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
