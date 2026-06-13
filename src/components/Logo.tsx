import React from 'react';

interface LogoProps {
  className?: string; // class applied to container
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  layout?: 'horizontal' | 'vertical' | 'icon';
  iconColor?: string;
  textColor?: string;
}

export default function Logo({
  className = '',
  size = 'md',
  layout = 'horizontal',
  iconColor = '#c5a47e',
  textColor = 'text-[#c5a47e]'
}: LogoProps) {
  // Size calculations for emblem
  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
    xl: 'h-32 w-32',
    custom: 'h-full w-full'
  };

  const textSizes = {
    sm: 'text-lg tracking-[0.05em]',
    md: 'text-2xl tracking-[0.08em]',
    lg: 'text-4xl tracking-[0.1em]',
    xl: 'text-5xl tracking-[0.12em]',
    custom: 'text-3xl'
  };

  const subTextSizes = {
    sm: 'text-[6px] tracking-[0.2em]',
    md: 'text-[8px] tracking-[0.25em]',
    lg: 'text-[10px] tracking-[0.3em]',
    xl: 'text-[12px] tracking-[0.35em]',
    custom: 'text-[9px]'
  };

  return (
    <div 
      className={`inline-flex items-center ${
        layout === 'vertical' ? 'flex-col text-center gap-3' : 'flex-row gap-3 text-left'
      } ${className}`}
    >
      {/* Handcrafted precise transparent SVG representing the sun-crest/compass logo */}
      <svg
        viewBox="0 0 100 100"
        className={`${iconSizes[size]} transition-all duration-300 transform hover:rotate-6`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(50, 50)">
          {/* Layer 1: 12 Major outer compass needles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={`major-${i}`} transform={`rotate(${i * 30})`}>
              <polygon 
                points="0,-8 -4.5,-22 0,-45 4.5,-22" 
                fill={iconColor} 
              />
              <polygon 
                points="0,-8 -4.5,-22 0,-45" 
                fill="#8e7354" 
                opacity="0.45" 
              />
            </g>
          ))}

          {/* Layer 2: 12 Intermediate secondary needles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={`minor-${i}`} transform={`rotate(${i * 30 + 15})`}>
              <polygon 
                points="0,-8 -3,-16 0,-33 3,-16" 
                fill={iconColor} 
                opacity="0.8"
              />
              <polygon 
                points="0,-8 -3,-16 0,-33" 
                fill="#8e7354" 
                opacity="0.35" 
              />
            </g>
          ))}

          {/* Layer 3: Concentric Gold Framing Circles */}
          <circle cx="0" cy="0" r="18" fill="none" stroke={iconColor} strokeWidth="1.2" />
          <circle cx="0" cy="0" r="15" fill="none" stroke={iconColor} strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="12" fill="none" stroke={iconColor} strokeWidth="1.5" />

          {/* Layer 4: Inner circle decorative beads */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const cx = 15 * Math.cos(angle);
            const cy = 15 * Math.sin(angle);
            return (
              <circle key={`bead-${i}`} cx={cx} cy={cy} r="1.2" fill={iconColor} />
            );
          })}

          {/* Layer 5: Hand-detailed Core Bowl and Vapor / Steam */}
          <g transform="translate(0, 1)">
            {/* The steaming bowl */}
            <path 
              d="M -7,-2 C -7,4 7,4 7,-2 Z" 
              fill={iconColor} 
            />
            {/* Upper lip rim of the bowl */}
            <line x1="-7.5" y1="-2" x2="7.5" y2="-2" stroke={iconColor} strokeWidth="1" />
            
            {/* Stylized Steam rising from the fresh bowl */}
            <path 
              d="M -3.5,-4 C -4.5,-7 -2,-10 -3,-13" 
              fill="none" 
              stroke={iconColor} 
              strokeWidth="0.8" 
              strokeLinecap="round" 
            />
            <path 
              d="M 0,-4 C -1,-7 1.5,-10 0.5,-13" 
              fill="none" 
              stroke={iconColor} 
              strokeWidth="0.8" 
              strokeLinecap="round" 
            />
            <path 
              d="M 3.5,-4 C 2.5,-7 5,-10 4,-13" 
              fill="none" 
              stroke={iconColor} 
              strokeWidth="0.8" 
              strokeLinecap="round" 
            />
          </g>
        </g>
      </svg>

      {/* Brand Text Elements (Only shown if layout is not 'icon') */}
      {layout !== 'icon' && (
        <div className={`flex flex-col ${layout === 'vertical' ? 'items-center' : 'items-start'}`}>
          <span 
            className={`font-script ${textColor} ${textSizes[size]} leading-none pt-1`}
          >
            Le Magellan
          </span>
          <span 
            className={`font-sans tracking-[0.25em] text-white/40 uppercase font-light mt-0.5 ${subTextSizes[size]}`}
          >
            French & Oriental Grill
          </span>
        </div>
      )}
    </div>
  );
}
