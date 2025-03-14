
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
      className="w-full flex items-center space-x-3 p-4 bg-gray-900 bg-opacity-40 rounded-xl border border-[#FF5EEA]/50 
                transition-all duration-300 hover:border-[#FF5EEA] cursor-pointer
                transform hover:translate-y-[-3px] hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(173,127,255,0.5)] 
                active:scale-[0.98] backdrop-blur-lg glass-dark group"
      onClick={onClick}
    >
      <div className="flex-shrink-0 bg-gradient-to-br from-[#FF5EEA]/10 to-[#00FFFF]/10 rounded-full p-3 
                     border border-white/20 group-hover:border-[#FF5EEA]/50 transition-colors duration-300
                     shadow-[0_0_15px_rgba(255,94,234,0.3)] group-hover:shadow-[0_0_25px_rgba(255,94,234,0.5)]">
        {option.icon || <Sparkles className="h-5 w-5 text-[#FF5EEA]" />}
      </div>
      <div>
        <h3 className="font-semibold text-white tracking-wide">{option.label}</h3>
        {option.description && (
          <p className="text-sm text-white/90 font-medium tracking-wide">{option.description}</p>
        )}
        {option.subtext && (
          <p className="text-xs text-white/70 mt-1 font-medium tracking-wide">{option.subtext}</p>
        )}
      </div>
    </div>
  );
};

export default QuizOption;
