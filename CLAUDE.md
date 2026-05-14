# CLAUDE.md — First Protocol Logistics Website
## Read this entire document before writing a single line of code.

---

## Project Overview
A **static multi-page HTML website** for **First Protocol Logistics**, a customs clearing and freight forwarding company based in Lusaka, Zambia. The site must feel **industrial, rugged, and premium** — like a company that moves serious cargo across serious borders. No frameworks, no build tools, no npm. Pure HTML, CSS, and vanilla JavaScript only.

---

## Brand Identity

| Element | Value |
|---|---|
| **Company Name** | First Protocol Logistics |
| **Tagline** | Your Gateway to Seamless Trade in Zambia and Beyond |
| **Primary Green** | `#1C7A1C` |
| **Green Light** | `#24a024` |
| **Green Glow** | `rgba(28, 122, 28, 0.3)` |
| **Primary Orange** | `#FF8C00` |
| **Orange Light** | `#ffa333` |
| **Orange Glow** | `rgba(255, 140, 0, 0.3)` |
| **Black Base** | `#0A0A0A` |
| **Black 2** | `#111111` |
| **Black 3** | `#1a1a1a` |
| **Black 4** | `#222222` |
| **White** | `#FFFFFF` |
| **Muted** | `#CCCCCC` |
| **Muted Dark** | `#888888` |
| **Font — Display** | Bebas Neue (Google Fonts) — large hero headings only |
| **Font — Headings** | Montserrat (Google Fonts) — weight 300 and 800 for thin/thick contrast |
| **Font — Body** | Inter (Google Fonts) — weight 300 and 400 |

**Color rule:** Green and orange are used equally. Green for structural elements (borders, active states, section accents, icon backgrounds). Orange for CTAs, highlights, hover states, heading underlines. Never introduce blue, purple, or grey as primary colors.

**Font rule:** Headings use Montserrat 800 for bold words and weight 300 for thin words in the same heading. Example: `<span class="thin">SEAMLESS</span> <span class="bold">TRADE</span>`. Large hero text uses Bebas Neue only.

---

## CSS Variables (First thing in style.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;600;800&family=Inter:wght@300;400;500&display=swap');

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

---

## File Structure Rules

```
first-protocol/
├── CLAUDE.md
├── README.md
├── index.html
├── about.html
├── services.html
├── process.html
├── resources.html
├── contact.html
├── assets/
│   ├── images/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
```

**Hard rules:**
- Never create additional CSS or JS files — one of each, shared across all pages
- Never use inline `<style>` blocks inside any HTML file
- Never use a CSS framework (no Tailwind, no Bootstrap)
- Never use a JS framework (no React, no Vue, no jQuery)
- All pages link assets with relative paths: `assets/css/style.css` and `assets/js/main.js`

---

## Image Assets

All images live in `assets/images/`. Use ONLY these filenames. Do not invent, guess, or substitute any filename.

| Filename | Used On | Section |
|---|---|---|
| `logo.png` | ALL pages | Navbar |
| `hero-video.mp4` | index.html | Hero background video |
| `border-kazungula-1.jpg` | index.html | Why Choose Us section |
| `border-kazungula-2.jpg` | services.html | Customs Clearing section |
| `border-chirundu-1.jpg` | index.html | Services Snapshot |
| `border-chirundu-2.jpg` | about.html | Story section |
| `border-nakonde.jpg` | services.html | Freight Forwarding section |
| `cargo-ship-1.jpg` | services.html | Sea Freight |
| `cargo-ship-2.jpg` | resources.html | Featured article card |
| `cargo-truck-1.jpg` | index.html | Services Snapshot card |
| `cargo-truck-2.jpg` | services.html | Road Freight |
| `cargo-air.jpg` | services.html | Air Freight |
| `warehouse-1.jpg` | services.html | Warehousing section |
| `warehouse-2.jpg` | about.html | Values section |
| `customs-docs.jpg` | process.html | Documentation step |
| `about-lusaka-1.jpg` | about.html | Hero background |
| `about-lusaka-2.jpg` | contact.html | Contact hero background |
| `team-office.jpg` | about.html | Team section |

---

## Global UI & Animation Rules

These apply to every page, every section, every element.

### Texture & Atmosphere
- Apply a subtle noise/grain texture overlay on all dark sections using a CSS pseudo-element with SVG noise filter — gives the industrial rugged feel
- Use `border-left: 3px solid var(--green)` or `border-left: 3px solid var(--orange)` as section accent markers on headings
- Thin horizontal rules styled as gradient lines: `background: linear-gradient(90deg, var(--green), var(--orange), transparent)`

