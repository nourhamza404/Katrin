# Katrin Sweets - E-Commerce Shop 🍰

Ein moderner E-Commerce Shop für handgemachte Torten und Cookies.

## Features

- 🛒 Vollständiger Warenkorb & Checkout
- 🔐 Benutzer-Authentifizierung (E-Mail + Google OAuth)
- 👤 Kundenportal mit Bestellhistorie
- 🎂 Produktkatalog mit Kategoriefilterung
- 🎨 Custom Order Konfigurator
- 📧 Automatische E-Mail-Benachrichtigungen
- 📱 Responsive Design
- 👨‍💼 Admin-Panel für Bestellverwaltung
- 📸 Instagram Integration
- 💬 WhatsApp-Button

## Technologie-Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM
- shadcn/ui Components

**Backend:**
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Edge Functions (Hono + Deno)
- Resend API (E-Mail)

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Preview der Production Build
npm run preview
```

## Umgebungsvariablen

Die Supabase-Konfiguration befindet sich in `/utils/supabase/info.tsx`.

Für Vercel/Netlify Deployment:
- `VITE_SUPABASE_URL` - Deine Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Dein Supabase Anon Key

## Deployment

Dieses Projekt kann auf folgenden Plattformen deployed werden:
- **Vercel** (empfohlen)
- **Netlify**

### Vercel Deployment

1. GitHub Repository pushen
2. Vercel mit GitHub verbinden
3. Projekt importieren
4. Environment Variables setzen
5. Deploy!

## Dokumentation

- [Supabase Setup](SUPABASE_SETUP.md)
- [Admin Panel Anleitung](ADMIN_PANEL_ANLEITUNG.md)
- [Datenbank Struktur](DATENBANK_STRUKTUR.md)
- [E-Mail Setup](EMAIL_SETUP.md)

## Kontakt

- Instagram: [@katrensweet](https://www.instagram.com/katrensweet/)
- WhatsApp: +4915732447133

## Lizenz

© 2024 Katrin Sweets. Alle Rechte vorbehalten.
