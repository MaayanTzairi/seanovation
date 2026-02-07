import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-gray-200 py-4 shadow-sm' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-sea-blue to-desert-gold rounded-sm rotate-45 shadow-md" />
          <span className="text-2xl font-display font-bold tracking-tighter text-text-main">
            SEE<span className="text-sea-blue">NOVATION</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-tech tracking-wider text-sm uppercase text-gray-600 font-medium">
          <a href="#playground" className="hover:text-sea-blue transition-colors">Playgrounds</a>
          <a href="#advantage" className="hover:text-desert-gold transition-colors">Advantage</a>
          <a href="#validators" className="hover:text-sea-blue transition-colors">Validators</a>
          <button className="px-5 py-2 border border-text-main text-text-main hover:bg-text-main hover:text-white transition-all duration-300 font-bold">
            Apply Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-main"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="flex flex-col p-6 gap-4 font-tech uppercase tracking-widest text-sm text-gray-600 font-medium">
              <a href="#playground" onClick={() => setMobileMenuOpen(false)} className="hover:text-sea-blue">Playgrounds</a>
              <a href="#advantage" onClick={() => setMobileMenuOpen(false)} className="hover:text-desert-gold">Advantage</a>
              <a href="#validators" onClick={() => setMobileMenuOpen(false)} className="hover:text-sea-blue">Validators</a>
              <div className="pt-4">
                 <button className="w-full py-3 bg-sea-blue text-white font-bold shadow-md">Apply Now</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};