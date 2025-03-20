
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
      className="w-full flex items-center space-x-4 p-4 bg-white rounded-2xl border border-gray-100
                transition-all duration-300 hover:shadow-md cursor-pointer
                transform hover:translate-y-[-2px] active:scale-[0.98] group"
      onClick={onClick}
    >
      <div className="flex-shrink-0 bg-primary/10 rounded-xl p-3 
                     border border-primary/10 group-hover:border-primary/20 transition-colors duration-300
                     shadow-sm">
        {option.icon || <Sparkles className="h-5 w-5 text-primary" />}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 tracking-wide">{option.label}</h3>
        {option.description && (
          <p className="text-sm text-gray-600 font-medium tracking-wide">{option.description}</p>
        )}
        {option.subtext && (
          <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide">{option.subtext}</p>
        )}
      </div>
    </div>
  );
};

export default QuizOption;
