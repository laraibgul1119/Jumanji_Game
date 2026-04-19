import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRACK_POINTS } from '../constants';
import { getAbsolutePosition } from '../utils';

interface Player {
  id: string;
  name: string;
  token: string;
  color: string;
  position: number;
}

interface BoardProps {
  players: Player[];
  centerMessage: string;
  gameState: string;
  currentTurn: number;
}

const getAngle = (i: number) => {
   let dx, dy;
   if (i === 0) {
       dx = TRACK_POINTS[1][0] - TRACK_POINTS[0][0];
       dy = TRACK_POINTS[1][1] - TRACK_POINTS[0][1];
   } else if (i === TRACK_POINTS.length - 1) {
       dx = TRACK_POINTS[i][0] - TRACK_POINTS[i-1][0];
       dy = TRACK_POINTS[i][1] - TRACK_POINTS[i-1][1];
   } else {
       dx = TRACK_POINTS[i+1][0] - TRACK_POINTS[i-1][0];
       dy = TRACK_POINTS[i+1][1] - TRACK_POINTS[i-1][1];
   }
   return Math.atan2(dy, dx) * (180 / Math.PI);
}

export const Board: React.FC<BoardProps> = ({ players, centerMessage, gameState, currentTurn }) => {
  return (
    <div className="w-full h-full relative p-2 flex items-center justify-center pointer-events-none">
      
      {/* Hand-carved board background (SVG base) */}
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 z-0 rounded-lg pointer-events-none" preserveAspectRatio="xMidYMid slice">
        
        {/* Clay/Wood orange base */}
        <rect x="0" y="0" width="100" height="100" fill="#ae5e24" />
        
        <defs>
          {/* Leaves pattern */}
          <pattern id="leaf-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <path d="M5,15 Q10,5 20,8 Q15,18 5,15 Z" fill="#3e5927" stroke="#1c2b0e" strokeWidth="0.4"/>
            <path d="M12,10 Q16,8 20,8" fill="none" stroke="#1c2b0e" strokeWidth="0.3"/>
            
            <path d="M15,25 Q22,20 25,12 Q18,15 15,25 Z" fill="#4f6e33" stroke="#1c2b0e" strokeWidth="0.4"/>
            <path d="M19,19 Q22,15 25,12" fill="none" stroke="#1c2b0e" strokeWidth="0.3"/>
            
            <path d="M3,28 Q10,25 12,20 Q6,20 3,28 Z" fill="#587d37" stroke="#1c2b0e" strokeWidth="0.4"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#leaf-pattern)" opacity="0.95" />

        {/* 4 Rotated Board Sections */}
        {[0, 1, 2, 3].map(rot => (
          <g key={rot} transform={`rotate(${rot * 90} 50 50)`}>
            
            {/* Connecting Track Line Outline */}
            <path
              d={`M ${TRACK_POINTS.map(p => `${p[0]},${p[1]}`).join(' L ')}`}
              fill="none"
              stroke="#1a0f08"
              strokeWidth="7.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Inner tan track */}
            <path
              d={`M ${TRACK_POINTS.map(p => `${p[0]},${p[1]}`).join(' L ')}`}
              fill="none"
              stroke="#e8d1a7"
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Path separators simulating block paths */}
            {TRACK_POINTS.map((p, i) => {
               if (i === 0 || i > TRACK_POINTS.length - 4) return null; // Avoid drawing straight into center circle or home base overlaps 
               return (
                 <g key={i} transform={`translate(${p[0]}, ${p[1]}) rotate(${getAngle(i)})`}>
                   <line x1="0" y1="-3.2" x2="0" y2="3.2" stroke="#25160d" strokeWidth="0.4" />
                 </g>
               )
            })}

            {/* Start corners */}
            <circle cx="10" cy="90" r="4.5" fill="#e8d1a7" stroke="#1a0f08" strokeWidth="0.8" />
            <circle cx="10" cy="90" r="3.5" fill="none" stroke="#684a32" strokeWidth="0.3" />
          </g>
        ))}
      </svg>

      {/* Center Mirror / Eye */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square rounded-full flex items-center justify-center p-4 md:p-6 z-10 overflow-hidden"
        style={{
            background: 'radial-gradient(circle at 35% 35%, #004d1a, #001a09 60%, #000000 90%)',
            border: '12px solid',
            borderColor: '#54361e #3f2613 #2a180a #3f2613',
            boxShadow: 'inset 0 0 30px #000, 0 10px 25px rgba(0,0,0,0.9)'
        }}
      >
        {/* Zigzag Pattern Ring Simulation */}
        <div className="absolute inset-0 border-[3px] border-[#150a04] border-dashed rounded-full pointer-events-none opacity-40"></div>

        {/* Glass reflections */}
        <div className="absolute top-[15%] left-[22%] w-[30%] h-[15%] bg-white/30 rounded-[50%] blur-[2px] -rotate-12 pointer-events-none"></div>
        <div className="absolute top-[35%] left-[72%] w-[8%] h-[5%] bg-white/20 rounded-[50%] blur-[1px] rotate-12 pointer-events-none"></div>

        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#34d399_0%,_transparent_60%)] mix-blend-screen pointer-events-none overflow-hidden animate-pulse"></div>

        <AnimatePresence mode="wait">
            {centerMessage && (
            <motion.div
                key={centerMessage}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="text-[#5eead4] font-serif text-center font-bold text-[9px] sm:text-xs md:text-sm lg:text-base relative z-10 uppercase tracking-wide leading-relaxed"
                style={{ textShadow: '0 0 8px #5eead4, 0 0 15px #134e4a' }}
            >
                {centerMessage}
            </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Tokens */}
      {players.map((player, index) => {
        const [x, y] = getAbsolutePosition(player.position, index);
        const isActive = currentTurn === index;

        return (
          <motion.div
            key={player.id}
            initial={{ left: `${x}%`, top: `${y}%` }}
            animate={{ left: `${x}%`, top: `${y}%`, scale: isActive ? 1.2 : 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className={`absolute w-8 h-8 md:w-12 md:h-12 flex flex-col items-center justify-center -ml-4 -mt-4 md:-ml-6 md:-mt-6 ${isActive ? 'z-30' : 'z-20'}`}
          >
           <div className="relative flex flex-col items-center group pointer-events-none">
              <div
                className="text-2xl sm:text-3xl md:text-4xl relative z-10 leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
                style={{ transform: 'translateY(10px)' }}
              >
                {player.token}
              </div>
              <div
                className={`w-5 h-3 sm:w-7 sm:h-4 md:w-8 md:h-5 rounded-[50%] border-2 shadow-[0_4px_10px_rgba(0,0,0,0.8)] relative z-0 transition-colors ${isActive ? 'border-white animate-pulse' : 'border-white/20'}`}
                style={{
                  backgroundColor: player.color,
                  transform: 'rotateX(60deg)'
                }}
              />
           </div>
          </motion.div>
        );
      })}
    </div>
  );
}
