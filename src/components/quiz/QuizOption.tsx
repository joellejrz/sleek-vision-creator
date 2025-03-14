
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
      className="p-4 border border-white/10 rounded-lg bg-gradient-to-br from-deep-blue/40 to-deep-teal/10 
                hover:border-accent-gold/50 hover:bg-accent/5 cursor-pointer transition-all duration-300 
                transform hover:translate-y-[-2px] hover:shadow-[0_4px_20px_-4px_rgba(245,193,108,0.2)] 
                hover:scale-[1.01] active:scale-[0.99]"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-gradient-to-br from-deep-teal/20 to-soft-emerald/20 rounded-full p-2 
                     border border-white/5 group-hover:border-accent-gold/30 transition-colors duration-300
                     hover:shadow-[0_0_15px_rgba(245,193,108,0.2)]">
          {option.icon || <Sparkles className="h-5 w-5 text-accent-gold" />}
        </div>
        <div>
          <h3 className="font-medium text-white">{option.label}</h3>
          {option.description && (
            <p className="text-sm text-white/70">{option.description}</p>
          )}
          {option.subtext && (
            <p className="text-xs text-white/50 mt-1">{option.subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizOption;
