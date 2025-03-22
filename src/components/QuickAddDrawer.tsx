
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Sparkles, Plus, Link as LinkIcon } from "lucide-react";

const STORAGE_KEY = "quick-content-ideas";

interface ContentIdea {
  id: string;
  title: string;
  description: string;
  referenceLinks: string;
  createdAt: string;
}

export const saveContentIdea = (idea: Omit<ContentIdea, "id" | "createdAt">) => {
  // Generate a unique ID
  const id = Date.now().toString();
  const newIdea: ContentIdea = {
    ...idea,
    id,
    createdAt: new Date().toISOString(),
  };

  // Get existing ideas from local storage
  const existingIdeasString = localStorage.getItem(STORAGE_KEY);
  const existingIdeas: ContentIdea[] = existingIdeasString 
    ? JSON.parse(existingIdeasString) 
    : [];

  // Save the updated list
  const updatedIdeas = [newIdea, ...existingIdeas];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIdeas));

  return newIdea;
};

export const getContentIdeas = (): ContentIdea[] => {
  const ideasString = localStorage.getItem(STORAGE_KEY);
  return ideasString ? JSON.parse(ideasString) : [];
};

const QuickAddDrawer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [referenceLinks, setReferenceLinks] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // Validate input
    if (!title.trim()) {
      toast.error("Please enter a title for your content idea");
      return;
    }

    // Save the idea
    const savedIdea = saveContentIdea({ title, description, referenceLinks });
    
    // Reset form and close drawer
    setTitle("");
    setDescription("");
    setReferenceLinks("");
    setOpen(false);
    
    // Show success message
    toast.success("Content idea saved!", {
      description: "You can find it in the Content Planner"
    });
  };

  const handleGoToPlanner = () => {
    setOpen(false);
    navigate("/content-planner");
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="secondary" 
          size="icon" 
          className="fixed bottom-20 md:bottom-4 right-4 z-50 shadow-lg rounded-full h-12 w-12 bg-gradient-primary hover:bg-primary/90" 
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Quick Add</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Quick Add Content Idea</DrawerTitle>
            <DrawerDescription>Save your content idea for later planning</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Content idea title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Add some details (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] w-full"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Reference links (TikTok, Instagram, etc.)"
                  value={referenceLinks}
                  onChange={(e) => setReferenceLinks(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="bg-accent/50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent-gold" />
                  <span className="text-sm font-medium">Pro Tip</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Capture your ideas quickly now, then develop them fully in the Content Planner.
                </p>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleSave}>Save Idea</Button>
            <Button variant="outline" onClick={handleGoToPlanner}>
              Go to Content Planner
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QuickAddDrawer;
