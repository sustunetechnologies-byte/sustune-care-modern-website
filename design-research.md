# Sustune Care — Design Research & Benchmark Analysis
**Author:** Senior Web Designer & Front-End Engineer  
**Project:** Sustune Care Modern Website (Website 2 Visual Redesign)  
**Stakeholder Directive:** Ram Sir (Senior Management)

---

## 1. Reference Site Design Audits

### A. Apollo Hospitals (`apollohospitals.com`)
* **Hero Style:** Full-bleed photographic banner showcasing compassionate clinicians and modern medical care, accompanied by an interactive quick-action booking and emergency search widget.
* **Words Above the Fold:** ~18–25 words (high-contrast clinical headline, reassuring tagline, and prominent action triggers).
* **Home Page Height:** 3.5 to 4.5 screens tall, heavily modularized with clear white negative space.
* **Navigation Pattern:** Clean sticky top bar with emergency phone number highlighted, primary links (*Find a Doctor*, *Specialties*, *Hospitals*, *International Patients*), and a high-contrast teal/blue *"Book Appointment"* CTA button.
* **How Services Are Shown:** Clean grid of distinct specialty tiles pairing empathetic photography with clear medical icons (Cardiology, Orthopedics, Oncology).
* **Colours:** Clinical crisp white background, deep royal blue (`#0D3B66`), calming medical teal/cerulean (`#0073B7`), and emergency alert accents.
* **Phone & Call-to-Action:** 24/7 Emergency helpline permanently visible in the sticky header and floating emergency bar; primary CTA is high-contrast *"Book Appointment"*.

---

### B. Fortis Healthcare (`fortishealthcare.com`)
* **Hero Style:** Dynamic high-resolution carousel featuring compassionate patient-doctor interactions and clinical technology, anchored by an integrated multi-tab quick-action consultation widget.
* **Words Above the Fold:** ~15–20 words (direct, empathetic message with search inputs).
* **Home Page Height:** ~4 screens tall, structured as discrete horizontal cards and visual banners.
* **Navigation Pattern:** Double-tier sticky navigation with top utility bar (city selector, emergency 105711 number) and primary menu with a high-visibility green/blue *"Book an Appointment"* button.
* **How Services Are Shown:** Grid of rounded photographic service cards with icon badges and short 2-line descriptions, linking directly to department details.
* **Colours:** Pure white canvas, deep slate/navy, soft medical cyan, and emerald green trust accents.
* **Phone & Call-to-Action:** Prominent red/amber emergency ambulance helpline; sticky "Book Appointment" and "Call Us" buttons on mobile viewports.

---

### C. Godrej Properties (`godrejproperties.com`)
* **Hero Style:** 100vh full-bleed architectural twilight photography of flagship luxury towers, with subtle dark vignette overlays keeping text ultra-legible.
* **Words Above the Fold:** Under 20 words (aspirational 6-word headline, city selector, and direct enquiry links).
* **Home Page Height:** ~3.5 screens tall with generous vertical padding between luxury portfolios.
* **Navigation Pattern:** Ultra-minimalist sticky header with crisp SVG brand logo, popover contact drawer, search icon, and a discreet pill-shaped *"Enquire"* / *"Schedule Visit"* CTA.
* **How Services/Projects Are Shown:** Expansive full-width photo cards with horizontal carousel navigation, gold location badges, configuration tags (2/3/4 BHK), and subtle hover zoom.
* **Colours:** Clean white, warm charcoal/black (`#141414`), subtle architectural gray rules (`#E7E7E7`), and understated gold/champagne luxury accents.
* **Phone & Call-to-Action:** Popover contact panel featuring dedicated domestic (+91) and international (USA toll-free) direct dial numbers; persistent *"Enquire"* button.

---

### D. My Home Constructions (`myhomeconstructions.com`)
* **Hero Style:** 100svh full-bleed architectural rendering of iconic Hyderabad skyline towers at twilight with a subtle dark gradient overlay.
* **Words Above the Fold:** ~12–16 words (poetic 4-word headline *"Make Living Better"*, minimal subline).
* **Home Page Height:** 3 to 4 screens tall, using full-screen editorial visual sections.
* **Navigation Pattern:** Fixed transparent glassmorphic header transitioning on scroll, centered brand emblem, floating pill menu trigger, and a backdrop-blur rounded *"Contact Us"* button.
* **How Services/Projects Are Shown:** Full-screen horizontal sliders featuring grand architectural photography, 40+ years legacy milestones, and thin graphic indicator lines.
* **Colours:** Rich architectural dark graphite (`#2A2828`), crisp white typography, and warm terracotta/red accents.
* **Phone & Call-to-Action:** Direct sales & NRI enquiry telephone coordinates in sticky drawer; pill-shaped *"Contact Us"* CTA with animated arrow micro-interaction.

