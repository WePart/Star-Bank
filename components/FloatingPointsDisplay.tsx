import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryEntry {
  date: string;
  points: number;
  reason: string;
  type: 'add' | 'deduct';
}

interface FloatingPointsDisplayProps {
  points: number;
  history: HistoryEntry[];
}

const FloatingPointsDisplay: React.FC<FloatingPointsDisplayProps> = ({ points, history = [] }) => {
  const [displayedPoints, setDisplayedPoints] = useState(points);

  useEffect(() => {
    setDisplayedPoints(points);
  }, [points]);

  return (
    <Card className="fixed top-4 right-4 w-80 bg-white shadow-lg border-2 border-purple-300 rounded-xl overflow-hidden font-bubblegum z-50">
      <CardHeader className="bg-gradient-to-r from-purple-200 to-pink-200 py-3">
        <CardTitle className="flex items-center text-2xl text-purple-700">
          <Star className="mr-2 text-yellow-500" size={28} />
          你的星星
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <motion.div 
          className="text-4xl font-bold text-center text-purple-600 mb-3"
          key={displayedPoints}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {displayedPoints} <Star className="inline-block ml-1 text-yellow-500" size={32} fill="yellow" />
        </motion.div>
        <div className="text-lg font-semibold mb-2">最近变化:</div>
        <AnimatePresence>
          {history.slice(0, 3).map((entry, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`text-base mb-2 flex items-center p-2 rounded-lg ${
                entry.type === 'add' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {entry.type === 'add' ? (
                <TrendingUp className="mr-2 text-green-600" size={18} />
              ) : (
                <TrendingDown className="mr-2 text-red-600" size={18} />
              )}
              <span className={`font-bold ${entry.type === 'add' ? 'text-green-700' : 'text-red-700'}`}>
                {entry.type === 'add' ? '+' : '-'}{entry.points}
              </span>
              <span className="ml-2 text-gray-700 truncate">{entry.reason}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {history.length === 0 && (
          <div className="text-gray-500 text-center">暂无变化记录</div>
        )}
      </CardContent>
    </Card>
  );
};

export default FloatingPointsDisplay;