import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial; delay?: number }> = ({ testimonial, delay = 0 }) => {
  // Use a simpler approach with just the useInView hook
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  // Use a separate ref for the element we want to animate
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run the animation when the element is in view
    if (inView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95,
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay,
          ease: 'power3.out',
        }
      );
    }
  }, [inView, delay]);

  // Create a callback ref that works with both refs
  const setRefs = (element: HTMLDivElement | null) => {
    // Set the inView ref
    ref(element);
    
    // We can't directly modify cardRef.current, so we use this approach instead
    if (element && cardRef) {
      // Store the element in a way that doesn't trigger the TypeScript error
      Object.defineProperty(cardRef, 'current', {
        value: element,
        writable: true
      });
    }
  };

  return (
    <div 
      ref={setRefs}
      className="bg-white rounded-lg p-8 shadow-lg opacity-0 relative"
    >
      <Quote className="absolute top-6 right-6 text-neutral-200" size={48} />
      
      <div className="flex items-center mb-6">
        <img 
          src={testimonial.image} 
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-lg">{testimonial.name}</h4>
          <p className="text-neutral-600 text-sm">{testimonial.role}</p>
          <p className="text-neutral-500 text-sm">{testimonial.company}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className="text-accent-400 fill-current"
          />
        ))}
      </div>
      
      <p className="text-neutral-700 leading-relaxed relative z-10">
        "{testimonial.quote}"
      </p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Shreya Agarwal",
      role: "Homeowner",
      company: "Residential Client",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "Room Editors transformed our house into a dream home. Their attention to detail and understanding of our style was exceptional. The team was professional, creative, and a joy to work with.",
      rating: 5,
    },
    {
      id: 2,
      name: "Gautam Borah",
      role: "CEO",
      company: "Tech Innovations Inc.",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "The redesign of our office space by Room Editors has significantly improved employee satisfaction and productivity. Their innovative approach to commercial design is unmatched.",
      rating: 5,
    },
    {
      id: 3,
      name: "Preeya Bhowmick",
      role: "Restaurant Owner",
      company: "Bistro Verde",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "Our restaurant's ambiance has received countless compliments since Room Editors redesigned the space. They perfectly captured our vision while adding their own creative touches.",
      rating: 5,
    },
  ];

  return (
    <section className="section bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Client Testimonials" 
            element="h2"
            className="section-title"
          />
          <AnimatedText 
            text="Hear what our clients have to say about their experience working with Room Editors."
            element="p"
            className="section-subtitle"
            delay={0.3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;