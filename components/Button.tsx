import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 font-tech uppercase tracking-widest text-sm font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 clip-path-polygon";
  
  const variants = {
    primary: "bg-sea-blue text-white hover:bg-deep-sea shadow-lg hover:shadow-sea-blue/30 border border-transparent",
    secondary: "bg-desert-gold text-white hover:bg-orange-600 shadow-lg hover:shadow-desert-gold/30 border border-transparent",
    outline: "bg-transparent border border-sea-blue text-sea-blue hover:bg-sea-blue/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};