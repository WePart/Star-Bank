import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Star, Plus, Minus } from 'lucide-react';
import { HistoryEntry } from './PointSystem';

interface HistoryDisplayProps {
  history: HistoryEntry[];
}

const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history }) => {
  return (
    <Card className="mt-6 bg-white shadow-lg border-4 border-blue-300 rounded-3xl overflow-hidden font-bubblegum">
      <CardHeader className="bg-gradient-to-r from-blue-200 to-indigo-200">
        <CardTitle className="flex items-center text-2xl text-indigo-700">
          <History className="mr-2 text-blue-500" />
          你的星星历史
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {history.map((entry, index) => (
            <li key={index} className={`rounded-lg p-3 shadow-md ${
              entry.type === 'add' 
                ? 'bg-gradient-to-r from-green-100 to-blue-100' 
                : 'bg-gradient-to-r from-red-100 to-pink-100'
            }`}>
              <span className="font-bold text-purple-600">{entry.date}:</span>
              {entry.type === 'add' ? (
                <span className="text-green-600 ml-2">
                  <Plus className="inline-block mr-1" size={14} />
                  得到 {entry.points} 颗星星
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  <Minus className="inline-block mr-1" size={14} />
                  失去 {entry.points} 颗星星
                </span>
              )}
              <span className="ml-2">- {entry.reason}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HistoryDisplay;