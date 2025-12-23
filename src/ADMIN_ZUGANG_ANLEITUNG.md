# 🔐 ADMIN-ZUGANG EINRICHTEN

## ✅ SO WIRD DAS ADMIN-PANEL NUR FÜR SIE SICHTBAR:

Das Admin-Panel ist jetzt **geschützt** und nur für bestimmte Email-Adressen sichtbar!

---

## 📧 IHRE ADMIN-EMAIL FESTLEGEN

### **Schritt 1: Öffnen Sie `/App.tsx`**

### **Schritt 2: Finden Sie diese Zeile (ca. Zeile 235):**

```typescript
const ADMIN_EMAIL = 'admin@katrinsweets.de'; // Ändern Sie diese zu Ihrer Email!
```

### **Schritt 3: Ändern Sie die Email zu Ihrer eigenen:**

```typescript
const ADMIN_EMAIL = 'ihre-email@example.com'; // ← IHRE Email hier eintragen!
```

**Beispiel:**
```typescript
const ADMIN_EMAIL = 'katrin@gmail.com';
```

---

## 🎯 WIE ES FUNKTIONIERT:

### **Wenn Sie EINGELOGGT sind mit der Admin-Email:**
✅ Sie sehen den "🎛️ Admin" Link im Menü  
✅ Sie können auf `/admin` zugreifen  
✅ Sie können Produkte & Rezepte verwalten  

### **Wenn jemand anderes eingeloggt ist:**
❌ Kein "🎛️ Admin" Link im Menü  
❌ Admin-Panel ist unsichtbar  
❌ Normale Benutzer sehen nichts davon  

---

## 🚀 SCHNELL-ANLEITUNG:

### **1. Account mit Admin-Email erstellen:**

1. **Klicken Sie auf User-Icon** (oben rechts)
2. **Registrieren** Sie sich mit der Email, die Sie oben festgelegt haben
3. **Passwort** wählen
4. **Fertig!**

### **2. Admin-Panel nutzen:**

Nach dem Login sehen Sie:
```
Home  Produkte  Nach Wunsch  Rezepte  🎛️ Admin  ← DAS ERSCHEINT NUR FÜR SIE!
```

**Klicken Sie auf "🎛️ Admin"** und verwalten Sie:
- ✅ Produkte erstellen/bearbeiten/löschen
- ✅ Rezepte erstellen/bearbeiten/löschen

---

## 🔒 SICHERHEIT:

### **Aktuell:**
- Nur die festgelegte Email sieht das Admin-Panel
- Andere Benutzer haben keinen Zugriff
- Der Link wird automatisch versteckt

### **Wichtig:**
- Verwenden Sie eine **sichere Email**
- Wählen Sie ein **starkes Passwort**
- Geben Sie Ihre Admin-Email **nicht weiter**

---

## 📝 MEHRERE ADMINS HINZUFÜGEN:

Wenn Sie mehrere Admins haben möchten:

```typescript
const ADMIN_EMAILS = ['admin1@example.com', 'admin2@example.com'];
const isAdmin = ADMIN_EMAILS.includes(currentUser?.email);
```

---

## ✅ ZUSAMMENFASSUNG:

**3 Schritte zum Admin-Zugang:**

1. **Email in `/App.tsx` festlegen** (Zeile 235)
2. **Account mit dieser Email erstellen**
3. **Einloggen & auf "🎛️ Admin" klicken**

**Das war's! 🎉**

---

## 🎛️ ADMIN-FUNKTIONEN:

### **TAB: Produkte**
- Neue Produkte erstellen
- Produkte bearbeiten
- Produkte löschen
- Bilder von Unsplash hochladen
- Als "Beliebt" markieren
- Verfügbarkeit steuern

### **TAB: Rezepte**
- Neue Rezepte erstellen
- Rezepte bearbeiten
- Rezepte löschen
- Zutaten & Anleitung hinzufügen
- Schwierigkeitsgrad festlegen
- Zeiten & Portionen angeben

---

**Jetzt können nur Sie Produkte & Rezepte verwalten! 🔐**
