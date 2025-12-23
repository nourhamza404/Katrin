# 📧 E-Mail-System Konfiguration - Katrin Sweets

## Übersicht

Das E-Mail-System sendet automatisch Bestätigungs-E-Mails an Kunden:

1. **Bestellbestätigung** - Nach normaler Bestellung über den Warenkorb
2. **Anfrage-Bestätigung** - Nach individueller Anfrage (/nach-wunsch)
3. **Status-Update E-Mails** - Wenn sich der Bestellstatus ändert

---

## 🔧 Setup - Resend API Key

### Schritt 1: Resend Account erstellen

1. Gehen Sie zu [https://resend.com/](https://resend.com/)
2. Erstellen Sie einen kostenlosen Account
3. Verifizieren Sie Ihre E-Mail-Adresse

### Schritt 2: API Key generieren

1. Gehen Sie zum [Resend Dashboard](https://resend.com/api-keys)
2. Klicken Sie auf "Create API Key"
3. Geben Sie einen Namen ein (z.B. "Katrin Sweets Production")
4. Wählen Sie "Full Access" oder "Send Only"
5. Kopieren Sie den generierten API Key (sieht aus wie `re_...`)

### Schritt 3: API Key in Supabase hinzufügen

1. Öffnen Sie Ihr [Supabase Dashboard](https://supabase.com/dashboard)
2. Wählen Sie Ihr Projekt aus
3. Gehen Sie zu **Settings** → **Edge Functions**
4. Klicken Sie auf **Manage Secrets**
5. Fügen Sie ein neues Secret hinzu:
   - Name: `RESEND_API_KEY`
   - Wert: Ihr kopierter API Key (`re_...`)
6. Klicken Sie auf **Save**

### Schritt 4: Domain konfigurieren (Optional - für professionelle E-Mails)

**Ohne Domain-Konfiguration:**
- E-Mails werden von `onboarding@resend.dev` gesendet
- Funktioniert sofort, aber weniger professionell

**Mit eigener Domain:**
1. Gehen Sie zu [Resend Domains](https://resend.com/domains)
2. Klicken Sie auf "Add Domain"
3. Geben Sie Ihre Domain ein (z.B. `katrinsweets.de`)
4. Fügen Sie die DNS-Records zu Ihrem Domain-Provider hinzu:
   - SPF Record
   - DKIM Records
   - DMARC Record
5. Warten Sie auf Verifizierung (kann bis zu 48 Stunden dauern)

**E-Mail-Adressen mit eigener Domain:**
- `bestellungen@katrinsweets.de` - Für normale Bestellungen
- `anfragen@katrinsweets.de` - Für individuelle Anfragen
- `status@katrinsweets.de` - Für Status-Updates

---

## 📨 E-Mail-Templates

### 1. Bestellbestätigung (Order Confirmation)

**Wird gesendet wenn:**
- Ein Kunde eine normale Bestellung aufgibt (/checkout)

**Enthält:**
- Bestellnummer
- Bestelldatum
- Bestellte Artikel mit Preisen
- Gesamtbetrag
- Lieferinformationen
- Zahlungsmethode
- Nächste Schritte
- Link zum Kundenportal

### 2. Anfrage-Bestätigung (Custom Order Confirmation)

**Wird gesendet wenn:**
- Ein Kunde eine individuelle Anfrage einreicht (/nach-wunsch)

**Enthält:**
- Anfrage-Nummer
- Datum
- Produktart (Torte/Cookies)
- Alle individuellen Wünsche (Geschmack, Größe, Design, etc.)
- Kontaktdaten
- Gewünschter Termin
- Nächste Schritte (24-48h Rückmeldung)

### 3. Status-Update E-Mail

**Wird gesendet wenn:**
- Admin ändert den Bestellstatus im Admin-Panel

**Status-Typen:**
- `pending_review` - ⏳ Bestellung wird geprüft
- `approved` - ✅ Bestellung bestätigt
- `in_production` - 👨‍🍳 In Produktion
- `ready` - 🎉 Bereit zur Lieferung
- `delivered` - 🚚 Ausgeliefert
- `cancelled` - ❌ Storniert

---

## 🛠️ Technische Details

### Server-Endpunkte

**1. Send Order Email:**
```
POST /make-server-48cde07a/send-order-email
```

**2. Send Custom Order Email:**
```
POST /make-server-48cde07a/send-custom-order-email
```

**3. Send Status Update Email:**
```
POST /make-server-48cde07a/send-status-update-email
```

### E-Mail-Templates Dateien

- `/supabase/functions/server/email-templates.tsx` - Alle HTML Templates

### Integration

**CheckoutPage.tsx:**
```typescript
// Nach erfolgreicher Bestellung
await fetch('.../send-order-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
  },
  body: JSON.stringify(emailData),
});
```

**CustomOrderPage.tsx:**
```typescript
// Nach erfolgreicher Anfrage
await fetch('.../send-custom-order-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
  },
  body: JSON.stringify(emailData),
});
```

---

## 🧪 Testen

### Test-Bestellung aufgeben:

1. Gehen Sie zu `/produkte`
2. Fügen Sie Produkte zum Warenkorb hinzu
3. Gehen Sie zu `/checkout`
4. Geben Sie eine echte E-Mail-Adresse ein (für den Test)
5. Schließen Sie die Bestellung ab
6. Prüfen Sie Ihr E-Mail-Postfach

### Test-Anfrage erstellen:

1. Gehen Sie zu `/nach-wunsch`
2. Füllen Sie das Formular aus
3. Geben Sie eine echte E-Mail-Adresse ein
4. Senden Sie die Anfrage ab
5. Prüfen Sie Ihr E-Mail-Postfach

---

## 📊 Resend Limits (Free Plan)

- **100 E-Mails pro Tag**
- **3.000 E-Mails pro Monat**
- Perfekt für kleine bis mittlere Shops

**Bezahlte Pläne:**
- Pro: $20/Monat - 50.000 E-Mails
- Business: Individuell - Unbegrenzt

---

## ⚠️ Troubleshooting

### E-Mails kommen nicht an?

1. **Prüfen Sie den Spam-Ordner**
2. **Prüfen Sie den API Key:**
   ```bash
   # Im Supabase Dashboard
   Settings → Edge Functions → Manage Secrets → RESEND_API_KEY
   ```
3. **Prüfen Sie die Resend Logs:**
   - Gehen Sie zu [Resend Dashboard](https://resend.com/emails)
   - Sehen Sie alle gesendeten E-Mails und deren Status

### Fehler: "Email service not configured"

- Der `RESEND_API_KEY` ist nicht gesetzt
- Folgen Sie Schritt 3 oben

### E-Mails werden von "onboarding@resend.dev" gesendet

- Das ist normal ohne Domain-Konfiguration
- Folgen Sie Schritt 4 für professionelle E-Mail-Adressen

---

## 🎨 E-Mail-Design

Alle E-Mails haben:
- ✨ Responsive Design (Mobile & Desktop)
- 🎨 Markenfarben (Pink/Rose Gradient)
- 📱 Modern & Professionell
- 🇩🇪 Deutsche Sprache
- 📧 HTML mit Inline-CSS (funktioniert in allen E-Mail-Clients)

---

## 🔐 Sicherheit

- API Key wird **nur server-seitig** verwendet
- **Niemals** im Frontend-Code sichtbar
- Alle E-Mails werden über sichere Resend API gesendet
- Keine Kundendaten werden in E-Mail-Templates gespeichert

---

## 📞 Support

Bei Problemen:

1. **Resend Support:** support@resend.com
2. **Resend Dokumentation:** https://resend.com/docs
3. **Resend Status:** https://status.resend.com

---

**Viel Erfolg mit Ihrem E-Mail-System! 🎉**
