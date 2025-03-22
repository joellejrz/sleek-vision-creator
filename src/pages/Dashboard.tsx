import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Info, List, TrendingUp, Zap } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreatorMetricsOverview from "@/components/CreatorMetricsOverview";
import { useIsMobile } from "@/hooks/use-mobile";
import PinterestSuggestions from "@/components/dashboard/PinterestSuggestions";

const data = [
  { name: "Mon", engagement: 1000, reach: 4000 },
  { name: "Tue", engagement: 2000, reach: 3000 },
  { name: "Wed", engagement: 1500, reach: 5000 },
  { name: "Thu", engagement: 3000, reach: 6000 },
  { name: "Fri", engagement: 2500, reach: 4500 },
  { name: "Sat", engagement: 3500, reach: 7000 },
  { name: "Sun", engagement: 4000, reach: 8000 },
];

const upcomingTasks = [
  {
    id: 1,
    title: "Create Instagram post about new product launch",
    time: "Today at 2:00 PM",
    priority: "high",
  },
  {
    id: 2,
    title: "Write LinkedIn article on industry trends",
    time: "Tomorrow at 10:00 AM",
    priority: "medium",
  },
  {
    id: 3,
    title: "Film quick TikTok demo of new features",
    time: "Today at 4:30 PM",
    priority: "medium",
  },
];

const contentIdeas = [
  "Share behind-the-scenes content of your creative process",
  "Create a tutorial about your most requested topic",
  "Post a user success story or testimonial",
  "Start a discussion about a trending industry topic",
];

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`space-y-4 md:space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Welcome back! Here's an overview of your content performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            <CalendarDays className="h-3 w-3 md:h-4 md:w-4" />
            Last 7 days
          </Button>
          <Button className="bg-gradient-primary hover:bg-primary/90 text-xs p-2 h-8">
            <Zap className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden md:inline">AI Insights</span>
          </Button>
        </div>
      </div>

      <CreatorMetricsOverview />

      <div className={`grid gap-4 md:gap-6 ${isMobile ? 'hidden' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
        {[
          {
            title: "Total Engagement",
            value: "24.5K",
            change: "+12.5%",
            positive: true,
            description: "vs. last week",
            icon: TrendingUp,
            delay: 100,
          },
          {
            title: "Content Reach",
            value: "38.2K",
            change: "+18.2%",
            positive: true,
            description: "vs. last week",
            icon: Zap,
            delay: 200,
          },
          {
            title: "Best Time to Post",
            value: "2:00 PM",
            change: "Wednesdays",
            description: "Based on engagement",
            icon: Clock,
            delay: 300,
          },
          {
            title: "Upcoming Tasks",
            value: "5",
            change: "3 high priority",
            description: "Next 24 hours",
            icon: List,
            delay: 400,
          },
        ].map((stat, index) => (
          <Card key={index} className={`transition-all hover:shadow-md ${isLoaded ? `animate-slide-up animate-delay-${stat.delay}` : 'opacity-0'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className={stat.positive ? "text-green-500" : ""}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 transition-all hover:shadow-md">
          <CardHeader className="pb-2 md:pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-2xl">Content Performance</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-auto md:w-auto">
                      <Info className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs md:text-sm">Engagement and reach metrics for the past week</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <CardDescription className="text-xs md:text-sm">
              Engagement and reach metrics for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stackId="1"
                    stroke="#1E3A5F"
                    fill="#1E3A5F"
                    fillOpacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="reach"
                    stackId="2"
                    stroke="#3AB0A2"
                    fill="#3AB0A2"
                    fillOpacity={0.7}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 transition-all hover:shadow-md">
          <CardHeader className="pb-2 md:pb-6">
            <CardTitle className="text-lg md:text-2xl">AI-Suggested Content Ideas</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Based on your audience's engagement and trending topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {contentIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="p-2 md:p-3 bg-muted/60 rounded-lg hover:bg-muted transition-colors cursor-pointer text-xs md:text-sm"
                >
                  <p>{idea}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs md:text-sm">
                <Zap className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 text-accent-gold" />
                Generate More Ideas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <PinterestSuggestions />

      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-2 md:pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg md:text-2xl">Upcoming Content Tasks</CardTitle>
            <Button variant="outline" size="sm" className="text-xs">
              View All
            </Button>
          </div>
          <CardDescription className="text-xs md:text-sm">
            Prioritized tasks based on your content calendar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 md:p-4 border rounded-lg transition-all hover:shadow-sm"
              >
                <div className="flex items-start gap-2 md:gap-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-xs md:text-sm">{task.title}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 md:mt-1">
                      <Clock className="h-3 w-3" />
                      {task.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <Badge
                    variant={
                      task.priority === "high"
                        ? "destructive"
                        : task.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                    className="capitalize text-[10px] md:text-xs px-1.5 py-0 h-4 md:h-5"
                  >
                    {task.priority}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-6 text-[10px] md:text-xs">
                    Complete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