### Scroll Reveal Animations
Use the Intersection Observer API (vanilla JS, no library). Every element below the fold animates in on scroll:
- **Fade up:** Cards, paragraphs, images — `opacity: 0; transform: translateY(40px)` to `opacity: 1; transform: translateY(0)` over 0.6s ease
- **Fade left:** Section headings — slide in from left
- **Fade right:** Images on right side — slide in from right
- **Staggered:** Card grids stagger with 0.1s delay per card (card 1 at 0s, card 2 at 0.1s, card 3 at 0.2s)
- Add class `reveal` to any element that should animate. JS handles the rest.

### 3D Card Hover (Tilt Effect)
Apply to ALL service cards, blog cards, value cards, and stat cards:
```javascript
// On mousemove over card
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
const centerX = rect.width / 2;
const centerY = rect.height / 2;
const rotateX = (y - centerY) / 10;
const rotateY = (centerX - x) / 10;
card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
// On mouseleave
card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
```
Cards must have `transition: transform 0.1s ease` during move and `transition: transform 0.5s ease` on reset. Add `will-change: transform` to all tilt cards.

### Button Animations
All buttons must have:
- Gradient shift on hover: green to orange or orange to green
- Glow pulse: `box-shadow: 0 0 20px var(--green-glow)` on hover
- Scale: `transform: scale(1.05)` on hover
- Active press: `transform: scale(0.97)`
- Ripple effect on click (JS — create a span that expands and fades out)

### Animated Counter
Stats bar on index.html — numbers count up from 0 when scrolled into view using Intersection Observer. Count from 0 to target over 2 seconds with easeOut timing.

### Animated Nav Underline
```css
nav a::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--green), var(--orange));
  transition: width 0.3s ease;
}
nav a:hover::after, nav a.active::after {
  width: 100%;
}
```

### Section Entrance
Each section heading has a left-border accent that grows downward on scroll using `scaleY` from 0 to 1.

---

## Hero Section — index.html (Most Important)

### Video Background
```html
<section class="hero">
  <video autoplay muted loop playsinline class="hero-video">
    <source src="assets/images/hero-video.mp4" type="video/mp4">
  </video>
  <div class="hero-overlay"></div>
  <canvas id="particles-canvas"></canvas>
  <div class="hero-content">...</div>
</section>
```

### Overlay
Dark gradient: `background: linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 100%)`

### Particle Network (Vanilla JS Canvas — No Library)
Draw on `#particles-canvas` positioned absolute over hero:
- 80 particles, radius 1.5px, colors `rgba(28,122,28,0.6)` and `rgba(255,140,0,0.4)` alternating
- Particles move slowly and randomly
- Draw connecting lines between particles within 120px — line opacity based on distance
- Mouse proximity: particles within 150px of cursor are gently repelled
- Canvas resizes with window
- On mobile: reduce to 40 particles

### Hero Text
```
[Bebas Neue 90px]
YOUR GATEWAY TO
SEAMLESS TRADE

[Montserrat 300 18px letter-spacing 4px muted]
ZAMBIA · SADC · COMESA · GLOBAL

[Two CTA buttons]
[GET A FREE QUOTE — orange solid]    [OUR SERVICES — green outline]
```

### Hero Scroll Indicator
Bouncing animated chevron arrow at bottom of hero, fades out on scroll.

---

## Navbar (Identical on All Pages)

```
[Logo left — 50px height]    [Home  About  Services  Process  Resources  Contact]    [GET A QUOTE — orange]
```

- Background: `rgba(10,10,10,0.95)` with `backdrop-filter: blur(10px)`
- Sticky, fixed top, `z-index: 9999`
- On scroll past 50px: add `border-bottom: 1px solid var(--green)`
- Active page link: green color with animated underline
- Mobile: hamburger at 768px, 3 lines animate to X, full-screen dark overlay menu
- "GET A QUOTE" links to contact.html

---

## Page-by-Page Content

### 1. index.html — Homepage

