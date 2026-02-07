import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-sea pt-20 pb-10 border-t border-white/5 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
          
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-6 h-6 bg-gradient-to-tr from-sea-blue to-desert-gold rounded-sm rotate-45" />
               <span className="text-xl font-display font-bold text-white">SEE<span className="text-sea-blue">NOVATION</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The Sandbox of Reality. Where startups transition from idea to national validation in the Red Sea ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
            <div>
              <h4 className="text-white font-bold mb-4 font-display">Playgrounds</h4>
              <ul className="space-y-2 text-gray-400 font-tech tracking-wider">
                <li><a href="#" className="hover:text-sea-blue transition-colors">Blue Tech</a></li>
                <li><a href="#" className="hover:text-sea-blue transition-colors">Energy & Agro</a></li>
                <li><a href="#" className="hover:text-sea-blue transition-colors">Safe Zone</a></li>
                <li><a href="#" className="hover:text-sea-blue transition-colors">Travel Tech</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 font-display">Company</h4>
              <ul className="space-y-2 text-gray-400 font-tech tracking-wider">
                <li><a href="#" className="hover:text-sea-blue transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-sea-blue transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-sea-blue transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} SeeNovation. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};