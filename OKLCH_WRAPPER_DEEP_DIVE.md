# Deep Dive: oklch(from ...) Wrapper Problem

## Stand: 28.01.2026

## Problem

Das Plugin `tw-easing-gradients` generiert easing-basierte CSS Gradients mit `color-mix(in oklch, ...)` und einem `oklch(from ... l c h / alpha)` Wrapper um jeden Stop.

**Beobachtung:**

- `from-[#06B6D4]` (Hex) sieht visuell **glatter/cleaner** aus als `from-cyan-500` (Tailwind oklch)
- Ohne den `oklch(from ...)` Wrapper sehen **beide gleich** aus, aber **weniger smooth**
- Der Wrapper verbessert also **nur Hex-Input**, weil er eine zusatzliche hex-to-oklch Konvertierung erzwingt

## Aktuell generiertes CSS

Pro Gradient-Stop (intermediate):

```css
oklch(
  from color-mix(
    in oklch,
    var(--tw-gradient-to, oklch(from var(--tw-gradient-from) l c h / 0)) X%,
    var(--tw-gradient-from)
  )
  l c h / alpha
)
```

Der **aeussere Wrapper** `oklch(from ... l c h / alpha)` ist mathematisch eine **Identitaetsfunktion** - er extrahiert alle Komponenten (l, c, h, alpha) und rekonstruiert dieselbe Farbe.

## Root Cause Analyse

### Warum Hex "besser" aussieht

Wenn der Browser `oklch(from #06B6D4 l c h / alpha)` verarbeitet:

1. Browser konvertiert `#06B6D4` (sRGB) nach oklch
2. Hex-Farben sind **immer innerhalb des sRGB-Gamuts** - die resultierenden oklch-Werte sind "safe"
3. Die Konvertierung produziert gerundete/geclampte Werte

Wenn der Browser `oklch(from oklch(0.715 0.143 215.221) l c h / alpha)` verarbeitet:

1. Die Werte sind **bereits in oklch** - keine Konvertierung noetig
2. **No-Op** - die Werte passieren unveraendert
3. Die oklch-Werte von Tailwind v4 koennten durch Rundung **leicht ausserhalb des sRGB-Gamuts** liegen

### CSS Color 4 Spec Verhalten

Laut Spec (und bestaetigt durch Evil Martians):

> "CSS Colors 4 spec requires browsers to use the OKLCH method for gamut mapping. But still, right now, Chrome and Safari use the fast, but inaccurate, clipping method."

- **Relative Color Syntax** (`oklch(from X l c h / alpha)`) clampt **nicht** waehrend der Berechnung
- Gamut-Mapping passiert erst beim **finalen Rendering/Paint**
- Es gibt **keine CSS-only Methode**, um Gamut-Clamping mid-computation zu erzwingen

### Browser-Verhalten

- `color(srgb from X r g b)` extrahiert sRGB-Werte **ohne Clamping** (auch negative/ueber-1 Werte)
- `hsl(from X h s l)` extrahiert HSL-Werte **ohne Clamping**
- Erst beim finalen Paint/Display werden out-of-gamut Werte auf den Monitor-Gamut gemappt
- Chrome und Safari verwenden dabei die schnelle **Clipping-Methode** statt korrekte OKLCH-Gamut-Mapping

## Moegliche Loesungen

### Option A: Wrapper entfernen (Konsistenz)

```css
/* Vorher */
oklch(from color-mix(in oklch, TO X%, FROM) l c h / alpha)

/* Nachher */
color-mix(in oklch, TO X%, FROM)
```

**Pro:** Konsistentes Verhalten fuer alle Input-Formate, weniger CSS-Output
**Contra:** Beide Formate sehen "gleich" aus, aber verlieren den "glatteren" Hex-Look

### Option B: sRGB Round-Trip erzwingen

```css
oklch(
  from color(srgb
    from color-mix(in oklch, TO X%, FROM)
    r g b / alpha
  )
  l c h / alpha
)
```

**Idee:** Durch den Umweg ueber `color(srgb ...)` beide Inputs durch die gleiche Pipeline schicken.
**Problem:** CSS Relative Color Syntax clampt laut Spec nicht mid-computation. Ob Browser das trotzdem tun, ist ein Implementierungsdetail.

### Option C: Input-Normalisierung via Private Properties

```css
.bg-ease-to-r {
	--_eg-from: color(srgb from var(--tw-gradient-from) r g b / alpha);
	--_eg-to: color(srgb from var(--tw-gradient-to, ...) r g b / alpha);
	background-image: linear-gradient(
		to right,
		var(--_eg-from) 0%,
		color-mix(in oklch, var(--_eg-to) X%, var(--_eg-from))...
	);
}
```

**Idee:** Beide Farben vorab in sRGB aufloesen, dann in oklch mixen.
**Pro:** Konsistente Pipeline, sauberer CSS-Output, Inputs werden normalisiert
**Contra:** Effektives Gamut-Clamping haengt vom Browser ab

### Option D: Mehr Stops

Mehr Gradient-Stops (z.B. 30-50 statt 15) koennen visuelle Unterschiede minimieren, indem die Farbspruenge zwischen Stops kleiner werden.

**Pro:** Einfach zu implementieren, browser-unabhaengig
**Contra:** Groesserer CSS-Output, loest nicht die Root Cause

## Technische Details

### Tailwind v4 Farbformat

Tailwind v4 definiert Farben nativ in oklch:

- `cyan-500` = `oklch(0.715 0.143 215.221)`
- `#00b8db` in oklch ~ `oklch(0.715 0.143 215.221)`

**Hinweis:** `#00b8db` wurde so gewaehlt, dass es exakt den gleichen oklch-Wert wie `cyan-500` hat. Damit ist der visuelle Unterschied im Gradient **ausschliesslich** auf den `oklch(from ...)` Wrapper zurueckzufuehren, nicht auf unterschiedliche Farbwerte.

### Relevante CSS Specs

- [CSS Color Level 4](https://www.w3.org/TR/css-color-4/) - oklch(), color-mix(), relative color syntax
- [CSS Color Level 5](https://www.w3.org/TR/css-color-5/) - color-mix() definition
- Gamut Mapping: Spec erfordert OKLCH-basiert, Browser implementieren Clipping

### Plugin Source

- Datei: `packages/tw-easing-gradients/src/index.ts`
- Funktion: `generateGradientStops()`
- Easing: `packages/tw-easing-gradients/src/easing.ts`

## Naechste Schritte

- [ ] Vergleichsseite erstellen (Hex vs oklch, alle Richtungen)
- [ ] Browser-Tests: Wie verhaelt sich der sRGB Round-Trip in Chrome/Safari/Firefox?
- [ ] Option B oder C implementieren und visuell vergleichen
- [ ] Entscheidung treffen basierend auf visuellen Tests
