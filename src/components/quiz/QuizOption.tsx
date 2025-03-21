
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
      className="w-full flex items-center space-x-4 p-3.5 bg-white rounded-2xl border border-gray-100/60
                transition-all duration-300 hover:shadow-sm cursor-pointer
                transform hover:translate-y-[-1px] active:scale-[0.98] group"
      onClick={onClick}
    >
      <div className="flex-shrink-0 bg-primary/5 rounded-xl p-2.5 
                     border border-primary/5 group-hover:border-primary/20 transition-colors duration-300">
        {option.icon || <Sparkles className="h-5 w-5 text-primary" />}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 tracking-wide">{option.label}</h3>
        {option.description && (
          <p className="text-sm text-gray-600 font-medium tracking-wide">{option.description}</p>
        )}
        {option.subtext && (
          <p className="text-xs text-gray-500 mt-0.5 font-medium tracking-wide">{option.subtext}</p>
        )}
      </div>
    </div>
  );
};

export default QuizOption;
