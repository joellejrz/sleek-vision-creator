
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { format } from "date-fns";

interface Post {
  id: number;
  title: string;
  platform: string;
  date: string;
  time: string;
  status: string;
  aiScore: number;
}

interface ContentCalendarProps {
  scheduledPosts: Post[];
  platformColors: Record<string, string>;
  onAddContent: () => void;
}

const ContentCalendar = ({ scheduledPosts, platformColors, onAddContent }: ContentCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Content Calendar</CardTitle>
        <CardDescription>
          View your scheduled content in a calendar view
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-fit">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md pointer-events-auto"
            />
          </div>
          <div className="flex-1">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">
                  {date?.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <Separator className="my-2" />
              <div className="mt-4 space-y-4">
                {scheduledPosts.filter(post => {
                  if (!date) return false;
                  const postDate = new Date();
                  const [month, day] = post.date.split(' ');
                  postDate.setMonth(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month));
                  postDate.setDate(parseInt(day, 10));
                  
                  return postDate.getDate() === date.getDate() && 
                         postDate.getMonth() === date.getMonth();
                }).length > 0 ? (
                  scheduledPosts.filter(post => {
                    if (!date) return false;
                    const postDate = new Date();
                    const [month, day] = post.date.split(' ');
                    postDate.setMonth(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month));
                    postDate.setDate(parseInt(day, 10));
                    
                    return postDate.getDate() === date.getDate() && 
                          postDate.getMonth() === date.getMonth();
                  }).map(post => (
                    <div key={post.id} className="border p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className={`h-5 w-5 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white text-xs`}>
                              {post.platform.charAt(0)}
                            </div>
                            <span className="font-medium">{post.title}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {post.time}
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">Edit</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p>No content scheduled for this day.</p>
                    <Button variant="link" className="mt-2" onClick={onAddContent}>
                      Add new content
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCalendar;
