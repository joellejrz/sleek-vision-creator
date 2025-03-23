
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import keepCalmContent from "@/data/keepCalmContent";
import { ArchetypeKey } from "@/data/creatorArchetypes";
import { Crown, Lips } from "lucide-react";

interface SplashScreenProps {
  archetype: ArchetypeKey;
  onFinished: () => void;
}

const SplashScreen = ({ archetype, onFinished }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const content = keepCalmContent[archetype];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinished, 500); // Give time for fade-out animation
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onFinished]);

  // Choose icon based on archetype
  const renderIcon = () => {
    if (archetype === "brand") {
      return <Crown className="h-16 w-16 text-white" />;
    }
    if (archetype === "entertainment") {
      return <Lips className="h-16 w-16 text-white" />;
    }
    return <div className="text-4xl">{content.icon}</div>;
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex flex-col items-center justify-center text-center p-6 animate-fade-in">
        {renderIcon()}
        
        <div className="mt-12 mb-4 font-bold">
          <h1 className={`text-2xl md:text-3xl font-display tracking-wide ${content.textColor}`}>KEEP</h1>
          <h1 className={`text-4xl md:text-6xl font-display tracking-wide ${content.textColor}`}>CALM</h1>
          <h1 className={`text-xl md:text-2xl font-display tracking-wide ${content.textColor} mt-2`}>AND</h1>
        </div>
        
        <h1 className={`text-3xl md:text-5xl font-display tracking-wide ${content.textColor} mb-10`}>
          {content.text}
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
