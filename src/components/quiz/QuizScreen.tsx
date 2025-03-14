
import React from "react";
import { 
  Card, 
  CardHeader,
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import QuizOption from "./QuizOption";
import { QuizQuestion } from "@/data/quizQuestions";
import { Sparkles } from "lucide-react";

interface QuizScreenProps {
  currentQuestion: number;
  question: QuizQuestion;
  totalQuestions: number;
  isAnimating: boolean;
  onSelectOption: (questionId: number, optionId: string) => void;
  progress: number;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  currentQuestion,
  question,
  totalQuestions,
  isAnimating,
  onSelectOption,
  progress
}) => {
  return (
    <div className="w-full max-w-2xl animate-fade-in">
      <div className="mb-2 text-center">
        <h3 className="text-xl font-display font-bold text-white flex items-center justify-center gap-2 tracking-wide">
          <Sparkles className="h-5 w-5 text-[#FF5EEA]" />
          <span className="text-gradient-secondary text-transparent bg-clip-text bg-gradient-to-r from-[#FF5EEA] to-[#00FFFF]">
            Your Dream Creator Identity is Unlocking...
          </span>
          <Sparkles className="h-5 w-5 text-[#00FFFF]" />
        </h3>
        <p className="text-sm text-white font-medium mt-1 tracking-wide">
          ✨ Every answer you choose shapes your path to influence & wealth
        </p>
      </div>
      
      <Card className="w-full animate-scale-in overflow-hidden relative glass-dark bg-opacity-10 backdrop-blur-xl 
                      bg-gradient-to-b from-[#1E234A]/40 to-[#401F71]/20 border border-[#FF5EEA]/20 
                      shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,94,234,0.1)] rounded-xl">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5EEA]/5 via-[#00FFFF]/5 to-[#FF5EEA]/5 animate-pulse-soft opacity-30"></div>
          {/* Improved nebula-like particles effect */}
          <div className="absolute h-32 w-32 rounded-full bg-[#FF5EEA]/20 blur-3xl top-10 right-10 animate-float opacity-70"></div>
          <div className="absolute h-40 w-40 rounded-full bg-[#7B3FE4]/20 blur-3xl bottom-10 left-10 animate-float opacity-70"></div>
          <div className="absolute h-24 w-24 rounded-full bg-[#00FFFF]/20 blur-3xl bottom-40 right-20 animate-float opacity-60"></div>
        </div>
        
        <CardHeader className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-2xl font-display font-bold text-white tracking-wide">
              <span className="text-gradient-secondary text-transparent bg-clip-text bg-gradient-to-r from-[#FF5EEA] to-[#00FFFF]">
                Content Creator Archetype Quiz
              </span>
            </CardTitle>
            <div className="text-sm text-white/80 font-medium tracking-wide">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>
          <Progress value={progress} className="h-1.5 bg-gray-800/50" />
          
          {/* Enhanced FOMO element */}
          <div className="mt-3 mb-1 text-xs flex justify-between tracking-wide">
            <span className="text-white/70 font-medium">Your personalized roadmap is being prepared...</span>
            <span className="text-[#F5C16C] font-semibold animate-pulse-soft">
              {Math.floor(87 - currentQuestion * 10)}% of creators complete this quiz
            </span>
          </div>
          
          {/* Enhanced question formatting */}
          <CardDescription className="pt-4 text-base">
            <div className="font-semibold text-xl mb-2 text-white tracking-wide shadow-[0_0_10px_rgba(255,255,255,0.15)]">
              {question.question}
            </div>
            <div className="text-sm text-white/90 font-medium tracking-wide">
              Pick honestly—this will determine your content empire strategy
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className={`space-y-4 ${isAnimating ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
            {question.options.map((option) => (
              <QuizOption
                key={option.id}
                option={option}
                onClick={() => onSelectOption(question.id, option.id)}
              />
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="relative z-10 flex justify-center border-t border-white/10 pt-4 pb-3">
          <p className="text-xs text-center text-white/70 font-medium tracking-wide">
            <span className="text-[#F5C16C]">🚀</span> You're ahead of 9,721 creators. Don't quit now.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizScreen;
