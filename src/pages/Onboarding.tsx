
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
  const [showExitPrompt, setShowExitPrompt] = useState(false);

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

  // Exit intent detection (simplified version)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (stage === "quiz" && !showExitPrompt) {
        e.preventDefault();
        e.returnValue = '';
        setShowExitPrompt(true);
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [stage, showExitPrompt]);

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Immersive animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-deep-teal to-deep-blue z-0">
        {/* Animated nebula effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-soft-emerald/10 rounded-full filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-accent-gold/10 rounded-full filter blur-3xl opacity-20 animate-pulse-soft"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1/4 h-1/4 bg-deep-teal/20 rounded-full filter blur-3xl opacity-30 animate-float"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
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

      {/* Exit intent modal */}
      {showExitPrompt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-lg p-6 max-w-md shadow-xl border border-accent-gold/20 animate-scale-in">
            <h2 className="text-xl font-bold mb-2 text-white">Wait! Don't abandon your content empire</h2>
            <p className="mb-4 text-white/80">People who finish this quiz unlock their dream creator blueprint. Don't miss out.</p>
            <div className="flex gap-3">
              <button 
                className="flex-1 py-2 px-4 rounded bg-accent-gold text-deep-blue font-medium hover:brightness-110 transition-all"
                onClick={() => setShowExitPrompt(false)}
              >
                Stay & Unlock Success
              </button>
              <button 
                className="py-2 px-4 rounded border border-white/10 text-white/60 hover:bg-white/5 transition-all"
                onClick={() => {
                  setShowExitPrompt(false);
                  navigate("/");
                }}
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
