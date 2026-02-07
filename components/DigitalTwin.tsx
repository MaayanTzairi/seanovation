import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Box } from 'lucide-react';

export const DigitalTwin: React.FC = () => {
  return (
    <section className="relative w-full h-[80vh] md:h-screen bg-black overflow-hidden flex items-center justify-center">
      
      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 pointer-events-none">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-xl"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-md mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-tech text-green-400 uppercase tracking-widest">System Online</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-4 tracking-tighter">
                    THE DIGITAL <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">HORIZON</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                    A mirror world where data dictates reality. Test your deployment in our 1:1 digital twin before touching a single grain of sand.
                </p>
            </motion.div>

            <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="hidden md:flex flex-col gap-4 mt-8 md:mt-0 items-end"
            >
                <div className="flex items-center gap-3 text-right">
                    <div>
                        <h4 className="text-white font-bold font-display">Latency</h4>
                        <p className="text-green-400 font-tech text-sm">12ms</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg backdrop-blur border border-white/10">
                        <Scan size={20} className="text-white" />
                    </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                    <div>
                        <h4 className="text-white font-bold font-display">Render</h4>
                        <p className="text-sea-blue font-tech text-sm">Real-time</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg backdrop-blur border border-white/10">
                        <Box size={20} className="text-white" />
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        {/* @ts-ignore */}
        <spline-viewer 
            url="https://prod.spline.design/XCteQ53KepVA7rO8/scene.splinecode"
            loading-anim-type="spinner-small-dark"
            background-color="#000000"
        />
      </div>

      {/* Vignette Gradients for Text Readability */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black/90 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

    </section>
  );
};