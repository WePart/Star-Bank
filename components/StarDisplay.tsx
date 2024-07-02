import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star } from 'lucide-react';

interface StarDisplayProps {
  points: number;
}

const StarDisplay: React.FC<StarDisplayProps> = ({ points }) => {
  return (
    <Card className="bg-white shadow-lg border-4 border-yellow-300 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-yellow-200 to-orange-200">
        <CardTitle className="flex items-center text-2xl text-orange-700 font-comic-sans">
          <Award className="mr-2 text-yellow-500" />
          你的小星星
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-6xl font-bold text-center text-yellow-500 mt-4 font-comic-sans">
          {points} <Star className="inline-block ml-2 animate-pulse" size={48} />
        </p>
      </CardContent>
    </Card>
  );
};

export default StarDisplay;