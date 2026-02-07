import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network } from 'lucide-react';
import { ConnectionHub } from './ConnectionHub';

export const Advantage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll progress of the entire 400vh section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Header fades out between 0% and 15% of the scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  
  return (
    <section 
      ref={sectionRef}
      id="advantage" 
      className="relative z-20 h-[400vh] bg-sand-light"
    >
        {/* The Sticky Window: This stays fixed while the parent section scrolls */}
        <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
          
          {/* Background Elements */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-desert-gold/20 to-transparent" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
            
            {/* 1. Header Area - Visible at start */}
            <motion.div 
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-24 left-0 right-0 z-30 text-center max-w-3xl mx-auto pointer-events-none"
            >
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-desert-gold text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                  <Network size={14} /> Ecosystem Engine
               </div>
               <h2 className="text-4xl md:text-5xl font-display font-black text-text-main mb-2">
                 The Heart of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-desert-gold to-orange-600">Hub</span>
               </h2>
            </motion.div>

            {/* 2. Main Visualization */}
            <div className="w-full h-full flex items-center justify-center pt-20">
                <ConnectionHub scrollProgress={scrollYProgress} />
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 font-tech text-xs uppercase tracking-widest animate-pulse"
            >
              Scroll to Transform
            </motion.div>

          </div>
        </div>
    </section>
  );
};