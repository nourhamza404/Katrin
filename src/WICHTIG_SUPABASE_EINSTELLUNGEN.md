# 🚨 WICHTIGE SUPABASE EINSTELLUNGEN

## Schritt 1: Email-Bestätigung deaktivieren

**Die E-Mail-Bestätigung muss in Supabase deaktiviert werden, damit sich Benutzer sofort nach der Registrierung anmelden können.**

### So deaktivieren Sie die E-Mail-Bestätigung:

1. **Öffnen Sie** Ihr Supabase Dashboard: https://supabase.com/dashboard
2. **Wählen Sie** Ihr Projekt aus
3. **Klicken Sie** auf "Authentication" in der linken Seitenleiste
4. **Klicken Sie** auf "Providers" 
5. **Scrollen Sie** zu "Email" und klicken Sie darauf
6. **Deaktivieren Sie** die Option "Confirm email"
7. **Klicken Sie** auf "Save"

**Alternative: Direkte URL**
- Gehen Sie zu: `https://supabase.com/dashboard/project/[IHR-PROJECT-ID]/auth/providers`
- Ersetzen Sie `[IHR-PROJECT-ID]` mit Ihrer Project ID: `oinglwxmdnhdmnnqlaia`

## Schritt 2: Datenbanktabellen erstellen

**Die App funktioniert bereits OHNE die Tabellen**, aber für volle Funktionalität sollten Sie diese erstellen:

### Öffnen Sie den SQL Editor:

1. **Klicken Sie** auf "SQL Editor" in der linken Seitenleiste
2. **Klicken Sie** auf "+ New query"
3. **Kopieren Sie** den folgenden SQL-Code:

```sql
-- Profiles Tabelle
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Addresses Tabelle
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT DEFAULT 'Deutschland',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Orders Tabelle
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  address_id UUID REFERENCES addresses,
  status TEXT DEFAULT 'Pending Review',
  total_amount DECIMAL(10, 2) NOT NULL,
  delivery_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Order Items Tabelle
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders NOT NULL,
  product_id UUID,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);

-- Custom Orders Tabelle
CREATE TABLE custom_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  cake_type TEXT NOT NULL,
  size TEXT NOT NULL,
  flavor TEXT NOT NULL,
  filling TEXT NOT NULL,
  decoration TEXT,
  allergies TEXT,
  special_wishes TEXT,
  delivery_method TEXT NOT NULL,
  delivery_date DATE NOT NULL,
  delivery_address TEXT,
  status TEXT DEFAULT 'Pending',
  quoted_price DECIMAL(10, 2),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Products Tabelle
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS für alle Tabellen
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Addresses Policies
CREATE POLICY "Users can view own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- Orders Policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items Policies
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Custom Orders Policies
CREATE POLICY "Users can view own custom orders" ON custom_orders
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert custom orders" ON custom_orders
  FOR INSERT WITH CHECK (true);

-- Products Policies
CREATE POLICY "Anyone can view available products" ON products
  FOR SELECT USING (is_available = true);

-- Trigger für automatisches Profil erstellen
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Beispiel Produkte (optional)
INSERT INTO products (name, description, price, category, image_url, is_popular, is_available) VALUES
('Schokoladentorte Deluxe', 'Dreischichtige Schokoladentorte mit Ganache und Beeren', 45.00, 'cakes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', true, true),
('Erdbeertorte Classic', 'Luftiger Biskuit mit Erdbeeren und Sahne', 38.00, 'cakes', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187', true, true),
('Red Velvet Torte', 'Klassische Red Velvet mit Cream Cheese Frosting', 42.00, 'cakes', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e', false, true),
('Chocolate Chip Cookies (12 Stk)', 'Klassische Cookies mit belgischer Schokolade', 15.00, 'cookies', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e', true, true),
('Bunte Zuckerkekse (24 Stk)', 'Perfekt für Kindergeburtstage und Feiern', 20.00, 'cookies', 'https://images.unsplash.com/photo-1603532648955-039310d9ed75', true, true);
```

4. **Klicken Sie** auf "Run" (oder drücken Sie Ctrl+Enter)

## Status-Übersicht

### ✅ Bereits funktioniert (auch ohne Datenbank):
- Benutzerregistrierung
- Login/Logout
- Session-Management
- Authentifizierung

### ⏳ Benötigt Datenbanktabellen:
- Bestellhistorie speichern
- Adressverwaltung
- Profilaktualisierung
- Individuelle Bestellungen

## Troubleshooting

### Problem: "Email not confirmed"
**Lösung:** Deaktivieren Sie die E-Mail-Bestätigung wie in Schritt 1 beschrieben.

### Problem: "Invalid login credentials"
**Lösung:** Stellen Sie sicher, dass:
1. Sie sich ZUERST registriert haben
2. Email und Passwort korrekt eingegeben wurden
3. Passwort mindestens 6 Zeichen lang ist

### Problem: "Could not find table"
**Lösung:** Die App funktioniert auch ohne Tabellen! Für volle Funktionalität führen Sie Schritt 2 aus.

## Nächste Schritte

Nach der Einrichtung können Sie:
1. ✅ Sich registrieren und anmelden
2. ✅ Produkte zum Warenkorb hinzufügen
3. ✅ Individuelle Bestellungen aufgeben (mit Datenbank)
4. ✅ Ihre Bestellhistorie einsehen (mit Datenbank)
5. ✅ Mehrere Lieferadressen verwalten (mit Datenbank)

---

**Bei weiteren Fragen:** Öffnen Sie die Entwicklerkonsole (F12) für detaillierte Fehlermeldungen.
