import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-16 h-16 text-white" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-gray-900 mb-4">Bestellung erfolgreich!</h1>
          <p className="text-gray-600 mb-8">
            Vielen Dank für Ihre Bestellung bei Katrin Sweets! 🎂
          </p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900 mb-2">Was passiert jetzt?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>Sie erhalten eine Bestätigungs-E-Mail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>Wir prüfen Ihre Bestellung und bestätigen sie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>Ihre süßen Leckereien werden frisch zubereitet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>Sie erhalten eine Benachrichtigung zur Lieferung</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-sm text-gray-600">
            Sie können Ihre Bestellung jederzeit im{' '}
            <button
              onClick={() => navigate('/kundenportal')}
              className="text-pink-500 hover:text-pink-600 font-medium underline"
            >
              Kundenportal
            </button>
            {' '}einsehen.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Zurück zur Startseite
          </button>
          <button
            onClick={() => navigate('/produkte')}
            className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Weiter einkaufen
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
