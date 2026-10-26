# Sustune Care — Multi-Page Picture-Led Website

> **Modern, Interactive, Picture-Led Multi-Page Architecture**  
> Serving Non-Resident Indians (NRIs) with **Aegis** (Property Stewardship) and **Sparsh** (Elderly Parent Care) in **Hyderabad** and **Bengaluru**.  
> Tagline: *"Care for your property. Care for your parents. Peace of mind for you."*  
> Brand Promise: *"Protected Care. Sustained Dignity."*

---

## 1. Overview & Architecture

Per senior management (Ram Sir's) feedback, Website 2 has been restructured from a long single-page layout into a **fast, visual, picture-led multi-page experience**:
1. **Less Scrolling, More Clicking:** Minimal visible text (under 120 words on service pages), high visual engagement, interactive service tiles with modal disclosures, and dedicated pages.
2. **Dedicated Pages:** Separate pages for Sparsh Elder Care (hospital aesthetic) and Aegis Property Management (luxury real estate aesthetic), each featuring large visual hero imagery, 4 interactive service tiles, and video modal triggers.
3. **Approved Brand Look & Ribbon Artwork:** Light theme default showcasing the official gold & blue logo (56px desktop / 48px mobile), dark mode toggle, and custom SVG flowing brand ribbon artwork (`brand-ribbon-wave.svg`, `ribbon-divider.svg`) in approved hexes `#0D3B66`, `#0073B7`, `#C99738`.
4. **Mobile Sticky Bottom Bar:** Single sticky bottom bar with "Call us" and "WhatsApp" buttons on mobile viewports (< 768px), with the floating WhatsApp button hidden on mobile and active on desktop only.
5. **Accessible Video Modal Player:** The home hero "Watch Our Story" button and service video buttons open `intro.mp4`, `elder-care.mp4`, and `property.mp4` in an accessible dialog with focus trap, Escape key closing, and automatic pausing on close.
6. **Single Authoritative Enquiry Endpoint:** Every Enquire button routes through `GOOGLE_FORM_URL = "https://forms.gle/o1y5bqXmaM8fCLvF8"` (`target="_blank"`, `rel="noopener noreferrer"`).
7. **Self-Contained Static Site:** 100% Vanilla HTML5, CSS3, and JavaScript. Zero external frameworks, zero build steps, relative paths only.
8. **Strict Security & WCAG 2.1 AA:** Full compliance with Content Security Policy (CSP), zero inline styles or scripts, accessible modal focus traps, and keyboard navigation.

---

## 2. Directory Structure

```text
sustune-care-modern/
├── index.html                   # Home page (<2 screens tall, landscape video, 2 service cards, trust strip)
├── elder-care.html              # Sparsh Elder Care (<120 visible words, 4 interactive tiles, 9:16 video)
├── property-management.html     # Aegis Property (<120 visible words, 4 interactive tiles, 9:16 video)
├── about.html                   # Why Sustune, 4 Trust Pillars, 3 Founders, Hyderabad & Bengaluru
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
    │   ├── sustune_logo_horizontal_lockup.svg  # Full-colour brand logo (used on light theme)
    │   ├── sustune_emblem_reversed_white.png   # Reversed white emblem (used on dark theme / footer)
    │   ├── sustune_icon_favicon.svg
    │   ├── favicon_192x192.png
    │   └── favicon_32x32.ico
    ├── photos/
    │   ├── contact-sheet.jpg    # Visual contact sheet reviewing all extracted stills
    │   ├── home-hero.jpg        # Still frame from hero footage (<300 KB)
    │   ├── elder-care-hero.jpg  # Sparsh hero photo (<300 KB)
    │   ├── elder-care-2.jpg     # Sparsh secondary photo (<300 KB)
    │   ├── property-hero.jpg    # Aegis hero photo (<300 KB)
    │   ├── property-2.jpg       # Aegis secondary photo (<300 KB)
    │   └── about.jpg            # Operations & team photo (<300 KB)
    └── video/
        ├── home-hero.mp4        # Landscape 720p hero video with blurred letterbox (H.264/AAC, 2.6 MB, +faststart)
        ├── home-hero-poster.jpg # Poster frame at 1s (35.6 KB)
        ├── elder-care.mp4       # Portrait 9:16 Sparsh video (H.264/AAC, 3.49 MB, +faststart)
        ├── elder-care-poster.jpg# Poster frame at 1s (43.9 KB)
        ├── property.mp4         # Portrait 9:16 Aegis video (H.264/AAC, 3.90 MB, +faststart)
        ├── property-poster.jpg  # Poster frame at 1s (82.1 KB)
        ├── intro.mp4            # Portrait 9:16 About intro video (H.264/AAC, 4.47 MB, +faststart)
        ├── intro-poster.jpg     # Poster frame at 1s (95.7 KB)
        ├── curiosity.mp4        # Portrait 9:16 teaser video (H.264/AAC, 1.11 MB, +faststart)
        ├── curiosity-poster.jpg # Poster frame at 1s (88.4 KB)
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

All asset filenames are standardized and stable so marketing-approved assets can replace placeholders without touching any HTML or CSS:

### Replacing Photos
1. Optimize your new image to WebP or JPEG under **300 KB**.
2. Save it directly over the existing file in `assets/photos/`:
   - `home-hero.jpg` (Hero background fallback)
   - `elder-care-hero.jpg` (Sparsh hero)
   - `elder-care-2.jpg` (Sparsh secondary card)
   - `property-hero.jpg` (Aegis hero)
   - `property-2.jpg` (Aegis secondary card)
   - `about.jpg` (About page hero)
3. To regenerate the visual contact sheet, run the Python extraction script located in the scratch workspace.

### Replacing Videos
Source videos must be encoded with H.264 video, AAC audio, `+faststart` (moov atom at start for instant streaming), 720p resolution, CRF ~26, under **8 MB**:
```bash
# Example FFmpeg command for portrait 9:16 video:
ffmpeg -i "input.mp4" -ss 00:00:00 -t 00:00:25 -vf "scale=720:1280" -c:v libx264 -crf 26 -preset slow -movflags +faststart -c:a aac -b:a 128k "assets/video/elder-care.mp4"

# Generate matching poster at 1.0s:
ffmpeg -ss 00:00:01.0 -i "assets/video/elder-care.mp4" -vframes 1 -q:v 3 "assets/video/elder-care-poster.jpg"
```
Place the output files into `assets/video/`:
- `home-hero.mp4` & `home-hero-poster.jpg` (Landscape 1280x720)
- `elder-care.mp4` & `elder-care-poster.jpg` (Portrait 720x1280)
- `property.mp4` & `property-poster.jpg` (Portrait 720x1280)
- `intro.mp4` & `intro-poster.jpg` (Portrait 720x1280)

---

## 5. How to Add New Pages

To create a new page that matches the look, feel, accessibility, and navigation:
1. **Duplicate `elder-care.html` or `about.html`** as a base template.
2. **Update the Head Tags:**
   - `<title>New Page Name | Sustune Care</title>`
   - Meta description and Open Graph tags.
3. **Update Navigation:**
   - Add `<a href="new-page.html" class="desktop-nav-link">New Page</a>` to the desktop navigation list.
   - Add `<a href="new-page.html" class="mobile-nav-link">New Page</a>` to the mobile drawer.
   - Set `class="... is-active"` on the active page link.
4. **Update Breadcrumbs:**
   ```html
   <nav class="breadcrumb-nav" aria-label="Breadcrumb">
     <div class="container breadcrumb-container">
       <ol class="breadcrumb-list">
         <li class="breadcrumb-item"><a href="index.html">Home</a></li>
         <li class="breadcrumb-separator" aria-hidden="true">&gt;</li>
         <li class="breadcrumb-item" aria-current="page">New Page</li>
       </ol>
       <a href="index.html" class="back-home-link"><span aria-hidden="true">&larr;</span> Back to Home</a>
     </div>
   </nav>
   ```
5. **Keep Visible Text Crisp:** Follow the rule of under 120 words of visible text, offloading bulleted details to modals (`.tile-modal`) or accordions (`.faq-panel`).
6. **Update `sitemap.xml`:** Add the new page URL with `<changefreq>` and `<priority>`.

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
