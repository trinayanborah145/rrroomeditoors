import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDownCircle } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    timeline
      .fromTo(overlayRef.current, 
        { opacity: 1 }, 
        { opacity: 0.4, duration: 1.5, delay: 0.5 }
      )
      .fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      )
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      );
      
    // Create parallax effect
    const parallaxEffect = () => {
      const scrollPos = window.scrollY;
      if (heroRef.current) {
        gsap.to(heroRef.current.querySelector('.bg-image'), {
          y: scrollPos * 0.4,
          duration: 0.6,
          ease: 'power1.out',
        });
      }
    };
    
    window.addEventListener('scroll', parallaxEffect);
    
    return () => {
      window.removeEventListener('scroll', parallaxEffect);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="bg-image absolute inset-0 w-full h-full">
        <img 
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=1" 
          alt="Elegant interior design" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-50"
      ></div>
      
      {/* Content */}
      <div className="container relative z-10 text-center text-white">
        <div ref={contentRef}>
          <AnimatedText 
            text="Transforming Spaces Into Experiences" 
            element="h1"
            className="font-serif font-medium mb-6 max-w-4xl mx-auto"
            delay={0.8}
          />
          
          <AnimatedText 
            text="Award-winning interior design studio specializing in creating thoughtful, sophisticated spaces that reflect your unique personality and lifestyle."
            element="p"
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-neutral-100"
            delay={1.2}
            stagger={0.01}
          />
        </div>
        
        <div ref={ctaRef}>
          <a 
            href="#contact" 
            className="btn btn-accent animate-pulse-slow"
          >
            Schedule Consultation
          </a>
          
          <div className="mt-16">
            <a 
              href="#services"
              className="inline-flex flex-col items-center text-neutral-200 hover:text-white transition-colors duration-300"
            >
              <span className="text-sm mb-2">Discover Our Services</span>
              <ArrowDownCircle size={28} className="animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;