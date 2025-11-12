import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Play, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  duration: number; // in minutes
  points: number;
  completed?: boolean;
  failed?: boolean;
}

interface TaskCardProps {
  task: Task;
  onStart: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onFail: (taskId: string) => void;
  isActive?: boolean;
  timeRemaining?: number;
}

export const TaskCard = ({ 
  task, 
  onStart, 
  onComplete, 
  onFail, 
  isActive, 
  timeRemaining 
}: TaskCardProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeRemaining 
    ? ((task.duration * 60 - timeRemaining) / (task.duration * 60)) * 100 
    : 0;

  return (
    <Card className={cn(
      "p-6 transition-all duration-300",
      isActive && "ring-2 ring-primary shadow-elevated",
      task.completed && "bg-secondary/10 border-secondary",
      task.failed && "bg-destructive/10 border-destructive"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className={cn(
            "text-lg font-semibold mb-2",
            task.completed && "line-through text-muted-foreground"
          )}>
            {task.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{task.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-accent">{task.points}</span>
              <span>pts</span>
            </div>
          </div>
        </div>

        {task.completed && (
          <CheckCircle2 className="w-8 h-8 text-secondary animate-bounce-subtle" />
        )}
        
        {task.failed && (
          <XCircle className="w-8 h-8 text-destructive" />
        )}

        {!task.completed && !task.failed && !isActive && (
          <Button 
            onClick={() => onStart(task.id)}
            className="gap-2"
            size="lg"
          >
            <Play className="w-4 h-4" />
            Start
          </Button>
        )}
      </div>

      {isActive && timeRemaining !== undefined && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-primary tabular-nums">
              {formatTime(timeRemaining)}
            </span>
            <div className="flex gap-2">
              <Button 
                onClick={() => onComplete(task.id)}
                variant="default"
                className="bg-secondary hover:bg-secondary/90"
              >
                Complete
              </Button>
              <Button 
                onClick={() => onFail(task.id)}
                variant="destructive"
              >
                Give Up
              </Button>
            </div>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
};
