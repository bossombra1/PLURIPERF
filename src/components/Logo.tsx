import React from 'react';
import logoPluriperf from '../assets/logo-pluriperf.png';

interface LogoProps {
  className?: string;
  variant?: 'full-horizontal' | 'full-stacked' | 'emblem-only';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: { horizontal: 'h-9 max-w-[180px]', stacked: 'h-20 max-w-[180px]', emblem: 'h-9 w-9' },
  md: { horizontal: 'h-11 max-w-[220px]', stacked: 'h-24 max-w-[220px]', emblem: 'h-11 w-11' },
  lg: { horizontal: 'h-14 max-w-[280px]', stacked: 'h-32 max-w-[280px]', emblem: 'h-14 w-14' },
  xl: { horizontal: 'h-20 max-w-[360px]', stacked: 'h-44 max-w-[360px]', emblem: 'h-20 w-20' },
};

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full-horizontal', size = 'md' }) => {
  const sizeClass = sizes[size];
  const classes = variant === 'emblem-only' ? sizeClass.emblem + ' w-auto object-contain ' + className : (variant === 'full-stacked' ? sizeClass.stacked : sizeClass.horizontal) + ' w-auto object-contain object-left ' + className;
  return <img src={logoPluriperf} alt="PLURIPERF International University" className={classes} />;
};

export default Logo;
