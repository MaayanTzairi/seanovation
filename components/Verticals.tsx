import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VERTICALS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Verticals: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="playground" className="py-24 relative bg-sand-stone overflow-hidden">
        
      {/* Ambient Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-4">
            The Playground <span className="text-desert-gold">Verticals</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-desert-gold via-orange-400 to-sea-blue" />
          <p className="mt-4 text-text-muted max-w-2xl text-lg">
              National infrastructure meets the open horizon. Choose your testing ground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERTICALS.map((vertical, index) => (
            <motion.div
              key={vertical.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(vertical.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer bg-white shadow-lg hover:shadow-2xl hover:shadow-desert-gold/20 transition-all duration-500 border border-gray-100"
            >
              {/* Background Image - Slight visibility */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-20 group-hover:opacity-30"
                style={{ backgroundImage: `url(${vertical.image})` }}
              />
              
              {/* Overlay Gradient (White fade) */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div 
                    className={`p-3 rounded-xl backdrop-blur-sm border shadow-sm transition-colors duration-300 ${
                        vertical.color === 'electric-teal' 
                        ? 'bg-sea-blue/10 text-sea-blue group-hover:bg-sea-blue group-hover:text-white' 
                        : 'bg-desert-gold/10 text-desert-gold group-hover:bg-desert-gold group-hover:text-white'
                    }`}
                  >
                    <vertical.icon size={28} />
                  </div>
                  <ArrowUpRight className="text-text-main opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-text-main mb-2 group-hover:text-black transition-colors">
                    {vertical.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                    {vertical.description}
                  </p>
                  
                  {/* Decorative line */}
                  <div className={`mt-4 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent via-${vertical.color === 'electric-teal' ? 'sea-blue' : 'desert-gold'} to-transparent`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};