/**
 * Sustune Care - Multi-Page Picture-Led Implementation
 * Vanilla JS, WCAG 2.1 AA compliant, zero external dependencies.
 */

// 1. Single authoritative Google Form enquiry endpoint
const GOOGLE_FORM_URL = "https://forms.gle/o1y5bqXmaM8fCLvF8";

(function () {
  "use strict";

  const doc = document.documentElement;
  const body = document.body;

  /* ==========================================================================
     1. Enquiry & Booking Buttons Wiring
     ========================================================================== */
  function initEnquiryButtons() {
    const enquiryButtons = document.querySelectorAll(".btn-enquire, .js-enquire-btn");
    enquiryButtons.forEach((btn) => {
      btn.setAttribute("href", GOOGLE_FORM_URL);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ==========================================================================
     2. Theme Management (Light Default per Ram Sir, Dark Available & Persisted)
     ========================================================================== */
  function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-toggle-icon");
    const themeLabel = document.getElementById("theme-toggle-label");

    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem("sustune_theme");
    } catch (e) {
      // localStorage may be disabled
    }

    // Default is 'light' so the full-color brand logo is showcased
    let initialTheme = "light";
    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    }

    applyTheme(initialTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const currentTheme = doc.getAttribute("data-theme") || "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        try {
          localStorage.setItem("sustune_theme", nextTheme);
        } catch (e) {}
      });
    }

    function applyTheme(theme) {
      doc.setAttribute("data-theme", theme);
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        const nextTitle = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
        themeToggleBtn.setAttribute("aria-label", nextTitle);
        themeToggleBtn.setAttribute("title", nextTitle);
      }
      if (themeIcon) {
        themeIcon.className = theme === "light" ? "theme-icon icon-moon" : "theme-icon icon-sun";
      }
      if (themeLabel) {
        themeLabel.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
      }
    }
  }

  /* ==========================================================================
     3. Accessible Mobile Navigation
     ========================================================================== */
  function initMobileMenu() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const navLinks = document.querySelectorAll(".mobile-nav-link, .mobile-enquire-btn");
    const backdrop = document.getElementById("mobile-drawer-backdrop");

    if (!hamburgerBtn || !mobileDrawer) return;

    function openMenu() {
      hamburgerBtn.setAttribute("aria-expanded", "true");
      mobileDrawer.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-active");
      body.classList.add("menu-locked");

      const firstLink = mobileDrawer.querySelector("a, button");
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      hamburgerBtn.setAttribute("aria-expanded", "false");
      mobileDrawer.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-active");
      body.classList.remove("menu-locked");
      hamburgerBtn.focus();
    }

    hamburgerBtn.addEventListener("click", () => {
      const isOpen = hamburgerBtn.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    if (backdrop) {
      backdrop.addEventListener("click", closeMenu);
    }

    document.addEventListener("keydown", (e) => {
      if (hamburgerBtn.getAttribute("aria-expanded") === "true") {
        if (e.key === "Escape") {
          closeMenu();
        } else if (e.key === "Tab") {
          const focusable = mobileDrawer.querySelectorAll("a, button, [tabindex]:not([tabindex='-1'])");
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth >= 1024 && hamburgerBtn.getAttribute("aria-expanded") === "true") {
          closeMenu();
        }
      },
      { passive: true }
    );
  }

  /* ==========================================================================
     4. Service Tile Detail Modals (Elder Care & Property Management)
     ========================================================================== */
  function initServiceTileModals() {
    const tileTriggers = document.querySelectorAll(".js-tile-trigger");
    const modals = document.querySelectorAll(".tile-modal");

    if (tileTriggers.length === 0) return;

    let activeTrigger = null;

    tileTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const targetId = trigger.getAttribute("aria-controls") || trigger.dataset.target;
        const targetModal = document.getElementById(targetId);
        if (targetModal) {
          activeTrigger = trigger;
          openTileModal(targetModal);
        }
      });
    });

    function openTileModal(modal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      body.classList.add("modal-locked");

      const closeBtn = modal.querySelector(".tile-modal-close");
      if (closeBtn) closeBtn.focus();
    }

    function closeTileModal(modal) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      body.classList.remove("modal-locked");

      if (activeTrigger) {
        activeTrigger.focus();
        activeTrigger = null;
      }
    }

    modals.forEach((modal) => {
      const closeBtn = modal.querySelector(".tile-modal-close");
      const backdrop = modal.querySelector(".tile-modal-backdrop");

      if (closeBtn) {
        closeBtn.addEventListener("click", () => closeTileModal(modal));
      }
      if (backdrop) {
        backdrop.addEventListener("click", () => closeTileModal(modal));
      }
    });

    document.addEventListener("keydown", (e) => {
      const openModal = document.querySelector(".tile-modal.is-open");
      if (!openModal) return;

      if (e.key === "Escape") {
        closeTileModal(openModal);
      } else if (e.key === "Tab") {
        const focusable = openModal.querySelectorAll("button, a, [tabindex]:not([tabindex='-1'])");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ==========================================================================
     5. Hero Video Autoplay Management
     ========================================================================== */
  function initHeroVideo() {
    const video = document.getElementById("home-hero-video");
    if (!video) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const playVideo = () => {
      if (!reducedMotionQuery.matches) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            const retry = () => {
              video.play().catch(() => {});
              document.removeEventListener("click", retry);
              document.removeEventListener("touchstart", retry);
            };
            document.addEventListener("click", retry, { once: true });
            document.addEventListener("touchstart", retry, { once: true });
          });
        }
      } else {
        video.pause();
      }
    };

    playVideo();
    reducedMotionQuery.addEventListener("change", (e) => {
      if (e.matches) {
        video.pause();
      } else {
        playVideo();
      }
    });
  }

  /* ==========================================================================
     6. FAQ Accordion (Contact Page)
     ========================================================================== */
  function initFaq() {
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        const panelId = btn.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);

        btn.setAttribute("aria-expanded", !isExpanded);
        if (panel) {
          if (isExpanded) {
            panel.setAttribute("hidden", "until-found");
            panel.classList.remove("is-open");
          } else {
            panel.removeAttribute("hidden");
            panel.classList.add("is-open");
          }
        }
      });
    });
  }

  /* ==========================================================================
     Bootstrap Application
     ========================================================================== */
  function initApp() {
    initEnquiryButtons();
    initTheme();
    initMobileMenu();
    initServiceTileModals();
    initHeroVideo();
    initFaq();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
