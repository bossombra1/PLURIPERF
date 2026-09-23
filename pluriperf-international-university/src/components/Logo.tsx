import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full-horizontal' | 'full-stacked' | 'emblem-only';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EmblemSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Emblème PLURIPERF">
    <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="3" />
    <path d="M60 17 91 72c6 11-2 25-15 25H44c-13 0-21-14-15-25L60 17Z" fill="#008629" />
    <path d="M60 31v58M43 68h34" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    <path d="M60 31 43 68M60 31l17 37" stroke="#fff" strokeWidth="3" />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full-horizontal',
  theme = 'light',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);
  const dark = theme === 'dark';

  const imgSizes = {
    sm: 'h-8 w-auto',
    md: 'h-11 w-auto',
    lg: 'h-14 w-auto',
    xl: 'h-18 w-auto',
  }[size];

  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18',
  }[size];

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  }[size];

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  // If emblem-only is requested
  if (variant === 'emblem-only') {
    return !imgError ? (
      <img
        src="/logo-pluriperf.png"
        alt="PLURIPERF"
        className={`${imgSizes} object-contain ${className}`}
        onError={() => setImgError(true)}
      />
    ) : (
      <EmblemSvg className={`${emblemSizes} ${className}`} />
    );
  }

  // Full stacked version
  if (variant === 'full-stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {!imgError ? (
          <img
            src="/logo-pluriperf.png"
            alt="PLURIPERF Logo"
            className={`${imgSizes} object-contain max-w-[140px]`}
            onError={() => setImgError(true)}
          />
        ) : (
          <EmblemSvg className={emblemSizes} />
        )}
        <div className="mt-2">
          <span className={`block font-bold tracking-[0.14em] uppercase ${titleSizes} ${dark ? 'text-white' : 'text-[#111827]'}`}>
            PLURIPERF
          </span>
          <span className={`block tracking-[0.18em] uppercase font-semibold text-[#008629] ${subSizes}`}>
            International University
          </span>
        </div>
      </div>
    );
  }

  // Full horizontal version (Official INP-HB style navbar logo)
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {!imgError ? (
        <img
          src="/logo-pluriperf.png"
          alt="PLURIPERF"
          className={`${imgSizes} object-contain`}
          onError={() => setImgError(true)}
        />
      ) : (
        <EmblemSvg className={emblemSizes} />
      )}
      <div className="leading-tight select-none">
        <span className={`block font-extrabold tracking-[0.12em] uppercase ${titleSizes} ${dark ? 'text-white' : 'text-[#111827]'}`}>
          PLURIPERF
        </span>
        <span className={`block tracking-[0.16em] uppercase font-semibold text-[#008629] ${subSizes}`}>
          International University
        </span>
      </div>
    </div>
  );
};
