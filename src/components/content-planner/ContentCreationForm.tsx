import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Form,
  FormControl,
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  CalendarClock, 
  Camera, 
  Clock, 
  Hash, 
  Lightbulb, 
  MessageSquare, 
  Mic, 
  Pencil, 
  Sparkles, 
  Target, 
  Video, 
  Zap 
} from "lucide-react";
import { toast } from "sonner";
import { DialogFooter } from "@/components/ui/dialog";
import { SocialMediaIcon } from "./SocialMediaIcons";

interface ContentCreationFormProps {
  selectedTopic: string;
  onSubmit: (data: any) => void;
  onSaveDraft: () => void;
  onTopicChange: () => void;
}

const ContentCreationForm = ({ 
  selectedTopic, 
  onSubmit, 
  onSaveDraft,
  onTopicChange 
}: ContentCreationFormProps) => {
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());
  const [scheduledTime, setScheduledTime] = useState<string>("12:00");
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      contentType: "",
      platform: "",
      keywords: "",
      topic: selectedTopic,
      scheduledDate: new Date(),
      scheduledTime: "12:00",
    },
  });

  const generateAIIdeas = () => {
    console.log("Generating AI content ideas");
  };

  const generateAICaption = () => {
    console.log("Generating AI caption");
  };

  const generateAIHashtags = () => {
    console.log("Generating AI hashtags");
  };

  const handleSubmit = (data: any) => {
    // Add scheduled date and time to the form data
    data.scheduledDate = scheduledDate;
    data.scheduledTime = scheduledTime;
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                onClick={onTopicChange}
                type="button"
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
              <Select onValueChange={(value) => form.setValue("contentType", value)}>
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
              <Select onValueChange={(value) => form.setValue("platform", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <SocialMediaIcon platform="Instagram" className="h-4 w-4 text-pink-600" />
                      <span>Instagram</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="tiktok" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <SocialMediaIcon platform="TikTok" className="h-4 w-4" />
                      <span>TikTok</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="youtube" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-red-600">🔴</span>
                      <span>YouTube</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="twitter" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <SocialMediaIcon platform="X" className="h-4 w-4" />
                      <span>X (Twitter)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="linkedin" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">📊</span>
                      <span>LinkedIn</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pinterest" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <SocialMediaIcon platform="Pinterest" className="h-4 w-4 text-red-600" />
                      <span>Pinterest</span>
                    </div>
                  </SelectItem>
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
                        type="button"
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
          <Button variant="outline" type="button" onClick={onSaveDraft}>
            Save as Draft
          </Button>
          <Button type="submit" className="bg-gradient-primary">
            Create & Schedule
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ContentCreationForm;
