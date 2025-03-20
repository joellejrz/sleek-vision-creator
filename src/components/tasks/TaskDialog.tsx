import { useState, useEffect } from "react";
import { format } from "date-fns";
import { X, Bell, Plus, Trash2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: any) => void;
}

const taskSuggestionsByNiche: Record<string, string[]> = {
  default: [
    "Create social media post",
    "Schedule content for next week",
    "Research trending topics",
    "Engage with followers",
    "Update content calendar",
    "Brainstorm content ideas",
    "Plan next month's content strategy",
    "Record podcast episode",
  ],
  fitness: [
    "Film gym workout routine",
    "Create protein shake recipe post",
    "Plan weekly workout schedule post",
    "Film form technique tutorial",
    "Create before/after transformation post",
    "Record meal prep video",
    "Share supplement review",
    "Film HIIT workout sequence",
  ],
  beauty: [
    "Film GRWM makeup tutorial",
    "Create skincare routine video",
    "Record product review",
    "Film hairstyle tutorial",
    "Create seasonal makeup look",
    "Share favorite products roundup",
    "Film beauty hack tutorial",
    "Create trending makeup challenge",
  ],
  tech: [
    "Record product unboxing",
    "Create software tutorial",
    "Film gadget review",
    "Share tech news update",
    "Create comparison video",
    "Film troubleshooting guide",
    "Record setup tour",
    "Create tech tip tutorial",
  ],
  food: [
    "Film recipe tutorial",
    "Create restaurant review",
    "Record cooking technique video",
    "Share meal prep guide",
    "Create food photography tips",
    "Film taste test video",
    "Share kitchen gadget review",
    "Create recipe ebook",
  ],
};

