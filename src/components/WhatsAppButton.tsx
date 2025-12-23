import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [showButton, setShowButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '4915732447133'; // WhatsApp Nummer (ohne +)
  const message = 'Hallo! Ich interessiere mich für Ihre Torten und Cookies 🎂';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Zeige Button wenn User mindestens 80% der Seite gescrollt hat
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
      setShowButton(scrollPercentage > 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showButton && (
        <>
          {/* WhatsApp Floating Button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Button Container */}
            <div className="relative">
              {/* Pulsing Ring Animation */}
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main Button */}
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all">
                {/* WhatsApp Icon */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-9 h-9 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>

                {/* Notification Badge */}
                <motion.div
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  1
                </motion.div>
              </div>
            </div>
          </motion.a>

          {/* Tooltip on Hover */}
          <motion.div
            className="fixed bottom-6 right-24 z-50 pointer-events-none"
            initial={{ opacity: 0, x: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-2xl border border-gray-100">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium">Katrin Sweets</p>
                  <p className="text-xs text-gray-500">Jetzt auf WhatsApp schreiben</p>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}