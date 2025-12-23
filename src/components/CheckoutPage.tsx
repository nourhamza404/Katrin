import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MapPin, CreditCard, Check, ArrowLeft, Loader2, UserPlus, User } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

interface CheckoutPageProps {
  currentUser: any;
  cart: CartItem[];
  onClearCart: () => void;
  onOpenAuthModal?: (mode: 'login' | 'register') => void;
}

export default function CheckoutPage({ currentUser, cart, onClearCart, onOpenAuthModal }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [submittedOrderData, setSubmittedOrderData] = useState<any>(null);
  const [checkoutMode, setCheckoutMode] = useState<'selection' | 'guest' | 'registered'>('selection');

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    zipCode: '',
    city: '',
    notes: '',
    deliveryDate: '',
    deliveryTime: '',
    deliveryMethod: 'delivery' as 'delivery' | 'pickup',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'paypal'>('cash');

  useEffect(() => {
    // Skip this check if order was already submitted
    if (isOrderSubmitted) return;
    
    if (cart.length === 0) {
      toast.error('Ihr Warenkorb ist leer');
      navigate('/produkte');
    }

    // Pre-fill user data if logged in
    if (currentUser) {
      setCheckoutMode('registered');
      setDeliveryInfo(prev => ({
        ...prev,
        email: currentUser.email || '',
      }));
    } else {
      setCheckoutMode('selection');
    }
  }, [cart, navigate, currentUser, isOrderSubmitted]);

  // Clear address fields when switching to pickup
  useEffect(() => {
    if (deliveryInfo.deliveryMethod === 'pickup') {
      setDeliveryInfo(prev => ({
        ...prev,
        street: '',
        houseNumber: '',
        zipCode: '',
        city: '',
      }));
    }
  }, [deliveryInfo.deliveryMethod]);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        id: `order_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        user_email: currentUser?.email || deliveryInfo.email,
        user_id: currentUser?.id || null,
        status: 'pending_review',
        items: cart,
        delivery_info: deliveryInfo,
        payment_method: 'to_be_determined', // Zahlung wird später besprochen
        total: calculateTotal(),
        created_at: new Date().toISOString(),
      };

      console.log('Submitting order:', orderData);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Order creation failed:', errorData);
        throw new Error(errorData.error || 'Failed to create order');
      }

      const result = await response.json();
      console.log('Order created successfully:', result);

      // Send order confirmation email
      try {
        const emailData = {
          customerName: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
          customerEmail: deliveryInfo.email,
          orderId: orderData.id,
          orderDate: new Date().toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total: calculateTotal(),
          deliveryInfo: {
            name: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
            email: deliveryInfo.email,
            address: deliveryInfo.deliveryMethod === 'delivery' ? `${deliveryInfo.street} ${deliveryInfo.houseNumber}` : 'Abholung',
            city: deliveryInfo.deliveryMethod === 'delivery' ? deliveryInfo.city : '',
            postal_code: deliveryInfo.deliveryMethod === 'delivery' ? deliveryInfo.zipCode : '',
            phone: deliveryInfo.phone,
            delivery_date: deliveryInfo.deliveryDate,
            delivery_time: deliveryInfo.deliveryTime,
            delivery_method: deliveryInfo.deliveryMethod,
            notes: deliveryInfo.notes,
          },
          paymentMethod: 'to_be_determined',
        };

        console.log('📧 Sending order email to:', deliveryInfo.email);
        const emailResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/send-order-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (emailResponse.ok) {
          console.log('✅ Order confirmation email sent successfully');
        } else {
          const errorData = await emailResponse.json();
          console.warn('⚠️ Email sending failed (non-critical):', errorData);
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the order if email fails
      }

      toast.success('Bestellung erfolgreich aufgegeben!');
      setSubmittedOrderData({
        orderId: orderData.id,
        customerName: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
        email: deliveryInfo.email,
        total: calculateTotal(),
        items: cart,
        isGuest: !currentUser, // Track if this is a guest order
      });
      setIsOrderSubmitted(true);
      // Clear cart after successful submission
      onClearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Fehler beim Aufgeben der Bestellung');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal();

  // Show guest/register selection if not logged in
  if (checkoutMode === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück zum Warenkorb
            </button>
            <h1 className="text-gray-900 mb-3">Fast geschafft!</h1>
            <p className="text-lg text-gray-600">
              Wie möchten Sie Ihre Bestellung fortsetzen?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Guest Checkout Option */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-pink-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl text-gray-900 mb-3">Als Gast fortfahren</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bestellen Sie schnell und unkompliziert ohne Registrierung. 
                Sie erhalten eine Bestätigung per E-Mail.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">Schneller Checkout-Prozess</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">Keine Registrierung erforderlich</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">E-Mail-Bestätigung</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-yellow-600">⚠</span>
                  </div>
                  <span className="text-sm text-gray-500">Kein Zugriff auf Bestellhistorie</span>
                </li>
              </ul>

              <button
                onClick={() => setCheckoutMode('guest')}
                className="w-full px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Als Gast fortfahren
              </button>
            </motion.div>

            {/* Register/Login Option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-pink-200 relative overflow-hidden"
            >
              {/* Recommended Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg">
                Empfohlen
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl text-gray-900 mb-3">Registrieren oder Anmelden</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Erstellen Sie ein Konto für ein persönliches Erlebnis mit vielen Vorteilen.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-pink-600" />
                  </div>
                  <span className="text-sm text-gray-800 font-medium">Vollständige Bestellhistorie</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-pink-600" />
                  </div>
                  <span className="text-sm text-gray-800 font-medium">Status-Tracking in Echtzeit</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-pink-600" />
                  </div>
                  <span className="text-sm text-gray-800 font-medium">Gespeicherte Adressen</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-pink-600" />
                  </div>
                  <span className="text-sm text-gray-800 font-medium">Schnellere zukünftige Bestellungen</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-pink-600" />
                  </div>
                  <span className="text-sm text-gray-800 font-medium">Exklusive Angebote & Neuigkeiten</span>
                </li>
              </ul>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (onOpenAuthModal) {
                      onOpenAuthModal('register');
                    } else {
                      navigate('/profile');
                    }
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Jetzt registrieren
                </button>

                <button
                  onClick={() => {
                    if (onOpenAuthModal) {
                      onOpenAuthModal('login');
                    } else {
                      navigate('/profile');
                    }
                  }}
                  className="w-full px-6 py-4 bg-white text-pink-600 border-2 border-pink-300 rounded-xl font-medium hover:bg-pink-50 transition-all"
                >
                  Bereits registriert? Anmelden
                </button>
              </div>
            </motion.div>
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center"
          >
            <p className="text-sm text-blue-900">
              🔒 <strong>Ihre Daten sind sicher:</strong> Wir verwenden modernste Verschlüsselung 
              und geben Ihre Daten niemals an Dritte weiter.
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Show success page if order was submitted
  if (isOrderSubmitted && submittedOrderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto"
          >
            <Check className="w-14 h-14 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl text-gray-900 mb-4">Vielen Dank!</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ihre Anfrage wurde erfolgreich übermittelt. 
              Wir melden uns innerhalb von 24 Stunden bei Ihnen zur Bestätigung.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border border-pink-200"
          >
            <p className="text-sm text-gray-700 mb-2">
              Bestellnummer:
            </p>
            <p className="text-lg text-pink-600 font-mono">{submittedOrderData.orderId}</p>
            
            <div className="mt-4 pt-4 border-t border-pink-200">
              <p className="text-sm text-gray-700 mb-2">
                Bestätigungs-E-Mail gesendet an:
              </p>
              <p className="text-md text-gray-900">{submittedOrderData.email}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <p className="text-sm text-blue-900">
              📋 <strong>Nächste Schritte:</strong><br/>
              1. Wir prüfen Ihre Bestellung<br/>
              2. Sie erhalten ein Angebot per E-Mail<br/>
              3. Nach Ihrer Bestätigung beginnen wir mit der Zubereitung
            </p>
          </motion.div>

          <div className="space-y-3">
            {/* Show Customer Portal button only for registered users */}
            {!submittedOrderData.isGuest && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => navigate('/profile')}
                className="w-full px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-full hover:from-pink-700 hover:to-pink-600 transition-all hover:scale-105"
              >
                Zum Kundenportal
              </motion.button>
            )}

            {/* Show registration suggestion for guest users */}
            {submittedOrderData.isGuest && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-6"
              >
                <p className="text-sm text-gray-800 mb-4">
                  💡 <strong>Tipp:</strong> Erstellen Sie ein Konto, um Ihre Bestellungen zu verfolgen und von vielen Vorteilen zu profitieren!
                </p>
                <button
                  onClick={() => {
                    if (onOpenAuthModal) {
                      onOpenAuthModal('register');
                    } else {
                      navigate('/profile');
                    }
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Jetzt registrieren
                </button>
              </motion.div>
            )}

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={() => navigate('/produkte')}
              className="w-full px-8 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
            >
              Weiter einkaufen
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>
          <h1 className="text-gray-900 mb-2">Zur Kasse</h1>
          <p className="text-gray-600">Vervollständigen Sie Ihre Bestellung</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-gray-900">Ihre Anfrage</h2>
              </div>

              <form onSubmit={handleDeliverySubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.firstName}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryInfo.lastName}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="Mustermann"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={deliveryInfo.email}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="max@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="+49 123 456789"
                    />
                  </div>
                </div>

                {/* Address Fields - Only show for delivery */}
                {deliveryInfo.deliveryMethod === 'delivery' && (
                  <>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 mb-2">
                          Straße *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.street}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, street: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="Musterstraße"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Hausnr. *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.houseNumber}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, houseNumber: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          PLZ *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.zipCode}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zipCode: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="12345"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Stadt *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.city}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="Berlin"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Delivery Method Selection */}
                <div>
                  <label className="block text-sm text-gray-700 mb-3">
                    Lieferart *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      deliveryInfo.deliveryMethod === 'delivery'
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          value="delivery"
                          checked={deliveryInfo.deliveryMethod === 'delivery'}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryMethod: 'delivery' })}
                          className="mt-1 w-5 h-5 text-pink-500 focus:ring-pink-500"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">🚚 Lieferung</p>
                          <p className="text-sm text-gray-600 mt-1">Wir liefern zu Ihrer angegebenen Adresse</p>
                        </div>
                      </div>
                    </label>

                    <label className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      deliveryInfo.deliveryMethod === 'pickup'
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          value="pickup"
                          checked={deliveryInfo.deliveryMethod === 'pickup'}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryMethod: 'pickup' })}
                          className="mt-1 w-5 h-5 text-pink-500 focus:ring-pink-500"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">🏪 Abholung</p>
                          <p className="text-sm text-gray-600 mt-1">Sie holen Ihre Bestellung bei uns ab</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  {deliveryInfo.deliveryMethod === 'pickup' && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-sm text-green-800">
                        ✅ Bei Abholung ist keine Lieferadresse erforderlich. Die Adressfelder wurden deaktiviert.
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Date & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      {deliveryInfo.deliveryMethod === 'delivery' ? 'Wunsch-Lieferdatum' : 'Wunsch-Abholdatum'} (optional)
                    </label>
                    <input
                      type="date"
                      value={deliveryInfo.deliveryDate}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Wunsch-Uhrzeit (optional)
                    </label>
                    <input
                      type="time"
                      value={deliveryInfo.deliveryTime}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryTime: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Anmerkungen (optional)
                  </label>
                  <textarea
                    value={deliveryInfo.notes}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Besondere Wünsche oder Hinweise..."
                  />
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    ℹ️ <strong>Hinweis:</strong> Nach dem Absenden der Anfrage prüfen wir Ihre Bestellung und melden uns bei Ihnen zur Bestätigung. Die Zahlung erfolgt erst nach Ihrer Bestätigung.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Anfrage wird gesendet...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Anfrage senden
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="w-6 h-6 text-pink-500" />
                <h3 className="text-gray-900 font-medium">Bestellübersicht</h3>
              </div>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      <p className="text-sm text-gray-600">Menge: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Zwischensumme</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Lieferung</span>
                  <span className="text-green-600">Kostenlos</span>
                </div>
                <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-200">
                  <span>Gesamt</span>
                  <span className="text-pink-500">{total.toFixed(2)} €</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-pink-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  🎂 Ihre Bestellung wird frisch für Sie zubereitet!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}