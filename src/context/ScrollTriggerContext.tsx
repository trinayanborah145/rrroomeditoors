import React, { createContext, useContext, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollTriggerContextType {
  registerAnimation: (element: HTMLElement, animation: gsap.core.Tween | gsap.core.Timeline) => void;
}

const ScrollTriggerContext = createContext<ScrollTriggerContextType | null>(null);

export const useScrollTrigger = () => {
  const context = useContext(ScrollTriggerContext);
  if (!context) {
    throw new Error('useScrollTrigger must be used within a ScrollTriggerProvider');
  }
  return context;
};

export const ScrollTriggerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      gsap.registerPlugin(ScrollTrigger);
      setIsInitialized(true);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isInitialized]);

  const registerAnimation = (element: HTMLElement, animation: gsap.core.Tween | gsap.core.Timeline) => {
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom-=100',
      animation: animation,
      toggleActions: 'play none none none',
    });
  };

  return (
    <ScrollTriggerContext.Provider value={{ registerAnimation }}>
      {children}
    </ScrollTriggerContext.Provider>
  );
};