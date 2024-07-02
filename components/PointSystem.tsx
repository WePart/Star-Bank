import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sun, Star } from 'lucide-react';
import StarCollector from './StarCollector';
import RewardRedeemer from './RewardRedeemer';
import PointDeductor from './PointDeductor';
import FloatingPointsDisplay from './FloatingPointsDisplay';
import presetReasons from '../data/presetReasons';
import rewards from '../data/rewards';

export interface HistoryEntry {
  id: string;
  date: string;
  points: number;
  reason: string;
  type: 'add' | 'deduct';
}

const PointSystem: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [message, setMessage] = useState<string>('');

  const deductions = [
    { reason: "没有及时完成作业", points: 5 },
    { reason: "乱扔垃圾", points: 3 },
    { reason: "说脏话", points: 4 },
    { reason: "不听父母的话", points: 5 },
    { reason: "欺负他人", points: 6 },
    { reason: "浪费食物", points: 3 },
    { reason: "不整理房间", points: 4 },
    { reason: "看电视/玩游戏超时", points: 5 }
  ];

  useEffect(() => {
    setPoints(100);
    setHistory([
      { id: '1', date: '2024-07-01', points: 10, reason: '今天主动做作业', type: 'add' },
      { id: '2', date: '2024-07-02', points: 20, reason: '帮忙做家务', type: 'add' },
    ]);
  }, []);

  const addPoints = (pointsToAdd: number, reasonText: string) => {
    setPoints(prevPoints => prevPoints + pointsToAdd);
    const newEntry: HistoryEntry = { 
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0], 
      points: pointsToAdd, 
      reason: reasonText,
      type: 'add'
    };
    setHistory(prevHistory => [newEntry, ...prevHistory]);
    setMessage(`太棒了！你得到了 ${pointsToAdd} 颗小星星。现在你有 ${points + pointsToAdd} 颗闪闪发光的星星啦！✨`);
  };

  const deductPoints = (pointsToDeduct: number, reasonText: string) => {
    setPoints(prevPoints => Math.max(0, prevPoints - pointsToDeduct));
    const newEntry: HistoryEntry = { 
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0], 
      points: pointsToDeduct, 
      reason: reasonText,
      type: 'deduct'
    };
    setHistory(prevHistory => [newEntry, ...prevHistory]);
    setMessage(`哎呀，你失去了 ${pointsToDeduct} 颗小星星。现在你还有 ${Math.max(0, points - pointsToDeduct)} 颗星星。继续加油，改正错误吧！💪`);
  };

  const redeemReward = (reward: string) => {
    const cost = rewards[reward];
    if (points >= cost) {
      setPoints(prevPoints => prevPoints - cost);
      const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        points: cost,
        reason: `兑换奖励: ${reward}`,
        type: 'deduct'
      };
      setHistory(prevHistory => [newEntry, ...prevHistory]);
      setMessage(`耶！你用 ${cost} 颗星星兑换了 ${reward}！还剩下 ${points - cost} 颗小星星，继续加油哦！🎉`);
    } else {
      setMessage(`哎呀，星星不够呢。需要 ${cost} 颗星星，你有 ${points} 颗。再努力一下就能兑换啦！💪`);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-600 font-bubblegum">
        <Sun className="inline-block mr-2 text-yellow-400" />
        小朋友的神奇星星银行
        <Star className="inline-block ml-2 text-yellow-400" />
      </h1>
      
      <FloatingPointsDisplay points={points} history={history} />
      
      <div className="grid grid-cols-1 gap-6">
        <StarCollector presetReasons={presetReasons} addPoints={addPoints} />
        <PointDeductor deductions={deductions} deductPoints={deductPoints} />
        <RewardRedeemer rewards={rewards} redeemReward={redeemReward} />
      </div>

      {message && (
        <Alert className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-full">
          <AlertTitle className="text-xl text-orange-600 font-bubblegum">星星银行消息</AlertTitle>
          <AlertDescription className="text-lg text-orange-500">{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PointSystem;