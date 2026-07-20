# EXECUTION BRIEF — First Protocol Retrofit
## How to run this document

Work **phase by phase, in order**. At the end of each phase print `DONE: Phase N — <one-line summary of what changed>` and **STOP and wait** for the user to type `next`. If the user types `run all`, continue through the remaining phases without stopping. If a session ends mid-way, the next session resumes at the first incomplete phase.

CLAUDE.md is the rulebook — Ground Truth facts, banned content, image manifest, and component specs live there. This brief is the work order. All copy in quotes below is **final copy — use verbatim**, correcting nothing but obvious typos.

---

## Phase 0 — Preflight
1. Read CLAUDE.md in full.
2. Verify `assets/images/` contains the new set: 16 `.webp` photos + `logo.webp` + `favicon.png` + `hero-poster.webp` + `hero-video.mp4`, and that the old `.jpg`/`.png` photos are gone. If anything is missing, STOP and tell the user before touching code.
3. Confirm git status is clean so everything this brief does is one reviewable change.

## Phase 1 — Global sweep (every page)
1. Replace every placeholder phone (`+260-XXX-XXXXXX`, `tel:+260XXXXXXXXX`, `wa.me/260XXXXXXXXX`) with the real number and links from Ground Truth.
2. Replace `info@firstprotocol.co.zm` with `info@firstprotocol.com` everywhere — body text, `mailto:`, and every `<meta>`/og tag.
3. Update **all** image references to the new `.webp` names (manifest in CLAUDE.md), including CSS `background-image` inline styles in page heroes. Logo `<img>` → `logo.webp` with explicit height attributes (50 navbar / 60 footer).
4. Hero video tag gains `poster="assets/images/hero-poster.webp"` (keep `preload="none"`).
5. Add `<link rel="icon" type="image/png" href="assets/images/favicon.png">` to every page `<head>`.
6. Footer, all pages: contact column becomes phone (tel link) · email (mailto) · "128 Kitwe Road, Silverest Gardens" · "Mon–Fri 08:00–17:00 · Sat 08:00–13:00 CAT". Remove the Privacy Policy / Terms `href="#"` dead links. Footer services column lists the four services linking to their `services.html` anchors.
7. Navbar + mobile menu, all pages: links become Home · Services · How It Works (`index.html#how-it-works`) · About · Resources · Contact, plus a WhatsApp icon link (reuse the existing WhatsApp SVG, `aria-label="WhatsApp"`), plus GET A QUOTE → `index.html#quote`.
8. WhatsApp float (all pages): real link.

## Phase 2 — index.html: hero, trust, values; remove fabrications
1. **Hero copy:**
   - H1 (Bebas, two lines): `WE CLEAR YOUR GOODS` / `AT THE BORDER`
   - Sub-line: `Trucks, containers & personal vehicles — cleared at Kazungula, Chirundu and Nakonde.`
   - Buttons: `GET A QUOTE` (orange, → `#quote`) and `WHATSAPP US` (green outline, WhatsApp icon, → wa.me link).
2. **Marquee ticker** content (duplicated for the seamless loop): `DECADES OF COMBINED CLEARING EXPERIENCE · KAZUNGULA · CHIRUNDU · NAKONDE · ZRA-COMPLIANT DECLARATIONS · COMMERCIAL & PERSONAL CARGO · STRAIGHT ANSWERS ON WHATSAPP ·`
3. **Delete** the stats-bar section (counters) and the testimonials section entirely (HTML now; orphaned CSS/JS cleanup happens in Phase 8).
4. **Why First Protocol (value props trio)** — keep the three-card section, replace card copy:
   - **Speed** — "Prepared paperwork, known borders, no wasted days. We keep your goods moving instead of sitting in a queue."
   - **Compliance** — "Every declaration done properly under ZRA, SADC and COMESA rules — cleared right the first time, no comebacks."
   - **Transparency** — "You'll know what you're paying and why, with regular updates on WhatsApp at every milestone. No hidden fees."

