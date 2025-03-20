
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin, Heart, Share2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MoodboardItem = {
  id: number;
  imageUrl: string;
  title: string;
  isPinned: boolean;
  isFavorite: boolean;
};

const mockMoodboardItems: MoodboardItem[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1579547945413-497e1b99aac0",
    title: "Minimal workspace setup",
    isPinned: false,
    isFavorite: true,
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1579546929662-711aa81148cf",
    title: "Gradient background",
    isPinned: true,
    isFavorite: false,
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
    title: "Abstract art",
    isPinned: false,
    isFavorite: false,
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1579547945641-0b3f3552096d",
    title: "Typography inspiration",
    isPinned: false,
    isFavorite: true,
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1",
    title: "Color palette ideas",
    isPinned: true,
    isFavorite: true,
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1600109394465-f0ca2f3ea3a3",
    title: "Mobile app design",
    isPinned: false,
    isFavorite: false,
  },
];

interface MoodboardGalleryProps {
  searchQuery?: string;
}

const MoodboardGallery = ({ searchQuery = "" }: MoodboardGalleryProps) => {
  const [items, setItems] = useState<MoodboardItem[]>(mockMoodboardItems);
  
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePin = (id: number) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  const toggleFavorite = (id: number) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="relative">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => togglePin(item.id)}
                  >
                    <Pin className={cn("h-4 w-4", item.isPinned && "fill-current")} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart className={cn("h-4 w-4", item.isFavorite && "fill-current text-red-500")} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {item.isPinned && (
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                  <Pin className="h-3 w-3 fill-current" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium truncate">{item.title}</h3>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Pin className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground mb-4">
            No moodboard items match your search criteria.
          </p>
          <Button variant="outline">Add New Item</Button>
        </div>
      )}
    </div>
  );
};

export default MoodboardGallery;
