
import { useState, useEffect } from "react";
import { ArchetypeKey } from "@/data/creatorArchetypes";

// In a real app, this would likely come from a user settings or profile context
const getUserArchetype = (): ArchetypeKey => {
  // For demo purposes, return 'brand' as default
  return localStorage.getItem('userArchetype') as ArchetypeKey || 'brand';
};

export const useSplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [archetype, setArchetype] = useState<ArchetypeKey>(getUserArchetype());
  const [hasSeenSplash, setHasSeenSplash] = useState(() => {
    return localStorage.getItem('hasSeenSplash') === 'true';
  });

  useEffect(() => {
    // Check if user has already seen the splash screen in this session
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      localStorage.setItem('hasSeenSplash', 'true');
    }
  }, [hasSeenSplash]);

  const hideSplash = () => {
    setShowSplash(false);
  };

  // Function to change archetype (for testing or user settings)
  const changeArchetype = (newArchetype: ArchetypeKey) => {
    setArchetype(newArchetype);
    localStorage.setItem('userArchetype', newArchetype);
  };

  // Reset splash screen (for testing)
  const resetSplash = () => {
    localStorage.removeItem('hasSeenSplash');
    setHasSeenSplash(false);
    setShowSplash(true);
  };

  return {
    showSplash,
    archetype,
    hideSplash,
    changeArchetype,
    resetSplash
  };
};
