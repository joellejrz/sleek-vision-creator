
export const determineArchetype = (answers: Record<number, string>): string => {
  // This is a simplified algorithm - in a real app, this would be more sophisticated
  const primaryInterest = answers[1];
  const monetizationFocus = answers[2];
  
  // Map answers to archetypes (simplified version)
  if (primaryInterest === "aesthetic") {
    return "aesthetic";
  } else if (primaryInterest === "knowledge") {
    return monetizationFocus === "monetize" ? "digital" : "development";
  } else if (primaryInterest === "transformation") {
    return "wellness";
  } else if (primaryInterest === "lifestyle") {
    return answers[3] === "nature-connection" ? "pet" : "brand";
  } else if (primaryInterest === "cinematic") {
    return monetizationFocus === "viral" ? "entertainment" : "travel";
  }
  
  // Default fallback
  return "digital";
};
