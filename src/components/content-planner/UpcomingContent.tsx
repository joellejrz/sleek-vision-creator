
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Sparkles, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Post {
  id: number;
  title: string;
  platform: string;
  date: string;
  time: string;
  status: string;
  aiScore: number;
}

interface UpcomingContentProps {
  posts: Post[];
  platformColors: Record<string, string>;
}

const UpcomingContent = ({ posts, platformColors }: UpcomingContentProps) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editPlatform, setEditPlatform] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditPlatform(post.platform);
    setEditDate(post.date);
    setEditTime(post.time);
    setEditStatus(post.status);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingPost) return;
    
    // In a real app, we would update this in the backend
    // For now, we'll just display a toast message to indicate success
    toast.success("Content updated successfully!", {
      description: `"${editTitle}" has been updated.`
    });
    
    setEditDialogOpen(false);
    setEditingPost(null);
  };

  return (
    <>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Content</CardTitle>
          <CardDescription className="text-xs">
            View and manage your scheduled and draft content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg p-2 md:p-3 transition-all hover:shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-4 w-4 md:h-5 md:w-5 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white text-[8px] md:text-xs`}>
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
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 text-[10px]"
                      onClick={() => handleEditClick(post)}
                    >
                      <Edit2 className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Make changes to your content details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)} 
                placeholder="Content title" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="platform" className="text-sm font-medium">Platform</label>
              <Select value={editPlatform} onValueChange={setEditPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <Input 
                  id="date" 
                  value={editDate} 
                  onChange={(e) => setEditDate(e.target.value)} 
                  placeholder="Jun 10" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">Time</label>
                <Input 
                  id="time" 
                  value={editTime} 
                  onChange={(e) => setEditTime(e.target.value)} 
                  placeholder="2:00 PM" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="idea">Idea</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpcomingContent;
