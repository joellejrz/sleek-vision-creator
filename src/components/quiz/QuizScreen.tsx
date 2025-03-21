
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
      <div className="mb-4 text-center">
        <h3 className="text-xl font-display font-bold text-primary flex items-center justify-center gap-2 tracking-wide">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-deep-blue">
            Your Dream Creator Identity is Unlocking...
          </span>
          <Sparkles className="h-5 w-5 text-deep-blue" />
        </h3>
        <p className="text-sm text-gray-600 font-medium mt-1 tracking-wide">
          ✨ Every answer you choose shapes your path to influence & wealth
        </p>
      </div>
      
      <Card className="w-full animate-scale-in overflow-hidden relative rounded-3xl 
                      border border-gray-100/50 shadow-sm bg-white/90 backdrop-blur-md">
        <CardHeader className="relative z-10 pb-2">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-xl font-display font-bold tracking-wide">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-deep-blue">
                Content Creator Archetype Quiz
              </span>
            </CardTitle>
            <div className="text-sm text-gray-500 font-medium tracking-wide">
              {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>
          
          <Progress value={progress} className="h-1.5 bg-gray-100 rounded-full" />
          
          <div className="mt-3 mb-1 text-xs flex justify-between tracking-wide">
            <span className="text-gray-500 font-medium">Your personalized roadmap is being prepared...</span>
            <span className="text-accent-gold font-semibold">
              {Math.floor(87 - currentQuestion * 10)}% of creators complete this quiz
            </span>
          </div>
          
          <CardDescription className="pt-3 text-base">
            <div className="font-semibold text-xl mb-2 text-gray-800 tracking-wide">
              {question.question}
            </div>
            <div className="text-sm text-gray-600 font-medium tracking-wide">
              Pick honestly—this will determine your content empire strategy
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10 px-4 py-2">
          <div className={`space-y-2.5 ${isAnimating ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
            {question.options.map((option) => (
              <QuizOption
                key={option.id}
                option={option}
                onClick={() => onSelectOption(question.id, option.id)}
              />
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="relative z-10 flex justify-center border-t border-gray-100/50 pt-3 pb-3">
          <p className="text-xs text-center text-gray-500 font-medium tracking-wide">
            <span className="text-accent-gold">🚀</span> You're ahead of 9,721 creators. Don't quit now.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizScreen;
