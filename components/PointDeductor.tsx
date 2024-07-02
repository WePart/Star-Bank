import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Frown, Star } from 'lucide-react';

interface DeductionItem {
  reason: string;
  points: number;
}

interface PointDeductorProps {
  deductions: DeductionItem[];
  deductPoints: (points: number, reason: string) => void;
}

const PointDeductor: React.FC<PointDeductorProps> = ({ deductions, deductPoints }) => {
  return (
    <Card className="mt-6 bg-white shadow-lg border-4 border-orange-300 rounded-3xl overflow-hidden font-bubblegum">
      <CardHeader className="bg-gradient-to-r from-orange-200 to-amber-200">
        <CardTitle className="flex items-center text-3xl text-orange-700">
          <Frown className="mr-2 text-orange-500" />
          需要改进的地方
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {deductions.map((item, index) => (
            <Button 
              key={index} 
              onClick={() => deductPoints(item.points, item.reason)}
              className="bg-gradient-to-r from-red-200 to-pink-200 hover:from-red-300 hover:to-pink-300 text-red-800 font-bubblegum font-normal py-2 px-3 rounded-lg text-base shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center h-auto"
            >
              <span className="text-center leading-tight mb-1">{item.reason}</span>
              <span className="text-center font-bold">
                -{item.points} <Star className="inline-block ml-1 text-yellow-500" size={14} />
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PointDeductor;