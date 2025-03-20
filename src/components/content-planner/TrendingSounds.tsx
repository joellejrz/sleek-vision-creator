
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Headphones, Volume2, RefreshCw, Music, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for trending sounds
const trendingSounds = {
  tiktok: [
    {
      id: 1,
      title: "original sound - User38291",
      artist: "Unknown Artist",
      duration: "0:15",
      uses: "2.4M",
      category: "Dance",
      isNew: true,
    },
    {
      id: 2,
      title: "Stargazing Remix",
      artist: "DJ Astro",
      duration: "0:30",
      uses: "1.8M",
      category: "Remix",
      isNew: false,
    },
    {
      id: 3,
      title: "What Was I Made For?",
      artist: "Billie Eilish",
      duration: "0:22",
      uses: "950K",
      category: "Emotional",
      isNew: true,
    },
  ],
  reels: [
    {
      id: 4,
      title: "Calm Down",
      artist: "Rema & Selena Gomez",
      duration: "0:17",
      uses: "3.1M",
      category: "Pop",
      isNew: false,
    },
    {
      id: 5,
      title: "As It Was - Short Version",
      artist: "Harry Styles",
      duration: "0:20",
      uses: "4.5M",
      category: "Pop",
      isNew: false,
    },
    {
      id: 6,
      title: "Espresso",
      artist: "Sabrina Carpenter",
      duration: "0:18",
      uses: "2.2M",
      category: "Pop",
      isNew: true,
    },
  ],
  popular: [
    {
      id: 7,
      title: "Lofi Study Beats",
      artist: "ChillHop Music",
      duration: "0:45",
      uses: "5.2M",
      category: "Lofi",
      isNew: false,
    },
    {
      id: 8,
      title: "Epic Cinematic Trailer",
      artist: "Sound Effects Pro",
      duration: "0:25",
      uses: "1.5M",
      category: "Cinematic",
      isNew: false,
    },
    {
      id: 9,
      title: "Viral TikTok Transition",
      artist: "TikTok Sounds",
      duration: "0:12",
      uses: "8.7M",
      category: "Transition",
      isNew: true,
    },
  ],
};

const TrendingSounds = () => {
  const [activeTab, setActiveTab] = useState("tiktok");
  const [playingSound, setPlayingSound] = useState<number | null>(null);
  
  const handlePlaySound = (soundId: number) => {
    if (playingSound === soundId) {
      setPlayingSound(null);
    } else {
      setPlayingSound(soundId);
    }
  };
  
  const refreshSounds = () => {
    // In a real app, this would fetch new trending sounds
    console.log("Refreshing sounds");
  };
  
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              Trending Sounds
            </CardTitle>
            <CardDescription>
              Popular audio tracks for your next viral content
            </CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={refreshSounds} title="Refresh sounds">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            <TabsTrigger value="reels">Reels</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
          
          {Object.keys(trendingSounds).map((platform) => (
            <TabsContent key={platform} value={platform} className="space-y-3">
              {trendingSounds[platform as keyof typeof trendingSounds].map((sound) => (
                <div 
                  key={sound.id} 
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20"
                      onClick={() => handlePlaySound(sound.id)}
                    >
                      {playingSound === sound.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm line-clamp-1">{sound.title}</h4>
                        {sound.isNew && (
                          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-200 font-normal">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-2">
                        <span>{sound.artist}</span>
                        <span className="text-xs">•</span>
                        <span>{sound.duration}</span>
                        <span className="text-xs">•</span>
                        <span>{sound.uses} uses</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Preview with headphones">
                      <Headphones className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Save sound">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-2">
                View More {platform === "tiktok" ? "TikTok" : platform === "reels" ? "Reels" : "Popular"} Sounds
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrendingSounds;