## Phase 3 — index.html: four services + How It Works
1. **Services section** → exactly four cards (icon + title + line + `Learn More →` to the matching `services.html` anchor):
   - **Commercial Goods Clearing** — "Trucks, containers and commercial consignments cleared at the border." → `#commercial`
   - **Personal Vehicle Clearing** — "Imported cars and personal vehicles cleared and on the road." → `#vehicles`
   - **Import & Export Documentation** — "Declarations, permits and paperwork prepared and checked." → `#documentation`
   - **Duty Calculation & Advisory** — "Know what you'll pay before your goods reach the border." → `#duty`
2. **How It Works** — new section `id="how-it-works"` after services. Reuse/adapt the timeline styling from the old process page (numbered green/orange nodes, sequential reveal). Four steps:
   1. **CONSULTATION** — "Tell us what you're bringing in — on WhatsApp or the form below."
   2. **DOCUMENTATION** — "Send your paperwork. We check it and prepare the declaration."
   3. **CLEARANCE** — "We handle ZRA and the border process on your behalf."
   4. **DELIVERY** — "You collect your goods, or we help coordinate onward transport."

## Phase 4 — index.html: quote form, location, CTA
1. **Quote form** — new section `id="quote"` per the CLAUDE.md spec (fields, WhatsApp-compose submit, honest fallback note). Section heading: thin/bold split `GET A` `QUOTE`; one line under it: "Four quick answers — your quote lands straight in our WhatsApp."
2. **Office Location** — new section after the form, per the CLAUDE.md spec: heading `FIND` `US`, the map iframe (verbatim src, lazy), then address · "Turn right into Kitwe Road — last house on your right." · hours · **Open in Google Maps** button (verbatim href).
3. **Final CTA banner:** heading "Ready to clear your goods?", line "Get a free, no-obligation quote from people who work these borders every day.", buttons `GET A QUOTE` (→ `#quote`) and `WHATSAPP US`.

## Phase 5 — services.html: rebuild around the four
1. Page hero background → `border-kazungula-2.webp`. Sub-line: "Clearing goods and vehicles at Kazungula, Chirundu and Nakonde."
2. Intro paragraph: "Whether it's one car from Japan or a fleet of trucks at the border, First Protocol handles the clearing, the paperwork and the duty — properly, and with straight answers throughout."
3. Replace the five service sections with **four**, alternating image/text layout, each with `id`, image, 3–4 bullets, and a `Request This Service` button → `index.html#quote`:
   - `#commercial` **Commercial Goods Clearing** — image `cargo-ship-1.webp`. Bullets: "Import & export clearance at Kazungula, Chirundu and Nakonde" · "Trucks, containers and consignments of any size" · "ZRA liaison and query resolution on your behalf" · "Transit and cross-border coordination".
   - `#vehicles` **Personal Vehicle Clearing** — image `cargo-truck-1.webp`. Bullets: "Imported cars, bakkies and personal vehicles" · "Duty and tax computation before you commit" · "Registration paperwork guidance" · "Collection coordination at the border".
   - `#documentation` **Import & Export Documentation** — image `customs-docs.webp`. Bullets: "Customs declarations prepared and checked" · "Invoices, packing lists and transport documents reviewed" · "Permits and certificates guidance" · "Errors caught before they cost you time at the border".
   - `#duty` **Duty Calculation & Advisory** — image `border-kazungula-1.webp`. Bullets: "Duty and VAT calculated before your goods travel" · "Correct HS classification for the right rate" · "SADC and COMESA preferential rates applied where they qualify" · "Clear cost breakdown — no surprises at the border".
4. End of page: CTA back to `index.html#quote`.

## Phase 6 — contact.html: real info, working form, FAQ
1. Form: same fields + WhatsApp-compose mechanism as the homepage form; service dropdown options = the four services + "Not sure". Delete the fake submit and the "respond within 2 business hours" lines (hero sub-line becomes: "Get a free quote — talk to us on WhatsApp, phone or email.").
2. Right column: real phone / email / hours only. **Delete** the offices grid (Lusaka/Ndola/Kitwe/Livingstone), the "all offices" line, and the 24/7 emergency box. Add the office address, the directions line, and an **Open in Google Maps** button.
3. Replace the map placeholder div with the real iframe (verbatim src, lazy).
4. **Move the FAQ accordion** here from process.html (before the footer). Keep these questions with their existing answers, edited so no answer promises tracking systems, hotlines, response times, warehousing or freight services: "What documents do I need for import clearance?" · "How are duties and taxes calculated?" · "Which borders do you operate at?" · "How long does customs clearance take?" · "Can you handle time-sensitive shipments?" (answer honestly: prepared documents and early notice speed things up — no guarantees invented). Drop the tracking, transit-goods, and "what makes us different" items.

