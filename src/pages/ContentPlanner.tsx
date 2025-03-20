
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
  Camera,
  Hash,
  Lightbulb,
  MessageSquare,
  Mic,
  Pencil,
  Plus,
  Sparkles,
  Target,
  Video,
  Zap,
  Clock,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TopicSelector } from "@/components/content-planner/TopicSelector";
import TrendingSounds from "@/components/content-planner/TrendingSounds";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

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
  const [contentType, setContentType] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(true);
  const [showContentForm, setShowContentForm] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());
  const [scheduledTime, setScheduledTime] = useState<string>("12:00");
  const [scheduledPosts, setScheduledPosts] = useState<any[]>(upcomingPosts);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      contentType: "",
      platform: "",
      keywords: "",
      topic: "",
      scheduledDate: new Date(),
      scheduledTime: "12:00",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContentTypeChange = (value: string) => {
    setContentType(value);
  };

  const handlePlatformChange = (value: string) => {
    setPlatform(value);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    form.setValue("topic", topic);
    setShowTopicSelector(false);
    setShowContentForm(true);
  };

  const resetDialog = () => {
    setShowTopicSelector(true);
    setShowContentForm(false);
    setSelectedTopic("");
    form.reset();
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    
    const newPost = {
      id: scheduledPosts.length + 1,
      title: data.title || `New ${selectedTopic} Content`,
      platform: data.platform || platform || "Instagram",
      date: scheduledDate ? format(scheduledDate, "MMM dd") : "Today",
      time: scheduledTime || "12:00 PM",
      status: "scheduled",
      aiScore: Math.floor(Math.random() * 30) + 70,
    };
    
    setScheduledPosts([...scheduledPosts, newPost]);
    
    toast.success("Content scheduled successfully!", {
      description: `Your ${selectedTopic} content has been scheduled for ${newPost.date} at ${newPost.time}.`
    });
    
    setOpenDialog(false);
    resetDialog();
  };

  const generateAIIdeas = () => {
    console.log("Generating AI content ideas");
  };

  const generateAICaption = () => {
    console.log("Generating AI caption");
  };

  const generateAIHashtags = () => {
    console.log("Generating AI hashtags");
  };

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
          <Dialog open={openDialog} onOpenChange={(open) => {
            setOpenDialog(open);
            if (!open) resetDialog();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                New Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
                <DialogDescription>
                  Plan your next content piece with AI optimization
                </DialogDescription>
              </DialogHeader>
              
              {showTopicSelector && (
                <TopicSelector onTopicSelect={handleTopicSelect} />
              )}
              
              {showContentForm && (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200 dark:border-purple-900">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-5 w-5 text-accent-gold" />
                            <h3 className="font-medium">Selected Topic: {selectedTopic}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            AI suggestions will be tailored to your {selectedTopic} niche
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2" 
                            onClick={() => {
                              setShowTopicSelector(true);
                              setShowContentForm(false);
                            }}
                          >
                            Change Topic
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="title">Content Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter a title for your content"
                            {...form.register("title")}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>What Do You Want to Produce Today?</Label>
                          <Select onValueChange={handleContentTypeChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="photo">📸 Photo Post</SelectItem>
                              <SelectItem value="short-video">🎥 Short-Form Video (Reel/TikTok/YouTube Shorts)</SelectItem>
                              <SelectItem value="long-video">🎬 Long-Form Video (YouTube/Podcast)</SelectItem>
                              <SelectItem value="audio">🎤 Voiceover/Podcast Clip</SelectItem>
                              <SelectItem value="text">📄 Text-Based Post (X/Threads/LinkedIn)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>On Which Platform Will You Post This?</Label>
                          <Select onValueChange={handlePlatformChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="instagram">🟣 Instagram</SelectItem>
                              <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                              <SelectItem value="youtube">🔴 YouTube</SelectItem>
                              <SelectItem value="twitter">🟠 X/Threads</SelectItem>
                              <SelectItem value="linkedin">📊 LinkedIn</SelectItem>
                              <SelectItem value="pinterest">📌 Pinterest</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Content Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your content idea or outline"
                            className="min-h-[100px]"
                            {...form.register("description")}
                          />
                          <div className="flex justify-end">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={generateAIIdeas}
                              className="flex items-center gap-1"
                            >
                              <Lightbulb className="h-4 w-4 text-yellow-500" />
                              <span>Generate AI Ideas</span>
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="caption">Caption</Label>
                          <Textarea
                            id="caption"
                            placeholder="Write your caption here"
                            className="min-h-[80px]"
                          />
                          <div className="flex justify-end">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={generateAICaption}
                              className="flex items-center gap-1"
                            >
                              <MessageSquare className="h-4 w-4 text-primary" />
                              <span>Generate AI Caption</span>
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="hashtags">Hashtags</Label>
                          <Textarea
                            id="hashtags"
                            placeholder="#trending #viral #content"
                            className="min-h-[60px]"
                          />
                          <div className="flex justify-end">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={generateAIHashtags}
                              className="flex items-center gap-1"
                            >
                              <Hash className="h-4 w-4 text-primary" />
                              <span>Generate AI Hashtags</span>
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>What Resources Do You Need?</Label>
                          <div className="grid grid-cols-2 gap-3 mt-2">
                            <Button variant="outline" className="justify-start" type="button">
                              <Camera className="mr-2 h-4 w-4" /> Camera Setup
                            </Button>
                            <Button variant="outline" className="justify-start" type="button">
                              <Mic className="mr-2 h-4 w-4" /> Microphone
                            </Button>
                            <Button variant="outline" className="justify-start" type="button">
                              <Pencil className="mr-2 h-4 w-4" /> Editing Software
                            </Button>
                            <Button variant="outline" className="justify-start" type="button">
                              <Video className="mr-2 h-4 w-4" /> Lighting
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>What's Your Goal for This Post?</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a goal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monetization">💰 Monetization</SelectItem>
                              <SelectItem value="engagement">📈 Engagement Growth</SelectItem>
                              <SelectItem value="branding">🎭 Personal Branding</SelectItem>
                              <SelectItem value="community">🔄 Community Building</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>When Do You Want to Post This Content?</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div className="space-y-2">
                              <Label htmlFor="date" className="text-sm text-muted-foreground">Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <CalendarClock className="mr-2 h-4 w-4" />
                                    {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={scheduledDate}
                                    onSelect={(date) => {
                                      setScheduledDate(date);
                                      form.setValue("scheduledDate", date as Date);
                                    }}
                                    initialFocus
                                    className="pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="time" className="text-sm text-muted-foreground">Time</Label>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="time"
                                  type="time"
                                  value={scheduledTime}
                                  onChange={(e) => {
                                    setScheduledTime(e.target.value);
                                    form.setValue("scheduledTime", e.target.value);
                                  }}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => {
                                const now = new Date();
                                now.setHours(now.getHours() + 24);
                                const minutes = now.getMinutes() >= 30 ? 30 : 0;
                                now.setMinutes(minutes);
                                
                                const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                                
                                setScheduledDate(now);
                                setScheduledTime(timeString);
                                form.setValue("scheduledDate", now);
                                form.setValue("scheduledTime", timeString);
                                
                                toast.info("AI has suggested an optimal posting time", {
                                  description: `Based on your ${selectedTopic} audience, tomorrow at ${timeString} should get the best engagement.`
                                });
                              }}
                            >
                              <Sparkles className="h-4 w-4 text-accent-gold" />
                              <span>Suggest Optimal Time</span>
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 flex items-center gap-3 border border-purple-200 dark:border-purple-900">
                          <div className="flex-shrink-0">
                            <Zap className="h-10 w-10 text-accent-gold" />
                          </div>
                          <div>
                            <h3 className="font-medium">AI Content Optimization</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              AI will analyze your {selectedTopic} content and suggest the best time to post for maximum engagement
                            </p>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-200 dark:border-blue-900">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-5 w-5 text-accent-gold" />
                            <h3 className="font-medium">Content Manifestation</h3>
                          </div>
                          <div className="text-sm italic text-muted-foreground mt-1">
                            "Your {selectedTopic} content is magnetic. The right people will find and love it. This post is high-energy, high-impact, and will reach the perfect audience."
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-muted">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Engagement Prediction</h3>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="w-full bg-muted-foreground/20 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <span className="text-sm font-medium text-green-500">High</span>
                          </div>
                          <p className="text-sm mt-2">This {selectedTopic} post has high viral potential! Best time to post: Tomorrow at 6:00 PM</p>
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" type="button" onClick={() => setOpenDialog(false)}>
                        Save as Draft
                      </Button>
                      <Button type="submit" className="bg-gradient-primary">
                        Create & Schedule
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              )}
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
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Content</CardTitle>
              <CardDescription className="text-xs">
                View and manage your scheduled and draft content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border rounded-lg p-2 md:p-3 transition-all hover:shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <div className={`h-4 w-4 md:h-5 md:w-5 rounded-full ${(platformColors as any)[post.platform]} flex items-center justify-center text-white text-[8px] md:text-xs`}>
                            {post.platform.charAt(0)}
                          </div>
                          <span className="text-xs font-medium">{post.platform}</span>
                          <Badge
                            variant={
                              post.status === "scheduled"
                                ? "default"
                                : post.status === "draft"
                                ? "secondary"
                                : "outline"
                            }
                            className="capitalize text-[8px] px-1.5 py-0"
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-xs md:text-sm">{post.title}</h3>
                        <div className="flex items-center text-[9px] md:text-xs text-muted-foreground">
                          <CalendarClock className="mr-1 h-3 w-3" />
                          {post.date} at {post.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center">
                          <div className="text-[9px] md:text-xs font-medium">AI Score</div>
                          <div className="flex items-center">
                            <Sparkles className="mr-1 h-3 w-3 text-accent-gold" />
                            <span className={`text-[10px] md:text-xs ${post.aiScore >= 85 ? "text-green-500" : post.aiScore >= 70 ? "text-yellow-500" : "text-red-500"}`}>
                              {post.aiScore}%
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-6 text-[10px]">
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
                    className="border rounded-md pointer-events-auto"
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
                      {scheduledPosts.filter(post => {
                        if (!date) return false;
                        const postDate = new Date();
                        const [month, day] = post.date.split(' ');
                        postDate.setMonth(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month));
                        postDate.setDate(parseInt(day, 10));
                        
                        return postDate.getDate() === date.getDate() && 
                               postDate.getMonth() === date.getMonth();
                      }).length > 0 ? (
                        scheduledPosts.filter(post => {
                          if (!date) return false;
                          const postDate = new Date();
                          const [month, day] = post.date.split(' ');
                          postDate.setMonth(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month));
                          postDate.setDate(parseInt(day, 10));
                          
                          return postDate.getDate() === date.getDate() && 
                                postDate.getMonth() === date.getMonth();
                        }).map(post => (
                          <div key={post.id} className="border p-3 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className={`h-5 w-5 rounded-full ${(platformColors as any)[post.platform]} flex items-center justify-center text-white text-xs`}>
                                    {post.platform.charAt(0)}
                                  </div>
                                  <span className="font-medium">{post.title}</span>
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {post.time}
                                </div>
                              </div>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground py-8">
                          <p>No content scheduled for this day.</p>
                          <Button variant="link" className="mt-2" onClick={() => setOpenDialog(true)}>
                            Add new content
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="pt-2">
        <TrendingSounds />
      </div>
    </div>
  );
};

export default ContentPlanner;
