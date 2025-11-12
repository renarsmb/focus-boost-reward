import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Gamepad2, Music, Coffee } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Reward {
  id: string;
  name: string;
  cost: number;
  icon: React.ReactNode;
  duration: string;
}

interface RewardsSectionProps {
  points: number;
  onRedeem: (cost: number, rewardName: string) => void;
}

export const RewardsSection = ({ points, onRedeem }: RewardsSectionProps) => {
  const rewards: Reward[] = [
    {
      id: "1",
      name: "15 min Screen Time",
      cost: 50,
      icon: <Monitor className="w-6 h-6" />,
      duration: "15 minutes",
    },
    {
      id: "2",
      name: "30 min Gaming",
      cost: 100,
      icon: <Gamepad2 className="w-6 h-6" />,
      duration: "30 minutes",
    },
    {
      id: "3",
      name: "Music Break",
      cost: 30,
      icon: <Music className="w-6 h-6" />,
      duration: "20 minutes",
    },
    {
      id: "4",
      name: "Snack Break",
      cost: 40,
      icon: <Coffee className="w-6 h-6" />,
      duration: "10 minutes",
    },
  ];

  const handleRedeem = (reward: Reward) => {
    if (points >= reward.cost) {
      onRedeem(reward.cost, reward.name);
      toast({
        title: "Reward Redeemed! 🎉",
        description: `Enjoy your ${reward.name}!`,
      });
    } else {
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.cost - points} more points for this reward.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Rewards Shop</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rewards.map((reward) => {
          const canAfford = points >= reward.cost;
          return (
            <Card 
              key={reward.id} 
              className={`p-6 transition-all duration-300 ${
                canAfford 
                  ? "hover:shadow-elevated hover:scale-105" 
                  : "opacity-60"
              }`}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className={`p-4 rounded-2xl ${
                  canAfford ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {reward.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{reward.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{reward.duration}</p>
                  <p className="text-2xl font-bold text-accent">{reward.cost} pts</p>
                </div>
                <Button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford}
                  className="w-full"
                  variant={canAfford ? "default" : "outline"}
                >
                  {canAfford ? "Redeem" : "Locked"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
