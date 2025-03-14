
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
        <h3 className="text-lg font-medium text-white/80 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-accent-gold" />
          <span>Your Dream Creator Identity is Unlocking...</span>
          <Sparkles className="h-4 w-4 text-accent-gold" />
        </h3>
        <p className="text-sm text-white/70 mt-1">
          ✨ Every answer you choose shapes your path to influence & wealth
        </p>
      </div>
      
      <Card className="w-full max-w-3xl animate-scale-in overflow-hidden relative bg-gradient-to-b from-deep-blue/40 to-deep-teal/20 backdrop-blur-sm border border-white/10">
        {/* Subtle animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/5 via-soft-emerald/5 to-accent-gold/5 animate-pulse-soft opacity-20"></div>
          {/* Nebula-like particles effect (purely CSS) */}
          <div className="absolute h-24 w-24 rounded-full bg-accent-gold/10 blur-2xl top-10 right-10 animate-float"></div>
          <div className="absolute h-32 w-32 rounded-full bg-soft-emerald/10 blur-2xl bottom-10 left-10 animate-float"></div>
        </div>
        
        <CardHeader className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-2xl font-display text-gradient-primary">
              Content Creator Archetype Quiz
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-muted/50" />
          
          {/* Emotional FOMO element */}
          <div className="mt-3 mb-1 text-xs text-muted-foreground flex justify-between">
            <span>Your personalized roadmap is being prepared...</span>
            <span className="text-accent-gold font-medium">
              {Math.floor(87 - currentQuestion * 10)}% of creators complete this quiz
            </span>
          </div>
          
          {/* Visceral question formatting */}
          <CardDescription className="pt-4 text-base">
            <div className="font-medium text-lg mb-1">{question.question}</div>
            <div className="text-sm text-muted-foreground">
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
        
        <CardFooter className="relative z-10 flex justify-center border-t border-white/5 pt-4 pb-2">
          <p className="text-xs text-center text-muted-foreground">
            <span className="text-accent-gold">🚀</span> You're ahead of 9,721 creators. Don't quit now.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizScreen;
