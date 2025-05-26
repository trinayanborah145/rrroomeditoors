import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import AnimatedText from '../ui/AnimatedText';

const About: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-in');
      
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2, 
          duration: 0.8, 
          ease: 'power3.out' 
        }
      );
    }
  }, [isVisible]);

  return (
    <section id="about" className="section bg-gradient-to-b from-primary-50 to-primary-100 py-24">
      <div className="container">
        <div className="text-center mb-16">
          <AnimatedText 
            text="About Us" 
            element="h2"
            className="section-title"
          />
          <AnimatedText 
            text="Our story, our passion, and our commitment to excellence."
            element="p"
            className="section-subtitle"
            delay={0.3}
          />
        </div>
        
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border-l-4 border-primary-500">
            <p className="text-lg mb-6 animate-in">
              Room Editors was founded in 2022 by Dimpu Baruah and his talented team with a shared passion for thoughtful, impactful design. We believe that well-designed spaces have the power to transform how people feel, interact, and live.
            </p>
            
            <p className="text-lg mb-6 animate-in">
              Our team blends creativity, technical expertise, and personal attention to craft spaces that are both aesthetically beautiful and highly functional. Whether residential or commercial, each project is approached with a commitment to timeless design principles and innovative solutions tailored to our clients' unique styles and needs.
            </p>
            
            <p className="text-lg animate-in">
              In just a few years, Room Editors has built a strong reputation for delivering results that not only meet but exceed expectations. We're here to turn your vision into a space that truly feels like yours.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-in hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary-400">
              <h3 className="text-2xl font-medium mb-3 text-primary-600">Our Mission</h3>
              <p>To create thoughtfully designed spaces that enhance the way people live, work, and interact.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-in hover:shadow-xl transition-shadow duration-300 border-t-4 border-accent-400">
              <h3 className="text-2xl font-medium mb-3 text-accent-600">Our Vision</h3>
              <p>To be recognized as a leader in innovative interior design that balances beauty, functionality, and sustainability.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-in hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary-400">
              <h3 className="text-2xl font-medium mb-3 text-primary-600">Our Values</h3>
              <p>Creativity, integrity, attention to detail, and a client-centered approach guide everything we do.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
