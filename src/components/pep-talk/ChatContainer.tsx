
import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mic, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatMessage from "./ChatMessage";

interface Message {
  id: number;
  type: "user" | "assistant";
  message: string;
  timestamp: Date;
}

const initialMessages = [
  {
    id: 1,
    type: "assistant",
    message: "Hey there! I'm your AI Pep Coach. What kind of motivation or content advice do you need today?",
    timestamp: new Date(),
  },
];

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
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
        type: "assistant" as const,
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
            <ChatMessage key={msg.id} message={msg} />
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
  );
};

export default ChatContainer;
