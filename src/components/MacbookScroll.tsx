import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Wanderlust from '../assets/Wanderlust.jpg';

export default function MacbookScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress over the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // 1. Rotate the lid from 180-degrees flat (-110deg) to fully open (0deg)
  const lidRotateX = useTransform(scrollYProgress, [0, 0.4], [-110, 0]);

  // 2. Scale the whole Macbook up from 1 to a massive size (5) to fill the screen in the second half
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 5]);

  // 3. Translate Y to perfectly center the screen and laptop name as it opens
  const y = useTransform(scrollYProgress, [0, 0.4], ["0%", "25%"]);

  // 4. Fade out the keyboard and title as we zoom completely into the screen
  const fadeOpacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

  // 5. Fade out the black overlay to reveal the project when opening
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={containerRef} className="h-[300vh] relative bg-background">
      <div
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ perspective: "1500px" }}
      >

        {/* Title that fades out as we zoom in */}
        <motion.div
          style={{ opacity: fadeOpacity }}
          className="absolute top-16 md:top-24 text-center z-10 px-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
            Crafting Digital <span className="text-primary">Experiences</span>
          </h2>
          <p className="text-muted text-lg md:text-xl">
            Scroll down to explore my work.
          </p>
        </motion.div>

        {/* Glowing Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen z-0 animate-pulse-slow"></div>

        {/* MacBook Container */}
        <motion.div
          style={{ scale, y, transformStyle: 'preserve-3d' }}
          className="relative w-[90vw] sm:w-[500px] md:w-[800px] flex flex-col z-20"
        >
          {/* Lid (Screen) */}
          <motion.div 
            style={{ 
              rotateX: lidRotateX,
              transformOrigin: "bottom",
              transformStyle: 'preserve-3d'
            }}
            className="w-full aspect-[1.6] bg-[#b0b4b8] rounded-t-3xl sm:rounded-t-[2rem] border-2 border-[#8a8d91] shadow-2xl flex flex-col z-30 relative"
          >
            {/* Back Cover (Shows when closed, mathematically flipped to be perfectly readable) */}
            <motion.div 
              style={{ 
                opacity: overlayOpacity,
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden"
              }}
              className="absolute inset-0 w-full h-full bg-black rounded-t-3xl sm:rounded-t-[2rem] flex items-center justify-center z-40 border-2 border-[#222]"
            >
              <p className="text-white/40 text-sm sm:text-base md:text-xl font-heading tracking-widest lowercase">
                want to see my creations
              </p>
            </motion.div>

            {/* Screen Bezel */}
            <div className="w-full h-full p-2 sm:p-3 md:p-4 bg-black rounded-t-3xl sm:rounded-t-[2rem] flex flex-col z-30">
              {/* Enhanced Webcam */}
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0a0a0a] border border-[#2a2a2a] mx-auto mb-2 sm:mb-3 mt-1 flex items-center justify-center shadow-inner">
                <div className="w-[1px] h-[1px] sm:w-0.5 sm:h-0.5 rounded-full bg-blue-400/40"></div>
              </div>

              {/* Actual Display Content */}
              <div className="w-full flex-1 relative rounded-md sm:rounded-lg overflow-hidden bg-black border border-[#222]">
                <img
                  src={Wanderlust}
                  alt="Wanderlust Project"
                  className="w-full h-full object-cover object-top"
                />

                {/* Glass Glare */}
                <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none z-30"></div>
              </div>

              {/* MacBook Pro Logo area */}
              <div className="h-4 sm:h-6 w-full flex items-center justify-center mt-1">
                <span className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-400 font-bold tracking-widest font-sans">MY PROJECTS</span>
              </div>
            </div>
          </motion.div>

          {/* Base (Keyboard Area) - Rotated into 3D Space */}
          <div
            className="w-full aspect-[1.6] bg-[#c0c4c8] rounded-b-3xl sm:rounded-b-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10 flex flex-col items-center justify-start pt-6 sm:pt-10 border-t-2 border-[#9a9d91] relative"
            style={{
              transformOrigin: "top",
              transform: "rotateX(70deg)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Keyboard indentation */}
            <motion.div
              style={{ opacity: fadeOpacity }}
              className="w-[85%] h-[55%] bg-[#8f96a3] rounded-md sm:rounded-lg flex p-1.5 sm:p-3 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] mb-4 sm:mb-8"
            >
              {/* Proper MacBook Keyboard Layout */}
              <div className="w-full h-full flex flex-col gap-[1px] sm:gap-[3px]">
                {/* Row 1: Function keys (small) */}
                <div className="flex w-full gap-[1px] sm:gap-[3px] h-[10%]">
                  <div className="w-[5%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  {[...Array(12)].map((_, i) => <div key={i} className="flex-1 bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>)}
                  <div className="w-[5%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                </div>
                {/* Row 2: Numbers */}
                <div className="flex w-full gap-[1px] sm:gap-[3px] h-[17%]">
                  {[...Array(14)].map((_, i) => <div key={i} className="flex-1 bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>)}
                </div>
                {/* Row 3: Tab row */}
                <div className="flex w-full gap-[1px] sm:gap-[3px] h-[17%]">
                  <div className="w-[8%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  {[...Array(13)].map((_, i) => <div key={i} className="flex-1 bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>)}
                </div>
                {/* Row 4: Caps row */}
                <div className="flex w-full gap-[1px] sm:gap-[3px] h-[17%]">
                  <div className="w-[10%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  {[...Array(12)].map((_, i) => <div key={i} className="flex-1 bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>)}
                  <div className="w-[10%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                </div>
                {/* Row 5: Shift row */}
                <div className="flex w-full gap-[1px] sm:gap-[3px] h-[17%]">
                  <div className="w-[13%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  {[...Array(10)].map((_, i) => <div key={i} className="flex-1 bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>)}
                  <div className="w-[13%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                </div>
                {/* Row 6: Spacebar row */}
                <div className="flex w-full gap-[1px] sm:gap-[3px] h-[17%]">
                  <div className="w-[6%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  <div className="w-[6%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  <div className="w-[6%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  <div className="w-[7%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  {/* Spacebar */}
                  <div className="flex-[3] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  <div className="w-[7%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  <div className="w-[6%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                  {/* Arrows */}
                  <div className="w-[12%] flex flex-col gap-[1px] sm:gap-[3px]">
                    <div className="flex justify-center h-[48%]">
                      <div className="w-[32%] bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                    </div>
                    <div className="flex gap-[1px] sm:gap-[3px] h-[48%] mt-auto">
                      <div className="flex-1 bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                      <div className="flex-1 bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                      <div className="flex-1 bg-[#1a1a1a] rounded-[2px] sm:rounded-sm border-t border-white/10 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trackpad */}
            <motion.div
              style={{ opacity: fadeOpacity }}
              className="w-[35%] h-[28%] bg-[#9ca3af] rounded-md sm:rounded-lg shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]"
            ></motion.div>

            {/* Bottom Lip Indentation */}
            <div className="absolute bottom-0 w-1/5 h-2 sm:h-3 bg-[#a0a4a8] rounded-t-lg mx-auto"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
