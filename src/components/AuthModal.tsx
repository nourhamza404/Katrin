import { useState } from 'react';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      console.log('🔍 Starting Google OAuth login...');
      console.log('📍 Current URL:', window.location.origin);
      console.log('📍 Redirect URL will be:', `${window.location.origin}/`);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      console.log('📦 OAuth Response Data:', data);
      console.log('❌ OAuth Error:', error);

      if (error) {
        console.error('🚨 Full error object:', JSON.stringify(error, null, 2));
        throw error;
      }
      
      // The redirect will happen automatically
      // After redirect, the session will be established
    } catch (error: any) {
      console.error('💥 Google login error:', error);
      console.error('💥 Error code:', error.code);
      console.error('💥 Error message:', error.message);
      console.error('💥 Error status:', error.status);
      
      let errorMessage = 'Google-Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      
      if (error.message?.includes('provider is not enabled') || error.error_code === 'validation_failed') {
        errorMessage = `❌ Google Login ist in Supabase nicht aktiviert!\n\n` +
          `Bitte überprüfen Sie:\n` +
          `1. Supabase Dashboard → Authentication → Providers → Google\n` +
          `2. "Enable" muss auf ON sein\n` +
          `3. Client ID und Secret müssen eingetragen sein\n` +
          `4. Auf "Save" klicken!\n\n` +
          `Callback URL: https://${projectId}.supabase.co/auth/v1/callback`;
        
        // Show in console too
        console.error('🔧 LÖSUNG:', {
          'Schritt 1': 'Gehen Sie zu https://supabase.com/dashboard',
          'Schritt 2': 'Wählen Sie Ihr Projekt',
          'Schritt 3': 'Authentication → Providers → Google',
          'Schritt 4': 'Enable = ON',
          'Schritt 5': 'Client ID: 789987911658-qe9h508crksu91p4mftg6uu9ga0k0hvk.apps.googleusercontent.com',
          'Schritt 6': 'Client Secret eingeben',
          'Schritt 7': 'SAVE klicken!',
          'Callback URL für Google Cloud': `https://${projectId}.supabase.co/auth/v1/callback`,
        });
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, { duration: 10000 });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === 'register') {
        // Register new user via server endpoint (with email_confirm: true)
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/signup`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Registrierung fehlgeschlagen');
        }

        toast.success('Konto erfolgreich erstellt! Sie können sich jetzt anmelden.');
        setMode('login');
        setFormData({ name: '', email: formData.email, password: '' });
      } else {
        // Login existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.user) {
          // Try to fetch user profile, but don't fail if table doesn't exist
          let profileName = data.user.user_metadata?.name || 'User';
          
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', data.user.id)
              .single();

            if (profile && !profileError) {
              profileName = profile.name || profileName;
            }
          } catch (profileError) {
            console.log('Profile table not yet created, using metadata');
          }

          const user = {
            id: data.user.id,
            email: data.user.email,
            name: profileName,
          };

          onLogin(user);
          toast.success(`Willkommen zurück, ${user.name}!`);
          setFormData({ name: '', email: '', password: '' });
          onClose();
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // Better error messages
      let errorMessage = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Ungültige E-Mail oder Passwort. Bitte überprüfen Sie Ihre Eingaben.';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'E-Mail noch nicht bestätigt. Dieser Fehler sollte nicht auftreten. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.';
      } else if (error.message?.includes('User already registered') || error.message?.includes('already been registered')) {
        errorMessage = 'Diese E-Mail ist bereits registriert. Bitte melden Sie sich an.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl text-gray-900 mb-2">
            {mode === 'login' ? 'Willkommen zurück!' : 'Konto erstellen'}
          </h2>
          <p className="text-gray-600">
            {mode === 'login'
              ? 'Melden Sie sich in Ihrem Konto an'
              : 'Erstellen Sie Ihr Katrin Sweets Konto'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-gray-700 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required={mode === 'register'}
                  placeholder="Ihr Name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-2">E-Mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder="ihre@email.de"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                disabled={loading}
              />
            </div>
            {mode === 'register' && (
              <p className="text-xs text-gray-500 mt-1">Mindestens 6 Zeichen</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{mode === 'login' ? 'Anmelden...' : 'Erstelle Konto...'}</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Anmelden' : 'Konto erstellen'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {mode === 'login' ? 'Noch kein Konto?' : 'Bereits registriert?'}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setFormData({ name: '', email: '', password: '' });
              }}
              className="ml-2 text-pink-600 hover:text-pink-700 transition-colors font-medium"
              disabled={loading}
            >
              {mode === 'login' ? 'Jetzt registrieren' : 'Jetzt anmelden'}
            </button>
          </p>
        </div>

        {mode === 'register' && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              ℹ️ Nach der Registrierung können Sie sich direkt anmelden. Die E-Mail-Bestätigung ist für diesen Demo-Shop nicht erforderlich.
            </p>
          </div>
        )}
        
        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">oder</span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-sm"
        >
          {googleLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Mit Google verbinden...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium">Mit Google {mode === 'login' ? 'anmelden' : 'registrieren'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}