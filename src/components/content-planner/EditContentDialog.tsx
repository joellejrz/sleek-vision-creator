
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Post } from "./types";

interface EditContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post | null;
  onSave: (postId: number, updatedPost: Partial<Post>) => void;
}

const EditContentDialog = ({ open, onOpenChange, post, onSave }: EditContentDialogProps) => {
  const [editTitle, setEditTitle] = useState("");
  const [editPlatform, setEditPlatform] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditPlatform(post.platform);
      setEditDate(post.date);
      setEditTime(post.time);
      setEditStatus(post.status);
    }
  }, [post]);

  const handleSaveEdit = () => {
    if (!post) return;
    
    const updatedPost = {
      title: editTitle,
      platform: editPlatform,
      date: editDate,
      time: editTime,
      status: editStatus,
    };
    
    onSave(post.id, updatedPost);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                <SelectItem value="Twitter">X (Twitter)</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Pinterest">Pinterest</SelectItem>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditContentDialog;