## Phase 7 — about.html, resources.html, process removal
1. **about.html:** delete the Team placeholder section. Certifications section reduces to a single badge row item: "ZRA Licensed Clearing Agent". Sweep Story / Mission / Vision / Values text of any banned claims (multi-office, tracking, freight/warehousing as services, company-age boasts) — reframe around the people's decades of combined border experience and the four services. Story image stays `border-chirundu-2` ONLY if its slot renders ≤355px wide; otherwise switch the slot to `warehouse-2.webp`.
2. **resources.html:** delete the Featured Article section and the Regulatory Updates section (invented news). Keep the four blog cards as short evergreen guides: keep tag, title, excerpt; **remove the dead "Read More" links**. Keep the three Downloadable Guides cards with their "Coming Soon" badges. Add a closing CTA to `index.html#quote`.
3. **Delete `process.html`.** Create `vercel.json` exactly as specified in CLAUDE.md. Search all pages for any remaining `process.html` links (footers, quick links) and repoint them to `index.html#how-it-works`.

## Phase 8 — help bot, reduced motion, cleanup, QA
1. **Help bot** on all pages, per the CLAUDE.md spec (bottom-left bubble, scripted panel, brand-matched). Exact content — use verbatim, each answer followed by a `Chat on WhatsApp` button (prefill: "Hello First Protocol, I have a question about clearing my goods."):
   - **"What documents do I need?"** → "For most clearances: commercial invoice, packing list, transport document (bill of lading or manifest) and your TPIN. Vehicles also need the export certificate and title. Send us what you have and we'll confirm what's missing."
   - **"Which borders do you cover?"** → "Kazungula, Chirundu and Nakonde — and we can advise on other entry points. Tell us your route."
   - **"How much will clearing cost?"** → "It depends on the goods, their value and the duty rates — quoting blind would mislead you. Send the details on WhatsApp and you'll get a straight answer fast."
   - **"Where is your office?"** → "128 Kitwe Road, Silverest Gardens. Turn right into Kitwe Road — last house on your right. Mon–Fri 08:00–17:00, Sat 08:00–13:00." + an `Open in Google Maps` link (verbatim href).
2. **Reduced motion:** the `prefers-reduced-motion` CSS block + JS guards per CLAUDE.md (no particles, no tilt, instant reveals, static marquee).
3. **Cleanup:** remove now-orphaned JS (counter module, fake form submit, timeline-draw if unused) and CSS blocks for deleted sections (stats bar, testimonials, offices list, emergency box, map placeholder). Do not delete shared utilities still in use.
4. **QA — run and report results:**
   - Banned-string search across all files — each must return zero: `XXXXXX`, `co.zm`, `500+`, `data-target`, `Ndola`, `Livingstone`, `24/7`, `2 hours`, `2 business hours`, `Real-Time`, `James M`, `Miriam`, `David C`, `Account Managers`, `process.html`, `.jpg`, `"#"`.
   - Every `href` and `src` resolves to a file or anchor that exists; every image reference appears in the CLAUDE.md manifest.
   - Form check: filling the form composes a correctly URL-encoded `wa.me/260955872277` link containing all four answers.
   - Open `index.html` in the browser (`start index.html`) — confirm hero renders with poster, sections reveal, bot opens, map loads on scroll.
   - Report: files changed, files deleted, total `assets/images` size, any deviations from this brief (deviations require the user's sign-off).
5. **STOP. Do not commit.** When — and only when — the user says `commit and push`: `git add -A`, commit message `Retrofit to 2026 design direction: real facts, four services, WhatsApp lead capture, map, help bot, optimized assets`, then `git push`.
