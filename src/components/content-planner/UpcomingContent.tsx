
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ContentItem from "./ContentItem";
import EditContentDialog from "./EditContentDialog";
import { Post } from "./types";

interface UpcomingContentProps {
  posts: Post[];
  platformColors: Record<string, string>;
  onAddContent: () => void;
  onDeleteContent?: (postId: number) => void;
  onUpdateContent?: (postId: number, updatedPost: Partial<Post>) => void;
}

const UpcomingContent = ({ posts, platformColors, onAddContent, onDeleteContent, onUpdateContent }: UpcomingContentProps) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (postId: number, updatedPost: Partial<Post>) => {
    if (onUpdateContent) {
      onUpdateContent(postId, updatedPost);
    } else {
      // Fallback for backwards compatibility
      toast.success("Content updated successfully!", {
        description: `"${updatedPost.title}" has been updated.`
      });
    }
  };

  const handleDeleteClick = (postId: number) => {
    if (onDeleteContent) {
      onDeleteContent(postId);
    }
  };

  return (
    <>
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
              <ContentItem
                key={post.id}
                post={post}
                platformColors={platformColors}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            ))}
            {posts.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <p className="mb-2">No content scheduled yet</p>
                <Button size="sm" onClick={onAddContent}>Add Content</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <EditContentDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        post={editingPost}
        onSave={handleSaveEdit}
        onDelete={handleDeleteClick}
      />
    </>
  );
};

export default UpcomingContent;
