import React from 'react';

interface BrasaoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrasaoPMSP: React.FC<BrasaoProps> = ({ 
  className = '', 
  size = 'md',
  showText = false 
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg 
        viewBox="0 0 200 220" 
        className={`${sizeMap[size]} drop-shadow-md`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997715" />
          </linearGradient>
          <linearGradient id="shieldNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1A30" />
            <stop offset="50%" stopColor="#132B52" />
            <stop offset="100%" stopColor="#081426" />
          </linearGradient>
          <linearGradient id="shieldCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A1515" />
            <stop offset="100%" stopColor="#570A0A" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Crossed Swords background */}
        <g stroke="url(#shieldGold)" strokeWidth="3" strokeLinecap="round">
          {/* Sword 1: top-left to bottom-right */}
          <line x1="30" y1="30" x2="170" y2="170" stroke="#CBD5E1" strokeWidth="4" />
          <line x1="30" y1="30" x2="50" y2="50" stroke="url(#shieldGold)" strokeWidth="8" />
          <circle cx="28" cy="28" r="5" fill="#D4AF37" />
          {/* Sword 2: top-right to bottom-left */}
          <line x1="170" y1="30" x2="30" y2="170" stroke="#CBD5E1" strokeWidth="4" />
          <line x1="170" y1="30" x2="150" y2="50" stroke="url(#shieldGold)" strokeWidth="8" />
          <circle cx="172" cy="28" r="5" fill="#D4AF37" />
        </g>

        {/* Outer Shield Outline */}
        <path 
          d="M 100 15 
             C 145 15, 175 30, 180 50 
             C 180 120, 155 170, 100 205 
             C 45 170, 20 120, 20 50 
             C 25 30, 55 15, 100 15 Z" 
          fill="url(#shieldNavy)" 
          stroke="url(#shieldGold)" 
          strokeWidth="6" 
        />

        {/* Inner Shield Border */}
        <path 
          d="M 100 24 
             C 140 24, 166 37, 170 54 
             C 170 115, 148 160, 100 192 
             C 52 160, 30 115, 30 54 
             C 34 37, 60 24, 100 24 Z" 
          fill="url(#shieldNavy)" 
          stroke="#E2E8F0" 
          strokeWidth="1.5" 
          opacity="0.8"
        />

        {/* Heraldic Divisions - Upper Chief in Crimson */}
        <path 
          d="M 33 55 
             C 33 55, 65 50, 100 50 
             C 135 50, 167 55, 167 55
             L 165 85
             C 135 80, 65 80, 35 85 Z" 
          fill="url(#shieldCrimson)" 
          stroke="url(#shieldGold)" 
          strokeWidth="1"
        />

        {/* Laurel Wreath left */}
        <path 
          d="M 55 140 C 45 110, 50 80, 65 65" 
          stroke="url(#shieldGold)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          fill="none"
        />
        <circle cx="50" cy="95" r="4" fill="#F5D061" />
        <circle cx="53" cy="115" r="4" fill="#F5D061" />
        <circle cx="60" cy="132" r="4" fill="#F5D061" />

        {/* Laurel Wreath right */}
        <path 
          d="M 145 140 C 155 110, 150 80, 135 65" 
          stroke="url(#shieldGold)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          fill="none"
        />
        <circle cx="150" cy="95" r="4" fill="#F5D061" />
        <circle cx="147" cy="115" r="4" fill="#F5D061" />
        <circle cx="140" cy="132" r="4" fill="#F5D061" />

        {/* Central Star of Honor */}
        <polygon 
          points="100,85 106,104 126,104 110,116 116,135 100,123 84,135 90,116 74,104 94,104" 
          fill="url(#shieldGold)" 
          stroke="#FFFFFF" 
          strokeWidth="1" 
        />
        <circle cx="100" cy="112" r="4" fill="#8A1515" />

        {/* Top Arc Banner / Text */}
        <text 
          x="100" 
          y="73" 
          textAnchor="middle" 
          fill="#FFFFFF" 
          fontSize="10" 
          fontWeight="bold" 
          fontFamily="sans-serif"
          letterSpacing="2"
        >
          PM • RP • SP
        </text>

        {/* Lower Motto Banner */}
        <path 
          d="M 45 158 Q 100 178 155 158 L 150 174 Q 100 192 50 174 Z" 
          fill="#0B1A30" 
          stroke="url(#shieldGold)" 
          strokeWidth="1.5" 
        />
        <text 
          x="100" 
          y="170" 
          textAnchor="middle" 
          fill="#F5D061" 
          fontSize="7" 
          fontWeight="800" 
          fontFamily="sans-serif"
          letterSpacing="1"
        >
          SERVIR E PROTEGER
        </text>

        {/* Mini Roleplay Identifier Pill */}
        <rect x="75" y="196" width="50" height="12" rx="6" fill="#1E293B" stroke="url(#shieldGold)" strokeWidth="1" />
        <text x="100" y="204.5" textAnchor="middle" fill="#CBD5E1" fontSize="6" fontWeight="bold" fontFamily="sans-serif">
          ROBLOX RP
        </text>
      </svg>
      {showText && (
        <div className="text-center mt-2">
          <div className="font-bold text-slate-900 tracking-wider text-sm font-heraldic">
            POLÍCIA MILITAR RP
          </div>
          <div className="text-xs text-amber-700 font-medium">
            COMUNIDADE SÃO PAULO
          </div>
        </div>
      )}
    </div>
  );
};
