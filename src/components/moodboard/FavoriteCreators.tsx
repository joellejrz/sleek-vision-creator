
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Bell, 
  UserPlus, 
  Trash2, 
  ExternalLink,
  Heart
} from "lucide-react";

// Define the structure for a favorite creator
interface Creator {
  id: string;
  name: string;
  platforms: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  lastChecked?: Date;
  hasNewContent?: boolean;
}

const FavoriteCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([
    {
      id: "1",
      name: "Design Inspiration",
      platforms: {
        instagram: "designinspiration",
        youtube: "designchannel",
      },
      hasNewContent: true,
    },
    {
      id: "2",
      name: "Content Creator Pro",
      platforms: {
        twitter: "contentpro",
        instagram: "contentcreatorpro",
      },
      hasNewContent: false,
    },
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newCreator, setNewCreator] = useState<Partial<Creator>>({
    name: "",
    platforms: {},
  });
  
  const { toast } = useToast();

  const handleAddCreator = () => {
    if (!newCreator.name) {
      toast({
        title: "Error",
        description: "Creator name is required",
        variant: "destructive",
      });
      return;
    }

    const hasPlatform = Object.values(newCreator.platforms || {}).some(value => !!value);
    if (!hasPlatform) {
      toast({
        title: "Error",
        description: "At least one social media handle is required",
        variant: "destructive",
      });
      return;
    }

    setCreators([
      ...creators, 
      {
        id: Date.now().toString(),
        name: newCreator.name,
        platforms: newCreator.platforms || {},
      }
    ]);
    
    setNewCreator({ name: "", platforms: {} });
    setIsAdding(false);
    
    toast({
      title: "Creator added",
      description: `${newCreator.name} has been added to your favorites.`,
    });
  };

  const handleRemoveCreator = (id: string) => {
    setCreators(creators.filter(creator => creator.id !== id));
    toast({
      title: "Creator removed",
      description: "Creator has been removed from your favorites.",
    });
  };

  const handleCheckUpdates = () => {
    // Simulate checking for updates
    const updatedCreators = creators.map(creator => ({
      ...creator,
      lastChecked: new Date(),
      hasNewContent: Math.random() > 0.5, // Randomly set some creators to have new content
    }));
    
    setCreators(updatedCreators);
    
    const creatorsWithNewContent = updatedCreators.filter(c => c.hasNewContent);
    
    if (creatorsWithNewContent.length > 0) {
      toast({
        title: "New content available!",
        description: `${creatorsWithNewContent.length} creators have posted new content.`,
      });
    } else {
      toast({
        title: "No new content",
        description: "None of your favorite creators have posted new content recently.",
      });
    }
  };

  const renderSocialIcons = (platforms: Creator['platforms']) => {
    return (
      <div className="flex space-x-2">
        {platforms.instagram && (
          <a 
            href={`https://instagram.com/${platforms.instagram}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600"
          >
            <Instagram className="h-4 w-4" />
          </a>
        )}
        {platforms.youtube && (
          <a 
            href={`https://youtube.com/@${platforms.youtube}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-600"
          >
            <Youtube className="h-4 w-4" />
          </a>
        )}
        {platforms.twitter && (
          <a 
            href={`https://twitter.com/${platforms.twitter}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            <Twitter className="h-4 w-4" />
          </a>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg">Favorite Creators</CardTitle>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsAdding(!isAdding)}
            variant="outline"
            size="sm"
            className="h-8 px-2"
          >
            <UserPlus className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Add</span>
          </Button>
          <Button
            onClick={handleCheckUpdates}
            variant="outline"
            size="sm"
            className="h-8 px-2"
          >
            <Bell className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Check</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isAdding && (
          <div className="mb-4 p-3 bg-muted/30 rounded-md space-y-3">
            <div>
              <Label htmlFor="creator-name" className="text-xs">Creator Name</Label>
              <Input
                id="creator-name"
                value={newCreator.name}
                onChange={(e) => setNewCreator({...newCreator, name: e.target.value})}
                placeholder="Creator name"
                className="h-8 text-sm mt-1"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs flex items-center">
                  <Instagram className="h-3 w-3 mr-1" /> Instagram
                </Label>
                <Input
                  value={newCreator.platforms?.instagram || ""}
                  onChange={(e) => setNewCreator({
                    ...newCreator, 
                    platforms: {...newCreator.platforms, instagram: e.target.value}
                  })}
                  placeholder="username"
                  className="h-8 text-sm mt-1"
                />
              </div>
              <div>
                <Label className="text-xs flex items-center">
                  <Youtube className="h-3 w-3 mr-1" /> YouTube
                </Label>
                <Input
                  value={newCreator.platforms?.youtube || ""}
                  onChange={(e) => setNewCreator({
                    ...newCreator, 
                    platforms: {...newCreator.platforms, youtube: e.target.value}
                  })}
                  placeholder="username"
                  className="h-8 text-sm mt-1"
                />
              </div>
              <div>
                <Label className="text-xs flex items-center">
                  <Twitter className="h-3 w-3 mr-1" /> Twitter
                </Label>
                <Input
                  value={newCreator.platforms?.twitter || ""}
                  onChange={(e) => setNewCreator({
                    ...newCreator, 
                    platforms: {...newCreator.platforms, twitter: e.target.value}
                  })}
                  placeholder="username"
                  className="h-8 text-sm mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                size="sm" 
                variant="gradient"
                onClick={handleAddCreator}
                className="h-8 text-xs"
              >
                Save Creator
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {creators.length === 0 && !isAdding ? (
            <div className="text-center py-6">
              <Heart className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">Add your favorite creators to track their content</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => setIsAdding(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Creator
              </Button>
            </div>
          ) : (
            creators.map((creator) => (
              <div
                key={creator.id}
                className={`flex items-center justify-between p-2 rounded-md ${
                  creator.hasNewContent 
                    ? "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40" 
                    : "hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  {creator.hasNewContent && (
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                  <div>
                    <div className="font-medium text-sm">{creator.name}</div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      {renderSocialIcons(creator.platforms)}
                      {creator.lastChecked && (
                        <span className="text-[10px] text-muted-foreground ml-2">
                          Checked: {creator.lastChecked.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {creator.hasNewContent && (
                    <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCreator(creator.id)}
                    className="h-7 w-7 p-0 text-muted-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCreators;
