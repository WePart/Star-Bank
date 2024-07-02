import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Star, Book, Palette, Tree, Heart, Lightbulb, Rocket, Globe, Home } from 'lucide-react';
import { Rewards } from '../data/rewards';

interface RewardRedeemerProps {
  rewards: Rewards;
  redeemReward: (reward: string) => void;
}

const RewardRedeemer: React.FC<RewardRedeemerProps> = ({ rewards, redeemReward }) => {
  const categoryStyles: { [key: string]: { bg: string, icon: React.ElementType, iconColor: string } } = {
    'reading': { bg: "bg-blue-100", icon: Book, iconColor: "text-blue-500" },
    'creative': { bg: "bg-pink-100", icon: Palette, iconColor: "text-pink-500" },
    'outdoor': { bg: "bg-green-100", icon: Tree, iconColor: "text-green-500" },
    'social': { bg: "bg-purple-100", icon: Heart, iconColor: "text-purple-500" },
    'skills': { bg: "bg-yellow-100", icon: Lightbulb, iconColor: "text-yellow-600" },
    'science': { bg: "bg-teal-100", icon: Rocket, iconColor: "text-teal-500" },
    'culture': { bg: "bg-red-100", icon: Globe, iconColor: "text-red-500" },
    'family': { bg: "bg-indigo-100", icon: Home, iconColor: "text-indigo-500" },
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
    <Card className="mt-6 bg-white shadow-lg border-4 border-green-300 rounded-3xl overflow-hidden font-bubblegum">
      <CardHeader className="bg-gradient-to-r from-green-200 to-emerald-200">
        <CardTitle className="flex items-center text-3xl text-green-700">
          <Gift className="mr-2 text-green-500" />
          用星星换礼物
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(rewards).map(([reward, cost]) => {
            const category = categorizeReward(reward);
            const { bg, icon: Icon, iconColor } = categoryStyles[category];
            return (
              <Button 
                key={reward} 
                onClick={() => redeemReward(reward)}
                className={`${bg} hover:bg-opacity-80 text-gray-800 font-bubblegum font-normal py-3 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center h-auto border-2 border-opacity-50 border-gray-300`}
              >
                <Icon className={`mb-2 ${iconColor}`} size={24} />
                <span className="text-center leading-tight mb-1">{reward}</span>
                <span className="text-center font-bold flex items-center mt-1">
                  {cost} <Star className="inline-block ml-1 text-yellow-500" size={16} />
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardRedeemer;