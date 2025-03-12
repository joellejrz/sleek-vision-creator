
import React from "react";
import { Sparkles } from "lucide-react";
import { QuizOption as QuizOptionType } from "@/data/quizQuestions";

interface QuizOptionProps {
  option: QuizOptionType;
  onClick: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({ option, onClick }) => {
  return (
    <div
      className="p-4 border rounded-lg hover:border-accent hover:bg-accent/5 cursor-pointer transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-muted rounded-full p-2">
          {option.icon || <Sparkles className="h-5 w-5" />}
        </div>
        <div>
          <h3 className="font-medium">{option.label}</h3>
          {option.description && (
            <p className="text-sm text-muted-foreground">{option.description}</p>
          )}
          {option.subtext && (
            <p className="text-xs text-muted-foreground mt-1">{option.subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizOption;
