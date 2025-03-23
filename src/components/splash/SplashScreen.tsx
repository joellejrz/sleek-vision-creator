import { useState, useEffect } from "react";
import keepCalmContent from "@/data/keepCalmContent";
import { ArchetypeKey } from "@/data/creatorArchetypes";

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

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background wallpaper only - icons and text removed */}
    </div>
  );
};

export default SplashScreen;
