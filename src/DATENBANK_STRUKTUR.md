# 📊 Katrin Sweets - Datenbank-Struktur

## 🗄️ Supabase Datenbank-Übersicht

### **1. KV-Store Tabelle: `kv_store_48cde07a`**

Dies ist die Haupt-Tabelle für alle Daten. Sie ist eine Key-Value Datenbank mit nur 2 Spalten:

```sql
CREATE TABLE kv_store_48cde07a (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

#### **Struktur:**
| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `key` | TEXT | Eindeutiger Schlüssel (z.B. "order:123", "product:cake_01") |
| `value` | JSONB | JSON-Objekt mit allen Daten |

---

## 📦 **Wo werden Kundendaten gespeichert?**

### **1️⃣ Authentifizierungs-Daten (Supabase Auth)**

**Tabelle:** `auth.users` (Supabase-interne Tabelle)

**Gespeichert bei:** Registrierung (Sign Up)

**Daten:**
- ✅ **E-Mail** (für Login)
- ✅ **Passwort** (verschlüsselt)
- ✅ **Name** (in `user_metadata.name`)

**Beispiel:**
```json
{
  "id": "uuid-123-456",
  "email": "kunde@example.com",
  "user_metadata": {
    "name": "Max Mustermann"
  }
}
```

---

### **2️⃣ Bestelldaten (KV-Store)**

**Tabelle:** `kv_store_48cde07a`

**Key-Format:** `order:{order_id}`

**Gespeichert bei:** Jeder Bestellung (Checkout)

**Vollständige Daten:**
- ✅ **Vorname** (`delivery_info.firstName`)
- ✅ **Nachname** (`delivery_info.lastName`)
- ✅ **E-Mail** (`delivery_info.email` oder `user_email`)
- ✅ **Telefonnummer** (`delivery_info.phone`)
- ✅ **Adresse** (nur bei Lieferung):
  - Straße (`delivery_info.street`)
  - Hausnummer (`delivery_info.houseNumber`)
  - PLZ (`delivery_info.zipCode`)
  - Stadt (`delivery_info.city`)
- ✅ **Lieferart** (`delivery_info.deliveryMethod`)
- ✅ **Wunsch-Termin** (`delivery_info.deliveryDate`, `delivery_info.deliveryTime`)
- ✅ **Anmerkungen** (`delivery_info.notes`)

**Beispiel einer Bestellung:**
```json
{
  "key": "order:order_1701612345_abc123",
  "value": {
    "id": "order_1701612345_abc123",
    "user_email": "kunde@example.com",
    "user_id": "uuid-123-456",
    "status": "pending_review",
    "payment_method": "to_be_determined",
    "total": 45.50,
    "created_at": "2024-12-03T10:30:00Z",
    "items": [
      {
        "id": "cake_01",
        "name": "Schokoladentorte",
        "price": 35.00,
        "quantity": 1
      }
    ],
    "delivery_info": {
      "firstName": "Max",
      "lastName": "Mustermann",
      "email": "kunde@example.com",
      "phone": "+49 123 456789",
      "street": "Musterstraße",
      "houseNumber": "123",
      "zipCode": "12345",
      "city": "Berlin",
      "deliveryMethod": "delivery",
      "deliveryDate": "2024-12-10",
      "deliveryTime": "14:00",
      "notes": "Bitte an der Haustür klingeln"
    }
  }
}
```

---

### **3️⃣ Produkte (KV-Store)**

**Key-Format:** `product:{product_id}`

**Beispiel:**
```json
{
  "key": "product:cake_001",
  "value": {
    "id": "cake_001",
    "name": "Schokoladentorte",
    "price": 35.00,
    "category": "cakes",
    "image": "...",
    "created_at": "2024-12-01T10:00:00Z"
  }
}
```

---

### **4️⃣ Rezepte (KV-Store)**

**Key-Format:** `recipe:{recipe_id}`

**Beispiel:**
```json
{
  "key": "recipe:recipe_001",
  "value": {
    "id": "recipe_001",
    "title": "Schokoladen-Cookies",
    "ingredients": [...],
    "instructions": [...],
    "created_at": "2024-12-01T10:00:00Z"
  }
}
```

---

## 🔍 **Wie werden Kundendaten abgerufen?**

### **Alle Bestellungen eines Kunden:**

**API-Endpunkt:** `GET /orders/user/:email`

**Methode:**
1. Alle Bestellungen abrufen mit `getByPrefix('order:')`
2. Filtern nach `user_email === email`
3. Sortieren nach `created_at` (neueste zuerst)

**Code:**
```typescript
const allOrders = await kv.getByPrefix('order:');
const userOrders = allOrders.filter(order => order.user_email === email);
```

---

### **Alle Bestellungen (Admin):**

**API-Endpunkt:** `GET /orders`

**Methode:**
1. Alle Bestellungen mit `getByPrefix('order:')` abrufen
2. Nach Datum sortieren

---

## ⚠️ **Wichtige Hinweise:**

### **✅ Was GUT funktioniert:**
- Einfache Struktur
- Schnelle Abfragen mit `getByPrefix`
- Alle Kundendaten in der Bestellung gespeichert
- Keine komplexen Joins notwendig

### **❌ Potenzielle Probleme:**

1. **Keine zentrale Kundentabelle:**
   - Kundendaten werden bei jeder Bestellung neu gespeichert
   - Keine Kundenhistorie außerhalb von Bestellungen
   - Telefonnummer/Adresse nicht wiederverwendbar

2. **Keine Datennormalisierung:**
   - Wenn ein Kunde die E-Mail ändert, sind alte Bestellungen nicht mehr zuordenbar
   - Redundante Datenspeicherung

3. **Datenschutz:**
   - Kundendaten werden nicht gelöscht, wenn Bestellung gelöscht wird
   - Keine separate Verwaltung von Kundenprofilen

---

## 🎯 **Zugriff auf die Datenbank:**

### **Im Supabase Dashboard:**

1. Öffnen Sie: https://supabase.com/dashboard/project/oinglwxmdnhdmnnqlaia
2. Navigieren zu: **Database** → **Tables**
3. Wählen Sie: **kv_store_48cde07a**

### **Beispiel-Abfragen:**

#### **Alle Bestellungen anzeigen:**
```sql
SELECT * 
FROM kv_store_48cde07a 
WHERE key LIKE 'order:%' 
ORDER BY value->>'created_at' DESC;
```

#### **Bestellung eines bestimmten Kunden:**
```sql
SELECT * 
FROM kv_store_48cde07a 
WHERE key LIKE 'order:%' 
  AND value->>'user_email' = 'kunde@example.com';
