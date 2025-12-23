import { useState, useEffect } from 'react';
import { Copy, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { projectId } from '../utils/supabase/info';
import { supabase } from '../lib/supabase';

export default function GoogleOAuthDebug() {
  const [copied, setCopied] = useState<string | null>(null);
  const [providerStatus, setProviderStatus] = useState<any>(null);

  const callbackUrl = `https://${projectId}.supabase.co/auth/v1/callback`;
  const clientId = '789987911658-qe9h508crksu91p4mftg6uu9ga0k0hvk.apps.googleusercontent.com';

  useEffect(() => {
    // Try to test the provider
    const testProvider = async () => {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            skipBrowserRedirect: true,
          },
        });
        
        setProviderStatus({ success: !error, error: error?.message });
      } catch (err: any) {
        setProviderStatus({ success: false, error: err.message });
      }
    };

    testProvider();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-2xl border-2 border-pink-500 z-50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🔧 Google OAuth Debug-Hilfe
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Verwenden Sie diese Informationen zur Konfiguration
          </p>
        </div>
        {providerStatus && (
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
            providerStatus.success 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {providerStatus.success ? (
              <>
                <CheckCircle2 className="w-3 h-3" />
                <span>Aktiviert</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                <span>Nicht aktiviert</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Supabase Settings */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            📋 Supabase Einstellungen
            <a 
              href={`https://supabase.com/dashboard/project/${projectId}/auth/providers`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-purple-600 hover:text-purple-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </h4>
          
          <div className="space-y-3 text-sm">
            <div>
              <label className="block text-xs text-gray-600 mb-1">1. Gehen Sie zu:</label>
              <div className="bg-white rounded-lg p-2 font-mono text-xs break-all">
                Authentication → Providers → Google
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">2. Setzen Sie "Enabled" auf ON</label>
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 text-xs">
                ⚠️ Vergessen Sie nicht auf <strong>"SAVE"</strong> zu klicken!
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">3. Client ID (for OAuth):</label>
              <div 
                className="bg-white rounded-lg p-2 font-mono text-xs break-all flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => copyToClipboard(clientId, 'clientId')}
              >
                <span className="flex-1">{clientId}</span>
                {copied === 'clientId' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">4. Client Secret:</label>
              <div className="bg-white rounded-lg p-2 text-xs text-gray-500">
                Holen Sie das Secret aus Google Cloud Console
              </div>
            </div>
          </div>
        </div>

        {/* Google Cloud Settings */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            🌐 Google Cloud Console
            <a 
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </h4>
          
          <div className="space-y-3 text-sm">
            <div>
              <label className="block text-xs text-gray-600 mb-1">1. Gehen Sie zu:</label>
              <div className="bg-white rounded-lg p-2 font-mono text-xs break-all">
                APIs & Services → Credentials
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">2. Klicken Sie auf Ihre OAuth 2.0 Client ID</label>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">3. Fügen Sie diese Redirect URI hinzu:</label>
              <div 
                className="bg-white rounded-lg p-2 font-mono text-xs break-all flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => copyToClipboard(callbackUrl, 'callback')}
              >
                <span className="flex-1">{callbackUrl}</span>
                {copied === 'callback' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">4. Klicken Sie auf SAVE</label>
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 text-xs">
                ⏱️ Warten Sie 1-2 Minuten nach dem Speichern
              </div>
            </div>
          </div>
        </div>

        {/* Test Status */}
        {providerStatus && !providerStatus.success && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Problem erkannt
            </h4>
            <p className="text-xs text-red-700">
              {providerStatus.error || 'Provider ist nicht aktiviert'}
            </p>
          </div>
        )}

        {/* Quick Links */}
        <div className="flex gap-2 pt-2">
          <a
            href={`https://supabase.com/dashboard/project/${projectId}/auth/providers`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center text-sm flex items-center justify-center gap-2"
          >
            <span>Supabase öffnen</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm flex items-center justify-center gap-2"
          >
            <span>Google Cloud öffnen</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