Section order:
1. Navbar
2. Hero (video + particles + text + CTAs)
3. Marquee ticker strip — scrolling: "ZRA LICENSED · SADC EXPERTISE · REAL-TIME TRACKING · COMESA CERTIFIED · 500+ CLEARANCES · KAZUNGULA · CHIRUNDU · NAKONDE ·" — green text on black-2, infinite loop
4. Value Props — 3 cards: Speed / Compliance / Transparency — icon, title, description
5. Services Snapshot — 5 cards, `border-top: 3px solid` alternating green/orange, icon, title, short description, "Learn More →" to services.html. Use images: `cargo-truck-1.jpg` and `border-chirundu-1.jpg` as card backgrounds with overlays
6. Why Choose Us — image left (`border-kazungula-1.jpg`), content right — 4 points: ZRA Licensed / SADC-COMESA Expertise / Real-time Tracking / Dedicated Account Managers — each with green checkmark icon, bold title, description
7. Stats Bar — dark-3 background, 3 animated counters in Bebas Neue: "500+ Clearances" / "10+ Border Posts" / "100% ZRA Compliant"
8. Testimonials — 3 placeholder quote cards with glassmorphism style: dark bg, subtle green/orange border, blur
9. Final CTA Banner — dark card with green-to-orange gradient border: "Ready to Clear Your Cargo?" + "Get a Free Quote" button
10. Footer

### 2. about.html — About Us

Section order:
1. Navbar
2. Hero — `about-lusaka-1.jpg` background, dark overlay, page title
3. Our Story — text left, `border-chirundu-2.jpg` image right with orange corner accent frame
4. Mission & Vision — two cards side by side, green border on Mission card, orange border on Vision card
5. Our Values — 4 tilt cards: Integrity / Efficiency / Innovation / Client-First — icon, title, description
6. Team Section — 3 placeholder cards: grey silhouette avatar, "Team Member" title, "Role" subtitle, note "Profiles coming soon"
7. Certifications — horizontal badges: ZRA Licensed / COMESA Member / Zambia Chamber of Commerce
8. Footer

### 3. services.html — Services

Section order:
1. Navbar
2. Hero — `border-chirundu-1.jpg` background, dark overlay, page title
3. Intro paragraph
4. Five alternating image/text service sections:

   **A. Customs Clearing & Brokerage** — `border-kazungula-2.jpg`
   - Import/export clearance: Kazungula, Nakonde, Chirundu
   - Duty calculation and advisory
   - ZRA liaison and dispute resolution
   - Temporary importation handling

   **B. Freight Forwarding** — `border-nakonde.jpg`
   - Sea freight LCL/FCL via Dar es Salaam, Durban, Walvis Bay
   - Air freight via Lusaka and Ndola
   - Road freight across SADC
   - Multimodal solutions

   **C. Warehousing & Storage** — `warehouse-1.jpg`
   - Bonded warehousing
   - Distribution: Lusaka, Ndola, Kitwe
   - Inventory management
   - Last-mile delivery

   **D. Trade Consulting** — `customs-docs.jpg`
   - HS code classification
   - Duty drawback assistance
   - Compliance audits
   - COMESA/SADC FTA utilization

   **E. Specialized Services** — `cargo-truck-2.jpg`
   - Project cargo
   - Cold chain / perishables
   - Mining equipment
   - Vehicle importation

   Each section has "Request This Service" CTA button.

5. Footer

### 4. process.html — How It Works

Section order:
1. Navbar
2. Hero — dark background with CSS-only geometric line pattern, page title
3. Process Timeline — vertical, 4 steps animate in sequentially on scroll:
   - Step 1: CONSULTATION — green circle node
   - Step 2: DOCUMENTATION — orange circle node, `customs-docs.jpg` thumbnail
   - Step 3: CLEARANCE — green circle node
   - Step 4: DELIVERY — orange circle node
   - Connecting line draws itself via CSS animation triggered by scroll
4. Timeline Estimates — 3 cards: Air (2-3 days) / Road (3-5 days) / Sea (7-14 days) — icon, timeframe, ports
5. Transparency Promise — 3 items: Real-time updates / No hidden fees / Dedicated tracking
6. FAQ Accordion — 8 questions, smooth expand/collapse, alternating green/orange active state:
   - "What documents do I need for import clearance?"
   - "How are duties and taxes calculated?"
   - "Do you handle transit goods through Zambia?"
   - "Which borders do you operate at?"
   - "How long does customs clearance take?"
   - "Can you handle emergency or time-sensitive shipments?"
   - "Do you offer real-time shipment tracking?"
   - "What makes First Protocol different from other clearing agents?"
7. Footer

### 5. resources.html — Insights

Section order:
1. Navbar
2. Hero — dark, page title
3. Featured Article — full-width card, `cargo-ship-2.jpg` background with overlay, article title and excerpt
4. Blog Grid — 4 tilt cards:
   - "Understanding Zambia's 2026 Import Duty Structure"
   - "Navigating SADC Rules of Origin for Exporters"
   - "How to Reduce Clearance Delays at Kazungula Border"
   - "COMESA Certificate of Origin: What You Need to Know"
   - Each: category tag (green or orange), title, excerpt, "Read More →"
