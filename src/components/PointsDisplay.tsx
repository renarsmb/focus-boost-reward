import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp } from "lucide-react";

interface PointsDisplayProps {
  points: number;
  todayPoints: number;
}

export const PointsDisplay = ({ points, todayPoints }: PointsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Points</p>
            <p className="text-3xl font-bold text-foreground">{points}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-card to-accent/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-2xl">
            <TrendingUp className="w-8 h-8 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Today's Points</p>
            <p className="text-3xl font-bold text-foreground">{todayPoints}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
