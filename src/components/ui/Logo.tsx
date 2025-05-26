import React from 'react';
interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'text-primary-900' }) => {
  return (
    <a href="#home" className={`flex items-center gap-3 font-serif text-xl ${className}`}>
      <img 
        src="/images/464880993_472018949182080_6758788125714834740_n (1).jpg" 
        alt="Room Editors Logo" 
        className="h-10 w-10 rounded-full object-cover"
      />
      <span className="font-medium tracking-wide ml-1">Room Editors</span>
    </a>
  );
};

export default Logo;