```

#### **Telefonnummern aller Kunden:**
```sql
SELECT 
  value->>'user_email' as email,
  value->'delivery_info'->>'phone' as phone
FROM kv_store_48cde07a 
WHERE key LIKE 'order:%';
```

#### **Alle Produkte:**
```sql
SELECT * 
FROM kv_store_48cde07a 
WHERE key LIKE 'product:%';
```

---

## 📋 **Zusammenfassung:**

| Datentyp | Wo gespeichert? | Zugriff |
|----------|----------------|---------|
| **Login-Daten** | `auth.users` (Supabase Auth) | Automatisch bei Login |
| **Name, E-Mail, Telefon** | `kv_store_48cde07a` → `order:*` | Bei jeder Bestellung gespeichert |
| **Adresse** | `kv_store_48cde07a` → `order:*` → `delivery_info` | Nur bei Lieferung |
| **Bestellungen** | `kv_store_48cde07a` → `order:*` | GET /orders oder /orders/user/:email |
| **Produkte** | `kv_store_48cde07a` → `product:*` | GET /products |
| **Rezepte** | `kv_store_48cde07a` → `recipe:*` | GET /recipes |

---

## 🔐 **Datenschutz & DSGVO:**

**Wichtig für Ihren Shop:**
- ✅ Kundendaten werden in Deutschland (Supabase EU-Region) gespeichert
- ✅ Verschlüsselte Verbindung (HTTPS)
- ⚠️ **TODO:** Löschfunktion für Kundendaten implementieren
- ⚠️ **TODO:** Datenschutzerklärung erstellen
- ⚠️ **TODO:** Cookie-Banner hinzufügen

