
import React from "react";
import { Sparkles } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import creatorArchetypes from "@/data/creatorArchetypes";
import { ArchetypeKey } from "@/data/creatorArchetypes";

interface ConfirmationScreenProps {
  archetype: string;
  onConfirm: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ archetype, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-lg animate-scale-in rounded-3xl border border-gray-100/50 bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-accent/10 p-4 rounded-full mb-4 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-2xl font-display mb-2">
            Ready to discover your true content creator identity?
          </CardTitle>
          <CardDescription className="text-lg">
            This is your moment. You're about to unlock a career path that fits your energy, skills & dream lifestyle.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-0 pb-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-deep-blue text-white mt-4 rounded-full px-8 h-12 font-medium" 
            onClick={onConfirm}
          >
            Yes, unlock my {creatorArchetypes[archetype as ArchetypeKey]?.title || "Creator"} path!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationScreen;
