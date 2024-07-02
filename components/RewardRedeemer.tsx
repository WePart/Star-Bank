import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Star } from 'lucide-react';
import { Rewards } from '../data/rewards';

interface RewardRedeemerProps {
  rewards: Rewards;
  redeemReward: (reward: string) => void;
}

const RewardRedeemer: React.FC<RewardRedeemerProps> = ({ rewards, redeemReward }) => {
  const categoryColors: { [key: string]: string } = {
    'reading': 'from-blue-200 to-indigo-200 hover:from-blue-300 hover:to-indigo-300 text-blue-800',
    'creative': 'from-pink-200 to-rose-200 hover:from-pink-300 hover:to-rose-300 text-pink-800',
    'outdoor': 'from-green-200 to-emerald-200 hover:from-green-300 hover:to-emerald-300 text-green-800',
    'social': 'from-purple-200 to-fuchsia-200 hover:from-purple-300 hover:to-fuchsia-300 text-purple-800',
    'skills': 'from-yellow-200 to-amber-200 hover:from-yellow-300 hover:to-amber-300 text-yellow-800',
    'science': 'from-teal-200 to-cyan-200 hover:from-teal-300 hover:to-cyan-300 text-teal-800',
    'culture': 'from-red-200 to-orange-200 hover:from-red-300 hover:to-orange-300 text-red-800',
    'family': 'from-violet-200 to-indigo-200 hover:from-violet-300 hover:to-indigo-300 text-violet-800',
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
            return (
              <Button 
                key={reward} 
                onClick={() => redeemReward(reward)}
                className={`bg-gradient-to-r ${categoryColors[category]} font-bubblegum font-normal py-2 px-3 rounded-lg text-base shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center h-auto`}
              >
                <span className="text-center leading-tight mb-1">{reward}</span>
                <span className="text-center font-bold">
                  {cost} <Star className="inline-block ml-1 text-yellow-500" size={14} />
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