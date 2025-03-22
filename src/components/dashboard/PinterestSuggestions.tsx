
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Pin, Share2, ArrowRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface PinterestSuggestion {
  id: string;
  imageUrl: string;
  theme: string;
  caption: string;
}

const mockSuggestions: PinterestSuggestion[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
    theme: "Leopard Vibes",
    caption: "Ready to attack my target 🐆 #fashiongoals"
  },
  {
    id: "2", 
    imageUrl: "https://images.unsplash.com/photo-1613395079988-6fb17077699a",
    theme: "Minimalist Workspace",
    caption: "Finding clarity in simplicity ✨ #mindfulproductivity"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b",
    theme: "Summer Aesthetic",
    caption: "Soaking up the sunshine and good vibes 🌞 #summerdays"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1604871000636-074fa5117945",
    theme: "Coffee Moments",
    caption: "Finding inspiration in every cup ☕ #coffeelover"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",
    theme: "Urban Explorer",
    caption: "City streets tell the best stories 🏙️ #urbanphotography"
  }
];

const PinterestSuggestions = () => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg md:text-xl">Pinterest-Inspired Content</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Instagram post ideas based on your Pinterest saves
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {mockSuggestions.map((suggestion) => (
              <CarouselItem key={suggestion.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/3">
                <div className="rounded-lg overflow-hidden border bg-card h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={suggestion.imageUrl} 
                      alt={suggestion.theme}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm p-1 rounded-full">
                      <Pin className="h-3 w-3 text-rose-500" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">
                        {suggestion.theme}
                      </h3>
                      <Instagram className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {suggestion.caption}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        Use Idea
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default PinterestSuggestions;
