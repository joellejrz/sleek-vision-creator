
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ArchetypeKey } from "@/data/creatorArchetypes";
import creatorArchetypes from "@/data/creatorArchetypes";
import { useSplashScreen } from "@/hooks/useSplashScreen";

const ArchetypeSwitcher = () => {
  const { archetype, changeArchetype, resetSplash } = useSplashScreen();
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeKey>(archetype);

  const handleArchetypeChange = (value: string) => {
    setSelectedArchetype(value as ArchetypeKey);
  };

  const applyArchetypeChange = () => {
    changeArchetype(selectedArchetype);
    resetSplash();
    window.location.reload();
  };

  return (
    <div className="p-4 bg-muted/30 rounded-lg border border-border shadow-sm">
      <h3 className="text-sm font-medium mb-2">Test Splash Screen</h3>
      <div className="flex items-center gap-2">
        <Select value={selectedArchetype} onValueChange={handleArchetypeChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select archetype" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(creatorArchetypes) as ArchetypeKey[]).map((key) => (
              <SelectItem key={key} value={key}>
                {creatorArchetypes[key].title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={applyArchetypeChange}>
          Show Splash
        </Button>
      </div>
    </div>
  );
};

export default ArchetypeSwitcher;
