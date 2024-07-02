import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Star, BookOpen, Palette, Leaf, Heart, Lightbulb, Rocket, Globe, Home } from 'lucide-react';
import { Rewards } from '../data/rewards';

interface RewardRedeemerProps {
  rewards: Rewards;
  redeemReward: (reward: string) => void;
}

const RewardRedeemer: React.FC<RewardRedeemerProps> = ({ rewards, redeemReward }) => {
  const rowColors = [
    { bg: "bg-sky-100", hoverBg: "hover:bg-sky-200", borderColor: "border-sky-300" },
    { bg: "bg-green-100", hoverBg: "hover:bg-green-200", borderColor: "border-green-300" },
    { bg: "bg-yellow-100", hoverBg: "hover:bg-yellow-200", borderColor: "border-yellow-300" },
    { bg: "bg-pink-100", hoverBg: "hover:bg-pink-200", borderColor: "border-pink-300" },
  ];

  const icons: { [key: string]: React.ElementType } = {
    'reading': BookOpen,
    'creative': Palette,
    'outdoor': Leaf,
    'social': Heart,
    'skills': Lightbulb,
    'science': Rocket,
    'culture': Globe,
    'family': Home,
  };

  const categorizeReward = (reward: string): string => {
    if (reward.includes('阅读') || reward.includes('学习')) return 'reading';
    if (reward.includes('创作') || reward.includes('艺术')) return 'creative';
    if (reward.includes('户外') || reward.includes('运动')) return 'outdoor';
    if (reward.includes('社交') || reward.includes('情感')) return 'social';
    if (reward.includes('技能') || reward.includes('生活')) return 'skills';
    if (reward.includes('科学') || reward.includes('探索')) return 'science';
    if (reward.includes('文化') || reward.includes('艺术欣赏')) return 'culture';
    return 'family'; // 默认类别
  };

  return (
    <Card className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg border-4 border-purple-200 rounded-3xl overflow-hidden font-bubblegum">
      <CardHeader className="bg-gradient-to-r from-purple-200 to-pink-200">
        <CardTitle className="flex items-center text-3xl text-purple-700">
          <Gift className="mr-2 text-pink-500" />
          用星星换礼物
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(rewards).reduce((acc: JSX.Element[][], [reward, cost], index) => {
            const rowIndex = Math.floor(index / 4);
            const category = categorizeReward(reward);
            const Icon = icons[category];
            const { bg, hoverBg, borderColor } = rowColors[rowIndex % rowColors.length];

            if (!acc[rowIndex]) {
              acc[rowIndex] = [];
            }

            acc[rowIndex].push(
              <Button 
                key={reward} 
                onClick={() => redeemReward(reward)}
                className={`${bg} ${hoverBg} text-gray-800 font-bubblegum font-normal py-3 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-1 flex flex-col items-center justify-center h-auto border-2 ${borderColor} hover:border-purple-400 hover:text-purple-700`}
              >
                <Icon className="mb-2 text-purple-600" size={28} />
                <span className="text-center leading-tight mb-1">{reward}</span>
                <span className="text-center font-bold flex items-center mt-1">
                  {cost} <Star className="inline-block ml-1 text-yellow-500" size={18} fill="yellow" />
                </span>
              </Button>
            );

            return acc;
          }, []).map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {row}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardRedeemer;