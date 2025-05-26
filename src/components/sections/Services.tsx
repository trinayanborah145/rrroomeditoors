import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  HomeIcon, 
  Building2, 
  PencilRuler, 
  Palette, 
  Sofa, 
  Users,
  Tv,
  LayoutGrid,
  Grid3X3,
  Cloud
} from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';
import CountUp from '../ui/CountUp';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay, ease: 'power3.out' }
      );
    }
  }, [isVisible, delay]);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -10,
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };
  
  const handleMouseLeave = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      className="bg-white p-8 rounded-lg shadow-lg opacity-0 cursor-pointer transition-shadow duration-300 hover:shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={iconRef} className="text-accent-500 mb-6 service-icon">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
};

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, suffix = '', delay = 0 }) => {
  const statRef = useRef<HTMLDivElement>(null);
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

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && statRef.current) {
      gsap.fromTo(
        statRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay, ease: 'power3.out' }
      );
    }
  }, [isVisible, delay]);

  return (
    <div 
      ref={statRef}
      className="text-center opacity-0"
    >
      <h3 className="text-4xl font-serif font-medium text-accent-600 mb-2">
        <CountUp end={value} suffix={suffix} />
      </h3>
      <p className="text-neutral-600">{label}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: 'Residential Design',
      description: 'Transform your home into a personalized sanctuary that reflects your unique lifestyle and aesthetic preferences.',
      icon: <HomeIcon size={32} strokeWidth={1.5} />,
      delay: 0.1,
    },
    {
      title: 'Commercial Spaces',
      description: 'Create impactful commercial environments that enhance brand identity and improve functionality for your business.',
      icon: <Building2 size={32} strokeWidth={1.5} />,
      delay: 0.2,
    },
    {
      title: 'Space Planning',
      description: 'Optimize your space with thoughtful layouts that maximize functionality, flow, and visual harmony.',
      icon: <PencilRuler size={32} strokeWidth={1.5} />,
      delay: 0.3,
    },
    {
      title: 'TV Unit',
      description: 'Custom-designed TV units that combine style and functionality, perfectly tailored to your entertainment needs and space.',
      icon: <Tv size={32} strokeWidth={1.5} />,
      delay: 0.4,
    },
    {
      title: 'Semi Modular Design',
      description: 'Flexible semi-modular solutions that blend custom and prefabricated elements for efficient, adaptable, and cost-effective spaces.',
      icon: <LayoutGrid size={32} strokeWidth={1.5} />,
      delay: 0.5,
    },
    {
      title: 'Full Modular Design',
      description: 'Complete modular design systems offering maximum flexibility, efficiency, and contemporary aesthetics for your entire space.',
      icon: <Grid3X3 size={32} strokeWidth={1.5} />,
      delay: 0.6,
    },
    {
      title: 'False Ceiling',
      description: 'Elegant false ceiling designs that transform your space with improved acoustics, lighting integration, and architectural interest.',
      icon: <Cloud size={32} strokeWidth={1.5} />,
      delay: 0.7,
    },
    {
      title: 'Color Consultation',
      description: 'Discover the perfect color palette to set the mood, enhance architectural features, and create visual interest.',
      icon: <Palette size={32} strokeWidth={1.5} />,
      delay: 0.8,
    },
    {
      title: 'Custom Furniture',
      description: 'Commission bespoke furniture pieces tailored to your specific needs, preferences, and space requirements.',
      icon: <Sofa size={32} strokeWidth={1.5} />,
      delay: 0.9,
    },
    {
      title: 'Design Consultation',
      description: 'Get expert advice and actionable insights to elevate your space with our professional design consultation services.',
      icon: <Users size={32} strokeWidth={1.5} />,
      delay: 1.0,
    },
  ];

  const stats = [
    { value: 4, label: 'Years of Experience', delay: 0.2 },
    { value: 500, label: 'Projects Completed', suffix: '+', delay: 0.3 },
    { value: 48, label: 'Industry Recognization', delay: 0.4 },
    { value: 97, label: 'Satisfied Clients', suffix: '%', delay: 0.5 },
  ];

  return (
    <section id="services" className="section py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Our Services" 
            element="h2"
            className="section-title"
          />
          <AnimatedText 
            text="We offer a comprehensive range of interior design services tailored to meet your specific needs and bring your vision to life."
            element="p"
            className="section-subtitle"
            delay={0.3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={service.delay}
            />
          ))}
        </div>
        
        <div className="mt-24 py-16 bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem 
                key={index}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={stat.delay}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;