import { useState, useEffect } from "react";
import { TaskCard, Task } from "@/components/TaskCard";
import { PointsDisplay } from "@/components/PointsDisplay";
import { AddTaskForm } from "@/components/AddTaskForm";
import { RewardsSection } from "@/components/RewardsSection";
import { toast } from "@/hooks/use-toast";
import { Brain } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Study for Math Test",
      duration: 25,
      points: 50,
    },
    {
      id: "2",
      title: "Complete History Essay",
      duration: 45,
      points: 90,
    },
  ]);
  
  const [points, setPoints] = useState(150);
  const [todayPoints, setTodayPoints] = useState(50);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeTaskId && timeRemaining !== null && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            // Time's up! Auto-fail the task
            handleTaskFail(activeTaskId);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTaskId, timeRemaining]);

  const handleAddTask = (title: string, duration: number) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      duration,
      points: duration * 2, // 2 points per minute
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task Added! 📝",
      description: `"${title}" is ready to tackle!`,
    });
  };

  const handleStartTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setActiveTaskId(taskId);
      setTimeRemaining(task.duration * 60); // Convert to seconds
      toast({
        title: "Timer Started! ⏱️",
        description: `Focus on "${task.title}" for ${task.duration} minutes.`,
      });
    }
  };

  const handleTaskComplete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && timeRemaining !== null && timeRemaining > 0) {
      setTasks(tasks.map((t) => 
        t.id === taskId ? { ...t, completed: true } : t
      ));
      setPoints(points + task.points);
      setTodayPoints(todayPoints + task.points);
      setActiveTaskId(null);
      setTimeRemaining(null);
      
      toast({
        title: "Amazing Work! 🎉",
        description: `You earned ${task.points} points! Keep crushing it!`,
      });
    }
  };

  const handleTaskFail = (taskId: string) => {
    setTasks(tasks.map((t) => 
      t.id === taskId ? { ...t, failed: true } : t
    ));
    setActiveTaskId(null);
    setTimeRemaining(null);
    
    toast({
      title: "No worries!",
      description: "Every attempt is progress. Try again when you're ready!",
      variant: "destructive",
    });
  };

  const handleRedeemReward = (cost: number, rewardName: string) => {
    setPoints(points - cost);
  };

  const activeTasks = tasks.filter((t) => !t.completed && !t.failed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="w-10 h-10 text-primary animate-pulse-glow" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FocusQuest
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Turn your tasks into achievements, one timer at a time! 🎯
          </p>
        </div>

        {/* Points Display */}
        <div className="mb-8">
          <PointsDisplay points={points} todayPoints={todayPoints} />
        </div>

        {/* Add Task */}
        <div className="mb-8">
          <AddTaskForm onAddTask={handleAddTask} />
        </div>

        {/* Active Tasks */}
        {activeTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStart={handleStartTask}
                  onComplete={handleTaskComplete}
                  onFail={handleTaskFail}
                  isActive={activeTaskId === task.id}
                  timeRemaining={activeTaskId === task.id ? timeRemaining ?? undefined : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Completed Today ✨</h2>
            <div className="space-y-4">
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStart={handleStartTask}
                  onComplete={handleTaskComplete}
                  onFail={handleTaskFail}
                />
              ))}
            </div>
          </div>
        )}

        {/* Rewards Section */}
        <div className="mb-8">
          <RewardsSection points={points} onRedeem={handleRedeemReward} />
        </div>
      </div>
    </div>
  );
};

export default Index;
