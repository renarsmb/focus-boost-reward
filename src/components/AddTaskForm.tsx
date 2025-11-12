import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  onAddTask: (title: string, duration: number) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("25");
  const [isOpen, setIsOpen] = useState(false);

  const presetDurations = [15, 25, 45, 60];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && duration) {
      onAddTask(title.trim(), parseInt(duration));
      setTitle("");
      setDuration("25");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)} 
        size="lg"
        className="w-full gap-2"
      >
        <Plus className="w-5 h-5" />
        Add New Task
      </Button>
    );
  }

  return (
    <Card className="p-6 animate-slide-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Task Name</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Study Math Chapter 5"
            className="text-lg"
            autoFocus
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Duration (minutes)</label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {presetDurations.map((mins) => (
              <Button
                key={mins}
                type="button"
                variant={duration === mins.toString() ? "default" : "outline"}
                onClick={() => setDuration(mins.toString())}
                className="h-12"
              >
                {mins}m
              </Button>
            ))}
          </div>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Custom duration"
            min="1"
            max="180"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1" size="lg">
            Add Task
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
