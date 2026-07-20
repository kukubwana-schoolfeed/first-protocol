# CLAUDE.md — First Protocol Logistics Website (v2 — Retrofit Spec)
## Read this entire document before touching any file. It REPLACES the original build spec. Where existing code conflicts with this document, this document wins.

---

## Project Overview
A **static multi-page HTML website** for **First Protocol Logistics**, a customs clearing agency operating at Zambia's borders, deployed on Vercel from GitHub. The site already exists and is being **retrofitted** to a new design direction: same industrial, rugged, premium brand — new structure, honest content, and working lead capture. No frameworks, no build tools, no npm. Pure HTML, CSS, and vanilla JavaScript. One CSS file, one JS file, shared by all pages.

The prime goals: **one continuous conversion journey on the homepage** (a visitor goes from landing to "messaged us on WhatsApp" without leaving the page), **only true facts on the site**, and **fast load on slow mobile data**.

---

## GROUND TRUTH — the ONLY company facts permitted anywhere on this site

| Fact | Value |
|---|---|
| Company | First Protocol Logistics |
| Phone / WhatsApp | **+260 955 872 277** → `tel:+260955872277` and `https://wa.me/260955872277` |
| Email | **info@firstprotocol.com** — the old `info@firstprotocol.co.zm` is WRONG; replace everywhere, including `<meta>` tags |
| Office (the only one) | 128 Kitwe Road, Silverest Gardens |
| Directions line | "Turn right into Kitwe Road — last house on your right." |
| Hours | Mon–Fri 08:00–17:00 · Sat 08:00–13:00 CAT |
| Borders covered | Kazungula, Chirundu, Nakonde |
| Trust positioning | The **team's decades of combined hands-on border clearing experience**. Never company age. Never clearance counts. |
| Updates promise | "Regular updates on WhatsApp at every milestone" — this is the honest wording. Never claim a "real-time tracking" system. |

**Map embed iframe `src` (use verbatim):**
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1688.5257351518842!2d28.472964573544143!3d-15.377421246387295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x194088a4c962e417%3A0xf97a739df4e8d74e!2sSilverest%20Gardens%20Housing%20Complex!5e0!3m2!1sen!2szm!4v1784514039102!5m2!1sen!2szm
```
**"Open in Google Maps" directions button href (use verbatim):**
```
https://www.google.com/maps/dir/?api=1&destination=-15.377421,28.472965
```

## THE FOUR SERVICES — exactly these, no others

1. **Commercial Goods Clearing** — trucks, containers and commercial consignments cleared at the border.
2. **Personal Vehicle Clearing** — imported cars and personal vehicles cleared and processed.
3. **Import & Export Documentation** — declarations, permits and paperwork prepared and checked.
4. **Duty Calculation & Advisory** — know what you'll pay before your goods reach the border.

---

## BANNED CONTENT — remove on sight, never re-add, never re-invent

- The three testimonials (James M., Miriam K., David C.) — fabricated placeholders; the entire testimonials section goes
- Animated stat counters and their claims: "500+ Clearances", "10+ Border Posts", "100% ZRA Compliance Rate"
- Offices in Ndola, Kitwe, Livingstone — there is one office (see Ground Truth)
- The 24/7 emergency hotline / "Stuck at the border?" box
- "We respond within 2 hours" (any response-time promise)
- Placeholder phone numbers (`+260-XXX-XXXXXX`, `wa.me/260XXXXXXXXX`)
- `info@firstprotocol.co.zm`
- "Real-Time Tracking" as a system/feature claim (see Ground Truth for honest wording)
- "Dedicated Account Managers"
- Team placeholder cards ("Profiles coming soon")
- "COMESA Member" and "Zambia Chamber of Commerce" certification badges (unverified)
- The "Regulatory Updates" section and the featured "2026 Customs Tariff Review" article on resources.html (invented news presented as fact)
- Freight forwarding, warehousing, trade consulting, and "specialized services" presented as offered services
- The fake form submission (`setTimeout` → success message that sends nothing)
- Dead links: `href="#"` Privacy Policy / Terms of Service (remove until real pages exist)
- Any invented fact, number, statistic, client, date, price, or filename

---

## Brand Identity — UNCHANGED. Keep verbatim.

The existing `:root` variables in `assets/css/style.css` are the law:

```css
:root {
  --green: #1C7A1C;
  --green-light: #24a024;
  --green-glow: rgba(28, 122, 28, 0.3);
  --green-glow-strong: rgba(28, 122, 28, 0.6);
  --orange: #FF8C00;
  --orange-light: #ffa333;
  --orange-glow: rgba(255, 140, 0, 0.3);
  --orange-glow-strong: rgba(255, 140, 0, 0.6);
  --black: #0A0A0A;
  --black-2: #111111;
  --black-3: #1a1a1a;
  --black-4: #222222;
  --white: #FFFFFF;
  --muted: #CCCCCC;
  --muted-dark: #888888;
  --font-display: 'Bebas Neue', cursive;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
  --transition: all 0.3s ease;
  --transition-slow: all 0.6s ease;
  --border-radius: 8px;
  --border-radius-lg: 16px;
  --max-width: 1200px;
  --section-padding: 100px 0;
}
```

Color rule, font rule (Montserrat 300 thin / 800 bold contrast in headings, Bebas Neue for hero display), noise-texture overlays, gradient rules, and the existing animation system (scroll reveal, tilt cards, ripple, marquee) all carry over. **Do not redesign the brand.**

---

## File Structure

```
first-protocol/
├── CLAUDE.md
├── index.html
├── about.html
├── services.html
├── resources.html
├── contact.html
├── vercel.json          ← NEW (redirect only)
└── assets/
    ├── images/          ← all-new optimized set (see manifest)
    ├── css/style.css    ← the ONE stylesheet
    └── js/main.js       ← the ONE script
