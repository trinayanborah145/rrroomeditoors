import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

interface AnimatedTextProps {
  text: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  element = 'h1',
  className = '',
  delay = 0,
  duration = 0.7,
  stagger = 0.03,
  once = true,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: once,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const splitText = text.split(' ');
    const container = containerRef.current;
    container.innerHTML = '';

    // Create a wrapper for each word
    splitText.forEach((word, i) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'inline-block overflow-hidden mr-1 md:mr-2';
      
      // Create inner span for animation
      const innerSpan = document.createElement('span');
      innerSpan.className = 'animated-word inline-block translate-y-full opacity-0';
      innerSpan.textContent = word;
      
      wordSpan.appendChild(innerSpan);
      container.appendChild(wordSpan);
      
      // Add a space after each word except the last
      if (i < splitText.length - 1) {
        container.appendChild(document.createTextNode(' '));
      }
    });
  }, [text]);

  useEffect(() => {
    if (inView && containerRef.current) {
      const words = containerRef.current.querySelectorAll('.animated-word');
      
      gsap.to(words, {
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: 'power3.out',
      });
    }
  }, [inView, delay, duration, stagger]);

  // Create a properly typed component to avoid complex union types
  const renderComponent = () => {
    switch (element) {
      case 'h1':
        return <h1 ref={ref} className={className}><span ref={containerRef} className="inline"></span></h1>;
      case 'h2':
        return <h2 ref={ref} className={className}><span ref={containerRef} className="inline"></span></h2>;
      case 'h3':
        return <h3 ref={ref} className={className}><span ref={containerRef} className="inline"></span></h3>;
      case 'h4':
        return <h4 ref={ref} className={className}><span ref={containerRef} className="inline"></span></h4>;
      case 'h5':
        return <h5 ref={ref} className={className}><span ref={containerRef} className="inline"></span></h5>;
      case 'h6':
        return <h6 ref={ref} className={className}><span ref={containerRef} className="inline"></span></h6>;
      case 'p':
        return <p ref={ref} className={className}><span ref={containerRef} className="inline"></span></p>;
      case 'span':
      default:
        return <span ref={ref} className={className}><span ref={containerRef} className="inline"></span></span>;
    }
  };

  return renderComponent();
};

export default AnimatedText;