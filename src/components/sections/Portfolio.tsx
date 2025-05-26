import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { Play, Pause } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  videoUrl: string;
}

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Create a ref that we can use for animations
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Combine the refs using a callback ref
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      // Call the inViewRef function
      inViewRef(node);
      
      // Store a reference for our animations without directly assigning to .current
      if (node && projectsRef.current !== node) {
        // Use a different approach that doesn't directly assign to .current
        // This is a workaround for the TypeScript readonly property error
        Object.defineProperty(projectsRef, 'current', {
          value: node,
          writable: true
        });
      }
    },
    [inViewRef]
  );

  const projects: Project[] = [
    {
      id: 1,
      title: 'Modern Full Modular Kitchen Design in Guwahati',
      category: 'residential',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: '/videos/Modular Kitchen.mp4',
    },
    {
      id: 2,
      title: 'Full House Interior Design in Goalpara',
      category: 'residential',
      image: 'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: '/videos/RESIDENTIAL.mp4',
    },
    {
      id: 3,
      title: 'Modern Flat Design in Guwahati',
      category: 'residential',
      image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: '/videos/amar notun ghor.mp4',
    },
    {
      id: 4,
      title: 'Super Mart Interior in Bongaigaon',
      category: 'commercial',
      image: 'https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: '/videos/bongaigaon.mp4',
    },
    {
      id: 5,
      title: 'Luxury GYM Interior Design in Guwahati',
      category: 'commercial',
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: '/videos/GYM.mp4',
    },
    {
      id: 6,
      title: 'Principal Cabin Interior Design in Goalpara',
      category: 'commercial',
      image: 'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: '/videos/KINGKOR.mp4',
    },
    {
      id: 7,
      title: 'Modern Bedroom Design in Guwahati',
      category: 'residential',
      image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: '/videos/dbre.mp4',
    },
    {
      id: 8,
      title: 'Luxury Bedroom Makeover in Guwahati',
      category: 'residential',
      image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: '/videos/notunbb.mp4',
    },
  ];

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    if (inView && projectsRef.current) {
      const projectElements = projectsRef.current.querySelectorAll('.project-item');
      
      gsap.fromTo(
        projectElements,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: 'power3.out' 
        }
      );
    }
  }, [inView, filteredProjects]);

  const openVideoModal = (projectId: number) => {
    setActiveVideo(projectId);
    setIsModalOpen(true);
    // Auto-play the video when modal opens
    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }
    }, 100);
  };
  
  const closeModal = () => {
    // Pause the video when closing modal
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsModalOpen(false);
    // Reset activeVideo after transition
    setTimeout(() => {
      setActiveVideo(null);
    }, 300);
  };
  
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  
  // Handle video play state
  const handlePlay = () => {
    setIsPlaying(true);
    setShowPlayButton(false);
    // Hide play button after a short delay
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowPlayButton(false);
    }, 2000);
  };
  
  const handlePause = () => {
    setIsPlaying(false);
    setShowPlayButton(true);
  };
  
  // Reset states when modal closes
  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setIsPlaying(false);
      setShowPlayButton(true);
    };
  }, [isModalOpen]);
  
  // Toggle play/pause when clicking the video
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
      setShowPlayButton(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPlayButton(true);
    }
  };

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Our Portfolio" 
            element="h2"
            className="section-title"
          />
          <AnimatedText 
            text="Explore our diverse collection of interior design projects, showcasing our expertise in creating beautiful, functional spaces."
            element="p"
            className="section-subtitle"
            delay={0.3}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div 
          ref={setRefs}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-item opacity-0">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-500 hover:-translate-y-2">
                <div className="relative aspect-[4/3]">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => openVideoModal(project.id)}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-accent-500 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>



                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <p className="text-sm text-neutral-500 capitalize">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        {/* Video Modal - YouTube Shorts style */}
      {isModalOpen && activeVideo !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300"
          onMouseMove={() => setShowPlayButton(true)}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black bg-opacity-60 flex items-center justify-center hover:bg-opacity-80 transition-all duration-200"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video container - YouTube Shorts style */}
            <div className="w-full h-full md:w-auto md:h-auto md:max-h-[90vh] flex items-center justify-center">
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <div 
                  className="relative w-full h-full flex items-center justify-center"
                  style={{ maxWidth: '400px', maxHeight: '90vh' }}
                >
                  <video
                    ref={videoRef}
                    src={projects.find(p => p.id === activeVideo)?.videoUrl}
                    className="w-full h-full object-contain brightness-110 contrast-110"
                    autoPlay
                    playsInline
                    loop
                    disablePictureInPicture
                    disableRemotePlayback
                    onClick={togglePlayPause}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    style={{
                      backgroundColor: '#000',
                      maxHeight: '100%',
                      maxWidth: '100%',
                      cursor: 'pointer',
                      filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
                    }}
                  />
                  
                  {/* Custom play/pause button */}
                  {(showPlayButton || !isPlaying) && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300"
                      onClick={togglePlayPause}
                      onMouseEnter={() => setShowPlayButton(true)}
                      onMouseLeave={() => isPlaying && setShowPlayButton(false)}
                    >
                      <div className={`w-20 h-20 rounded-full bg-black bg-opacity-60 flex items-center justify-center transition-all duration-300 ${showPlayButton ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        {!isPlaying ? (
                          <Play className="w-10 h-10 text-white ml-1" />
                        ) : (
                          <Pause className="w-10 h-10 text-white" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;