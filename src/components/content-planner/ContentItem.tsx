
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Sparkles, Edit2 } from "lucide-react";
import { SocialMediaIcon } from "./SocialMediaIcons";
import { Post } from "./types";

interface ContentItemProps {
  post: Post;
  platformColors: Record<string, string>;
  onEditClick: (post: Post) => void;
  onDeleteClick: (postId: number) => void;
}

const ContentItem = ({ post, platformColors, onEditClick, onDeleteClick }: ContentItemProps) => {
  return (
    <div
      className="border rounded-lg p-2 md:p-3 transition-all hover:shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className={`h-4 w-4 md:h-5 md:w-5 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white text-[8px] md:text-xs`}>
              <SocialMediaIcon platform={post.platform} className="w-3 h-3 md:w-3.5 md:h-3.5" />
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
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 text-[10px]"
              onClick={() => onEditClick(post)}
            >
              <Edit2 className="mr-1 h-3 w-3" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
