import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, BarChart2, MessageCircle, Mic, Send, Sparkles, Target, Trophy, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const messageData = [
  {
    id: 1,
    type: "assistant",
    message: "Hey there! I'm your AI Pep Coach. What kind of motivation or content advice do you need today?",
    timestamp: new Date(),
  },
];

const streakData = {
  current: 12,
  target: 30,
  percentage: 40,
};

const PepTalk = () => {
  const [messages, setMessages] = useState(messageData);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse;
      const lowerInput = inputMessage.toLowerCase();
      
      if (lowerInput.includes("motivation") || lowerInput.includes("feeling stuck")) {
        aiResponse = "Remember why you started creating content in the first place. Your unique voice matters! Every creator hits roadblocks, but consistent effort is what separates those who succeed. Try setting a small, achievable goal for today to build momentum.";
      } else if (lowerInput.includes("engagement") || lowerInput.includes("likes") || lowerInput.includes("views")) {
        aiResponse = "I notice your last few posts had lower engagement. Let's try a different approach: Ask a question in your next caption to encourage comments, try posting at 2pm on Wednesday (your audience seems most active then), and consider creating content around trending topic X which aligns with your niche.";
      } else if (lowerInput.includes("idea") || lowerInput.includes("what should i post")) {
        aiResponse = "Based on your audience's engagement patterns, tutorial-style content performs 43% better than your other formats. Consider creating a step-by-step guide on the topic you mentioned last week. I'd recommend posting it on Wednesday around 2pm for maximum reach.";
      } else {
        aiResponse = "I'm here to support your content journey! Remember, consistency is key to building your audience. What specific aspect of content creation can I help you with today? We could work on content ideas, posting schedules, or motivation strategies.";
      }

      const assistantMessage = {
        id: messages.length + 2,
        type: "assistant",
        message: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Pep-Talk Coach</h1>
          <p className="text-muted-foreground">
            Get motivation, content advice, and engagement strategies
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="general">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Coaching</SelectItem>
              <SelectItem value="motivation">Motivation Boost</SelectItem>
              <SelectItem value="engagement">Engagement Recovery</SelectItem>
              <SelectItem value="growth">Growth Strategy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col">
          <Card className="flex-1 transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                  AI Coach Conversation
                </CardTitle>
                <Badge variant="outline" className="px-3">
                  <Sparkles className="mr-2 h-3 w-3 text-accent-gold" />
                  <span>Premium</span>
                </Badge>
              </div>
              <CardDescription>
                Chat with your AI coach for personalized content advice
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 mb-4 overflow-y-auto max-h-[500px] space-y-4 pr-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 ${
                        msg.type === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {msg.type === "assistant" ? (
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-accent-dark text-white">
                            U
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          msg.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <div
                          className={`text-[10px] mt-1 ${
                            msg.type === "user"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex space-x-1 items-center">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Voice input</span>
                </Button>
                <Textarea
                  placeholder="Ask for motivation, content ideas, or engagement recovery strategies..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-h-[60px] max-h-[120px]"
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-accent-gold" />
                Creator Streak
              </CardTitle>
              <CardDescription>
                Track your content creation consistency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Current Streak</span>
                      <span className="text-sm">{streakData.current}/{streakData.target} days</span>
                    </div>
                    <Progress value={streakData.percentage} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-accent-gold" />
                    <span className="font-medium">{streakData.current} Day Streak</span>
                  </div>
                  <Badge variant="outline">Keep Going!</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Set New Streak Goal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                Content Growth Insights
              </CardTitle>
              <CardDescription>
                AI analysis of your content performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-sm">Engagement Up 23%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your tutorial content is performing better than other formats
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Quick Optimization Tips</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <Sparkles className="h-4 w-4 text-accent-gold shrink-0" />
                      <span>Post between 1-3pm for 34% higher reach</span>
                    </li>
                    <li className="flex gap-2">
                      <Sparkles className="h-4 w-4 text-accent-gold shrink-0" />
                      <span>Use more video content to increase engagement</span>
                    </li>
                    <li className="flex gap-2">
                      <Sparkles className="h-4 w-4 text-accent-gold shrink-0" />
                      <span>Respond to comments within 1 hour for best results</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PepTalk;
