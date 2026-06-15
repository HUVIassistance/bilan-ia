import { FC } from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: FC<LogoProps> = ({ className = "h-14", showText = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* High-Fidelity SVG reproduction of the real HUVI Logo from the uploaded image */}
      <svg 
        viewBox="0 0 240 160" 
        className="w-full h-full" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper-Right Loading Circle Ring */}
        <g transform="translate(170, 32)">
          {/* Base Background Track of the circle (Fine dark slate/blue matching image) */}
          <circle 
            cx="20" 
            cy="20" 
            r="16" 
            stroke="#1b2e40" 
            strokeWidth="1.5" 
            fill="none"
          />
          {/* Active Highlight Arc of the circle */}
          <path 
            d="M 4 20 A 16 16 0 0 1 20 4" 
            stroke="#41809b" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            fill="none"
          />
        </g>

        {/* Core Serif Text "HUVI" */}
        <text 
          x="120" 
          y="92" 
          textAnchor="middle" 
          fill="#FFFFFF" 
          fontFamily="Georgia, 'Times New Roman', Times, serif"
          fontSize="56" 
          fontWeight="400" 
          letterSpacing="0.08em"
          className="select-none"
        >
          HUVI
        </text>

        {/* Lower Progress Bar Container */}
        <g transform="translate(68, 114)">
          {/* Progress Bar with sharp color change from teal-blue to white as seen in the image */}
          <rect 
            x="0" 
            y="0" 
            width="104" 
            height="8" 
            rx="4" 
            fill="url(#logoProgressGradient)" 
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="0.5"
          />
        </g>

        {/* Defined Gradients to perfectly match those in the uploaded images */}
        <defs>
          <linearGradient id="logoProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f4255" />
            <stop offset="35%" stopColor="#31637c" />
            <stop offset="58%" stopColor="#528fa9" />
            <stop offset="58%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
