# 📦 LogiPic – Die smarte Mitarbeiter- und Etikettenplanung

**LogiPic** ist eine moderne, responsive Web-App zur Planung von Mitarbeiterschichten und Etikettenleistung – speziell optimiert für mobile Nutzung, inklusive **PWA-Unterstützung** ✅.

---

## 🧠 Funktionen

- 📋 Mitarbeiterverwaltung mit individuellen Arbeitszeiten und Leistung
- 🗓️ Planung pro Wochentag inkl. Pics/h, Start-/Endzeit
- 📊 Dashboard mit Leistungsübersicht: erwartete vs. geplante Etiketten
- 📱 Mobile First & PWA-fähig: als App installierbar auf Android und iOS
- 🌑 Darkmode inklusive

---

## ⚙️ Tech Stack

| Technologie                                                                          | Beschreibung     |
| ------------------------------------------------------------------------------------ | ---------------- |
| [React](https://react.dev/)                                                          | UI-Framework     |
| [Vite](https://vitejs.dev/)                                                          | Build-Tool       |
| [TypeScript](https://www.typescriptlang.org/)                                        | Typsicherheit    |
| [TailwindCSS](https://tailwindcss.com/)                                              | Styling          |
| [shadcn/ui](https://ui.shadcn.dev/)                                                  | UI-Komponenten   |
| [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Datenspeicherung |

---

## 🚀 Installation

```bash
npm install
npm run dev
```

Die App läuft lokal unter:  
👉 https://logipic.netlify.app/

---

## 📲 Als App zum Startbildschirm hinzufügen

### ✅ Android (Google Chrome)

1. Rufe `https://logipic.netlify.app` im Chrome-Browser auf
2. Tippe oben rechts auf das **⋮ Menü**
3. Wähle **„Zum Startbildschirm hinzufügen“**
4. Bestätige – fertig ✅

### 🍏 iPhone (Safari)

1. Öffne `https://logipic.netlify.app` in **Safari**
2. Tippe unten auf das **Teilen-Symbol (🧭)**
3. Wähle **„Zum Home-Bildschirm“**
4. Name vergeben → **Hinzufügen** tippen

> Hinweis: Die App wird dann **im Vollbildmodus** gestartet und wirkt wie eine native Anwendung.

---

## 🛠️ Entwicklerhinweise

### 📁 Datenstruktur (Beispiel)

```ts
Employee = {
  name: string;
  lastname: string;
  average: number; // Pics/h
  weekdays: [
    {
      day: "Montag" | ...;
      start: string;
      end: string;
      hours: number;
    }
  ];
}
```

### 📦 localStorage-Keys

- `"employees"` – gespeicherte Mitarbeiterdaten
- `"weekPlan"` – erwartete Etiketten pro Wochentag

---

## 📌 Noch zu tun / Ideen

- 🔄 Sync mit Backend
- 🧮 Automatische Optimierungsvorschläge
- 🖨️ Etiketten-Druckvorschau
- 📉 Wöchentliche Auswertung / Export

---

## 🤝 Autor

Erstellt mit ❤️ von [@realmaxv](https://github.com/realmaxv)

---

> **LogiPic** – Mehr Überblick. Weniger Zettel.
