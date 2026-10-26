# Sustune Care — Front-End Best Practices & Standards Checklist

This document details the engineering principles, accessibility guidelines, security protocols, and performance optimizations implemented in **Website 2: Modern, Interactive & Visual** for Sustune Care. Interns and junior engineers should review this checklist as an architectural benchmark.

---

## 1. Security Practices

- [x] **No Inline Scripts (`<script>...</script>`)**: Eliminates cross-site scripting (XSS) injection vectors by keeping all logic in external, hashed or path-resolved files.
- [x] **No Inline Event Handlers (`onclick=...`)**: Enforces separation of concerns and prevents arbitrary string evaluation attacks.
- [x] **No Inline Styles (`style="..."`)**: Complies with strict Content Security Policy directives and prevents CSS injection.
- [x] **No `innerHTML` with Dynamic Input**: Prevents DOM-based XSS vulnerabilities by using safe `textContent`, `setAttribute`, or explicit DOM node construction.
- [x] **External Links Rel Attributes (`rel="noopener noreferrer"`)**: Blocks reverse tabnabbing and prevents malicious parent window redirection via `window.opener`.
- [x] **Strict Content-Security-Policy (CSP)**: Restricts executable code origins to self and approved font providers, blocking malicious external script injection.
- [x] **`X-Content-Type-Options: nosniff`**: Prevents browsers from MIME-sniffing responses away from the declared content-type, blocking disguised script execution.
- [x] **`X-Frame-Options: DENY`**: Protects the application from clickjacking attacks by preventing embedding within unauthorized iframes.
- [x] **`Referrer-Policy: strict-origin-when-cross-origin`**: Limits leakage of sensitive URL path and parameter information to third-party domains.
- [x] **`Permissions-Policy` (camera, microphone, geolocation disabled)**: Enforces least-privilege security by denying browser hardware access.
- [x] **`Strict-Transport-Security` (HSTS)**: Mandates secure HTTPS connections for all client requests with long-term preloading.
- [x] **Zero Secrets in Repository**: Avoids API token leaks by using client-safe public form endpoints without hardcoded credentials.

---

## 2. Accessibility Practices (WCAG 2.1 AA)

- [x] **Skip-to-Content Link**: Allows keyboard and screen-reader users to bypass repetitive header navigation immediately.
- [x] **Single `<h1>` Landmark**: Provides a clear and unambiguous page outline for screen reader document trees and search engines.
- [x] **Logical Heading Hierarchy (`h1` &rarr; `h2` &rarr; `h3`)**: Ensures semantic structure so assistive tech can announce navigable document outlines.
- [x] **Semantic HTML5 Landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)**: Enables direct landmark jump navigation across browser assistive utilities.
- [x] **HTML `lang="en"` Declaration**: Configures synthetic speech engines and braille translation software to use correct English phonetics.
- [x] **Visible Focus Styles (`:focus-visible`)**: Gives keyboard navigators clear visual feedback without disrupting mouse click aesthetics.
- [x] **Keyboard Accessible Tabs (`role="tablist"`, `role="tab"`)**: Supports standard Arrow Left/Right, Home, and End key navigation according to WAI-ARIA authoring practices.
- [x] **Keyboard Accessible Stepper & Accordion**: Allows Enter and Space key actuation with synchronized `aria-expanded` and `aria-controls` updates.
- [x] **Contrast Ratio &ge; 4.5:1 in Both Themes**: Ensures readability for users with low vision; specifically avoids low-contrast white text on gold.
- [x] **Minimum 44px Touch Targets**: Satisfies mobile usability guidelines to prevent accidental adjacent mis-clicks.
- [x] **Descriptive `alt` Attributes on Images**: Informs screen reader users of graphic content and passes empty strings (`alt=""`) on decorative icons.
- [x] **`aria-label` on Icon-Only Controls**: Provides spoken descriptions for buttons without visible text (e.g., Theme Toggle, Hamburger, WhatsApp).
- [x] **`prefers-reduced-motion` Media Query**: Respects vestibular disorder preferences by pausing autoplaying videos and disabling layout transitions.
- [x] **Video Captions Track (`<track kind="captions">`)**: Provides synchronized textual dialogue for hearing-impaired visitors.
- [x] **Mobile Menu Body Scroll Lock & Esc Key Trap**: Keeps modal focus contained within the drawer and restores focus to the trigger upon exit.
- [x] **Service Tile Modal Dialogs (`role="dialog"`, `aria-modal="true"`)**: Accessible detail panels with Escape key dismissal, backdrop click closing, and keyboard focus trap returning focus to the triggering tile.
- [x] **Picture-Led Information Architecture**: Under 120 words of visible text per service page, minimizing cognitive load while keeping deep information accessible on click.
- [x] **Uncropped 9:16 Portrait Video Embeds (`object-fit: contain`, `aspect-ratio: 9/16`)**: Respects native mobile capture ratios with visible playback controls and captions track.

