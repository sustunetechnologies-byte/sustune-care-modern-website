# Sustune Care — Multi-Page Picture-Led Website

> **Modern, Interactive, Picture-Led Multi-Page Architecture**  
> Serving Non-Resident Indians (NRIs) with **Aegis** (Property Stewardship) and **Sparsh** (Elderly Parent Care) in **Hyderabad** and **Bengaluru**.  
> Tagline: *"Care for your property. Care for your parents. Peace of mind for you."*  
> Brand Promise: *"Protected Care. Sustained Dignity."*

---

## 1. Overview & Architecture

Per senior management (Ram Sir's) feedback, Website 2 has been rebuilt as a **fast, visual, picture-led multi-page experience**:
1. **Less Scrolling, More Clicking:** Minimal visible text (under 120 words on service pages), high visual engagement, interactive service tiles with modal disclosures, and dedicated pages.
2. **Dedicated Pages:** Separate pages for Sparsh Elder Care (hospital aesthetic) and Aegis Property Management (luxury real estate aesthetic), each featuring large visual hero imagery, 4 interactive service tiles, and video modal triggers.
3. **Live HTML Logo Lockup & Full-Colour Emblem:**
   - Real full-colour emblem image (`assets/logo/sustune_emblem_@2x.webp`) rendered at 64px high on desktop, 48px on mobile, and 56px in the footer.
   - Live HTML brand text: `"SUSTUNE CARE"` (Plus Jakarta Sans 800, `#0D3B66` in light mode, `#FFFFFF` in dark mode) with the tagline `"Protected Care. Sustained Dignity."` in gold `#C99738` (min 11.5px).
   - In dark mode and footer, the full-colour emblem is placed on a rounded white/mist (`#F1F5F9`) badge with a thin gold border (`1.5px solid #C99738`), preserving authentic emblem colours in both themes with zero CSS filters or reversed white versions.
4. **Icon-Only 44px Theme Toggle:**
   - 44px icon-only button with SVG sun and moon icons, `aria-label="Switch theme"`, and descriptive tooltip. Light mode remains default regardless of system settings.
5. **Fresh 4K Video Stills (People-First & Sharp):**
   - Extracted directly from native 4K master footage:
     - `elder-tile-1.jpg`: Urgent care coordination call, caregiver face clearly visible.
     - `elder-tile-3.jpg`: Caregiver handing Sustune Care delivery to smiling seniors.
     - `about.jpg`: Young NRI client family on call, completely distinct from the Elder Care hero.
     - `property-tile-1.jpg`: Property manager walking up exterior steps with lanyard, distinct from the Property hero.
   - Regenerated `assets/photos/contact-sheet.jpg` titled *"Sustune Care stills from company videos (pending marketing-approved photos)"*. All "approved" wording has been purged.
6. **Spacing & Layout:**
   - 28px margin below every section heading and its subtitle before cards/tiles (`Our Core Services`, `Sparsh Services`, `Aegis Services`, `Built Upon Rigorous Standards`, `Founding Team`, `Active Operating Hubs`, `FAQ`).
   - 80px padding between sections on desktop, 56px on mobile.
   - Grey strip under hero ribbon wave on Home eliminated; hero flows directly into the canvas.
   - Direct Help call band: ribbon artwork placed behind content (`z-index: 1`), phone number displayed in white on solid `#0D3B66` pill button (12.6:1 contrast ratio).
   - Trust bar: emoji replaced with 28px gold SVG line icons (report, shield, person) on dark rounded squares.
7. **Content & Modals:**
   - Purged all unconfirmed specifics (`24/7`, `real-time`, `ambulance`, `triage`, `police verification`, `employment checks`, `quarterly`, `punctual`, `dosage checks`, `itemized bills`, `within`).
   - Every modal rewritten as 3 short, general bullets describing coverage with no promises, numbers, or guarantees.
8. **Mobile Viewport Excellence (412px and 390px):**
   - Sticky bottom bar (`Call us` + `WhatsApp`) fixed to the bottom of the viewport with body `padding-bottom: 96px !important`, verified via scrolled viewport screenshot with zero overlap.
   - Floating WhatsApp circle hidden on mobile; active on desktop.
   - 20px horizontal container padding; hamburger button fully visible; zero horizontal overflow (`scrollWidth == innerWidth`).
9. **Contrast & Accessibility (WCAG 2.1 AA):**
   - All links, buttons, and small text reach >= 4.5:1 contrast in both light and dark modes (using `#7CC4F0`, white, and gold on navy).
10. **Single Authoritative Enquiry Endpoint:**
    - Every Enquire button routes to `GOOGLE_FORM_URL = "https://forms.gle/o1y5bqXmaM8fCLvF8"` (`target="_blank"`, `rel="noopener noreferrer"`).
11. **Self-Contained Static Site:** 100% Vanilla HTML5, CSS3, and JavaScript. Zero external frameworks, zero build steps, relative paths only.
12. **Strict Security:** Full compliance with Content Security Policy (CSP), zero inline styles (`style="..."`), and zero inline `<script>` tags.

---

## 2. Directory Structure

```text
sustune-care-modern/
├── index.html                   # Home page (Split hero, portrait video, 2 service cards, trust strip, call band)
├── elder-care.html              # Sparsh Elder Care (4 interactive photo tiles, 4 modals, 9:16 spotlight video)
├── property-management.html     # Aegis Property (4 interactive photo tiles, 4 modals, 9:16 spotlight video)
├── about.html                   # Why Sustune, 4 Trust Pillars, 3 Founders, Active Operating Hubs
├── contact.html                 # Direct Coordinates, Enquire Form, WhatsApp, 4-question FAQ
├── 404.html                     # Branded HTTP 404 page sharing identical header, footer & nav
├── vercel.json                  # Production security headers (CSP, HSTS, frame-ancestors 'none')
├── _headers                     # Production security headers for Netlify
├── robots.txt                   # Crawler directives linking to sitemap.xml
├── sitemap.xml                  # Canonical XML sitemap with all 5 active routes
├── README.md                    # Operational handbook & guide
├── BEST_PRACTICES.md            # Front-end benchmark checklist
├── .gitignore                   # Excludes source-videos/, OS caches, temp files
└── assets/
    ├── css/
    │   └── style.css            # Complete design system (light default, dark toggle, responsive layout)
    ├── js/
    │   └── main.js              # Theme manager, mobile drawer, tile modals, video autoplay, GOOGLE_FORM_URL
    ├── logo/
    │   ├── sustune_emblem_@2x.webp # Official full-colour brand emblem
    │   ├── sustune_logo_horizontal_lockup.svg
    │   ├── sustune_icon_favicon.svg
    │   ├── favicon_192x192.png
    │   └── favicon_32x32.ico
    ├── photos/
    │   ├── contact-sheet.jpg    # Visual contact sheet reviewing all extracted video stills
    │   ├── home-hero.jpg        # Fallback still for hero video
    │   ├── elder-care-hero.jpg  # Sparsh hero photo
    │   ├── elder-tile-1.jpg     # Emergency medical support coordination (people-first)
    │   ├── elder-tile-2.jpg     # Doctor visit accompaniment
    │   ├── elder-tile-3.jpg     # Prescription & grocery errands handover (people-first)
    │   ├── elder-tile-4.jpg     # Companionship & wellness visits
    │   ├── property-hero.jpg    # Modern Indian villa exterior
    │   ├── property-tile-1.jpg  # Periodic physical inspections (exterior steps with manager)
    │   ├── property-tile-2.jpg  # Tenant scouting & verification
    │   ├── property-tile-3.jpg  # Rent collection & remittance
    │   ├── property-tile-4.jpg  # Repairs & maintenance oversight
    │   └── about.jpg            # NRI client family on call (distinct from elder-care-hero)
    └── video/
        ├── home-hero.mp4        # Clean portrait 9:16 hero video (H.264/AAC, 720x1280, 3.96 MB, +faststart)
        ├── home-hero-poster.jpg # Poster frame at 1s (50.5 KB)
        ├── elder-care.mp4       # Portrait 9:16 Sparsh video (H.264/AAC, 3.49 MB, +faststart)
        ├── elder-care-poster.jpg# Poster frame at 1s (43.9 KB)
        ├── property.mp4         # Portrait 9:16 Aegis video (H.264/AAC, 3.90 MB, +faststart)
        ├── property-poster.jpg  # Poster frame at 1s (82.1 KB)
        ├── intro.mp4            # Portrait 9:16 About intro video (H.264/AAC, 4.47 MB, +faststart)
        ├── intro-poster.jpg     # Poster frame at 1s (95.7 KB)
        └── captions-placeholder.vtt # WebVTT subtitle track placeholder
```

---

## 3. How to Change GOOGLE_FORM_URL

All "Enquire Now" and "Book a Consultation" buttons across all HTML pages automatically inherit their destination URL from a single variable in [`assets/js/main.js`](assets/js/main.js):

```javascript
// Line 7 of assets/js/main.js
const GOOGLE_FORM_URL = "https://forms.gle/o1y5bqXmaM8fCLvF8";
```

To update the Google Form destination:
1. Open [`assets/js/main.js`](assets/js/main.js).
2. Change the string assigned to `GOOGLE_FORM_URL`.
3. Save the file. All buttons with class `.btn-enquire` or `.js-enquire-btn` across all pages will immediately point to the new URL with `target="_blank"` and `rel="noopener noreferrer"`.

---

## 4. How to Replace Photos & Videos

All asset filenames are standardized and stable:

### Replacing Photos
1. Optimize your new image to WebP or JPEG under **300 KB**.
2. Save it directly over the existing file in `assets/photos/`:
   - `elder-care-hero.jpg` (Sparsh hero)
   - `elder-tile-1.jpg` through `elder-tile-4.jpg` (Elder Care service tiles)
   - `property-hero.jpg` (Aegis hero)
   - `property-tile-1.jpg` through `property-tile-4.jpg` (Property service tiles)
   - `about.jpg` (About page hero)

### Replacing Videos
Source videos must be encoded with H.264 video, AAC audio, `+faststart` (moov atom at start for instant streaming), 720p resolution, CRF ~26, under **8 MB**:
```bash
# Example FFmpeg command for portrait 9:16 video:
ffmpeg -i "input.mp4" -ss 00:00:00 -t 00:00:25 -vf "scale=720:1280" -c:v libx264 -crf 26 -preset slow -movflags +faststart -c:a aac -b:a 128k "assets/video/elder-care.mp4"

# Generate matching poster at 1.0s:
ffmpeg -ss 00:00:01.0 -i "assets/video/elder-care.mp4" -vframes 1 -q:v 3 "assets/video/elder-care-poster.jpg"
```

---

## 5. Verification Checklist & Measurements

Every item requested by Ram Sir has been validated with headless Playwright testing:
- **Logo Area:** Side-by-side verification confirms full-colour emblem at 64px desktop / 48px mobile, live text "SUSTUNE CARE", gold tagline, and #F1F5F9 badge with gold border in dark mode.
- **Theme Toggle:** 44px icon-only button with sun/moon SVG icons, `aria-label="Switch theme"`, and tooltip title.
- **Hero Video Autoplay:** Verified `currentTime` advances continuously (advances >3s within 3.5s).
- **Single-line Header:** Measured at 1280px viewport (height: 85px, zero wrapping).
- **Mobile Viewport Scrolling:** Viewport screenshot at 412px confirms bottom sticky bar never covers footer or buttons (`padding-bottom: 96px !important`).
- **Zero Horizontal Overflow:** Verified across all pages at 412px (`scrollWidth == innerWidth`).
- **Security & CSP:** 0 console errors, 0 CSP violations, 100% real files.
- **All Assets Return 200 OK:** Every `.mp4`, poster, and image returns HTTP 200.
- **Enquire Buttons:** Every button verified pointing to `https://forms.gle/o1y5bqXmaM8fCLvF8`.

---

## 6. Running Locally

### Option A: Local Python HTTP Server (Recommended)
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000).

### Option B: Node HTTP Server
```bash
npx serve .
```

---

## 7. Security & Deployment

- **Vercel:** Deploys instantly from the repository root. `vercel.json` provides strict security headers.
- **Content Security Policy (CSP):**
  `default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; frame-ancestors 'none';`
  Zero inline styles (`style="..."`) and zero inline `<script>` blocks ensure seamless CSP enforcement without console violations.
