
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import MoodboardGallery from "@/components/moodboard/MoodboardGallery";
import PinterestConnect from "@/components/moodboard/PinterestConnect";
import FavoriteCreators from "@/components/moodboard/FavoriteCreators";
import { Layout, Grid, Search, ImagePlus, Pin, FolderPlus, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Moodboard = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleCreateBoard = () => {
    toast({
      title: "New board created",
      description: "Your new moodboard has been created successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Moodboard</h1>
          <p className="text-muted-foreground">
            Collect and organize visual inspiration for your content
          </p>
        </div>
        <Button onClick={handleCreateBoard} className="gap-2" variant="gradient">
          <FolderPlus className="h-4 w-4" />
          New Board
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your moodboard..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <ImagePlus className="h-4 w-4" />
          Add Image
        </Button>
        <Button variant="outline" className="gap-2">
          <Pin className="h-4 w-4" />
          Pin Idea
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isMobile ? "order-first" : "order-last"} ${isMobile ? "" : "md:col-span-1"}`}>
          <FavoriteCreators />
        </div>
        
        <div className={`${isMobile ? "" : "md:col-span-2"}`}>
          <Tabs defaultValue="gallery" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="gallery" className="gap-2">
                <Grid className="h-4 w-4" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="boards" className="gap-2">
                <Layout className="h-4 w-4" />
                Boards
              </TabsTrigger>
              <TabsTrigger value="pinterest" className="gap-2">
                <Pin className="h-4 w-4" />
                Pinterest
              </TabsTrigger>
            </TabsList>
            <TabsContent value="gallery">
              <MoodboardGallery searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="boards">
              <Card>
                <CardHeader>
                  <CardTitle>Your Moodboards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                        <div className="h-40 bg-muted/50 flex items-center justify-center">
                          <Layout className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">Moodboard {i}</h3>
                          <p className="text-sm text-muted-foreground">12 items</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pinterest">
              <PinterestConnect />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Moodboard;
