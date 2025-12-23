import { useState } from 'react';
import { Calendar, MapPin, Info, CheckCircle2, Cake, Palette, Users, Sparkles, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface CustomOrderPageProps {
  currentUser: any;
}

export default function CustomOrderPage({ currentUser }: CustomOrderPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cakeType: '',
    size: '',
    flavor: '',
    filling: '',
    deliveryDate: '',
    colors: [] as string[],
    decoration: '',
    allergies: '',
    specialWishes: '',
    deliveryMethod: 'delivery',
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    layers: '',
    occasion: '',
    designDescription: '',
    referenceImages: [] as string[],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Starting custom order submission...');
    console.log('📋 Current form data:', formData);
    console.log('👤 Current user:', currentUser);
    console.log('✅ Step validation:', {
      step1: formData.cakeType && formData.size && formData.flavor && formData.filling,
      step2: true,
      step3: formData.deliveryDate && (formData.deliveryMethod === 'pickup' || formData.address),
      step4: formData.name && formData.email && formData.phone,
    });
    
    setIsLoading(true);
    
    try {
      // Prepare order data
      const orderData = {
        id: `custom_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        type: 'custom',
        user_email: currentUser?.email || formData.email,
        user_id: currentUser?.id || null,
        cake_type: formData.cakeType,
        flavor: formData.flavor,
        size: formData.size,
        layers: formData.layers,
        filling: formData.filling,
        occasion: formData.occasion || null,
        design_description: formData.designDescription || null,
        reference_images: formData.referenceImages,
        colors: formData.colors.join(', '),
        decoration: formData.decoration || null,
        allergies: formData.allergies || null,
        special_wishes: formData.specialWishes || null,
        delivery_method: formData.deliveryMethod,
        delivery_date: formData.deliveryDate,
        delivery_address: formData.deliveryMethod === 'delivery' ? formData.address : null,
        contact_name: formData.name,
        contact_email: formData.email,
        contact_phone: formData.phone,
        status: 'pending_review',
        created_at: new Date().toISOString(),
      };

      console.log('📦 Order data prepared:', JSON.stringify(orderData, null, 2));
      
      // Send to unified orders endpoint
      const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/orders`;
      console.log('📡 Sending POST request to:', serverUrl);
      console.log('🔑 Using API key:', publicAnonKey ? '✅ Present' : '❌ Missing');
      
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(orderData),
      });

      console.log('📨 Server response status:', response.status);
      console.log('📨 Server response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Server error response:', errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Custom order created successfully:', data);
      
      // Send custom order confirmation email
      try {
        console.log('📧 Sending confirmation email...');
        const emailData = {
          customerName: formData.name,
          orderId: orderData.id,
          orderDate: new Date().toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          orderType: formData.cakeType,
          customDetails: {
            flavor: formData.flavor,
            size: formData.size,
            layers: formData.layers,
            filling: formData.filling,
            occasion: formData.occasion,
            design_description: formData.designDescription,
            special_requests: formData.specialWishes,
          },
          deliveryInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            delivery_date: formData.deliveryDate,
          },
        };

        const emailResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/send-custom-order-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (emailResponse.ok) {
          console.log('✅ Email sent successfully');
        } else {
          console.warn('⚠️ Email sending failed (non-critical)');
        }
      } catch (emailError) {
        console.error('⚠️ Error sending custom order email:', emailError);
        // Don't fail the order if email fails
      }
      
      console.log('🎉 Setting success state...');
      setIsSubmitted(true);
      toast.success('Anfrage erfolgreich gesendet! 🎉');
    } catch (error: any) {
      console.error('❌ ERROR in custom order submission:', error);
      console.error('❌ Error details:', error.message);
      toast.error(`Fehler: ${error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'}`);
    } finally {
      setIsLoading(false);
      console.log('🏁 Submission process completed');
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { number: 1, title: 'Produkt', icon: Cake },
    { number: 2, title: 'Design', icon: Palette },
    { number: 3, title: 'Lieferung', icon: MapPin },
    { number: 4, title: 'Kontakt', icon: Users },
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.cakeType && formData.size && formData.flavor && formData.filling;
      case 2:
        return true; // Optional fields
      case 3:
        return formData.deliveryDate && (formData.deliveryMethod === 'pickup' || formData.address);
      case 4:
        return formData.name && formData.email && formData.phone;
      default:
        return false;
    }
  };

  if (isSubmitted) {
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
            <CheckCircle2 className="w-14 h-14 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl text-gray-900 mb-4">Vielen Dank!</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ihre individuelle Anfrage wurde erfolgreich übermittelt. 
              Wir melden uns innerhalb von 24 Stunden bei Ihnen mit einem 
              persönlichen Angebot.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border border-pink-200"
          >
            <p className="text-sm text-gray-700 mb-2">
              Bestätigungs-E-Mail gesendet an:
            </p>
            <p className="text-lg text-pink-600">{formData.email}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <p className="text-sm text-blue-900">
              📋 <strong>Nächste Schritte:</strong><br/>
              1. Wir prüfen Ihre Anfrage im Detail<br/>
              2. Sie erhalten ein individuelles Angebot per E-Mail<br/>
              3. Nach Ihrer Bestätigung beginnen wir mit der Herstellung
            </p>
          </motion.div>

          <div className="space-y-3">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => window.location.href = '/profile'}
              className="w-full px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-full hover:from-pink-700 hover:to-pink-600 transition-all hover:scale-105"
            >
              Zum Kundenportal
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  cakeType: '',
                  size: '',
                  flavor: '',
                  filling: '',
                  deliveryDate: '',
                  colors: [],
                  decoration: '',
                  allergies: '',
                  specialWishes: '',
                  deliveryMethod: 'delivery',
                  name: currentUser?.name || '',
                  email: currentUser?.email || '',
                  phone: '',
                  address: '',
                  layers: '',
                  occasion: '',
                  designDescription: '',
                  referenceImages: [],
                });
              }}
              className="w-full px-8 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
            >
              Neue Anfrage erstellen
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-2 rounded-full text-sm mb-6"
          >
            ✨ Individuelle Bestellung
          </motion.div>
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Gestalten Sie Ihre Traumtorte
          </h1>
          <p className="text-xl text-gray-600">
            In nur 4 Schritten zu Ihrer perfekten individuellen Kreation
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-br from-pink-600 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                  <p className={`text-xs md:text-sm mt-2 font-medium transition-colors ${
                    currentStep >= step.number ? 'text-pink-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="absolute top-6 md:top-8 left-1/2 w-full h-0.5 -z-10">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: currentStep > step.number ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-pink-600 to-pink-500 origin-left"
                    />
                    <div className={`h-full ${currentStep > step.number ? 'bg-transparent' : 'bg-gray-200'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-5 mb-8 flex items-start space-x-3 max-w-3xl mx-auto"
        >
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="leading-relaxed">
              Bitte füllen Sie das Formular so detailliert wie möglich aus. 
              Nach Prüfung Ihrer Anfrage erhalten Sie ein individuelles Angebot 
              von uns. Die Bestellung wird erst nach Ihrer Bestätigung verbindlich.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-8"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Produkt Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-500 rounded-full flex items-center justify-center">
                      <Cake className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">Produkt Details</h2>
                      <p className="text-sm text-gray-500">Wählen Sie die Basis Ihrer Kreation</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Art des Kuchens" required>
                      <select
                        name="cakeType"
                        value={formData.cakeType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="torte">🎂 Torte</option>
                        <option value="cupcakes">🧁 Cupcakes</option>
                        <option value="cookies">🍪 Cookies</option>
                        <option value="cake-pops">🍭 Cake Pops</option>
                        <option value="sonstiges">✨ Sonstiges</option>
                      </select>
                    </FormField>

                    <FormField label="Größe / Portionen" required>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="small">Klein (8-10 Personen)</option>
                        <option value="medium">Mittel (12-15 Personen)</option>
                        <option value="large">Groß (20-25 Personen)</option>
                        <option value="xlarge">Extra Groß (30+ Personen)</option>
                        <option value="custom">Individuelle Größe</option>
                      </select>
                    </FormField>

                    <FormField label="Geschmack (Teig)" required>
                      <select
                        name="flavor"
                        value={formData.flavor}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="vanilla">Vanille</option>
                        <option value="chocolate">Schokolade</option>
                        <option value="red-velvet">Red Velvet</option>
                        <option value="lemon">Zitrone</option>
                        <option value="carrot">Karottenkuchen</option>
                        <option value="coffee">Kaffee</option>
                        <option value="custom">Anderer Geschmack</option>
                      </select>
                    </FormField>

                    <FormField label="Füllung / Creme" required>
                      <select
                        name="filling"
                        value={formData.filling}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="buttercream">Buttercreme</option>
                        <option value="cream-cheese">Frischkäsecreme</option>
                        <option value="chocolate-ganache">Schokoladen Ganache</option>
                        <option value="fruit">Fruchtfüllung</option>
                        <option value="caramel">Karamell</option>
                        <option value="custom">Andere Füllung</option>
                      </select>
                    </FormField>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Design */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-500 rounded-full flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">Design & Dekoration</h2>
                      <p className="text-sm text-gray-500">Verleihen Sie Ihrer Kreation Persönlichkeit</p>
                    </div>
                  </div>

                  <FormField label="Farben auswählen" helpText="Wählen Sie eine oder mehrere Farben">
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {[
                        { name: 'Rosa', color: '#FFC0CB', hex: 'pink' },
                        { name: 'Rot', color: '#EF4444', hex: 'red' },
                        { name: 'Orange', color: '#F97316', hex: 'orange' },
                        { name: 'Gelb', color: '#FBBF24', hex: 'yellow' },
                        { name: 'Grün', color: '#10B981', hex: 'green' },
                        { name: 'Blau', color: '#3B82F6', hex: 'blue' },
                        { name: 'Lila', color: '#A855F7', hex: 'purple' },
                        { name: 'Weiß', color: '#FFFFFF', hex: 'white' },
                        { name: 'Gold', color: '#FFD700', hex: 'gold' },
                        { name: 'Silber', color: '#C0C0C0', hex: 'silver' },
                        { name: 'Schwarz', color: '#000000', hex: 'black' },
                        { name: 'Pastell', color: '#E0BBE4', hex: 'pastel' },
                      ].map((colorOption) => (
                        <motion.button
                          key={colorOption.hex}
                          type="button"
                          onClick={() => handleColorToggle(colorOption.hex)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`aspect-square rounded-xl border-4 transition-all ${
                            formData.colors.includes(colorOption.hex)
                              ? 'border-pink-600 shadow-lg scale-110'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: colorOption.color }}
                        >
                          <span className="sr-only">{colorOption.name}</span>
                          {formData.colors.includes(colorOption.hex) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full flex items-center justify-center"
                            >
                              <CheckCircle2 className="w-6 h-6 text-white drop-shadow-lg" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </FormField>

                  <FormField label="Dekoration / Design / Thema" helpText="Beschreiben Sie Ihre Vorstellungen">
                    <textarea
                      name="decoration"
                      value={formData.decoration}
                      onChange={handleChange}
                      rows={4}
                      placeholder="z.B. Rosen aus Fondant, Einhornthema, Minimalistische Dekoration, Blattgold-Akzente..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 resize-none transition-all"
                    />
                  </FormField>

                  <FormField label="Allergien / Unverträglichkeiten" helpText="Wichtig für die Zubereitung">
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="z.B. Nüsse, Gluten, Laktose..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                    />
                  </FormField>

                  <FormField label="Besondere Wünsche / Anmerkungen" helpText="Alles weitere, was wichtig ist">
                    <textarea
                      name="specialWishes"
                      value={formData.specialWishes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Teilen Sie uns alles mit, was für Ihre perfekte Kreation wichtig ist..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 resize-none transition-all"
                    />
                  </FormField>
                </motion.div>
              )}

              {/* Step 3: Lieferung */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">Liefer- / Abholdetails</h2>
                      <p className="text-sm text-gray-500">Wann und wo möchten Sie Ihre Bestellung erhalten?</p>
                    </div>
                  </div>

                  <FormField label="Wunschtermin" required helpText="Mindestens 7 Tage im Voraus bestellen">
                    <div className="relative">
                      <input
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        required
                        min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </FormField>

                  <FormField label="Lieferung oder Abholung" required>
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center space-x-3 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.deliveryMethod === 'delivery'
                            ? 'border-pink-600 bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="delivery"
                          checked={formData.deliveryMethod === 'delivery'}
                          onChange={handleChange}
                          className="w-5 h-5 text-pink-600 focus:ring-pink-500"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Lieferung</p>
                          <p className="text-xs text-gray-500">Innerhalb 20 km</p>
                        </div>
                      </motion.label>

                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center space-x-3 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.deliveryMethod === 'pickup'
                            ? 'border-pink-600 bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="pickup"
                          checked={formData.deliveryMethod === 'pickup'}
                          onChange={handleChange}
                          className="w-5 h-5 text-pink-600 focus:ring-pink-500"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Abholung</p>
                          <p className="text-xs text-gray-500">Vor Ort abholen</p>
                        </div>
                      </motion.label>
                    </div>
                  </FormField>

                  <AnimatePresence>
                    {formData.deliveryMethod === 'delivery' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FormField label="Lieferadresse" required>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required={formData.deliveryMethod === 'delivery'}
                            rows={3}
                            placeholder="Straße, Hausnummer, PLZ, Ort"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 resize-none transition-all"
                          />
                        </FormField>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Step 4: Kontaktdaten */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">Ihre Kontaktdaten</h2>
                      <p className="text-sm text-gray-500">Wie können wir Sie erreichen?</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Name" required>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ihr vollständiger Name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                      />
                    </FormField>

                    <FormField label="Telefon" required>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+49 123 456789"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                      />
                    </FormField>
                  </div>

                  <FormField label="E-Mail" required>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ihre@email.de"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all"
                    />
                  </FormField>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border-2 border-pink-200 space-y-3">
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="w-5 h-5 text-pink-600" />
                      <h3 className="font-medium text-gray-900">Ihre Bestellung im Überblick</h3>
                    </div>
                    {formData.cakeType && (
                      <SummaryItem label="Produkt" value={formData.cakeType} />
                    )}
                    {formData.size && (
                      <SummaryItem label="Größe" value={formData.size} />
                    )}
                    {formData.flavor && (
                      <SummaryItem label="Geschmack" value={formData.flavor} />
                    )}
                    {formData.filling && (
                      <SummaryItem label="Füllung" value={formData.filling} />
                    )}
                    {formData.colors.length > 0 && (
                      <SummaryItem label="Farben" value={formData.colors.join(', ')} />
                    )}
                    {formData.deliveryDate && (
                      <SummaryItem label="Termin" value={new Date(formData.deliveryDate).toLocaleDateString('de-DE')} />
                    )}
                    {formData.deliveryMethod && (
                      <SummaryItem 
                        label="Art" 
                        value={formData.deliveryMethod === 'delivery' ? 'Lieferung' : 'Abholung'} 
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between gap-4"
          >
            {currentStep > 1 ? (
              <motion.button
                type="button"
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
              >
                Zurück
              </motion.button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                whileHover={{ scale: isStepValid() ? 1.05 : 1 }}
                whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-full hover:from-pink-700 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
              >
                <span>Weiter</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={!isStepValid() || isLoading}
                whileHover={{ scale: isStepValid() && !isLoading ? 1.05 : 1 }}
                whileTap={{ scale: isStepValid() && !isLoading ? 0.95 : 1 }}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full hover:from-green-700 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                <span>{isLoading ? 'Wird gesendet...' : 'Anfrage absenden'}</span>
              </motion.button>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs text-gray-500 text-center mt-4"
          >
            Nach Absenden erhalten Sie innerhalb von 24 Stunden ein individuelles Angebot
          </motion.p>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, required, helpText, children }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {helpText && (
        <p className="text-xs text-gray-500 mt-1.5">{helpText}</p>
      )}
    </div>
  );
}

function SummaryItem({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}