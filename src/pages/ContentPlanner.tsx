
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  CalendarClock,
  ChevronDown,
  Plus,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data
const upcomingPosts = [
  {
    id: 1,
    title: "New Product Feature Announcement",
    platform: "Instagram",
    date: "Today",
    time: "2:00 PM",
    status: "scheduled",
    aiScore: 87,
  },
  {
    id: 2,
    title: "Behind-the-scenes Team Interview",
    platform: "LinkedIn",
    date: "Tomorrow",
    time: "10:30 AM",
    status: "draft",
    aiScore: 92,
  },
  {
    id: 3,
    title: "Quick Tutorial on Top 5 Features",
    platform: "TikTok",
    date: "Jun 12",
    time: "4:45 PM",
    status: "idea",
    aiScore: 78,
  },
];

const platformColors = {
  Instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  LinkedIn: "bg-gradient-to-r from-blue-600 to-blue-800",
  TikTok: "bg-gradient-to-r from-black to-gray-800",
  Twitter: "bg-gradient-to-r from-blue-400 to-blue-600",
  Facebook: "bg-gradient-to-r from-blue-700 to-blue-900",
};

const aiSuggestions = [
  {
    title: "Share a customer success story",
    bestTime: "Wednesday at 2:00 PM",
    engagementPrediction: "High",
    reasoning: "Wednesdays show 27% higher engagement for testimonial content",
  },
  {
    title: "Post educational content about your industry",
    bestTime: "Tuesday at 9:30 AM",
    engagementPrediction: "Very High",
    reasoning: "Morning educational content performs 35% better on weekdays",
  },
  {
    title: "Behind-the-scenes of your product development",
    bestTime: "Friday at 3:00 PM",
    engagementPrediction: "Medium",
    reasoning: "Casual Friday content resonates well as users wind down for the weekend",
  },
];

const ContentPlanner = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Planner</h1>
          <p className="text-muted-foreground">
            Plan, schedule, and optimize your content with AI assistance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                New Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
                <DialogDescription>
                  Plan your next content piece with AI optimization
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form fields would go here */}
                <div className="p-3 rounded-lg bg-muted/60 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent-gold" />
                  <p className="text-sm">AI will analyze this content and suggest the best time to post</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Save as Draft</Button>
                <Button>Create & Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Upcoming Content</CardTitle>
              <CardDescription>
                View and manage your scheduled and draft content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border rounded-lg p-4 transition-all hover:shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded-full ${(platformColors as any)[post.platform]} flex items-center justify-center text-white text-xs`}>
                            {post.platform.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{post.platform}</span>
                          <Badge
                            variant={
                              post.status === "scheduled"
                                ? "default"
                                : post.status === "draft"
                                ? "secondary"
                                : "outline"
                            }
                            className="capitalize"
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <h3 className="font-medium">{post.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarClock className="mr-1 h-4 w-4" />
                          {post.date} at {post.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-medium">AI Score</div>
                          <div className="flex items-center">
                            <Sparkles className="mr-1 h-4 w-4 text-accent-gold" />
                            <span className={post.aiScore >= 85 ? "text-green-500" : post.aiScore >= 70 ? "text-yellow-500" : "text-red-500"}>
                              {post.aiScore}%
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-suggestions" className="space-y-4 mt-6">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>AI Content Suggestions</CardTitle>
              <CardDescription>
                Content ideas optimized for maximum engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="glass-card p-5 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{suggestion.title}</h3>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-sm">
                            <CalendarClock className="mr-2 h-4 w-4 text-primary" />
                            <span>Best time: {suggestion.bestTime}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Sparkles className="mr-2 h-4 w-4 text-accent-gold" />
                            <span>Expected engagement: {suggestion.engagementPrediction}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.reasoning}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="min-w-[100px]">
                        Use Idea
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  <Zap className="mr-2 h-4 w-4 text-accent-gold" />
                  Generate More Ideas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4 mt-6">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>
                View your scheduled content in a calendar view
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-fit">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">
                        {date?.toLocaleDateString(undefined, {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                    <Separator className="my-2" />
                    <div className="mt-4 space-y-4">
                      <div className="text-center text-muted-foreground py-8">
                        <p>No content scheduled for this day.</p>
                        <Button variant="link" className="mt-2">
                          Add new content
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentPlanner;
