# Supabase Setup Guide für Katrin Sweets E-Commerce

Diese Anleitung hilft Ihnen, die Supabase-Datenbank für den vollständigen E-Commerce-Shop einzurichten.

## 1. Supabase-Projekt erstellen

1. Gehen Sie zu [supabase.com](https://supabase.com) und erstellen Sie ein kostenloses Konto
2. Erstellen Sie ein neues Projekt
3. Notieren Sie sich die **Project URL** und den **anon public key**

## 2. Datenbanktabellen erstellen

Führen Sie die folgenden SQL-Befehle in der Supabase SQL-Konsole aus:

### Profiles Tabelle

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

### Addresses Tabelle

```sql
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
```

### Orders Tabelle

```sql
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
```

### Order Items Tabelle

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders NOT NULL,
  product_id UUID,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);
```

### Custom Orders Tabelle

```sql
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
```

### Products Tabelle

```sql
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
```

## 3. Row Level Security (RLS) aktivieren

```sql
-- Enable RLS für alle Tabellen
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
```

### Profiles Policies

```sql
-- Benutzer können ihr eigenes Profil sehen
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Benutzer können ihr eigenes Profil aktualisieren
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Benutzer können ihr eigenes Profil erstellen
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Addresses Policies

```sql
CREATE POLICY "Users can view own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);
```

### Orders Policies

```sql
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Order Items Policies

```sql
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
```

### Custom Orders Policies

```sql
CREATE POLICY "Users can view own custom orders" ON custom_orders
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert custom orders" ON custom_orders
  FOR INSERT WITH CHECK (true);
```

### Products Policies

```sql
-- Jeder kann verfügbare Produkte sehen
CREATE POLICY "Anyone can view available products" ON products
  FOR SELECT USING (is_available = true);
```

## 4. Trigger für automatisches Profil erstellen

Wenn ein neuer Benutzer sich registriert, automatisch ein Profil erstellen:

```sql
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
```

## 5. Beispieldaten einfügen (Optional)

### Beispiel Produkte

```sql
INSERT INTO products (name, description, price, category, image_url, is_popular, is_available) VALUES
('Schokoladentorte Deluxe', 'Dreischichtige Schokoladentorte mit Ganache und Beeren', 45.00, 'cakes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', true, true),
('Erdbeertorte Classic', 'Luftiger Biskuit mit Erdbeeren und Sahne', 38.00, 'cakes', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187', true, true),
('Red Velvet Torte', 'Klassische Red Velvet mit Cream Cheese Frosting', 42.00, 'cakes', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e', false, true),
('Chocolate Chip Cookies (12 Stk)', 'Klassische Cookies mit belgischer Schokolade', 15.00, 'cookies', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e', true, true),
('Bunte Zuckerkekse (24 Stk)', 'Perfekt für Kindergeburtstage und Feiern', 20.00, 'cookies', 'https://images.unsplash.com/photo-1603532648955-039310d9ed75', true, true);
```

## 6. Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env.local` Datei in Ihrem Projekt:

```env
VITE_SUPABASE_URL=ihre-project-url
VITE_SUPABASE_ANON_KEY=ihr-anon-key
```

## 7. Supabase Client im Code integrieren

### Installation

```bash
npm install @supabase/supabase-js
```

### Client erstellen (`/lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 8. Authentifizierung implementieren

### Login

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
})
```

### Registrierung

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    data: {
      name: 'User Name',
    }
  }
})
```

### Logout

```typescript
const { error } = await supabase.auth.signOut()
```

### Aktuellen Benutzer abrufen

```typescript
const { data: { user } } = await supabase.auth.getUser()
```

## 9. Datenbank-Operationen

### Produkte abrufen

```typescript
const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .eq('is_available', true)
  .order('created_at', { ascending: false })
```

### Bestellung erstellen

```typescript
const { data: order, error } = await supabase
  .from('orders')
  .insert([
    {
      user_id: user.id,
      address_id: selectedAddressId,
      total_amount: total,
      status: 'Pending Review',
    }
  ])
  .select()
```

### Individuelle Bestellung erstellen

```typescript
const { data, error } = await supabase
  .from('custom_orders')
  .insert([formData])
```

### Bestellungen des Benutzers abrufen

```typescript
const { data: orders, error } = await supabase
  .from('orders')
  .select(`
    *,
    addresses (*),
    order_items (*)
  `)
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
```

### Adressen verwalten

```typescript
// Neue Adresse hinzufügen
const { data, error } = await supabase
  .from('addresses')
  .insert([
    {
      user_id: user.id,
      name: 'Zu Hause',
      street: 'Musterstraße 123',
      city: 'München',
      zip_code: '80331',
      country: 'Deutschland',
      is_default: true,
    }
  ])

// Adressen abrufen
const { data: addresses, error } = await supabase
  .from('addresses')
  .select('*')
  .eq('user_id', user.id)
  .order('is_default', { ascending: false })
```

## 10. E-Mail-Templates konfigurieren (Optional)

In Supabase Dashboard → Authentication → Email Templates können Sie die E-Mail-Templates für:
- Bestätigungs-E-Mail
- Passwort-Zurücksetzen
- Magic Link

anpassen.

## Status-Übersicht

### Order Status
- `Pending Review` - Bestellung wartet auf Prüfung
- `Approved` - Bestellung genehmigt
- `In Production` - Wird hergestellt
- `Ready for Delivery` - Bereit zur Auslieferung
- `Completed` - Abgeschlossen
- `Rejected` - Abgelehnt

### Custom Order Status
- `Pending` - Anfrage eingegangen
- `Quoted` - Angebot erstellt
- `Approved` - Kunde hat Angebot angenommen
- `In Production` - Wird hergestellt
- `Completed` - Abgeschlossen
- `Rejected` - Abgelehnt

## Sicherheitshinweise

⚠️ **Wichtig für Production:**

1. **NIEMALS** Ihre Supabase Service Role Key im Frontend verwenden
2. Aktivieren Sie E-Mail-Bestätigung für neue Benutzer
3. Implementieren Sie Rate Limiting
4. Verwenden Sie HTTPS für alle Anfragen
5. Überprüfen Sie regelmäßig Ihre RLS-Policies
6. Aktivieren Sie 2FA für Ihr Supabase-Konto
7. Implementieren Sie Captcha für Registrierung und Login
8. Für Produktions-E-Commerce zusätzliche Payment-Provider (Stripe, PayPal) integrieren

## Support

Bei Fragen zur Supabase-Integration:
- [Supabase Dokumentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
