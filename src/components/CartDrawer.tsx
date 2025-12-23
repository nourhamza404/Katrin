import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  updateQuantity: (productId: string, quantity: number) => void;
  currentUser: any;
  onLoginRequired: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  currentUser,
  onLoginRequired,
}: CartDrawerProps) {
  const navigate = useNavigate();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-pink-600" />
                <h2 className="text-xl text-gray-900">Warenkorb</h2>
                <span className="text-sm text-gray-500">({cart.length})</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Ihr Warenkorb ist leer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-3 bg-pink-50 rounded-lg"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-gray-900 truncate mb-1">{item.name}</h3>
                        <p className="text-sm text-pink-600 mb-2">€{item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors text-sm"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors text-sm"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => updateQuantity(item.id, 0)}
                            className="p-1.5 hover:bg-red-100 rounded-full transition-colors group"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Zwischensumme</span>
                  <span className="text-2xl text-gray-900">€{subtotal.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-pink-600 text-white py-3 rounded-full hover:bg-pink-700 transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Zur Kasse</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Weiter einkaufen
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}