
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Pin, Share, LinkIcon, ImagePlus } from "lucide-react";

const PinterestConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [pinterestUrl, setPinterestUrl] = useState("");
  const { toast } = useToast();

  const handleConnect = () => {
    if (!pinterestUrl) {
      toast({
        title: "Error",
        description: "Please enter your Pinterest profile URL",
        variant: "destructive",
      });
      return;
    }

    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Connected to Pinterest",
        description: "Your Pinterest account has been successfully connected.",
      });
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setPinterestUrl("");
    toast({
      title: "Disconnected",
      description: "Your Pinterest account has been disconnected.",
    });
  };

  const handleImportPins = () => {
    toast({
      title: "Importing pins",
      description: "Your Pinterest pins are being imported to your moodboard.",
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Connect with Pinterest</CardTitle>
          <CardDescription>
            Link your Pinterest account to import pins and boards to your moodboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="pinterest-url" className="text-sm font-medium">
                  Pinterest Profile URL
                </label>
                <div className="flex">
                  <Input
                    id="pinterest-url"
                    value={pinterestUrl}
                    onChange={(e) => setPinterestUrl(e.target.value)}
                    placeholder="https://pinterest.com/yourusername"
                    className="rounded-r-none"
                  />
                  <Button 
                    onClick={handleConnect} 
                    className="rounded-l-none gap-2"
                    variant="gradient"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-md border border-green-200 dark:border-green-900">
                <div className="flex items-center gap-3">
                  <Pin className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium">Connected to Pinterest</p>
                    <p className="text-sm text-muted-foreground">{pinterestUrl}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
              <Button onClick={handleImportPins} className="w-full gap-2">
                <ImagePlus className="h-4 w-4" />
                Import Pins
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Share to Pinterest</CardTitle>
          <CardDescription>
            Share your content ideas directly to your Pinterest boards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isConnected ? (
              <>
                <p className="text-sm">
                  With your Pinterest account connected, you can now share your content ideas directly to your Pinterest boards.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2">
                    <Share className="h-4 w-4" />
                    Share to Board
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Pin className="h-4 w-4" />
                    Create Pin
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Pin className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Connect to Share</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your Pinterest account to enable sharing capabilities.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" className="gap-2" asChild>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open Pinterest
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PinterestConnect;
