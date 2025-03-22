
import { Bed } from "lucide-react";

interface BreakIndicatorProps {
  duration: string;
}

const BreakIndicator = ({ duration }: BreakIndicatorProps) => {
  return (
    <div className="pl-7 py-4 text-sm text-slate-500 flex items-center">
      <div className="w-7 h-0.5 bg-amber-300 mr-4 flex-shrink-0"></div>
      <Bed className="h-4 w-4 mr-2 text-amber-500" />
      <span>A well-deserved break.</span>
      <span className="ml-2 text-xs opacity-70">{duration}</span>
    </div>
  );
};

export default BreakIndicator;
