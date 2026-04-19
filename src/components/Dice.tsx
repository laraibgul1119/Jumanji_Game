import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface DiceProps {
  value: number;
  rolling: boolean;
}

const faceMap: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 3, 6, 2, 5, 8], 
};

export const Dice: React.FC<DiceProps> = ({ value, rolling }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rolling) {
      interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 100);
    } else {
      setDisplayValue(value);
    }
    return () => clearInterval(interval);
  }, [rolling, value]);

  const dots = faceMap[displayValue] || faceMap[1];

  return (
    <motion.div
      animate={{
        rotateX: rolling ? [0, 360, 720, 1080] : 0,
        rotateY: rolling ? [0, 360, 720, 1080] : 0,
        scale: rolling ? [1, 1.2, 1] : 1
      }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="w-12 h-12 md:w-16 md:h-16 bg-[#e5d3b3] rounded-lg shadow-[inset_0_-2px_6px_rgba(0,0,0,0.3),_0_4px_6px_rgba(0,0,0,0.5)] border-b-4 border-r-2 border-[#bfae8e] flex flex-col justify-between p-2"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {[0, 1, 2].map(row => (
        <div key={row} className="flex justify-between w-full h-[28%]">
          {[0, 1, 2].map(col => {
            const index = row * 3 + col;
            return (
              <div
                key={col}
                className={`w-[25%] aspect-square rounded-full flex-shrink-0 ${dots.includes(index) ? 'bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]' : 'bg-transparent'}`}
              />
            );
          })}
        </div>
      ))}
    </motion.div>
  );
};
