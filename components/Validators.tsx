import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../constants';

export const Validators: React.FC = () => {
  return (
    <section id="validators" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-main mb-6">
            The <span className="text-desert-gold">Validators</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Our partners are the "Hosts" of the playground. They provide the <span className="text-sea-blue font-semibold">national-scale infrastructure</span> for you to play with.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl bg-sand-light border border-gray-100 hover:border-desert-gold/30 hover:shadow-lg transition-all duration-300 group text-center"
            >
              <div className="w-20 h-20 mb-6 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm group-hover:border-desert-gold transition-all">
                <span className="font-display font-bold text-xl text-gray-400 group-hover:text-desert-gold transition-colors">
                  {partner.logoPlaceholder}
                </span>
              </div>
              <h3 className="text-text-main font-bold text-lg mb-1">{partner.name}</h3>
              <p className="text-sea-blue text-sm font-tech uppercase tracking-wider">{partner.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 p-8 md:p-10 rounded-3xl bg-gradient-to-r from-sea-blue to-blue-700 text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 relative z-10">
            Ready to Validate Your Reality?
          </h3>
          <button className="relative z-10 w-full sm:w-auto px-10 py-4 bg-white text-deep-sea font-bold font-tech uppercase tracking-widest hover:bg-desert-gold hover:text-white transition-colors shadow-lg rounded-sm">
            Contact the Playground
          </button>
        </div>
      </div>
    </section>
  );
};