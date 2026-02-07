import React from 'react';
import { motion } from 'framer-motion';
import { VERTICALS } from '../constants';
import { ChevronRight, MousePointer2 } from 'lucide-react';

export const Innovation3D: React.FC = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-gray-900 overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT: Content & Domains List */}
      <div className="w-full md:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-20 bg-gradient-to-r from-gray-900 to-gray-900/50">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-desert-gold font-tech uppercase tracking-[0.2em] text-xs font-bold flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-desert-gold rounded-full animate-pulse"></span>
            Interactive Simulation
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Explore the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sea-blue to-teal-400">Ecosystem</span>
          </h2>
          <p className="text-gray-400 leading-relaxed font-light">
            Navigate the 3D representation of our validation zones. From the deep blue sea to the arid desert grid.
          </p>
        </motion.div>

        {/* Domains List */}
        <div className="space-y-4">
          {VERTICALS.map((vertical, index) => (
            <motion.div 
              key={vertical.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-desert-gold/50 transition-all duration-300 flex items-center justify-between overflow-hidden">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <div className="flex items-center gap-4 relative z-10">
                   <div className={`p-2 rounded-lg bg-gray-800 text-gray-300 group-hover:text-white transition-colors`}>
                      <vertical.icon size={20} />
                   </div>
                   <div>
                      <h4 className="text-white font-display font-bold text-lg group-hover:text-desert-gold transition-colors">{vertical.title}</h4>
                      <span className="text-gray-500 text-xs font-tech uppercase tracking-wider">{vertical.id} Zone</span>
                   </div>
                </div>

                <ChevronRight className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* RIGHT: Spline 3D Viewer */}
      <div className="w-full md:w-3/5 relative h-[50vh] md:h-auto bg-black">
        <div className="absolute inset-0 z-0">
          {/* 
            Using a known stable Spline scene URL (Mini Room demo) to ensure it loads.
            The previous placeholder URL was likely invalid (404), causing the parser error.
          */}
          {/* @ts-ignore */}
          <spline-viewer 
            url="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            loading-anim-type="spinner-small-dark"
            background-color="#000000"
          />
        </div>
        
        {/* Interaction Hint Overlay */}
        <div className="absolute bottom-6 right-6 pointer-events-none z-10 flex items-center gap-2 text-white/50 bg-black/40 backdrop-blur px-4 py-2 rounded-full border border-white/10">
           <MousePointer2 size={14} />
           <span className="font-tech text-xs uppercase tracking-widest">Drag to Rotate</span>
        </div>
        
        {/* Gradient Overlay for seamless blend */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none hidden md:block"></div>
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none md:hidden"></div>
      </div>

    </section>
  );
};