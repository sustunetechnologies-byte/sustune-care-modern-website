# Sustune Care — Website 2: Modern, Interactive & Visual

> **Benchmark Front-End Project**  
> Serving Non-Resident Indians (NRIs) with **Aegis** (Property Stewardship) and **Sparsh** (Elderly Parent Care) in **Hyderabad** and **Bengaluru**.  
> Tagline: *"Care for your property. Care for your parents. Peace of mind for you."*  
> Short Tagline: *"Protected Care. Sustained Dignity."*

---

## 1. Overview & Architecture

This repository contains the complete source code for **Website 2 (Modern, Interactive & Visual)** for Sustune Care. It is engineered with modern front-end craftsmanship without using any build pipelines, npm packages, or external UI frameworks (No Tailwind CDN, No React, No Vite).

- **100% Self-Contained:** Uses only relative paths (`assets/...`) and works directly by double-clicking `index.html` or running a lightweight local server.
- **Production-Ready Static Deployment:** Deploys instantly to **Vercel**, **AWS Amplify**, or **Netlify** with zero build configuration.
- **WCAG 2.1 AA Compliant:** Accessible focus rings, semantic landmark hierarchy, ARIA roles, minimum 44px tap targets, and verified 4.5:1 text contrast.
- **Enterprise Security:** Strict Content Security Policy (CSP), HSTS, frame-ancestors restriction, and zero inline script/style execution.

---

## 2. Directory Structure

```text
sustune-care-modern/
├── index.html                   # Primary single-page modern website
├── 404.html                     # Branded HTTP 404 error page
├── vercel.json                  # Production security headers for Vercel
├── _headers                     # Production security headers for Netlify
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap with canonical URLs
├── README.md                    # Architecture and operations guide
├── BEST_PRACTICES.md            # Comprehensive front-end benchmark checklist
├── .gitignore                   # Excludes node_modules/, .DS_Store, Thumbs.db
├── .well-known/
│   └── security.txt             # RFC 9116 security contact registry
└── assets/
    ├── css/
    │   └── style.css            # Vanilla CSS design system & responsive layout
    ├── js/
    │   └── main.js              # Vanilla JS interactive logic & event binding
    ├── logo/
    │   ├── sustune_emblem_reversed_white.png  # Primary emblem on dark backgrounds
    │   ├── sustune_logo_horizontal_lockup.svg  # Primary lockup on light backgrounds
    │   ├── sustune_logo_vertical_lockup.svg
    │   ├── sustune_emblem_@2x.webp
    │   ├── sustune_icon_favicon.svg
    │   ├── favicon_192x192.png
    │   └── favicon_32x32.ico
    └── video/
        ├── hero-landscape.mp4   # Hero background video (muted, loop, cover)
        ├── hero-poster.jpg      # Fallback poster for hero video
        ├── launch.mp4           # 9:16 portrait video - Launch intro
        ├── launch-poster.jpg
        ├── aegis.mp4            # 9:16 portrait video - Aegis property service
        ├── aegis-poster.jpg
        ├── sparsh.mp4           # 9:16 portrait video - Sparsh parent service
        ├── sparsh-poster.jpg
        ├── problem.mp4          # 9:16 portrait video - Distance dilemma
        ├── problem-poster.jpg
        └── captions-placeholder.vtt # WebVTT captions track file
```

---

## 3. Running Locally

Because this project uses plain HTML, CSS, and JavaScript, no compilation or dependency installation is needed.

### Option A: Double-Click
Double-click `index.html` in your file explorer. It will open directly in any modern browser using the `file://` protocol.

### Option B: Local Python HTTP Server (Recommended)
Open a terminal in this workspace folder and run:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

### Option C: Node HTTP Server (Alternative)
```bash
npx serve .
```

---

## 4. Deployment Instructions

### Vercel Deployment
1. Import this repository or directory into your Vercel dashboard.
2. Leave **Build Command** blank.
3. Leave **Output Directory** set to the project root (`.`).
4. The provided [`vercel.json`](vercel.json) automatically enforces security headers across all routes.

