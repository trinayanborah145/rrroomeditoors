import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Send, Check } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const setRefs = useCallback(
    (el: HTMLFormElement | null) => {
      inViewRef(el);
      
      if (el && formRef.current !== el) {
        Object.defineProperty(formRef, 'current', {
          value: el,
          writable: true
        });
      }
    },
    [inViewRef]
  );

  useEffect(() => {
    if (inView && formRef.current) {
      const formElements = formRef.current.querySelectorAll('.form-element');
      
      gsap.fromTo(
        formElements,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: 'power3.out' 
        }
      );
    }
  }, [inView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} className="text-accent-500" />,
      title: 'Our Location',
      content: 'CCMP+CG7, Joy Mangla, Assam 781334',
      link: 'https://www.google.com/maps/place/Room+Editors/@26.4335413,91.4337202,17z/data=!3m1!4b1!4m6!3m5!1s0x375bcd189bbff6c9:0x4f07a1a5ae89cb86!8m2!3d26.4335413!4d91.4362951!16s%2Fg%2F11tsrcwpyv?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    {
      icon: <Phone size={24} className="text-accent-500" />,
      title: 'Phone Number',
      content: '69015 98958',
      link: 'tel:+916901598958',
    },
    {
      icon: <Mail size={24} className="text-accent-500" />,
      title: 'Email Address',
      content: 'roomeditors1@gmail.com',
      link: 'mailto:roomeditors1@gmail.com',
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Contact Us" 
            element="h2"
            className="section-title"
          />
          <AnimatedText 
            text="Ready to transform your space? Get in touch with our team to schedule a consultation or learn more about our services."
            element="p"
            className="section-subtitle"
            delay={0.3}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-primary-50 rounded-lg p-8">
              <h3 className="text-2xl font-medium mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      {item.link ? (
                        <a 
                          href={item.link}
                          target={item.target}
                          rel={item.rel}
                          className="text-neutral-600 hover:text-accent-500 transition-colors duration-300"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-neutral-600">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">Business Hours</h4>
                <p className="text-neutral-600 mb-1">Monday - Friday: 9am - 6pm</p>
                <p className="text-neutral-600">Saturday: 10am - 4pm (by appointment)</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-medium mb-6">Send Us a Message</h3>
              
              <form 
                ref={setRefs}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-element">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="form-element">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-element">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your phone"
                    />
                  </div>
                  
                  <div className="form-element">
                    <label htmlFor="service" className="form-label">Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select a service</option>
                      <option value="residential">Residential Design</option>
                      <option value="commercial">Commercial Spaces</option>
                      <option value="planning">Space Planning</option>
                      <option value="color">Color Consultation</option>
                      <option value="furniture">Custom Furniture</option>
                      <option value="consultation">Design Consultation</option>
                      <option value="tv-unit">TV Unit</option>
                      <option value="semi-modular">Semi Modular Design</option>
                      <option value="full-modular">Full Modular Design</option>
                      <option value="false-ceiling">False Ceiling</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-element">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <div className="form-element">
                  <button 
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`btn ${
                      isSubmitted ? 'bg-green-600 hover:bg-green-700' : 'btn-accent'
                    } w-full flex justify-center transition-all duration-300`}
                  >
                    {isSubmitting ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    ) : isSubmitted ? (
                      <>
                        <Check className="mr-2" size={20} /> Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;