import { Heart, Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-white border-t border-pink-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Katrin Sweets</h3>
            <p className="text-sm text-gray-600 mb-4">
              Handgemachte Torten und Cookies mit Liebe gebacken. 
              Jedes Stück ist ein kleines Kunstwerk!
            </p>
            {/* Social Media */}
            <div className="flex items-center space-x-3">
              <a 
                href="https://www.instagram.com/katrensweet/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg hover:scale-110"
                aria-label="Folgen Sie uns auf Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@katrinsweets.de"
                className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-all hover:scale-110"
                aria-label="Schreiben Sie uns eine E-Mail"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Schnelllinks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/produkte" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Produkte
                </a>
              </li>
              <li>
                <a href="/nach-wunsch" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Nach Wunsch bestellen
                </a>
              </li>
              <li>
                <a href="/rezepte" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Rezepte
                </a>
              </li>
              <li>
                <a href="/profile" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Kundenportal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-500" />
                <a href="mailto:info@katrinsweets.de" className="hover:text-pink-500 transition-colors">
                  info@katrinsweets.de
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-500" />
                <a href="tel:+49123456789" className="hover:text-pink-500 transition-colors">
                  +49 123 456789
                </a>
              </li>
              <li>Mo-Fr: 9:00 - 18:00 Uhr</li>
            </ul>
          </div>

          {/* Instagram Feed Teaser */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Folgen Sie uns</h3>
            <a 
              href="https://www.instagram.com/katrensweet/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 hover:from-purple-200 hover:to-pink-200 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">@katrensweet</div>
                    <div className="text-xs text-gray-600">auf Instagram</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  🎂 Entdecken Sie unsere neuesten Kreationen und Angebote!
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-pink-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2025 Katrin Sweets. Alle Rechte vorbehalten.
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for sweet lovers
          </p>
        </div>
      </div>
    </footer>
  );
}