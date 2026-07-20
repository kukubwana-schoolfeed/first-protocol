# FP FIX BRIEF 1 — four changes ONLY. Everything else stays exactly as it is. CLAUDE.md laws still apply.

## 1. Logo visibility (all 5 pages)
The nav logo is too small. Increase it to ~70px tall on desktop and ~56px on mobile; footer logo to ~84px. Adjust navbar height/padding so it sits vertically centred without overlapping links, breaking the sticky behaviour, or shifting layout at the 1024 / 768 / 480 breakpoints. Source `logo.webp` is 200px tall, so it stays crisp — do not swap the file.

## 2. Remove the hero particle network (index.html)
Delete the particle/network-lines canvas element from the homepage hero and all its initialization + draw + resize + mouse code in `assets/js/main.js`. The hero video, poster, overlay, headline, buttons and everything else stay. No JS errors may remain from the removal (no dangling references); delete orphaned particle CSS if any.

## 3. Hero headline (index.html)
Replace the H1 "WE CLEAR YOUR GOODS / AT THE BORDER" with:
- Line 1: `FIRST PROTOCOL`
- Line 2: `LOGISTICS`
Same Bebas display styling and two-line structure as now. The sub-line ("Trucks, containers & personal vehicles — cleared at Kazungula, Chirundu and Nakonde.") and both buttons stay exactly as they are. Do not change titles or meta tags.

## 4. Personal vehicle image (services.html)
In `assets/images/`, find the newly added photo of a car being offloaded from a ship — its filename will contain "personal" or "vehicle" (any extension, may contain spaces or typos).
- Rename it to `personal-vehicle.<ext>` — lowercase, hyphen, no spaces (filename law).
- In the `#vehicles` (Personal Vehicle Clearing) section, replace `cargo-truck-1.webp` with it. `alt="Personal vehicle being offloaded from a ship for clearing"`, `loading="lazy"`.
- Append the file to the image manifest table in CLAUDE.md.
- If the file is over 500 KB or narrower than its display slot, complete the change but flag it in the report.
- If no such file exists yet: skip this item, finish the other three, and say clearly it was skipped because the image isn't in the folder.

## QA, then stop
- `grep -ri "WE CLEAR" *.html` → zero hits.
- No particle/canvas references left in index.html or main.js.
- Logo size applied on all five pages; open index.html in the browser for the user.
- Report the changes. **Do not commit or push** until the user types `commit and push` — then commit with message `fix: prominent logo, clean hero, brand headline, personal vehicle image` and push.
