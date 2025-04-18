
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 px-2 sm:px-4">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Search</h1>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>Find Content & Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="search"
              placeholder="Search for content ideas, tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          <div className="mt-8">
            {searchQuery ? (
              <p className="text-center text-muted-foreground py-10">
                Search functionality coming soon...
              </p>
            ) : (
              <div className="space-y-4 text-center py-10">
                <p className="text-muted-foreground">
                  Search for content ideas, tutorials, or creator inspiration
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  <Button variant="outline" size="sm" onClick={() => setSearchQuery("Instagram reels")} className="text-xs">Instagram reels</Button>
                  <Button variant="outline" size="sm" onClick={() => setSearchQuery("TikTok trends")} className="text-xs">TikTok trends</Button>
                  <Button variant="outline" size="sm" onClick={() => setSearchQuery("Content calendar")} className="text-xs">Content calendar</Button>
                  <Button variant="outline" size="sm" onClick={() => setSearchQuery("Growth strategies")} className="text-xs">Growth strategies</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search;
