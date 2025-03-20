
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Sparkles } from "lucide-react";

interface Post {
  id: number;
  title: string;
  platform: string;
  date: string;
  time: string;
  status: string;
  aiScore: number;
}

interface UpcomingContentProps {
  posts: Post[];
  platformColors: Record<string, string>;
}

const UpcomingContent = ({ posts, platformColors }: UpcomingContentProps) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Upcoming Content</CardTitle>
        <CardDescription className="text-xs">
          View and manage your scheduled and draft content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-2 md:p-3 transition-all hover:shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className={`h-4 w-4 md:h-5 md:w-5 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white text-[8px] md:text-xs`}>
                      {post.platform.charAt(0)}
                    </div>
                    <span className="text-xs font-medium">{post.platform}</span>
                    <Badge
                      variant={
                        post.status === "scheduled"
                          ? "default"
                          : post.status === "draft"
                          ? "secondary"
                          : "outline"
                      }
                      className="capitalize text-[8px] px-1.5 py-0"
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-xs md:text-sm">{post.title}</h3>
                  <div className="flex items-center text-[9px] md:text-xs text-muted-foreground">
                    <CalendarClock className="mr-1 h-3 w-3" />
                    {post.date} at {post.time}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="text-[9px] md:text-xs font-medium">AI Score</div>
                    <div className="flex items-center">
                      <Sparkles className="mr-1 h-3 w-3 text-accent-gold" />
                      <span className={`text-[10px] md:text-xs ${post.aiScore >= 85 ? "text-green-500" : post.aiScore >= 70 ? "text-yellow-500" : "text-red-500"}`}>
                        {post.aiScore}%
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 text-[10px]">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingContent;
