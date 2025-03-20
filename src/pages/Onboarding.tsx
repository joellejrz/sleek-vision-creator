
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
import { WavyBackground } from "@/components/WavyBackground";

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

  useEffect(() => {
    if (stage === "loading") {
      const timer = setTimeout(() => {
        setStage("quiz");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "quiz") {
      setProgress(((currentQuestion) / quizQuestions.length) * 100);
    }
  }, [currentQuestion, stage]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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
    
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
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
    navigate("/dashboard");
  };

  return (
    <WavyBackground 
      colors={["#401F71", "#FF5EEA", "#00FFFF", "#6F4CD5", "#FF8FB0"]} 
      backgroundFill="#0A0F25"
      waveWidth={30}
      blur={15}
      speed="slow"
      waveOpacity={0.35}
      containerClassName="min-h-screen w-full"
      className="w-full max-w-4xl"
    >
      <div className="relative z-10 w-full max-w-4xl">
        {stage === "loading" && <LoadingScreen />}
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
        {stage === "confirmation" && archetype && (
          <ConfirmationScreen 
            archetype={archetype} 
            onConfirm={handleConfirmResult}
          />
        )}
        {stage === "result" && archetype && (
          <ResultScreen
            archetype={archetype}
            showConfetti={showConfetti}
            onUpgrade={handleUpgrade}
            onContinue={handleContinue}
          />
        )}
        {stage === "premium" && <PremiumScreen />}
      </div>

      {showExitPrompt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-b from-[#1E234A]/90 to-[#401F71]/80 rounded-xl p-6 max-w-md shadow-xl border border-[#FF5EEA]/20 animate-scale-in backdrop-blur-lg">
            <h2 className="text-xl font-bold mb-2 text-white tracking-wide">Wait! Don't abandon your content empire</h2>
            <p className="mb-4 text-white/80 tracking-wide">People who finish this quiz unlock their dream creator blueprint. Don't miss out.</p>
            <div className="flex gap-3">
              <button 
                className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-[#FF5EEA] to-[#00FFFF] text-white font-medium hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,94,234,0.4)]"
                onClick={() => setShowExitPrompt(false)}
              >
                Stay & Unlock Success
              </button>
              <button 
                className="py-2 px-4 rounded-lg border border-white/10 text-white/60 hover:bg-white/5 transition-all"
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
    </WavyBackground>
  );
};

export default Onboarding;
