import React, { useState, useEffect } from 'react';
import { Sun, Star } from 'lucide-react';
import StarCollector from './StarCollector';
import RewardRedeemer from './RewardRedeemer';
import PointDeductor from './PointDeductor';
import FloatingPointsDisplay from './FloatingPointsDisplay';
import CuteToast from './CuteToast';
import presetReasons from '../data/presetReasons';
import rewards from '../data/rewards';

export interface HistoryEntry {
  date: string;
  points: number;
  reason: string;
  type: 'add' | 'deduct';
}

const PointSystem: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

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
      { date: '2024-07-01', points: 10, reason: '今天主动做作业', type: 'add' },
      { date: '2024-07-02', points: 20, reason: '帮忙做家务', type: 'add' },
    ]);
  }, []);

  const generateMessage = (action: 'add' | 'deduct' | 'redeem', points: number, reason: string): string => {
    if (action === 'add') {
      const messages = [
        `太棒了！你因为${reason}获得了 ${points} 颗小星星。继续保持哦！✨`,
        `哇！真厉害！${reason}给你带来了 ${points} 颗闪亮的星星。你太优秀了！🌟`,
        `爱心满满！${reason}让你得到 ${points} 颗星星。你是最棒的！💖`,
        `天啊，你太了不起了！${reason}为你赢得了 ${points} 颗星星。加油！🚀`
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else if (action === 'deduct') {
      const messages = [
        `哎呀，因为${reason}，失去了 ${points} 颗星星。不要灰心，继续努力！💪`,
        `糟糕！${reason}让你损失了 ${points} 颗星星。相信你下次会做得更好！🌈`,
        `噢，${reason}导致你少了 ${points} 颗星星。没关系，我们一起加油改正！🌞`,
        `别伤心，虽然${reason}让你失去 ${points} 颗星星，但这是学习的机会！🌱`
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = [
        `耶！你用 ${points} 颗星星兑换了${reason}！真是太棒了，继续加油哦！🎉`,
        `哇塞！${points} 颗星星换到了${reason}！你的努力得到了回报呢！🎁`,
        `恭喜你用 ${points} 颗星星兑换到了${reason}！你值得拥有最好的！🏆`,
        `太神奇了！${points} 颗星星变成了${reason}！享受你的奖励吧！🌈`
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  };

  const showToast = (message: string) => {
    setMessage(message);
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  const addPoints = (pointsToAdd: number, reasonText: string) => {
    setPoints(prevPoints => prevPoints + pointsToAdd);
    const newEntry: HistoryEntry = { 
      date: new Date().toISOString().split('T')[0], 
      points: pointsToAdd, 
      reason: reasonText,
      type: 'add'
    };
    setHistory(prevHistory => [newEntry, ...prevHistory]);
    showToast(generateMessage('add', pointsToAdd, reasonText));
  };

  const deductPoints = (pointsToDeduct: number, reasonText: string) => {
    setPoints(prevPoints => Math.max(0, prevPoints - pointsToDeduct));
    const newEntry: HistoryEntry = { 
      date: new Date().toISOString().split('T')[0], 
      points: pointsToDeduct, 
      reason: reasonText,
      type: 'deduct'
    };
    setHistory(prevHistory => [newEntry, ...prevHistory]);
    showToast(generateMessage('deduct', pointsToDeduct, reasonText));
  };

  const redeemReward = (reward: string) => {
    const cost = rewards[reward];
    if (points >= cost) {
      setPoints(prevPoints => prevPoints - cost);
      const newEntry: HistoryEntry = {
        date: new Date().toISOString().split('T')[0],
        points: cost,
        reason: `兑换奖励: ${reward}`,
        type: 'deduct'
      };
      setHistory(prevHistory => [newEntry, ...prevHistory]);
      showToast(generateMessage('redeem', cost, reward));
    } else {
      showToast(`哎呀，星星不够呢。需要 ${cost} 颗星星，你有 ${points} 颗。再努力一下就能兑换啦！💪`);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-600 font-bubblegum">
        <Sun className="inline-block mr-2 text-yellow-400" />
        小朋友的神奇星星银行
        <Star className="inline-block ml-2 text-yellow-400" />
      </h1>
      
      <CuteToast message={message} isVisible={isToastVisible} onHide={hideToast} />
      <FloatingPointsDisplay points={points} history={history} />
      
      <div className="grid grid-cols-1 gap-6">
        <StarCollector presetReasons={presetReasons} addPoints={addPoints} />
        <PointDeductor deductions={deductions} deductPoints={deductPoints} />
        <RewardRedeemer rewards={rewards} redeemReward={redeemReward} />
      </div>
    </div>
  );
};

export default PointSystem;