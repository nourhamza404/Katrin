import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  updateQuantity: (productId: string, quantity: number) => void;
  currentUser: any;
  onLoginRequired: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  currentUser,
  onLoginRequired,
}: CartModalProps) {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl md:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-pink-600" />
            <h2 className="text-2xl text-gray-900">Warenkorb</h2>
            <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">Ihr Warenkorb ist leer</p>
              <p className="text-gray-500 mb-6">Fügen Sie Produkte hinzu, um fortzufahren</p>
              <button
                onClick={onClose}
                className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
              >
                Produkte entdecken
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-pink-50 rounded-2xl">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate">{item.name}</h3>
                    <p className="text-pink-600">€{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-gray-900">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Zwischensumme</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Versand</span>
                <span>{shipping === 0 ? 'Kostenlos' : `€${shipping.toFixed(2)}`}</span>
              </div>
              {subtotal < 50 && (
                <p className="text-xs text-gray-500">
                  Noch €{(50 - subtotal).toFixed(2)} bis zum kostenlosen Versand!
                </p>
              )}
              <div className="flex justify-between text-xl text-gray-900 pt-2 border-t">
                <span>Gesamt</span>
                <span className="text-pink-600">€{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-pink-600 text-white py-4 rounded-full hover:bg-pink-700 transition-colors text-lg"
            >
              {currentUser ? 'Zur Kasse' : 'Anmelden und zur Kasse'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}