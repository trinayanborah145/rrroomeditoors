import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'zapier-interfaces-chatbot-embed': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'chatbot-id'?: string;
          'is-popup'?: string;
        },
        HTMLElement
      >;
    }
  }
}

const ZapierChatBot: React.FC = () => {
  useEffect(() => {
    // Load the Zapier script
    const script = document.createElement('script');
    script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
    script.async = true;
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      <div className="relative">
        <button
          className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none"
          aria-label="Chat with us"
          onClick={() => {
            const chatbot = document.querySelector('zapier-interfaces-chatbot-embed');
            if (chatbot) {
              chatbot.dispatchEvent(new Event('toggle'));
            }
          }}
        >
          <MessageCircle size={24} />
        </button>
      </div>
      <zapier-interfaces-chatbot-embed 
        is-popup="true" 
        chatbot-id="cmb504efg0008r4j1h88zkir0"
      />
    </div>
  );
};

export default ZapierChatBot;