---

### E. Sobha Limited (`sobha.com`)
* **Hero Style:** Cinematic full-bleed hero banner showcasing master-planned villas and luxury residences with pristine natural lighting.
* **Words Above the Fold:** ~14 words (*"Passion at Work"*, luxury collection tagline, and city filter).
* **Home Page Height:** ~4 screens tall, divided into visual project collections.
* **Navigation Pattern:** Sticky luxury header with iconic gold/bronze crest logo, city navigation, and prominent *"Enquire Now"* button.
* **How Services/Projects Are Shown:** Editorial photo tiles with delicate gold hairline borders, project status badges (Ready to Move, Under Construction), and smooth hover zoom effects.
* **Colours:** Deep royal navy, warm champagne gold (`#C99738`), off-white, and charcoal slate.
* **Phone & Call-to-Action:** Top header contact links with country code selector, sticky floating enquiry bar, and instant WhatsApp chat.

---

## 2. Design Brief for Sustune Care
*(15 actionable architectural principles synthesizing hospital empathy with luxury real-estate prestige)*

1. **Picture-First, Text-Minimal:** At least 60% of every screen is dedicated to high-resolution photography; maximum 60 words on the first viewport.
2. **Dual Aesthetic Persona:**
   - **Elder Care (`elder-care.html`):** Hospital style — calm, reassuring, soft cerulean blue and pristine white, warm empathetic human photography, inspiring absolute medical trust.
   - **Property Management (`property-management.html`):** Real-estate developer style — architectural, prestige navy and champagne gold lines, high-definition Indian villa and estate photography.
3. **Full-Bleed 100vh Landscape Hero (Home):** Crisp 16:9 landscape photography (`home-hero.jpg`) with a gentle soft-gradient text scrim on the left (never a dark banner box obscuring footage).
4. **Hero Copy Brevity:** Maximum 8-word headline (*"Dignified Parent Care & Trusted Property Stewardship"*), 12-word subline, and dual action buttons (*"Book a Consultation"* & *"Watch Our Story"*).
5. **Two Monumental Service Portals (Home):** Two full-height, side-by-side photographic cards (Elder Care vs. Property Stewardship) with overlaid typography, subtle hover zoom, and direct *"Explore"* buttons.
6. **Triple Trust Bar:** Slim, horizontal bar featuring 3 icons with exactly 3 words each (*Transparent Reporting*, *Vetted People*, *One Point of Contact*).
7. **Brand Ribbon Artwork:** Section dividers, call-to-action bands, and footer enriched with custom SVG/CSS curved flowing ribbons in Marine Blue (`#0D3B66`), Cerulean (`#0073B7`), and Gold (`#C99738`).
8. **Interactive Service Photo Tiles (No Wikipedia Text):** 4 large photographic tiles per service page. Clicking a tile opens a smooth, accessible detail modal with 3–4 bullet points (keeping initial visible text under 120 words).
9. **Modal Video Player:** Short 9:16 portrait videos play inside an accessible modal player triggered by a *"Watch"* overlay button on top of a photo (never letterboxed or cropped inside landscape hero).
10. **Uncompromised Brand Logo:** Official full-colour SVG lockup positioned in the sticky header at **64px height** on desktop and **48px** on mobile.
11. **Clear Orientation & Wayfinding:** Standardized sticky navigation (Home, Elder Care, Property Management, About, Contact) with breadcrumbs and an explicit *"← Back to Home"* link on every inner page.
12. **Prominent Direct CTAs:** Cerulean primary *"Enquire Now"* button in header; direct phone link (`+91 89856 34239`) and floating WhatsApp button (`+1 206 713 6114`).
13. **Mobile Sticky "Call Us" Bar:** High-converting, thumb-friendly sticky bottom bar on mobile viewports for instant phone or consultation requests without covering content.
14. **Zero Inline Styles/Scripts (Strict CSP):** 100% compliant with `vercel.json` and `_headers` Content Security Policy directives.
15. **WCAG 2.1 AA Compliance:** Minimum 44px tap targets, 4.5:1 color contrast in both light (default) and dark modes, semantic landmarks, skip links, and keyboard focus management.
