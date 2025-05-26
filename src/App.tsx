import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Testimonials from './components/sections/Testimonials';
import Team from './components/sections/Team';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ZapierChatBot from './components/ui/ZapierChatBot';
import { ScrollTriggerProvider } from './context/ScrollTriggerContext';

function App(): JSX.Element {
  return (
    <ScrollTriggerProvider>
      <div className="min-h-screen bg-white text-neutral-950">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Testimonials />
          <Team />
          <Contact />
        </main>
        <Footer />
        {/* WhatsApp Button - Left Side */}
        <div className="fixed bottom-6 left-6 z-50">
          <WhatsAppButton phoneNumber="916901598958" />
        </div>
        
        {/* Zapier Chatbot - Right Side */}
        <div className="fixed bottom-6 right-6 z-50">
          <ZapierChatBot />
        </div>
      </div>
    </ScrollTriggerProvider>
  );
}

export default App;