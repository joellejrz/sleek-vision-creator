
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface Message {
  id: number;
  type: "user" | "assistant";
  message: string;
  timestamp: Date;
}

const ChatContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      message: "Hi there! I'm your AI Creator Coach. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      message: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const responses = [
        "That's a great question! Focus on consistency rather than perfection.",
        "I understand that challenge. Have you tried breaking that task into smaller steps?",
        "You're making excellent progress! Remember that growth takes time.",
        "That's totally normal at this stage. Keep showing up and the results will follow.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: messages.length + 2,
        type: "assistant",
        message: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardContent className="p-4 flex-1 overflow-auto space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="submit" size="icon" onClick={handleSendMessage}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatContainer;
