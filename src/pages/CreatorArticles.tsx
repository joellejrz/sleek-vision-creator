
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ThumbsUp, MessageSquare, BookmarkPlus, Share2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data for now - in a real app this would come from an API
const articleCategories = ["AI Tools", "Video Editing", "Audio Production", "Social Media", "Analytics"];

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  isNew: boolean;
  readingTime: string;
}

const CreatorArticles = () => {
  const [selectedCategory, setSelectedCategory] = useState("AI Tools");
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const { toast } = useToast();

  // Simulate fetching articles
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock articles data - in a real app this would be fetched from a backend
      const mockArticles: Article[] = [
        {
          id: 1,
          title: "Top 10 AI Video Editing Tools in 2023",
          summary: "Discover the most powerful AI-driven video editing tools that are changing the game for content creators.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          date: "2023-11-15",
          category: "AI Tools",
          likes: 452,
          comments: 32,
          isNew: true,
          readingTime: "5 min"
        },
        {
          id: 2,
          title: "How AI is Revolutionizing Content Planning",
          summary: "Learn how artificial intelligence is helping creators optimize their content calendars and engagement strategies.",
          content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          date: "2023-11-10",
          category: "AI Tools",
          likes: 328,
          comments: 45,
          isNew: true,
          readingTime: "7 min"
        },
        {
          id: 3,
          title: "The Future of Voice Modulation Technology",
          summary: "Explore how new voice technologies are enabling creators to produce better audio content with minimal equipment.",
          content: "Nulla facilisi. Mauris sollicitudin fermentum libero. Pellentesque auctor neque nec urna. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu.",
          date: "2023-11-05",
          category: "Audio Production",
          likes: 219,
          comments: 17,
          isNew: false,
          readingTime: "4 min"
        },
        {
          id: 4,
          title: "Mastering Instagram's New Algorithm",
          summary: "Insider tips on how to adapt your content strategy to Instagram's latest algorithm changes.",
          content: "Fusce ac felis sit amet ligula pharetra condimentum. Maecenas egestas arcu quis ligula mattis placerat. Duis lobortis massa imperdiet quam. Suspendisse potenti.",
          date: "2023-11-01",
          category: "Social Media",
          likes: 501,
          comments: 73,
          isNew: false,
          readingTime: "6 min"
        },
        {
          id: 5,
          title: "Essential Analytics Tools for Content Creators",
          summary: "A comprehensive guide to the analytics platforms that will help you understand your audience better.",
          content: "Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum.",
          date: "2023-10-28",
          category: "Analytics",
          likes: 345,
          comments: 29,
          isNew: false,
          readingTime: "8 min"
        }
      ];
      
      // Filter articles based on selected category
      const filteredArticles = mockArticles.filter(article => 
        selectedCategory === "All" || article.category === selectedCategory
      );
      
      setArticles(filteredArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, [selectedCategory]);

  const refreshArticles = () => {
    setIsLoading(true);
    toast({
      title: "Refreshing articles",
      description: "Fetching the latest content creator news and tools.",
    });
    
    // Simulate refreshing data
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Articles updated",
        description: "You're now seeing the latest content.",
      });
    }, 1500);
  };

  // This would be replaced with an actual AI-powered article generator in a real app
  const requestArticle = () => {
    toast({
      title: "Article request submitted",
      description: "Our AI is working on generating a new article about your topic. Check back soon!",
    });
  };

  return (
    <div className="container mx-auto py-4 md:py-8">
      <div className="flex flex-col space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Creator Knowledge Hub</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered articles to keep you updated on the latest content creation tools and trends
            </p>
          </div>
          
          <Button onClick={refreshArticles} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Articles</span>
          </Button>
        </div>

        <Card className="border-0 shadow-sm bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                Request a Custom AI Article
              </h3>
              <p className="text-sm text-muted-foreground">
                Want to learn about a specific content creation tool or technique? Let our AI write an article for you!
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <Textarea 
                  placeholder="What would you like to learn about? E.g., 'Best video editing tools for beginners'"
                  className="min-h-[80px] resize-none"
                />
                <Button className="md:self-end whitespace-nowrap" onClick={requestArticle}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Article
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-muted/60">
              {articleCategories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {articleCategories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4 mt-0">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader className="pb-3">
                      <div className="h-5 w-2/3 bg-muted rounded"></div>
                      <div className="h-4 w-1/2 bg-muted rounded mt-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-24 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))
              ) : articles.length > 0 ? (
                articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-1.5">
                          <CardTitle className="text-xl font-semibold">{article.title}</CardTitle>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <span>•</span>
                            <span>{article.readingTime} read</span>
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            {article.isNew && (
                              <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm md:text-base mb-4">
                        {article.summary}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.content}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{article.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{article.comments}</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground mb-4">No articles found in this category.</p>
                    <Button onClick={refreshArticles}>Refresh Articles</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorArticles;
