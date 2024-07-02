import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Plus } from 'lucide-react';
import { PresetReasons } from '../data/presetReasons';

interface StarCollectorProps {
  presetReasons: PresetReasons;
  addPoints: (points: number, reason: string) => void;
}

const StarCollector: React.FC<StarCollectorProps> = ({ presetReasons, addPoints }) => {
  const [newPoints, setNewPoints] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleCustomAdd = () => {
    if (newPoints && reason) {
      addPoints(parseInt(newPoints), reason);
      setNewPoints('');
      setReason('');
    }
  };

  const categoryStyles: { [key: string]: { bg: string, text: string } } = {
    "学习成长": { bg: "from-yellow-200 to-amber-200 hover:from-yellow-300 hover:to-amber-300", text: "text-yellow-800" },
    "家务贡献": { bg: "from-green-200 to-emerald-200 hover:from-green-300 hover:to-emerald-300", text: "text-green-800" },
    "健康习惯": { bg: "from-blue-200 to-sky-200 hover:from-blue-300 hover:to-sky-300", text: "text-blue-800" },
    "创意与艺术": { bg: "from-purple-200 to-fuchsia-200 hover:from-purple-300 hover:to-fuchsia-300", text: "text-purple-800" },
    "社交与情感": { bg: "from-pink-200 to-rose-200 hover:from-pink-300 hover:to-rose-300", text: "text-pink-800" },
    "责任与自律": { bg: "from-orange-200 to-amber-200 hover:from-orange-300 hover:to-amber-300", text: "text-orange-800" },
    "环保行为": { bg: "from-teal-200 to-cyan-200 hover:from-teal-300 hover:to-cyan-300", text: "text-teal-800" },
  };

  return (
    <Card className="bg-white shadow-lg border-4 border-indigo-300 rounded-3xl overflow-hidden font-bubblegum">
      <CardHeader className="bg-gradient-to-r from-indigo-200 to-purple-200">
        <CardTitle className="flex items-center text-3xl text-indigo-700">
          <Star className="mr-2 text-yellow-400" />
          收集小星星
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {Object.entries(presetReasons).map(([category, reasons]) => (
          <div key={category} className="mb-8">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {reasons.map((item, index) => (
                <Button 
                  key={index} 
                  onClick={() => addPoints(item.points, item.reason)}
                  className={`bg-gradient-to-r ${categoryStyles[category].bg} ${categoryStyles[category].text} font-bubblegum font-normal py-2 px-3 rounded-lg text-base shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center h-auto`}
                >
                  <item.icon className="mb-2" size={24} />
                  <span className="text-center leading-tight mb-1 font-bold">{item.reason}</span>
                  <span className="text-center font-bold">({item.points} <Star className="inline-block" size={12} />)</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
        <div className="mt-8">
          <Input 
            type="number" 
            placeholder="其他星星数量" 
            value={newPoints} 
            onChange={(e) => setNewPoints(e.target.value)}
            className="mb-3 text-lg rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 font-bubblegum"
          />
          <Input 
            placeholder="其他获得星星的原因" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)}
            className="mb-3 text-lg rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 font-bubblegum"
          />
          <Button onClick={handleCustomAdd} className="w-full bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white font-bubblegum font-normal py-3 px-4 rounded-lg text-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            <Plus className="mr-2" size={24} />
            添加自定义星星
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StarCollector;