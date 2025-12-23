import { useState } from 'react';
import { X, ShoppingCart, Star, Heart, Share2, Clock, Package, ChefHat } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface ProductQuickViewProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  addToCart: (product: any, quantity: number) => void;
}

export default function ProductQuickView({ 
  product, 
  isOpen, 
  onClose, 
  addToCart 
}: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('standard');
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setQuantity(1);
      onClose();
    }, 1200);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  const sizes = product.category === 'cakes' 
    ? [
        { id: 'small', label: 'Klein (6 Stück)', priceMultiplier: 0.7 },
        { id: 'standard', label: 'Standard (8 Stück)', priceMultiplier: 1 },
        { id: 'large', label: 'Groß (12 Stück)', priceMultiplier: 1.4 }
      ]
    : [
        { id: 'standard', label: '12 Stück', priceMultiplier: 1 },
        { id: 'large', label: '24 Stück', priceMultiplier: 1.8 }
      ];

  const currentPrice = product.price * (sizes.find(s => s.id === selectedSize)?.priceMultiplier || 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header Buttons */}
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div 
                className="relative h-80 md:h-auto overflow-hidden cursor-zoom-in bg-gradient-to-br from-pink-50 to-purple-50"
                onMouseEnter={() => setIsImageZoomed(true)}
                onMouseLeave={() => setIsImageZoomed(false)}
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${isImageZoomed ? 'scale-110' : 'scale-100'}`}
                />
                {product.popular && (
                  <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2 rounded-full shadow-lg flex items-center space-x-1"
                  >
                    <Star className="w-4 h-4 fill-current" />
                    <span>Beliebt</span>
                  </motion.div>
                )}
                
                {/* New Badge for new products */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg">
                    ✨ Neu
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col max-h-[90vh] md:max-h-[600px]">
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {product.category === 'cakes' ? '🎂 Torte' : '🍪 Cookie'}
                      </p>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">(4.9)</span>
                      </div>
                    </div>
                    <h2 className="text-3xl text-gray-900 mb-3">{product.name}</h2>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm text-gray-700 mb-3">Größe wählen</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size.id)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            selectedSize === size.id
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="text-sm">{size.label}</div>
                          {size.id !== 'standard' && (
                            <div className="text-xs text-gray-500 mt-1">
                              €{(product.price * size.priceMultiplier).toFixed(2)}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4">
                      <div className="flex items-start space-x-3">
                        <ChefHat className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm text-gray-900 mb-1">Produktdetails</h3>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>✓ Handgemacht mit Liebe</li>
                            <li>✓ Premium Zutaten</li>
                            <li>✓ Frisch gebacken</li>
                            <li>✓ {product.category === 'cakes' ? 'Servierfertig verpackt' : '12 Stück pro Packung'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-4">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm text-gray-900 mb-1">Lieferzeit</h3>
                          <p className="text-sm text-gray-600">
                            Bestellung bis 14 Uhr: Lieferung am nächsten Tag<br />
                            <span className="text-xs">Wochenende: Lieferung Montag</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-2xl p-4">
                      <div className="flex items-start space-x-3">
                        <Package className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm text-gray-900 mb-1">Allergene</h3>
                          <p className="text-xs text-gray-600">
                            Enthält: Weizen, Eier, Milch. Kann Spuren von Nüssen enthalten.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions - Fixed at bottom */}
                <div className="border-t bg-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl text-pink-600">€{currentPrice.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">inkl. MwSt.</div>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-2 py-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={showSuccess}
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-4 rounded-full hover:from-pink-700 hover:to-pink-800 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 relative overflow-hidden group"
                  >
                    <AnimatePresence mode="wait">
                      {showSuccess ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            ✓
                          </motion.div>
                          <span>Hinzugefügt!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ y: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span>In den Warenkorb · {quantity}x</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}