import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../audio';

const BoxArt = () => (
  <div className="w-full h-full flex items-center justify-center bg-[#3a2518] relative" style={{ backgroundImage: "linear-gradient(to right, #2a160a, #4a301e, #2a160a)" }}>
    {/* Wood grain overlay */}
    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)' }}></div>

    <div className="absolute inset-4 lg:inset-12 w-auto h-auto max-w-[1200px] max-h-[800px] flex-1 border-[16px] md:border-[24px] border-[#8b2d28] rounded-xl flex items-center justify-center p-4 shadow-[inset_0_0_40px_#000,0_10px_30px_rgba(0,0,0,0.8)] m-auto" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
      {/* Inner Frame */}
      <div className="absolute inset-0 border-[4px] border-[#4a1510] opacity-80 border-solid m-2 pointer-events-none rounded-lg"></div>

      {/* Center Diorama Container */}
      <div className="absolute inset-x-8 inset-y-16 md:inset-x-16 md:inset-y-24 bg-gradient-to-b from-[#b58b4c] via-[#dca341] to-[#607a30] rounded-lg overflow-hidden flex flex-col justify-between items-center shadow-[inset_0_0_50px_#2a160a] border-4 border-[#1a0f08]">
        
        {/* Sky / Volcano */}
        <svg viewBox="0 0 100 50" className="w-full h-[50%] mt-4 opacity-70" preserveAspectRatio="none">
           <path d="M10,50 L35,20 L55,50 Z" fill="#2a160a"/>
           <path d="M45,50 L65,15 L85,50 Z" fill="#3a2518"/>
           {/* Volcano Smoke */}
           <path d="M65,15 Q75,0 85,5 Q100,10 95,0" fill="none" stroke="#1a0f08" strokeWidth="3" strokeDasharray="5 3"/>
        </svg>

        {/* Foreground Grass / Hills */}
        <svg viewBox="0 0 100 50" className="w-full h-[50%]" preserveAspectRatio="none">
           <path d="M-10,50 L15,20 L40,50 L60,25 L85,50 L110,20 L110,50 Z" fill="#344e1a"/>
           <path d="M5,50 L25,35 L45,50 L65,30 L85,50 Z" fill="#588528"/>
        </svg>
      </div>

      {/* JUMANJI Logo & Spear */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center z-30 group cursor-pointer hover:scale-105 transition-transform duration-500 max-w-[80%] mx-auto">
         {/* Spear */}
         <div className="absolute w-[110%] h-4 sm:h-6 bg-[#e5d3b3] shadow-[0_8px_10px_rgba(0,0,0,0.8)] flex items-center rounded-sm z-20">
            {/* Spear Tip */}
            <div className="absolute -left-6 sm:-left-8 w-0 h-0 border-y-[12px] sm:border-y-[18px] border-y-transparent border-r-[30px] sm:border-r-[40px] border-r-[#f4ecd8] shadow-lg drop-shadow-lg"></div>
            {/* Spear Tail */}
            <div className="absolute -right-4 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 sm:border-8 border-transparent border-t-[#e5d3b3] border-b-[#e5d3b3]"></div>
         </div>
         {/* Text */}
         <h1 
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-serif font-black tracking-[0.1em] text-[#f4ecd8] relative z-10" 
            style={{ 
                textShadow: "0 6px 0 #baa57e, 0 12px 0 #5c4e36, 0 20px 15px rgba(0,0,0,0.9)",
                WebkitTextStroke: "2px #1a0f08"
            }}
         >
           JUMANJI
         </h1>
      </div>

      {/* 4 Corner Medallions */}
      <div className="absolute -top-[5%] -left-[2%] md:-top-[8%] md:-left-[4%] w-28 h-36 md:w-40 md:h-52 rounded-[50%] border-[8px] md:border-[12px] border-[#8b2d28] bg-[#3a2518] shadow-[0_15px_30px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden z-20" style={{ transform: 'rotate(-5deg)' }}>
        <div className="absolute inset-0 bg-[#3a2518] rounded-full shadow-[inset_0_0_20px_#000]"></div>
        <div className="text-6xl md:text-8xl relative z-10 drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]" style={{ filter: 'sepia(0.8) hue-rotate(-30deg) saturate(1.5) contrast(1.2)' }}>🤠</div>
      </div>
      
      <div className="absolute -top-[5%] -right-[2%] md:-top-[8%] md:-right-[4%] w-28 h-36 md:w-40 md:h-52 rounded-[50%] border-[8px] md:border-[12px] border-[#8b2d28] bg-[#3a2518] shadow-[0_15px_30px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden z-20" style={{ transform: 'rotate(5deg)' }}>
        <div className="absolute inset-0 bg-[#3a2518] rounded-full shadow-[inset_0_0_20px_#000]"></div>
        <div className="text-6xl md:text-8xl relative z-10 drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]" style={{ filter: 'sepia(0.8) hue-rotate(-30deg) saturate(1.5) contrast(1.2) scaleX(-1)' }}>🐒</div>
      </div>
      
      <div className="absolute -bottom-[5%] -left-[2%] md:-bottom-[8%] md:-left-[4%] w-28 h-36 md:w-40 md:h-52 rounded-[50%] border-[8px] md:border-[12px] border-[#8b2d28] bg-[#3a2518] shadow-[0_15px_30px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden z-20" style={{ transform: 'rotate(5deg)' }}>
        <div className="absolute inset-0 bg-[#3a2518] rounded-full shadow-[inset_0_0_20px_#000]"></div>
        <div className="text-6xl md:text-8xl relative z-10 drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]" style={{ filter: 'sepia(0.8) hue-rotate(-30deg) saturate(1.5) contrast(1.2)' }}>🦏</div>
      </div>
      
      <div className="absolute -bottom-[5%] -right-[2%] md:-bottom-[8%] md:-right-[4%] w-28 h-36 md:w-40 md:h-52 rounded-[50%] border-[8px] md:border-[12px] border-[#8b2d28] bg-[#3a2518] shadow-[0_15px_30px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden z-20" style={{ transform: 'rotate(-5deg)' }}>
        <div className="absolute inset-0 bg-[#3a2518] rounded-full shadow-[inset_0_0_20px_#000]"></div>
        <div className="text-6xl md:text-8xl relative z-10 drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]" style={{ filter: 'sepia(0.8) hue-rotate(-30deg) saturate(1.5) contrast(1.2) scaleX(-1)' }}>🐘</div>
      </div>
      
    </div>
  </div>
);

export const LandingBox = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    soundEngine.init();
    setIsOpen(true);
    // Notify parent to start playing music or whatever
    onOpen();
    setTimeout(() => {
       setIsHidden(true);
    }, 2000); // give time for the clamshell to open fully
  };

  if (isHidden) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden" style={{ perspective: '1600px' }}>
       {/* Background darkness behind the box */}
       <motion.div 
           className="absolute inset-0 bg-black z-0 pointer-events-none"
           initial={{ opacity: 1 }}
           animate={{ opacity: isOpen ? 0 : 1 }}
           transition={{ duration: 1.5, delay: 0.2 }}
       />

       {/* Top Half */}
       <motion.div
           className="absolute inset-0 pointer-events-auto cursor-pointer z-10"
           onClick={handleClick}
           style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', transformOrigin: 'top center' }}
           initial={{ rotateX: 0 }}
           animate={{ rotateX: isOpen ? 110 : 0, y: isOpen ? '-10%' : 0 }}
           transition={{ duration: 1.6, ease: [0.3, 0.0, 0.2, 1] }}
       >
          <BoxArt />
          {/* Seam divider line to make it look like a real cut */}
          <div className="absolute top-[50%] left-0 w-full h-[3px] bg-black shadow-[0_2px_10px_#000] -translate-y-full z-50"></div>
       </motion.div>

       {/* Bottom Half */}
       <motion.div
           className="absolute inset-0 pointer-events-auto cursor-pointer z-10"
           onClick={handleClick}
           style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 50%)', transformOrigin: 'bottom center' }}
           initial={{ rotateX: 0 }}
           animate={{ rotateX: isOpen ? -110 : 0, y: isOpen ? '10%' : 0 }}
           transition={{ duration: 1.6, ease: [0.3, 0.0, 0.2, 1] }}
       >
          <BoxArt />
          {/* Subtle highlight on the bottom seam edge */}
          <div className="absolute top-[50%] left-0 w-full h-[2px] bg-[#5c3e26] z-50"></div>
       </motion.div>

       {/* Opening Hint text */}
       <AnimatePresence>
         {!isOpen && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.7 }}
             exit={{ opacity: 0 }}
             className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#f4ecd8] font-serif tracking-widest text-lg pointer-events-none animate-pulse drop-shadow-[0_2px_4px_#000] z-20"
           >
             CLICK TO OPEN
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};
