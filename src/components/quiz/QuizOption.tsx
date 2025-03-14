
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
      className="p-4 border border-white/15 rounded-lg bg-gradient-to-br from-[#1E234A]/50 to-[#401F71]/20 
                hover:border-accent-gold/70 hover:bg-accent/5 cursor-pointer transition-all duration-300 
                transform hover:translate-y-[-2px] hover:shadow-[0_4px_25px_-4px_rgba(245,193,108,0.3)] 
                hover:scale-[1.01] active:scale-[0.99] glass-dark"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-gradient-to-br from-deep-teal/30 to-soft-emerald/30 rounded-full p-2.5 
                     border border-white/10 hover:border-accent-gold/50 transition-colors duration-300
                     shadow-[0_0_15px_rgba(110,203,164,0.15)] group-hover:shadow-[0_0_25px_rgba(245,193,108,0.25)]">
          {option.icon || <Sparkles className="h-5 w-5 text-accent-gold" />}
        </div>
        <div>
          <h3 className="font-semibold text-white">{option.label}</h3>
          {option.description && (
            <p className="text-sm text-white/90 font-medium">{option.description}</p>
          )}
          {option.subtext && (
            <p className="text-xs text-white/70 mt-1 font-medium">{option.subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizOption;
