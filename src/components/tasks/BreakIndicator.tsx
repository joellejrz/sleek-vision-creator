
import { Bed } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BreakIndicatorProps {
  duration: string;
}

const BreakIndicator = ({ duration }: BreakIndicatorProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="pl-2 sm:pl-7 py-1 sm:py-4 text-[9px] sm:text-sm text-slate-500 flex items-center">
      <div className="w-2 sm:w-7 h-0.5 bg-amber-300 mr-1 sm:mr-4 flex-shrink-0"></div>
      <Bed className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'} mr-1 sm:mr-2 text-amber-500`} />
      <span className="hidden xs:inline">A well-deserved break.</span>
      <span className="ml-1 sm:ml-2 text-[8px] sm:text-xs opacity-70">{duration}</span>
    </div>
  );
};

export default BreakIndicator;