const TaskDialog = ({ open, onOpenChange, onAddTask }: TaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [category, setCategory] = useState<string>("content");
  const [duration, setDuration] = useState<string>("30min");
  const [frequency, setFrequency] = useState<string>("once");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("09:30");
  const [color, setColor] = useState<string>("green");
  const [alertStart, setAlertStart] = useState<boolean>(true);
  const [alertEnd, setAlertEnd] = useState<boolean>(false);
  const [alert5Min, setAlert5Min] = useState<boolean>(true);
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtask, setNewSubtask] = useState<string>("");
  const [showTaskSuggestions, setShowTaskSuggestions] = useState<boolean>(false);
  const [taskSuggestions, setTaskSuggestions] = useState<string[]>([]);
  const [creatorNiche, setCreatorNiche] = useState<string>("default");

  useEffect(() => {
    if (open) {
      setShowTaskSuggestions(false);
      setTaskSuggestions([]);
    }
  }, [open]);

  const generateTaskSuggestions = (input: string) => {
    if (input.length < 2) {
      setShowTaskSuggestions(false);
      return;
    }

    const nicheSuggestions = taskSuggestionsByNiche[creatorNiche] || taskSuggestionsByNiche.default;
    
    let matchedSuggestions = nicheSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    
    if (matchedSuggestions.length < 3) {
      const defaultMatches = taskSuggestionsByNiche.default.filter(suggestion => 
        suggestion.toLowerCase().includes(input.toLowerCase()) &&
        !matchedSuggestions.includes(suggestion)
      );
      matchedSuggestions = [...matchedSuggestions, ...defaultMatches.slice(0, 3 - matchedSuggestions.length)];
    }

    setTaskSuggestions(matchedSuggestions.slice(0, 5));
    setShowTaskSuggestions(matchedSuggestions.length > 0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    generateTaskSuggestions(e.target.value);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setTitle(suggestion);
    setShowTaskSuggestions(false);
  };

  const handleChangeNiche = (niche: string) => {
    setCreatorNiche(niche);
    if (title.length >= 2) {
      generateTaskSuggestions(title);
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, newSubtask]);
      setNewSubtask("");
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      priority,
      due: date ? format(date, "PP") + (startTime ? ` at ${startTime}` : "") : "Today",
      category,
      color,
      duration,
      frequency,
      startTime,
      endTime,
      alerts: {
        start: alertStart,
        end: alertEnd,
        fiveMin: alert5Min,
      },
      subtasks: subtasks.map(task => ({ text: task, completed: false })),
      aiSuggested: false,
    };

    onAddTask(newTask);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDate(new Date());
    setCategory("content");
    setDuration("30min");
    setFrequency("once");
    setStartTime("09:00");
    setEndTime("09:30");
    setColor("green");
    setAlertStart(true);
    setAlertEnd(false);
    setAlert5Min(true);
    setSubtasks([]);
    setNewSubtask("");
  };

  const categories = [
    { name: "Content Creation", icon: "📱", value: "content" },
    { name: "Planning", icon: "📝", value: "planning" },
    { name: "Editing", icon: "✂️", value: "editing" },
    { name: "Research", icon: "🔍", value: "research" },
    { name: "Engagement", icon: "💬", value: "engagement" },
  ];

  const colors = [
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Blue", value: "blue", class: "bg-blue-500" },
    { name: "Purple", value: "purple", class: "bg-purple-500" },
    { name: "Red", value: "red", class: "bg-red-500" },
    { name: "Yellow", value: "yellow", class: "bg-yellow-500" },
    { name: "Teal", value: "teal", class: "bg-teal-500" },
  ];

  const durations = [
    { label: "10min", value: "10min" },
    { label: "15min", value: "15min" },
    { label: "30min", value: "30min" },
    { label: "45min", value: "45min" },
    { label: "1h", value: "1h" },
    { label: "1.5h", value: "1.5h" },
  ];

  const frequencies = [
    { label: "Once", value: "once" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Task</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">What?</h3>
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
                  {categories.find(c => c.value === category)?.icon || "📱"}
                </div>
                <Input
                  placeholder="Task title"
                  value={title}
                  onChange={handleTitleChange}
                  className="flex-1"
                />
              </div>
              
              {showTaskSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                  <div className="py-1 px-3 bg-muted/50 text-xs flex items-center border-b">
                    <Sparkles className="h-3 w-3 text-accent-gold mr-1" />
                    <span>Suggested tasks for your niche</span>
                  </div>
                  <ul className="py-1 max-h-60 overflow-y-auto">
                    {taskSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center text-sm"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        <Sparkles className="h-3 w-3 text-accent-gold mr-2" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-1">
              <div className="text-xs text-muted-foreground mb-1 w-full">Demo: Select your niche</div>
              {Object.keys(taskSuggestionsByNiche).map(niche => (
                niche !== 'default' && (
                  <Button 
                    key={niche} 
                    size="sm" 
                    variant={creatorNiche === niche ? "default" : "outline"}
                    className="text-xs py-1 h-6"
                    onClick={() => handleChangeNiche(niche)}
                  >
                    {niche.charAt(0).toUpperCase() + niche.slice(1)}
                  </Button>
                )
              ))}
            </div>
            
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-20"
            />
          </div>

          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-medium text-lg">When?</h3>
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    {date ? format(date, "PP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Start Time</label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">End Time</label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-medium text-lg">How long?</h3>
            <div className="flex flex-wrap gap-2">
              {durations.map((dur) => (
                <Button
                  key={dur.value}
                  variant={duration === dur.value ? "default" : "outline"}
                  onClick={() => setDuration(dur.value)}
                  className="flex-1 min-w-[60px]"
                >
                  {dur.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-medium text-lg">What color?</h3>
            <div className="flex flex-wrap gap-4 justify-center py-2">
              {colors.map((col) => (
                <button
                  key={col.value}
                  onClick={() => setColor(col.value)}
                  className={`w-12 h-12 rounded-full ${col.class} ${
                    color === col.value ? "ring-4 ring-offset-2 ring-gray-300" : ""
                  }`}
                  aria-label={`Select ${col.name} color`}
                />
              ))}
            </div>
          </div>

          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-medium text-lg">How often?</h3>
            <div className="flex flex-wrap gap-2">
              {frequencies.map((freq) => (
                <Button
                  key={freq.value}
                  variant={frequency === freq.value ? "default" : "outline"}
                  onClick={() => setFrequency(freq.value)}
                  className="flex-1"
                >
                  {freq.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Set priority</h3>
            <div className="flex gap-2">
              <Button
                variant={priority === "low" ? "default" : "outline"}
                onClick={() => setPriority("low")}
                className="flex-1"
              >
                Low
              </Button>
              <Button
                variant={priority === "medium" ? "default" : "outline"}
                onClick={() => setPriority("medium")}
                className="flex-1"
              >
                Medium
              </Button>
              <Button
                variant={priority === "high" ? "default" : "outline"}
                onClick={() => setPriority("high")}
                className="flex-1"
              >
                High
              </Button>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Needs alerts?</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span>At start of task</span>
                </div>
                <Button
                  variant={alertStart ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAlertStart(!alertStart)}
                >
                  {alertStart ? "On" : "Off"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span>At end of task</span>
                </div>
                <Button
                  variant={alertEnd ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAlertEnd(!alertEnd)}
                >
                  {alertEnd ? "On" : "Off"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span>5m before start</span>
                </div>
                <Button
                  variant={alert5Min ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAlert5Min(!alert5Min)}
                >
                  {alert5Min ? "On" : "Off"}
                </Button>
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Any details?</h3>
            <div>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add subtask"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddSubtask();
                  }}
                  className="flex-1"
                />
                <Button onClick={handleAddSubtask}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Subtask</span>
                </Button>
              </div>
              
              {subtasks.length > 0 && (
                <div className="space-y-2 mt-2">
                  {subtasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span>{task}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSubtask(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <Textarea
                placeholder="Add notes, meeting links or phone numbers..."
                className="h-24 mt-4"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
