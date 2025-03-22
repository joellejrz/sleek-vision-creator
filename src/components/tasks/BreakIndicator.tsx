
import { Bed } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BreakIndicatorProps {
  duration: string;
}

const BreakIndicator = ({ duration }: BreakIndicatorProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-0.5 text-[9px] text-slate-500 flex items-center">
      <div className="w-1.5 h-0.5 bg-amber-300 mr-1 flex-shrink-0"></div>
      <Bed className="h-2 w-2 mr-1 text-amber-500" />
      <span className="hidden xs:inline">A well-deserved break.</span>
      <span className="ml-0.5 text-[8px] opacity-70">{duration}</span>
    </div>
  );
};

export default BreakIndicator;
