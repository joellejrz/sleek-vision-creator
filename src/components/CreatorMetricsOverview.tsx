
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, Eye, ThumbsUp, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    isIncrease: boolean;
  };
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  return (
    <Card className="p-3 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="text-sm text-muted-foreground mb-1">{title}</div>
        <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className={cn(
        "text-xs flex items-center gap-0.5 mt-1",
        change.isIncrease ? "text-green-500" : "text-red-500"
      )}>
        {change.isIncrease ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {change.value} {change.isIncrease ? "increase" : "decrease"}
      </div>
    </Card>
  );
};

export const CreatorMetricsOverview = () => {
  const isMobile = useIsMobile();
  
  const metrics = [
    {
      title: "Total Followers",
      value: "12,580",
      change: {
        value: "12.5%",
        isIncrease: true,
      },
      icon: <Users className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Total Views",
      value: "48,920",
      change: {
        value: "8.2%",
        isIncrease: true,
      },
      icon: <Eye className="h-4 w-4 text-purple-500" />,
    },
    {
      title: "Engagement Rate",
      value: "24.7%",
      change: {
        value: "2.3%",
        isIncrease: false,
      },
      icon: <ThumbsUp className="h-4 w-4 text-orange-500" />,
    },
    {
      title: "Growth Rate",
      value: "18.6%",
      change: {
        value: "5.4%",
        isIncrease: true,
      },
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    },
  ];

  // If not mobile, don't render this component
  if (!isMobile) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Creator Metrics</h2>
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatorMetricsOverview;
