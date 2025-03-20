
import { useState } from "react";
import { CalendarDays, LayoutDashboard, ListTodo, MessagesSquare, Settings, Image } from "lucide-react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/smart-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SmartSidebarProps {
  className?: string;
}

const SmartSidebar = ({ className }: SmartSidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Content Planner",
      href: "/content-planner",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      label: "Moodboard",
      href: "/moodboard",
      icon: <Image className="h-5 w-5" />,
    },
    {
      label: "AI Pep Talk Coach",
      href: "/pep-talk",
      icon: <MessagesSquare className="h-5 w-5" />,
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: <ListTodo className="h-5 w-5" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen}>
      <SidebarBody className={cn("border-r", className)}>
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-8">
            <h1 className="text-xl font-display font-bold text-gradient-primary tracking-tight whitespace-nowrap">
              Vision<span className="text-deep-teal">Creator</span>
            </h1>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              {sidebarLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  link={link}
                  className="hover:text-primary transition-colors"
                />
              ))}
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="glass-card rounded-xl p-4 space-y-3">
              <h3 className="font-medium">Upgrade to Premium</h3>
              <p className="text-sm text-muted-foreground">Unlock advanced AI content tools and analytics.</p>
              <Button size="sm" className="w-full bg-gradient-primary hover:bg-primary/90">
                Try Premium
              </Button>
            </div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default SmartSidebar;
