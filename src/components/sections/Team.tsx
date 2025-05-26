import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  social: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}

interface TeamCardProps {
  member: TeamMember;
  delay?: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, delay = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && cardRef.current && borderRef.current) {
      // Animate card
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay, 
          ease: 'power3.out' 
        }
      );
      
      // Animate border
      gsap.fromTo(
        borderRef.current,
        { rotation: 0 },
        { 
          rotation: 360, 
          duration: 20, 
          repeat: -1, 
          ease: 'linear' 
        }
      );
    }
  }, [inView, delay]);

  // Create a callback ref that sets both refs safely
  const setRefs = React.useCallback(
    (el: HTMLDivElement | null) => {
      // Call the inView ref function
      ref(el);
      
      // Store a reference for our animations without directly assigning to .current
      if (el && cardRef.current !== el) {
        // Use a different approach that doesn't directly assign to .current
        // This is a workaround for the TypeScript readonly property error
        Object.defineProperty(cardRef, 'current', {
          value: el,
          writable: true
        });
      }
    },
    [ref]
  );

  return (
    <div 
      ref={setRefs}
      className="text-center opacity-0"
    >
      <div className="relative inline-block mb-6 group">
        {/* Rotating border */}
        <div 
          ref={borderRef}
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-400 via-accent-400 to-primary-600 opacity-70 blur-sm"
        ></div>
        
        {/* Image container */}
        <div className="relative aspect-square w-48 h-48 mx-auto rounded-full overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        {/* Social icons */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary-900/60 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex space-x-3">
            {member.social.instagram && (
              <a 
                href={member.social.instagram} 
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-primary-700 hover:text-accent-500 transition-colors duration-300"
                aria-label={`${member.name}'s Instagram`}
              >
                <Instagram size={18} />
              </a>
            )}
            {member.social.linkedin && (
              <a 
                href={member.social.linkedin} 
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-primary-700 hover:text-accent-500 transition-colors duration-300"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <Linkedin size={18} />
              </a>
            )}
            {member.social.email && (
              <a 
                href={`mailto:${member.social.email}`} 
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-primary-700 hover:text-accent-500 transition-colors duration-300"
                aria-label={`Email ${member.name}`}
              >
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-medium mb-1">{member.name}</h3>
      <p className="text-neutral-600">{member.role}</p>
    </div>
  );
};

const Team: React.FC = () => {
  const team: TeamMember[] = [
    {
      id: 1,
      name: 'Dimpu Baruah',
      role: 'Famous youtuber & Founder',
      image: '/images/355824205_6897002563661028_6111239871015360266_n.jpg',
      social: {
        instagram: 'https://www.instagram.com/diiimpu/?hl=en',
        
        email: 'dimpubaruah77@gmail.com',
      },
    },
    {
      id: 2,
      name: 'Kingkar Choudhury',
      role: 'Founder & Managing Director',
      image: '/images/470171225_1087660569807250_3287768468292283575_n (1).jpg',
      social: {
        instagram: 'https://www.instagram.com/kingkarchoudhury/?hl=en',

        email: 'nnnnnnnn@gmail.com',
      },
    },
  ];

  return (
    <section id="team" className="section bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Meet Our Team" 
            element="h2"
            className="section-title"
          />
          <AnimatedText 
            text="Our talented team of design professionals brings years of experience and passion to every project."
            element="p"
            className="section-subtitle"
            delay={0.3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <TeamCard 
              key={member.id}
              member={member}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;