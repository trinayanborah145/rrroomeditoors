import React from 'react';
import Logo from './ui/Logo';
import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

// Custom WhatsApp icon component
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
    <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
    <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo className="text-white mb-6" />
            <p className="text-neutral-300 mb-6">
              Transforming spaces into sophisticated, functional environments that reflect your unique style and personality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a 
                href="https://wa.me/916901598958" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-300 hover:text-accent-400 transition-colors duration-300"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Team', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-neutral-300 hover:text-accent-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                'Residential Design', 
                'Commercial Spaces', 
                'Space Planning', 
                'Custom Furniture', 
                'Color Consultation',
                'TV Unit',
                'Semi Modular Design',
                'Full Modular Design',
                'False Ceiling'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#services"
                    className="text-neutral-300 hover:text-accent-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-accent-300" />
                <a 
                  href="https://www.google.com/maps/place/Room+Editors/@26.4335413,91.4337202,17z/data=!3m1!4b1!4m6!3m5!1s0x375bcd189bbff6c9:0x4f07a1a5ae89cb86!8m2!3d26.4335413!4d91.4362951!16s%2Fg%2F11tsrcwpyv?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-accent-300 transition-colors duration-300"
                >
                  CCMP+CG7, Joy Mangla, Assam 781334
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-accent-300" />
                <a 
                  href="tel:+916901598958" 
                  className="text-neutral-300 hover:text-accent-300 transition-colors duration-300"
                >
                  69015 98958
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-accent-300" />
                <a 
                  href="mailto:roomeditors1@gmail.com" 
                  className="text-neutral-300 hover:text-accent-300 transition-colors duration-300"
                >
                  roomeditors1@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary-800 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Room Editors. Designed by Tricone Digital Serivices. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;