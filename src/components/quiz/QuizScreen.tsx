
import React from "react";
import { 
  Card, 
  CardHeader,
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import QuizOption from "./QuizOption";
import { QuizQuestion } from "@/data/quizQuestions";

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
    <Card className="w-full max-w-3xl animate-scale-in">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-2xl font-display">
            Content Creator Archetype Quiz
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <CardDescription className="pt-4">
          {question.question}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
    </Card>
  );
};

export default QuizScreen;
