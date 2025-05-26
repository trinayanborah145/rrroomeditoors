import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

interface FadeInImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const FadeInImage: React.FC<FadeInImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  delay = 0,
  duration = 1,
  once = true,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: once,
  });

  useEffect(() => {
    if (inView && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { 
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: 'power3.out',
        }
      );
    }
  }, [inView, delay, duration]);

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`opacity-0 ${className}`}
        loading="lazy"
      />
    </div>
  );
};

export default FadeInImage;