```

- `process.html` is **deleted** in this retrofit (content folds into index + contact; `vercel.json` redirects it).
- Never create additional CSS or JS files. Never use inline `<style>` blocks. No frameworks, no libraries, no CDN scripts.

---

## Image Manifest — the ONLY image files that exist. Reference nothing else.

| File | Dimensions | Notes |
|---|---|---|
| `logo.webp` | 200×200, transparent | navbar (render at 50px h) & footer (60px h) |
| `favicon.png` | 48×48 | `<link rel="icon" href="favicon path">` on every page |
| `hero-video.mp4` | 1920×1080, 11 s | homepage hero only; will later be replaced by Kazungula aerial footage under the SAME filename — never rename this slot |
| `hero-poster.webp` | 1600×900 | `poster` attribute of the hero video |
| `about-lusaka-1.webp` | 1165×650 | |
| `about-lusaka-2.webp` | 736×981 | portrait |
| `border-kazungula-1.webp` | 1024×578 | |
| `border-kazungula-2.webp` | 1500×617 | wide — good for page heroes |
| `cargo-ship-1.webp` | 1600×1066 | largest photo |
| `cargo-ship-2.webp` | 1022×575 | |
| `cargo-truck-1.webp` | 612×408 | |
| `customs-docs.webp` | 736×736 | |
| `team-office.webp` | 736×1051 | portrait |
| `warehouse-1.webp` | 768×512 | |
| `warehouse-2.webp` | 1000×1000 | |
| `cargo-air.webp` | 736×488 | |
| `border-chirundu-1.webp` | 400×266 | SMALL — card thumbnails only |
| `border-chirundu-2.webp` | 355×142 | SMALL — card thumbnails only |
| `border-nakonde.webp` | 259×194 | SMALL — card thumbnails only |
| `cargo-truck-2.webp` | 410×123 | SMALL — card thumbnails only |

**Image rules:**
- Never place an image in a slot rendered wider than its pixel width. Files marked SMALL never appear in heroes or half-column section images.
- Update every `src`, `background-image`, and `<img>` reference from the old `.jpg`/`.png` names to these `.webp` names.
- All images below the fold: `loading="lazy"`. The map iframe: `loading="lazy"`.
- Hero video tag: `<video autoplay muted loop playsinline preload="none" poster="assets/images/hero-poster.webp">`.

---

## Site Architecture

**Navbar (all pages):** Home · Services · How It Works (→ `index.html#how-it-works`) · About · Resources · Contact — plus a **WhatsApp icon link** (`wa.me/260955872277`) and the **GET A QUOTE** button → `index.html#quote`. Remove all "Process" links. Same sticky/blur/hamburger behaviour as now.

