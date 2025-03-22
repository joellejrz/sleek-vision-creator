
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Calendar, MessageCircle, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: ListChecks,
      label: "Tasks",
      path: "/tasks",
    },
    {
      icon: Search,
      label: "Search",
      path: "/search",
    },
    {
      icon: Home,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: Calendar,
      label: "Content",
      path: "/content-planner",
    },
    {
      icon: MessageCircle,
      label: "PepTalk",
      path: "/pep-talk",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border shadow-lg">
      <div className="flex justify-between items-center px-0">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-1 flex-1 text-center",
              isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("w-4 h-4 mb-0.5", isActive(item.path) ? "text-primary fill-primary/10" : "")} />
            <span className="text-[9px]">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
