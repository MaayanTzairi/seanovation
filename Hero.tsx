import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Crosshair, ChevronDown, MousePointer2, Scan, Activity, Zap, Droplets, Box } from 'lucide-react';

// --- SHADERS ---
// Vertex Shader: Handles position, size attenuation, and color mixing
const vertexShader = `
  attribute vec3 targetPosition;
  attribute vec3 color;
  attribute float size;
  
  uniform float uTime;
  uniform float uMix; // 0 to 1 transition progress
  uniform float uSizeScale;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    
    // Mix current position with target position
    // We actually update 'position' in JS buffer for complex GSAP easing, 
    // but we can add noise here for "life"
    
    vec3 pos = position;
    
    // Add a subtle breathing effect
    float noise = sin(pos.x * 0.1 + uTime) * cos(pos.y * 0.1 + uTime) * 0.5;
    pos.x += noise * 0.2;
    pos.y += noise * 0.2;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation (particles get smaller when further away)
    gl_PointSize = size * uSizeScale * (300.0 / -mvPosition.z);
  }
`;

// Fragment Shader: Draws a perfect anti-aliased circle with soft glow
const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Calculate distance from center of the point (0.0 to 0.5)
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    
    // Soft circle logic (High Quality / 4K look)
    if (r > 1.0) discard;
    
    // Gaussian falloff for glow
    float glow = 1.0 - r;
    glow = pow(glow, 1.5);
    
    gl_FragColor = vec4(vColor, glow * 0.8); // 0.8 opacity max
  }