---

## 3. Performance & Optimization

- [x] **No Framework or Runtime Overhead**: Delivers near-zero parsing delay and instant First Contentful Paint (FCP) using vanilla web standards.
- [x] **No External CDN Dependencies**: Ensures immunity against external CDN outages, tracking blocks, and DNS latency spikes.
- [x] **Google Fonts Preconnection (`preconnect`)**: Warms up TCP handshakes and TLS negotiation with font servers ahead of critical CSS parsing.
- [x] **Deferred Script Loading (`<script defer>`)**: Prevents JavaScript from blocking HTML tokenizer and main-thread DOM construction.
- [x] **`loading="lazy"` on Below-the-Fold Media**: Defers asset downloads until the user approaches the viewport, saving mobile bandwidth.
- [x] **Explicit Width & Height Attributes on Images**: Reserves layout dimensions in the browser box model, eliminating Cumulative Layout Shift (CLS).
- [x] **Video `preload="metadata"`**: Loads only essential header bytes rather than whole media streams, reducing initial page data weight.
- [x] **Passive Event Listeners on Scroll/Resize**: Prevents main-thread stuttering by informing the browser the handler will not call `preventDefault()`.
- [x] **Lightweight CSS Variables for Theming**: Swaps visual tokens instantly at runtime without triggering heavy stylesheet re-downloads.

---

## 4. Search Engine Optimization (SEO)

- [x] **Descriptive `<title>` Tag**: Clearly conveys brand name, dual services, and geographic operations for search result snippets.
- [x] **Compelling `<meta name="description">`**: Summarizes service offerings accurately to maximize organic search click-through rates.
- [x] **Open Graph Meta Tags (`og:title`, `og:image`, `og:url`)**: Generates rich preview cards when shared across WhatsApp, LinkedIn, and Facebook.
- [x] **Twitter Card Meta Tags**: Generates formatted media previews across Twitter / X timelines.
- [x] **JSON-LD Schema (`Organization`)**: Helps Google Knowledge Graph index Sustune Care's name, locations, contact info, and official logo.
- [x] **`sitemap.xml`**: Provides search bots with a structured crawl index of all canonical endpoints and last-modified dates.
- [x] **`robots.txt`**: Declares universal crawling permission and points bots directly to the XML sitemap.
- [x] **Custom Branded `404.html`**: Retains user trust and redirects lost traffic back to the primary conversion funnel.

---

## 5. Code Quality & Maintainability

- [x] **Single Source of Truth for URLs**: `GOOGLE_FORM_URL` defined once in `assets/js/main.js` and wired everywhere, preventing broken link drift.
- [x] **Strict Relative Paths**: Guarantees portability across arbitrary sub-paths, root domains, and local filesystem viewing (`file://`).
- [x] **BEM-Inspired Semantic Class Naming**: Makes CSS predictable, self-documenting, and maintainable for team onboarding.
- [x] **Zero Build Steps Required**: Allows instant editing and verification in any text editor without node version conflicts or bundler crashes.
- [x] **Graceful Degradation**: Core content remains legible and accessible even if JavaScript execution is restricted by enterprise policies.
