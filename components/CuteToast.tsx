import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Gift, Sun } from 'lucide-react';

interface CuteToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

const CuteToast: React.FC<CuteToastProps> = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 1000);  // 3秒后自动隐藏
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-4 left-4 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-r from-pink-200 to-purple-200 px-4 py-3 rounded-2xl shadow-lg border-2 border-purple-300">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <Sun className="text-yellow-500" size={24} />
              </div>
              <div className="flex-grow">
                <p className="text-purple-700 font-bold text-lg font-bubblegum leading-tight">{message}</p>
              </div>
              <div className="flex-shrink-0 flex items-center space-x-1">
                <Star className="text-yellow-500" size={20} />
                <Gift className="text-pink-500" size={20} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CuteToast;