**index.html — the conversion journey, in this exact order:**
1. Hero (video + particles + new copy + Get a Quote + WhatsApp)
2. Trust marquee (staff-experience reframe)
3. Why First Protocol — 3 value cards (Speed / Compliance / Transparency, honest copy)
4. Services — 4 cards (the four services)
5. How It Works — `id="how-it-works"`, 4 numbered steps
6. Quote form — `id="quote"`, WhatsApp-compose mechanism
7. Office Location — map embed + address + directions + GPS button + hours
8. Final CTA banner
9. Footer

**Sub-pages** are depth, not required stops: `services.html` (the four, in detail, with anchor ids), `about.html` (story/mission/values, swept of banned claims), `resources.html` (slimmed guides), `contact.html` (form + real info + FAQ accordion moved from the old process page). Every sub-page ends at a CTA back to the quote form or WhatsApp.

**vercel.json (create exactly):**
```json
{
  "redirects": [
    { "source": "/process.html", "destination": "/#how-it-works", "permanent": true }
  ]
}
```

---

## Component Specs

### Quote form (homepage `#quote`, and contact.html — one shared mechanism)
Fields: **Name*** · **Phone*** · **What are you clearing?*** (text, placeholder "e.g. 1 × Toyota Hilux from Japan / 30-ton truck of tiles") · **Border** (select: Kazungula / Chirundu / Nakonde / Not sure). Contact page may add its service dropdown — options = the four services + "Not sure".

On submit, JavaScript builds a message and opens WhatsApp — **this is the delivery mechanism, there is no backend**:

```js
const msg = `New quote request — website
Name: ${name}
Phone: ${phone}
Clearing: ${goods}
Border: ${border}`;
window.open('https://wa.me/260955872277?text=' + encodeURIComponent(msg), '_blank');
```

Then show an inline note (not a fake success): *"Opening WhatsApp… If nothing opened, message us directly on +260 955 872 277 or email info@firstprotocol.com."* — with the number as a `wa.me` link and the email as `mailto:`. Basic required-field validation only. The old `setTimeout` fake submit is deleted.

### Office Location section
Heading, the map iframe (verbatim src, `loading="lazy"`, full-width responsive), then: address line, directions line, hours, and an **"Open in Google Maps"** button (`btn btn-primary`) using the verbatim directions href.

### Help bot ("Quick answers")
A floating chat bubble **bottom-left** (the WhatsApp float keeps bottom-right). Tapping opens a small dark panel matching the brand. It is **fully scripted** — plain HTML/CSS/JS in the shared files, no external service, no AI, no free-text input. It shows 4 tappable questions; each answer ends with a WhatsApp button. Exact Q&A text is provided in EXECUTION-BRIEF.md — use it verbatim; **never invent answers and never state prices**. Panel footer: "Prefer a human? Chat on WhatsApp" (prefill: "Hello First Protocol, I have a question about clearing my goods.").

### Reduced motion
Add `@media (prefers-reduced-motion: reduce)` CSS and a JS guard (`matchMedia('(prefers-reduced-motion: reduce)').matches`): particles never start, tilt disabled, reveals appear instantly, marquee stands still.

---

## Performance Rules
- Only `transform` and `opacity` are animated. `will-change: transform` on tilt cards.
- No external JS/CSS beyond the existing Google Fonts import.
- Lazy-load everything below the fold, including the map iframe.
- The optimized image set + poster keeps the homepage first paint fast on slow mobile data. Do not add heavy assets.

## SEO (every page)
- Title format `Page | First Protocol Logistics`; rewrite descriptions around **customs clearing at Zambia's borders — Kazungula, Chirundu, Nakonde — Silverest Gardens, Lusaka**; four services only.
- Fix the email and remove multi-office claims from all meta/og tags. Add the favicon link.

## What NOT To Do
- Do NOT add frameworks, libraries, build tools, or new css/js files
- Do NOT invent facts, numbers, clients, prices, dates, or filenames — if a fact isn't in Ground Truth, it doesn't go on the site
- Do NOT redesign the brand system or replace the animation engine
- Do NOT touch or rename `hero-video.mp4`
- Do NOT add features beyond CLAUDE.md + EXECUTION-BRIEF.md
- Do NOT commit or push until the user explicitly says so
