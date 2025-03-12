
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LoadingScreen from "@/components/quiz/LoadingScreen";
import QuizScreen from "@/components/quiz/QuizScreen";
import ConfirmationScreen from "@/components/quiz/ConfirmationScreen";
import ResultScreen from "@/components/quiz/ResultScreen";
import PremiumScreen from "@/components/quiz/PremiumScreen";
import quizQuestions from "@/data/quizQuestions";
import creatorArchetypes from "@/data/creatorArchetypes";
import { determineArchetype } from "@/utils/archetypeUtils";
import { ArchetypeKey } from "@/data/creatorArchetypes";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stage, setStage] = useState("loading");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [archetype, setArchetype] = useState("");
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle the loading stage animation timing
  useEffect(() => {
    if (stage === "loading") {
      const timer = setTimeout(() => {
        setStage("quiz");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Update progress when currentQuestion changes
  useEffect(() => {
    if (stage === "quiz") {
      setProgress(((currentQuestion) / quizQuestions.length) * 100);
    }
  }, [currentQuestion, stage]);

  // Confetti effect timeout
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleOptionSelect = (questionId: number, optionId: string) => {
    setIsAnimating(true);
    
    // Update answers
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
    
    setTimeout(() => {
      // Move to next question or results
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz completed, determine archetype and show confirmation
        const userArchetype = determineArchetype(answers);
        setArchetype(userArchetype);
        setStage("confirmation");
        setProgress(100);
      }
      setIsAnimating(false);
    }, 500);
  };

  const handleConfirmResult = () => {
    setStage("result");
    setShowConfetti(true);
    
    // Show a toast notification
    toast({
      title: "Your creator archetype unlocked!",
      description: `You are a ${creatorArchetypes[archetype as ArchetypeKey]?.title || "Content Creator"}`,
      variant: "default",
    });
  };

  const handleUpgrade = () => {
    setStage("premium");
  };

  const handleContinue = () => {
    // In a real app, you'd save the user's archetype to their profile
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4">
      {/* Loading Screen */}
      {stage === "loading" && <LoadingScreen />}

      {/* Quiz Stage */}
      {stage === "quiz" && (
        <QuizScreen
          currentQuestion={currentQuestion}
          question={quizQuestions[currentQuestion]}
          totalQuestions={quizQuestions.length}
          isAnimating={isAnimating}
          onSelectOption={handleOptionSelect}
          progress={progress}
        />
      )}

      {/* Confirmation Stage */}
      {stage === "confirmation" && archetype && (
        <ConfirmationScreen 
          archetype={archetype} 
          onConfirm={handleConfirmResult}
        />
      )}

      {/* Results Stage */}
      {stage === "result" && archetype && (
        <ResultScreen
          archetype={archetype}
          showConfetti={showConfetti}
          onUpgrade={handleUpgrade}
          onContinue={handleContinue}
        />
      )}

      {/* Premium Stage */}
      {stage === "premium" && <PremiumScreen />}
    </div>
  );
};

export default Onboarding;