### Netlify Deployment
1. Drag and drop this folder into the Netlify web app, or link your Git repository.
2. Leave **Build command** empty and **Publish directory** as `.`.
3. The provided [`_headers`](_headers) file will automatically configure Content Security Policy and security headers.

### AWS Amplify Deployment
1. Connect repository in AWS Amplify Console.
2. In build settings, specify:
   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands: []
     artifacts:
       baseDirectory: /
       files:
         - '**/*'
     cache:
       paths: []
   ```
3. Deploy directly without any build step.

---

## 5. How to Update the Enquiry Link

All "Enquire", "Book a Consultation", and "Get Started" buttons across the application dynamically derive their destination link from a single constant.

Open [`assets/js/main.js`](assets/js/main.js) and locate Line 7:

```javascript
const GOOGLE_FORM_URL = "https://forms.gle/o1y5bqXmaM8fCLvF8";
```

Update this URL to your new Google Form, HubSpot form, or scheduling link. Every button on the site will automatically update and open the new target with `rel="noopener noreferrer"`.

---

## 6. How to Replace Founder Placeholders

In [`index.html`](index.html), search for the `<!-- REPLACE ME -->` HTML comments inside the `#founders` section (around lines 330–380):

```html
<!-- REPLACE ME: Founder 1 Profile Details -->
<article class="card founder-card reveal-on-scroll">
  <div class="founder-avatar-wrapper">
    <!-- Replace this SVG with your 1:1 ratio founder photo -->
    <img src="assets/images/founder1.jpg" alt="Priya Sharma" class="founder-avatar" width="120" height="120">
  </div>
  <h3>Founder Name</h3>
  <div class="founder-role">Co-Founder & Managing Director</div>
  <p class="founder-bio">Two-line biographical summary highlighting professional background and leadership.</p>
  <a href="https://linkedin.com/in/founder-profile" class="founder-social-link" aria-label="Founder LinkedIn Profile" target="_blank" rel="noopener noreferrer">
    <span aria-hidden="true">in</span>
  </a>
</article>
```

---

## 7. How to Replace Video Assets

All video files reside in `assets/video/`. To substitute production footage:

1. **Hero Background Video:**
   - Replace `assets/video/hero-landscape.mp4` (16:9 landscape video).
   - Replace `assets/video/hero-poster.jpg` (poster frame).
2. **Portrait Showcase Videos (9:16 Aspect Ratio):**
   - `assets/video/launch.mp4` & `assets/video/launch-poster.jpg`
   - `assets/video/aegis.mp4` & `assets/video/aegis-poster.jpg`
   - `assets/video/sparsh.mp4` & `assets/video/sparsh-poster.jpg`
   - `assets/video/problem.mp4` & `assets/video/problem-poster.jpg`
3. **Captions & Subtitles:**
   - Update `assets/video/captions-placeholder.vtt` with actual WebVTT timestamps and transcripts for full accessibility compliance.

---

## 8. Brand Standards & Rules

- **Palette:**
  - Imperial Gold: `#C99738`
  - Bronze: `#8B601C`
  - Cerulean: `#0073B7`
  - Deep Marine: `#0D3B66`
  - Emerald: `#0A8754`
  - Slate: `#1E293B`
  - Mist: `#F1F5F9`
  - White: `#FFFFFF`
- **Contrast Rule:** Never place white text on plain gold. Gold buttons must use Deep Marine (`#0D3B66`) or Slate text to maintain WCAG AA contrast.
- **Logos:** Minimum height 48px; never stretch, recolor, or crop.
- **Experience Claim:** Only the verified phrasing *"Executive team with 20+ years of professional experience"* is permitted. No invented metrics or awards.
- **Contact:**
  - Phone: `+91 89856 34239`
  - WhatsApp: `+1 206 713 6114` ([https://wa.me/12067136114](https://wa.me/12067136114))
  - Email: `contact@sustunecare.com`
  - Hubs: Hyderabad, Telangana &amp; Bengaluru, Karnataka
