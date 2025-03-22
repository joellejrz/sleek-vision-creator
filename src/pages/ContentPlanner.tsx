
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";

// Import our components
import UpcomingContent from "@/components/content-planner/UpcomingContent";
import AISuggestions from "@/components/content-planner/AISuggestions";
import ContentCalendar from "@/components/content-planner/ContentCalendar";
import TrendingSounds from "@/components/content-planner/TrendingSounds";
import { TopicSelector } from "@/components/content-planner/TopicSelector";
import ContentCreationForm from "@/components/content-planner/ContentCreationForm";
import { getContentIdeas } from "@/components/QuickAddDrawer";

// Constants and data
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [contentType, setContentType] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(true);
  const [showContentForm, setShowContentForm] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState<any[]>(upcomingPosts);
  const [quickIdeas, setQuickIdeas] = useState<any[]>([]);
  const [showQuickIdeasDialog, setShowQuickIdeasDialog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Load quick ideas when component mounts
  useEffect(() => {
    const ideas = getContentIdeas();
    setQuickIdeas(ideas);
  }, []);

  const handleContentTypeChange = (value: string) => {
    setContentType(value);
  };

  const handlePlatformChange = (value: string) => {
    setPlatform(value);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setShowTopicSelector(false);
    setShowContentForm(true);
  };

  const resetDialog = () => {
    setShowTopicSelector(true);
    setShowContentForm(false);
    setSelectedTopic("");
  };

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    
    const newPost = {
      id: scheduledPosts.length + 1,
      title: data.title || `New ${selectedTopic} Content`,
      platform: data.platform || platform || "Instagram",
      date: data.scheduledDate ? format(data.scheduledDate, "MMM dd") : "Today",
      time: data.scheduledTime || "12:00 PM",
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

  const handleSaveDraft = () => {
    setOpenDialog(false);
    resetDialog();
    toast.info("Content saved as draft");
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleQuickIdeaSelect = (idea: any) => {
    setSelectedTopic(idea.title);
    setShowTopicSelector(false);
    setShowContentForm(true);
    setShowQuickIdeasDialog(false);
    setOpenDialog(true);
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
              
              {quickIdeas.length > 0 && showTopicSelector && (
                <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-900">
                  <h3 className="font-medium mb-2">Quick Ideas Available</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You have {quickIdeas.length} quick ideas saved. Would you like to use one of them?
                  </p>
                  <Button variant="outline" onClick={() => setShowQuickIdeasDialog(true)}>
                    View Saved Ideas
                  </Button>
                </div>
              )}
              
              {showTopicSelector && (
                <TopicSelector onTopicSelect={handleTopicSelect} />
              )}
              
              {showContentForm && (
                <ContentCreationForm 
                  selectedTopic={selectedTopic}
                  onSubmit={handleSubmit}
                  onSaveDraft={handleSaveDraft}
                  onTopicChange={() => {
                    setShowTopicSelector(true);
                    setShowContentForm(false);
                  }}
                />
              )}
            </DialogContent>
          </Dialog>
          
          {/* Dialog for quick ideas */}
          <Dialog open={showQuickIdeasDialog} onOpenChange={setShowQuickIdeasDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Your Quick Ideas</DialogTitle>
                <DialogDescription>
                  Select an idea to start creating content
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-3 py-2 max-h-[50vh] overflow-y-auto">
                {quickIdeas.map((idea) => (
                  <div 
                    key={idea.id} 
                    className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => handleQuickIdeaSelect(idea)}
                  >
                    <h4 className="font-medium">{idea.title}</h4>
                    {idea.description && (
                      <p className="text-sm text-muted-foreground mt-1">{idea.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Added on {new Date(idea.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                
                {quickIdeas.length === 0 && (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground">No quick ideas saved yet.</p>
                    <p className="text-sm mt-2">
                      Use the + button on any page to quickly add content ideas.
                    </p>
                  </div>
                )}
              </div>
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
          <UpcomingContent 
            posts={scheduledPosts} 
            platformColors={platformColors} 
          />
        </TabsContent>
        
        <TabsContent value="ai-suggestions" className="space-y-4 mt-6">
          <AISuggestions suggestions={aiSuggestions} />
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4 mt-6">
          <ContentCalendar 
            scheduledPosts={scheduledPosts} 
            platformColors={platformColors} 
            onAddContent={handleOpenDialog} 
          />
        </TabsContent>
      </Tabs>

      <div className="pt-2">
        <TrendingSounds />
      </div>
    </div>
  );
};

export default ContentPlanner;
