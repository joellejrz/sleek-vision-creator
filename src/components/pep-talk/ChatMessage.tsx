
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: {
    id: number;
    type: "user" | "assistant";
    message: string;
    timestamp: Date;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 ${
          message.type === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {message.type === "assistant" ? (
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
            message.type === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          <p className="text-sm">{message.message}</p>
          <div
            className={`text-[10px] mt-1 ${
              message.type === "user"
                ? "text-primary-foreground/70"
                : "text-muted-foreground"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
