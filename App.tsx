import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Verticals } from './components/Verticals';
import { Metamorphosis } from './components/Metamorphosis';
import { Advantage } from './components/Advantage';
import { Innovation3D } from './components/Innovation3D';
import { DigitalTwin } from './components/DigitalTwin';
import { Validators } from './components/Validators';
import { Footer } from './components/Footer';

// Register GSAP ScrollTrigger globally once
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas-white text-text-main selection:bg-desert-gold selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Verticals />
        <Innovation3D />
        <Metamorphosis />
        <Advantage />
        <DigitalTwin />
        <Validators />
      </main>
      <Footer />
    </div>
  );
};

export default App;