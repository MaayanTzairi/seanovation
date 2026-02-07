import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, Server, Anchor } from 'lucide-react';

const VALIDATION_LOGS = [
  { id: 1, type: 'DEPLOY', msg: 'Aquaculture Sensor Array: ONLINE', location: 'Red Sea Zone B', time: '00:01' },
  { id: 2, type: 'SUCCESS', msg: 'Solar Grid Sync: OPTIMAL', location: 'Desert Plateau', time: '00:04' },
  { id: 3, type: 'TEST', msg: 'Cyber Defense Stress: PASSED', location: 'Port Control', time: '00:08' },
  { id: 4, type: 'INPUT', msg: 'Ramon Airport Traffic: INGESTED', location: 'Aviation Hub', time: '00:12' },
  { id: 5, type: 'DEPLOY', msg: 'Desalination Membrane: ACTIVE', location: 'Eilat Facility', time: '00:15' },
];

export const Metamorphosis: React.FC = () => {
  return (
    <section className="w-full bg-gray-900 border-y border-gray-800 overflow-hidden py-4 relative">
      <div className="absolute inset-0 bg-sea-blue/5 z-0" />
      
      {/* Container for the infinite scroll */}
      <div className="flex items-center gap-8 whitespace-nowrap overflow-hidden">
        
        {/* Label */}
        <div className="bg-desert-gold text-white px-4 py-1 text-xs font-bold font-display uppercase tracking-widest z-10 shadow-lg mx-6">
          Live Validation Feed
        </div>

        {/* Marquee Wrapper */}
        <motion.div 
          className="flex gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Double the list for seamless loop */}
          {[...VALIDATION_LOGS, ...VALIDATION_LOGS, ...VALIDATION_LOGS].map((log, i) => (
             <div key={i} className="flex items-center gap-3 text-gray-300 font-tech text-sm tracking-wide">
                {log.type === 'SUCCESS' ? <CheckCircle2 size={14} className="text-green-400" /> : 
                 log.type === 'TEST' ? <Shield size={14} className="text-blue-400" /> :
                 log.type === 'DEPLOY' ? <Anchor size={14} className="text-desert-gold" /> :
                 <Zap size={14} className="text-yellow-400" />}
                 
                <span className="font-bold text-white">[{log.type}]</span>
                <span className="text-gray-400">::</span>
                <span>{log.msg}</span>
                <span className="text-gray-500 text-xs uppercase"> // {log.location}</span>
             </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};