`;

// --- TYPES ---
type Phase = 'sand' | 'sun' | 'water' | 'grid';

const PHASE_CONFIG = {
  sand: {
    label: "SILICON VALLEY OF THE DESERT",
    sub: "PHASE 1: SAND",
    desc: "Infinite raw potential.",
    color: new THREE.Color('#D97706'), // Gold
    icon: Crosshair
  },
  sun: {
    label: "RENEWABLE ENERGY SOURCE",
    sub: "PHASE 2: SUN",
    desc: "Powering the future.",
    color: new THREE.Color('#F59E0B'), // Bright Yellow/Orange
    icon: Zap
  },
  water: {
    label: "RED SEA AQUATECH",
    sub: "PHASE 3: WATER",
    desc: "Deep sea validation.",
    color: new THREE.Color('#0EA5E9'), // Cyan
    icon: Droplets
  },
  grid: {
    label: "INFRASTRUCTURE GRID",
    sub: "PHASE 4: REALITY",
    desc: "Deployment on national scale.",
    color: new THREE.Color('#1E3A8A'), // Deep Blue
    icon: Box
  }
};

const PARTICLE_COUNT = 6000;

export const Hero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<Phase>('sand');

  useEffect(() => {
    if (!mountRef.current) return;

    // --- SETUP ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Clean white canvas
    scene.fog = new THREE.FogExp2(0xffffff, 0.005); // Soft fog integration

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = 120;
    camera.position.y = 10;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false,
      powerPreference: "high-performance" 
    });
    
    // CRITICAL for 4K/Retina displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // --- GEOMETRY ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    
    // Arrays to hold shape data
    const shapes: Record<Phase, Float32Array> = {
      sand: new Float32Array(PARTICLE_COUNT * 3),
      sun: new Float32Array(PARTICLE_COUNT * 3),
      water: new Float32Array(PARTICLE_COUNT * 3),
      grid: new Float32Array(PARTICLE_COUNT * 3),
    };

    // --- GENERATE SHAPES ---
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // 1. SAND (Tornado / Funnel)
      const t = Math.random() * Math.PI * 20; // spiral
      const y = (Math.random() - 0.5) * 120;
      const radius = 10 + Math.abs(y) * 0.5 + Math.random() * 10;
      shapes.sand[i3] = Math.cos(t) * radius;
      shapes.sand[i3 + 1] = y;
      shapes.sand[i3 + 2] = Math.sin(t) * radius;

      // 2. SUN (Sphere with Rays)
      const r = 40;
      // Uniform point on sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const isRay = Math.random() > 0.9;
      const rMod = isRay ? r * (1 + Math.random()) : r;
      
      shapes.sun[i3] = rMod * Math.sin(phi) * Math.cos(theta);
      shapes.sun[i3 + 1] = rMod * Math.sin(phi) * Math.sin(theta);
      shapes.sun[i3 + 2] = rMod * Math.cos(phi);

      // 3. WATER (Wave Surface)
      const wx = (Math.random() - 0.5) * 160;
      const wz = (Math.random() - 0.5) * 160;
      shapes.water[i3] = wx;
      shapes.water[i3 + 1] = Math.sin(wx * 0.1) * 5 + Math.cos(wz * 0.1) * 5 - 20;
      shapes.water[i3 + 2] = wz;

      // 4. GRID (Structured Lattice / City)
      const gridSize = 80;
      const steps = Math.cbrt(PARTICLE_COUNT); // approx particles per side
      const stepSize = gridSize / steps * 2;
      // Random snap to grid
      shapes.grid[i3] = (Math.round((Math.random()-0.5) * 10) / 10) * 120;
      shapes.grid[i3 + 1] = (Math.round((Math.random()-0.5) * 10) / 10) * 60;
      shapes.grid[i3 + 2] = (Math.round((Math.random()-0.5) * 10) / 10) * 80;

      // INIT
      positions[i3] = shapes.sand[i3];
      positions[i3 + 1] = shapes.sand[i3 + 1];
      positions[i3 + 2] = shapes.sand[i3 + 2];
      
      // COLORS (Init as Sand Gold)
      const c = PHASE_CONFIG.sand.color;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      // SIZES (Random variation for depth)
      sizes[i] = Math.random() * 1.5 + 0.5; 
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // --- MATERIAL (SHADER) ---
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMix: { value: 0 },
        uSizeScale: { value: 1.0 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.MultiplyBlending // Dark particles on white background for ink-like look
      // OR THREE.NormalBlending for standard colors
    });
    
    // For glowing colored particles on white, NormalBlending is usually best if opacity is handled in fragment
    material.blending = THREE.NormalBlending;

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- ANIMATION LOOP ---
    const phases: Phase[] = ['sand', 'sun', 'water', 'grid'];
    let currentPhaseIndex = 0;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    const nextPhase = () => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      const phaseKey = phases[currentPhaseIndex];
      const targetShape = shapes[phaseKey];
      const targetColor = PHASE_CONFIG[phaseKey].color;
      
      setActivePhase(phaseKey);

      // We need to animate the positions buffer manually via GSAP's onUpdate
      // Create a temporary object to tween
      const animObj = { progress: 0 };
      
      // Store start positions (snapshot)
      const startPositions = new Float32Array(positions);
      const startColors = new Float32Array(colors);

      tl.to(animObj, {
        progress: 1,
        duration: 2.5,
        ease: "power3.inOut", // Elastic, premium feel
        onUpdate: () => {
          const p = animObj.progress;
          for (let i = 0; i < PARTICLE_COUNT; i++) {
             const i3 = i * 3;
             
             // Interpolate Position
             positions[i3] = startPositions[i3] + (targetShape[i3] - startPositions[i3]) * p;
             positions[i3+1] = startPositions[i3+1] + (targetShape[i3+1] - startPositions[i3+1]) * p;
             positions[i3+2] = startPositions[i3+2] + (targetShape[i3+2] - startPositions[i3+2]) * p;
             
             // Interpolate Color
             colors[i3] = startColors[i3] + (targetColor.r - startColors[i3]) * p;
             colors[i3+1] = startColors[i3+1] + (targetColor.g - startColors[i3+1]) * p;
             colors[i3+2] = startColors[i3+2] + (targetColor.b - startColors[i3+2]) * p;
          }
          geometry.attributes.position.needsUpdate = true;
          geometry.attributes.color.needsUpdate = true;
          
          // Shake effect via uniform
          material.uniforms.uSizeScale.value = 1.0 + Math.sin(p * Math.PI) * 0.5; // Pulse size during transition
        }
      })
      .to({}, { duration: 2 }); // Pause before next
    };

    // Kickstart the loop
    nextPhase();
    // Re-trigger loop logic
    tl.eventCallback("onRepeat", nextPhase);


    // --- RENDER ---
    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      material.uniforms.uTime.value = elapsedTime;
      
      // Gentle Rotation
      particles.rotation.y = elapsedTime * 0.05;
      
      // Mouse Parallax
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.5 - camera.position.y + 10) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // --- EVENTS ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.1;
      mouseY = (e.clientY - height / 2) * 0.1;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      tl.kill();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const CurrentIcon = PHASE_CONFIG[activePhase].icon;

  return (
    <section className="relative w-full h-[100vh] bg-white overflow-hidden flex flex-col justify-center">
      
      {/* 3D CANVAS */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* OVERLAY CONTENT */}
      <div className="container mx-auto px-6 relative z-10 pointer-events-none h-full flex flex-col justify-center">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mt-20">
            
            {/* LEFT: Main Typography */}
            <div className="pointer-events-auto max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-6"
                >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-display font-bold text-xs tracking-[0.2em] text-gray-400">
                        LIVE ENVIRONMENT SIMULATION
                    </span>
                </motion.div>
                
                <h1 className="text-6xl sm:text-7xl md:text-9xl font-display font-black text-gray-900 mb-6 leading-[0.9] tracking-tighter">
                   SEE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sea-blue to-blue-700">NOVATION</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl leading-relaxed mb-10">
                   From <span className="font-bold text-desert-gold">Sand</span> to <span className="font-bold text-sea-blue">Sea</span> to <span className="font-bold text-gray-900">Structure</span>. 
                   <br/>The world's only innovation playground on national infrastructure.
                </p>

                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-gray-900 text-white font-tech font-bold uppercase tracking-widest hover:bg-desert-gold transition-colors shadow-2xl hover:shadow-orange-500/20 clip-path-polygon">
                        Enter Playground
                    </button>
                    <button className="px-8 py-4 border border-gray-200 bg-white/50 backdrop-blur text-gray-900 font-tech font-bold uppercase tracking-widest hover:border-sea-blue hover:text-sea-blue transition-colors flex items-center gap-2 group">
                        Start Tour <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* RIGHT: Dynamic HUD */}
            <div className="pointer-events-auto w-full max-w-sm hidden lg:block">
                 <AnimatePresence mode="wait">
                    <motion.div 
                        key={activePhase}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 shadow-2xl rounded-2xl relative overflow-hidden"
                    >
                        {/* Colored Top Border */}
                        <div 
                          className="absolute top-0 left-0 right-0 h-1" 
                          style={{ backgroundColor: '#' + PHASE_CONFIG[activePhase].color.getHexString() }} 
                        />
                        
                        <div className="flex justify-between items-start mb-4">
                             <div>
                               <p className="text-[10px] font-display font-bold text-gray-400 uppercase tracking-widest mb-1">Current Sector</p>
                               <h2 className="text-2xl font-display font-bold text-gray-900 leading-none">
                                  {PHASE_CONFIG[activePhase].label}
                               </h2>
                             </div>
                             <div 
                               className="p-3 rounded-xl bg-gray-50 shadow-inner"
                               style={{ color: '#' + PHASE_CONFIG[activePhase].color.getHexString() }}
                             >
                                <CurrentIcon size={24} />
                             </div>
                        </div>
                        
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <Activity size={16} className="text-gray-400" />
                              <span className="font-tech text-sm text-gray-600 uppercase tracking-wider">{PHASE_CONFIG[activePhase].sub}</span>
                           </div>
                           <p className="text-sm text-gray-500 font-medium leading-relaxed">
                              {PHASE_CONFIG[activePhase].desc}
                           </p>
                        </div>

                        {/* Animated Loader Line */}
                        <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                             <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3.5, ease: "linear" }}
                                className="h-full"
                                style={{ backgroundColor: '#' + PHASE_CONFIG[activePhase].color.getHexString() }}
                             />
                        </div>
                    </motion.div>
                 </AnimatePresence>
            </div>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-gray-300 opacity-60">
             <div className="flex items-center gap-2">
                <MousePointer2 size={12} />
                <span className="font-tech text-[10px] tracking-[0.3em] uppercase">Interactive Scene</span>
             </div>
             <ChevronDown className="animate-bounce" />
          </div>
      </div>

    </section>
  );
};