5. Downloadable Guides — 3 cards with download icon, "Coming Soon" badge:
   - "Zambia Import/Export Checklist"
   - "HS Code Reference Guide"
   - "Customs Documentation Templates"
6. Regulatory Updates — list of 3 updates with date and green dot indicator
7. Footer

### 6. contact.html — Contact Us

Section order:
1. Navbar
2. Hero — `about-lusaka-2.jpg` background, dark overlay, page title
3. Two-column layout:

   **Left — Contact Form:**
   - Full Name / Company Name / Email / Phone / Service Needed (dropdown) / Shipment Details / Message
   - Submit: orange full-width button with loading state
   - Fields: `#1a1a1a` background, green border on focus, white text

   **Right — Contact Info:**
   - Phone: +260-XXX-XXXXXX (tel: link)
   - Email: info@firstprotocol.co.zm (mailto: link)
   - WhatsApp button
   - Offices: Lusaka / Ndola / Kitwe / Livingstone
   - Hours: Mon–Fri 08:00–17:00 CAT
   - Emergency callout box (orange border): "Stuck at the border? Call our 24/7 hotline"

4. Google Map placeholder — dark styled div: "Map Loading — Lusaka, Zambia"
5. Footer

---

## Footer (Identical on All Pages)

4-column layout:
- Col 1: Logo (60px) + tagline blurb
- Col 2: Quick Links — Home / About / Services / Process / Resources / Contact
- Col 3: Services list
- Col 4: Phone / Email / Address / Hours

Bottom: gradient rule (green → orange) then copyright line.
Footer bg: `#050505`. Headings: orange. Links: muted → white on hover.

---

## WhatsApp Floating Button (All Pages)

Fixed bottom-right `z-index: 9998`. Green circle, white icon, pulse ring animation, tooltip "Chat on WhatsApp".
```html
<a href="https://wa.me/260XXXXXXXXX" class="whatsapp-float" target="_blank">
  <!-- WhatsApp SVG -->
</a>
```

---

## main.js — All JS in This Order

1. Navbar scroll effect — class `scrolled` after 50px
2. Mobile hamburger — toggle, animate lines to X
3. Particle network canvas — full implementation, hero only
4. Scroll reveal — Intersection Observer on `.reveal` elements
5. 3D card tilt — on all `.tilt-card` elements
6. Animated counters — on `.counter` elements
7. FAQ accordion — on `.faq-item` elements
8. Button ripple effect — on all `.btn` elements
9. Marquee ticker animation
10. Navbar active link — based on current URL
11. Process timeline draw animation
12. Form submission — prevent default, loading state, success message

---

## SEO — Every Page

```html
<meta name="description" content="[page-specific]">
<meta name="keywords" content="customs clearing agent Zambia, freight forwarding Lusaka, ZRA clearing agent, import duty Zambia, SADC logistics">
<meta property="og:title" content="[Page] | First Protocol Logistics">
<meta property="og:description" content="[description]">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Title format: `Page Name | First Protocol Logistics`

---

## Performance Rules

- Video: `autoplay muted loop playsinline` — required, no others
- All below-fold images: `loading="lazy"`
- CSS animations use `transform` and `opacity` only — never animate width, height, top, left
- `will-change: transform` on all tilt cards
- No external JS libraries

---

## Mobile Responsiveness

- Navbar collapses at 768px
- Hero Bebas Neue: 90px desktop → 48px mobile
- Two-column layouts: single column below 768px
- Cards: full width on mobile
- Particles: 40 on mobile
- Footer: 4 cols → 2 cols at 768px → 1 col at 480px

---

## What NOT To Do

- Do NOT use Bootstrap, Tailwind, jQuery, or any framework
- Do NOT create separate CSS or JS files per page
- Do NOT use inline `<style>` blocks in HTML
- Do NOT hardcode colors — use CSS variables only
- Do NOT use placeholder image services
- Do NOT invent image filenames — only use the ones listed above
- Do NOT hallucinate company details — phone is +260-XXX-XXXXXX, email is info@firstprotocol.co.zm
- Do NOT add features not listed here
- Do NOT animate width, height, top, or left properties
- Do NOT use `!important` unless absolutely unavoidable

---

## Build Order

1. `assets/css/style.css`
2. `index.html`
3. `services.html`
4. `about.html`
5. `process.html`
6. `contact.html`
7. `resources.html`
8. `assets/js/main.js`

After each file say: **"DONE: [filename]"**

---

## Completion

When all 8 files are complete say exactly:
**"First Protocol Logistics website is complete. All 6 pages, 1 stylesheet, and 1 JS file built. Ready to push to GitHub and deploy to Vercel."**
