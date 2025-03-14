
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
    <div className="w-full max-w-3xl">
      <div className="mb-2 text-center animate-fade-in">
        <h3 className="text-lg font-medium text-white flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-accent-gold" />
          <span>Your Dream Creator Identity is Unlocking...</span>
          <Sparkles className="h-4 w-4 text-accent-gold" />
        </h3>
        <p className="text-sm text-white font-medium mt-1">
          ✨ Every answer you choose shapes your path to influence & wealth
        </p>
      </div>
      
      <Card className="w-full max-w-3xl animate-scale-in overflow-hidden relative glass-dark bg-gradient-to-b from-[#1E234A]/60 to-[#401F71]/30 backdrop-blur-lg border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.35)] rounded-xl">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/10 via-soft-emerald/10 to-accent-gold/10 animate-pulse-soft opacity-30"></div>
          {/* Improved nebula-like particles effect */}
          <div className="absolute h-32 w-32 rounded-full bg-accent-gold/15 blur-3xl top-10 right-10 animate-float opacity-70"></div>
          <div className="absolute h-40 w-40 rounded-full bg-[#7B3FE4]/15 blur-3xl bottom-10 left-10 animate-float opacity-70"></div>
          <div className="absolute h-24 w-24 rounded-full bg-soft-emerald/15 blur-3xl bottom-40 right-20 animate-float opacity-60"></div>
        </div>
        
        <CardHeader className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-2xl font-display font-bold text-white">
              Content Creator Archetype Quiz
            </CardTitle>
            <div className="text-sm text-white/80 font-medium">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>
          <Progress value={progress} className="h-2.5 bg-white/10" />
          
          {/* Enhanced FOMO element */}
          <div className="mt-3 mb-1 text-xs flex justify-between">
            <span className="text-white/70 font-medium">Your personalized roadmap is being prepared...</span>
            <span className="text-accent-gold font-semibold animate-pulse-soft">
              {Math.floor(87 - currentQuestion * 10)}% of creators complete this quiz
            </span>
          </div>
          
          {/* Enhanced question formatting */}
          <CardDescription className="pt-4 text-base">
            <div className="font-semibold text-lg mb-2 text-white">{question.question}</div>
            <div className="text-sm text-white/90 font-medium">
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
        
        <CardFooter className="relative z-10 flex justify-center border-t border-white/10 pt-4 pb-2">
          <p className="text-xs text-center text-white/70 font-medium">
            <span className="text-accent-gold">🚀</span> You're ahead of 9,721 creators. Don't quit now.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizScreen;
