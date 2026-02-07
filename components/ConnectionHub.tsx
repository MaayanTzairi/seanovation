import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Anchor, Zap, ShieldCheck, Plane, Sprout, Database, Wifi } from 'lucide-react';

const NODES = [
  { id: 'agro', label: 'Desert Agro', sub: 'Food Sec', icon: Sprout, color: '#D97706', angle: 0 },
  { id: 'energy', label: 'Renewable', sub: 'Solar', icon: Zap, color: '#EA580C', angle: 60 },
  { id: 'cyber', label: 'Cyber Sec', sub: 'Defense', icon: ShieldCheck, color: '#0EA5E9', angle: 120 },
  { id: 'travel', label: 'Tourism', sub: 'Aviation', icon: Plane, color: '#D97706', angle: 180 },
  { id: 'blue', label: 'Blue Tech', sub: 'Maritime', icon: Anchor, color: '#0284C7', angle: 240 },
  { id: 'data', label: 'Big Data', sub: 'Sync', icon: Database, color: '#0D9488', angle: 300 },
];

interface ConnectionHubProps {
  scrollProgress: MotionValue<number>;
}

export const ConnectionHub: React.FC<ConnectionHubProps> = ({ scrollProgress }) => {
  const RADIUS = 280;

  // We use scroll primarily to zoom the whole system in/out, but the motion is perpetual
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollProgress, [0, 0.2], [0, 1]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-[1000px]">
      
      {/* 
        Responsive Wrapper:
        The hub is built on an 800x800 coordinate system.
        We scale it down via CSS transform for smaller screens so it stays proportional without breaking layout.
        scale-[0.45] for mobile, scale-75 for tablet, scale-100 for desktop.
      */}
      <div className="transform scale-[0.45] sm:scale-75 md:scale-100 transition-transform duration-500 ease-out origin-center">
        <motion.div 
            className="relative w-[800px] h-[800px] flex items-center justify-center"
            style={{ scale, opacity }}
        >
            
            {/* --- LAYER 1: The Radar Pulse (Scanning for Innovation) --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] rounded-full border border-gray-100 opacity-20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute w-[400px] h-[400px] rounded-full border border-desert-gold/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            </div>

            {/* --- LAYER 2: The Data Streams (SVG Connections) --- */}
            <motion.svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            >
                {NODES.map((node, i) => {
                    const angleRad = (node.angle * Math.PI) / 180;
                    const cx = 400; 
                    const cy = 400;
                    const x2 = cx + RADIUS * Math.cos(angleRad);
                    const y2 = cy + RADIUS * Math.sin(angleRad);
                    
                    return (
                        <g key={`connection-${node.id}`}>
                            <line 
                                x1={cx} y1={cy} x2={x2} y2={y2}
                                stroke={node.color}
                                strokeWidth="1"
                                strokeOpacity="0.2"
                            />
                            <circle r="3" fill={node.color}>
                                <animateMotion 
                                    dur={`${2 + i % 3}s`} 
                                    repeatCount="indefinite"
                                    path={`M${cx},${cy} L${x2},${y2}`}
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </circle>
                            <circle r="2" fill="white" stroke={node.color} strokeWidth="1">
                                <animateMotion 
                                    dur={`${3 + i % 2}s`} 
                                    repeatCount="indefinite"
                                    path={`M${x2},${y2} L${cx},${cy}`}
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </circle>
                        </g>
                    );
                })}
            </motion.svg>

            {/* --- LAYER 3: The Satellites (Nodes) --- */}
            <motion.div 
                className="absolute inset-0 z-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            >
                {NODES.map((node) => {
                    const angleRad = (node.angle * Math.PI) / 180;
                    const x = RADIUS * Math.cos(angleRad);
                    const y = RADIUS * Math.sin(angleRad);

                    return (
                        <motion.div
                            key={node.id}
                            className="absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16"
                            style={{ x, y }}
                        >
                            <motion.div 
                                className="relative group cursor-pointer"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                                whileHover={{ scale: 1.2 }}
                            >
                                <div className="absolute inset-0 bg-white/50 rounded-full animate-ping opacity-0 group-hover:opacity-100 duration-1000" />
                                <div className="w-16 h-16 rounded-full bg-white shadow-xl border-2 border-gray-100 flex items-center justify-center relative overflow-hidden transition-colors hover:border-desert-gold">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white z-0" />
                                    <node.icon className="relative z-10 text-gray-600 group-hover:text-desert-gold transition-colors" size={24} />
                                    <div 
                                        className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full border border-white z-20"
                                        style={{ backgroundColor: node.color }} 
                                    />
                                </div>
                                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 whitespace-nowrap">
                                    <p className="font-display font-bold text-xs text-gray-800">{node.label}</p>
                                    <p className="font-tech text-[9px] uppercase tracking-wider text-gray-400">{node.sub}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* --- LAYER 4: The Core (Nucleus) --- */}
            <div className="absolute z-30 flex items-center justify-center">
                <div className="absolute w-56 h-56 rounded-full border border-desert-gold/20 border-t-desert-gold/80 animate-[spin_8s_linear_infinite]" />
                <div className="absolute w-44 h-44 rounded-full border border-dashed border-sea-blue/30 animate-[spin_12s_linear_infinite_reverse]" />

                <motion.div 
                    className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center relative z-20 border-4 border-gray-50 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-orange-50 to-transparent opacity-60" />
                    <Wifi size={16} className="absolute top-4 text-gray-300" />
                    <div className="flex flex-col items-center z-10">
                        <div className="w-8 h-8 bg-gradient-to-br from-sea-blue to-desert-gold rounded-lg rotate-45 mb-1 shadow-sm flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        <span className="font-display font-black text-gray-900 text-sm tracking-widest">HUB</span>
                    </div>
                </motion.div>
            </div>

        </motion.div>
      </div>
    </div>
  );
};