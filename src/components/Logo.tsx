import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full-horizontal' | 'full-stacked' | 'emblem-only';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EmblemSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 300 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Emblème PLURIPERF"
    >
      <defs>
        <linearGradient id="emblemOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7896bc" />
          <stop offset="100%" stopColor="#5e827d" />
        </linearGradient>

        <linearGradient id="emblemNavyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0E192D" />
          <stop offset="100%" stopColor="#08101E" />
        </linearGradient>

        <radialGradient id="emblemShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#64748B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#64748B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer Drop/Seed Silhouette */}
      <path
        d="M 150,22 
           C 155,36 208,108 238,154 
           C 256,180 254,212 234,233 
           C 214,254 180,260 150,260 
           C 120,260 86,254 66,233 
           C 46,212 44,180 62,154 
           C 92,108 145,36 150,22 Z"
        fill="url(#emblemOrangeGrad)"
      />

      {/* Left Navy Curved Tapering Wing */}
      <path
        d="M 146,38 
           L 92,246 
           C 102,252 114,256 127,258 
           L 143,145 
           L 147,38 Z"
        fill="url(#emblemNavyGrad)"
      />

      {/* Right Navy Curved Tapering Wing */}
      <path
        d="M 154,38 
           L 208,246 
           C 198,252 186,256 173,258 
           L 157,145 
           L 153,38 Z"
        fill="url(#emblemNavyGrad)"
      />

      {/* Outer White Traces */}
      <path
        d="M 148,34 L 87,247 L 92,246 L 147,38 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 152,34 L 213,247 L 208,246 L 153,38 Z"
        fill="#FFFFFF"
      />

      {/* Central White Ascending Spire */}
      <polygon
        points="150,36 143,145 147,259 150,259 153,259 157,145"
        fill="#FFFFFF"
      />

      {/* Lower Central Orange Triangle */}
      <polygon
        points="150,154 146,259 154,259"
        fill="url(#emblemOrangeGrad)"
      />

      {/* Subtle Ground Shadow */}
      <ellipse cx="150" cy="280" rx="58" ry="3.5" fill="url(#emblemShadow)" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full-horizontal',
  theme = 'light',
  size = 'md',
}) => {
  const isDark = theme === 'dark';

  const sizeEmblem = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20',
  }[size];

  const sizeText = {
    sm: 'text-sm tracking-widest',
    md: 'text-base sm:text-lg tracking-[0.14em]',
    lg: 'text-xl sm:text-2xl tracking-[0.16em]',
    xl: 'text-2xl sm:text-3xl tracking-[0.18em]',
  }[size];

  const sizeSub = {
    sm: 'text-[9px] tracking-[0.18em]',
    md: 'text-[10px] sm:text-[11px] tracking-[0.2em]',
    lg: 'text-xs tracking-[0.22em]',
    xl: 'text-sm tracking-[0.24em]',
  }[size];

  if (variant === 'emblem-only') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <EmblemSvg className={sizeEmblem} />
      </div>
    );
  }

  if (variant === 'full-stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <EmblemSvg className={sizeEmblem} />
        <div className="mt-2">
          <span
            className={`font-sans font-extrabold uppercase block leading-none ${
              isDark ? 'text-white' : 'text-slate-900'
            } ${sizeText}`}
          >
            PLURIPERF
          </span>
          <span
            className={`font-sans font-semibold uppercase block mt-1 ${
              isDark ? 'text-slate-300' : 'text-slate-500'
            } ${sizeSub}`}
          >
            International University
          </span>
        </div>
      </div>
    );
  }

  // Default: full-horizontal (ideal for institutional top bar and footer)
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <EmblemSvg className={sizeEmblem} />
      <div className="flex flex-col text-left">
        <span
          className={`font-sans font-extrabold uppercase leading-none ${
            isDark ? 'text-white' : 'text-slate-900'
          } ${sizeText}`}
        >
          PLURIPERF
        </span>
        <span
          className={`font-sans font-semibold uppercase mt-1 leading-none ${
            isDark ? 'text-slate-300' : 'text-slate-500'
          } ${sizeSub}`}
        >
          International University
        </span>
      </div>
    </div>
  );
};
