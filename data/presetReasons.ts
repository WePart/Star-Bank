import { Book, Brush, Home, Utensils, Droplet, Moon, Smile, Zap, Music, Heart, Gift, Brain, Users, Clock, Trash, Leaf } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface ReasonItem {
  reason: string;
  points: number;
  icon: LucideIcon;
}

export interface PresetReasons {
  [category: string]: ReasonItem[];
}

const presetReasons: PresetReasons = {
  "学习成长": [
    { reason: "完成家庭作业", points: 5, icon: Book },
    { reason: "额外阅读30分钟", points: 3, icon: Book },
    { reason: "学习新知识或技能", points: 5, icon: Brain },
    { reason: "参与课外教育活动", points: 4, icon: Zap },
  ],
  "家务贡献": [
    { reason: "整理房间", points: 4, icon: Home },
    { reason: "帮忙做家务", points: 3, icon: Utensils },
    { reason: "照顾植物或宠物", points: 3, icon: Heart },
    { reason: "协助准备餐点", points: 4, icon: Utensils },
  ],
  "健康习惯": [
    { reason: "按时睡觉", points: 2, icon: Moon },
    { reason: "吃健康食物", points: 3, icon: Utensils },
    { reason: "运动30分钟", points: 4, icon: Zap },
    { reason: "保持个人卫生", points: 2, icon: Droplet },
  ],
  "创意与艺术": [
    { reason: "创作艺术作品", points: 4, icon: Brush },
    { reason: "学习音乐或舞蹈", points: 5, icon: Music },
    { reason: "手工制作", points: 4, icon: Heart },
    { reason: "写作或讲故事", points: 4, icon: Book },
  ],
  "社交与情感": [
    { reason: "友善对待他人", points: 4, icon: Heart },
    { reason: "帮助家人或朋友", points: 3, icon: Users },
    { reason: "分享或合作", points: 3, icon: Gift },
    { reason: "表达感恩", points: 3, icon: Smile },
  ],
  "责任与自律": [
    { reason: "按时完成任务", points: 4, icon: Clock },
    { reason: "遵守承诺", points: 5, icon: Heart },
    { reason: "合理安排时间", points: 4, icon: Clock },
    { reason: "勇于承担责任", points: 5, icon: Zap },
  ],
  "环保行为": [
    { reason: "节约资源", points: 3, icon: Leaf },
    { reason: "参与环保活动", points: 5, icon: Trash },
    { reason: "减少浪费", points: 4, icon: Leaf },
    { reason: "爱护自然环境", points: 4, icon: Heart },
  ]
};

export default presetReasons;