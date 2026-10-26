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
     2. Theme Management (Light mode is ALWAYS DEFAULT per Ram Sir)
     Only remember dark if visitor explicitly toggled it.
     ========================================================================== */
  function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-toggle-icon");
    const themeLabel = document.getElementById("theme-toggle-label");

    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem("sustune_theme");
    } catch (e) {}

    // Light mode is ALWAYS default, ignoring system dark mode
    let initialTheme = "light";
    if (savedTheme === "dark") {
      initialTheme = "dark";
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
        themeToggleBtn.setAttribute("aria-label", "Switch theme");
        themeToggleBtn.setAttribute("title", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
      }
      if (themeIcon) {
        themeIcon.className = theme === "light" ? "theme-icon icon-moon" : "theme-icon icon-sun";
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
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
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
     5. Hero Video Autoplay & Toggle (No blur, reliable autoplay, play/pause btn)
     ========================================================================== */
  function initHeroVideo() {
    const video = document.getElementById("home-hero-video");
    const toggleBtn = document.getElementById("hero-video-toggle");
    if (!video) return;

    // Set muted and defaultMuted via JS
    video.muted = true;
    video.defaultMuted = true;

    // Do NOT pause because of prefers-reduced-motion by default per Ram Sir
    const startPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Retry on first user touch/click/scroll
          const retry = () => {
            video.muted = true;
            video.play().catch(() => {});
            window.removeEventListener("click", retry);
            window.removeEventListener("touchstart", retry);
            window.removeEventListener("scroll", retry);
          };
          window.addEventListener("click", retry, { once: true, passive: true });
          window.addEventListener("touchstart", retry, { once: true, passive: true });
          window.addEventListener("scroll", retry, { once: true, passive: true });
        });
      }
    };

    startPlay();

    // Corner toggle button
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          toggleBtn.setAttribute("aria-label", "Pause background video");
          toggleBtn.setAttribute("title", "Pause background video");
          toggleBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        } else {
          video.pause();
          toggleBtn.setAttribute("aria-label", "Play background video");
          toggleBtn.setAttribute("title", "Play background video");
          toggleBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
        }
      });
    }
  }

  /* ==========================================================================
     6. Accessible Video Modal Player
     ========================================================================== */
  function initVideoModal() {
    const videoModal = document.getElementById("video-modal");
    if (!videoModal) return;

    const modalVideo = document.getElementById("modal-video-element");
    const modalVideoSource = document.getElementById("modal-video-source");
    const modalTitle = document.getElementById("video-modal-title");
    const closeBtn = document.getElementById("video-modal-close-btn");
    const backdrop = document.getElementById("video-modal-backdrop");
    const triggers = document.querySelectorAll(".js-video-modal-trigger");

    let lastActiveTrigger = null;

    function openModal(trigger) {
      lastActiveTrigger = trigger;
      const videoSrc = trigger.getAttribute("data-video-src") || "assets/video/intro.mp4";
      const videoTitle = trigger.getAttribute("data-video-title") || "Sustune Care Story";
      const videoPoster = trigger.getAttribute("data-video-poster") || "assets/video/intro-poster.jpg";

      if (modalTitle) modalTitle.textContent = videoTitle;
      if (modalVideo) {
        modalVideo.setAttribute("poster", videoPoster);
        if (modalVideoSource && modalVideoSource.getAttribute("src") !== videoSrc) {
          modalVideoSource.setAttribute("src", videoSrc);
          modalVideo.load();
        }
      }

      videoModal.removeAttribute("hidden");
      videoModal.classList.add("is-open");
      videoModal.setAttribute("aria-hidden", "false");
      body.classList.add("modal-locked");

      if (modalVideo) {
        modalVideo.currentTime = 0;
        const playPromise = modalVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }

      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      if (modalVideo) {
        modalVideo.pause();
      }

      videoModal.classList.remove("is-open");
      videoModal.setAttribute("aria-hidden", "true");
      videoModal.setAttribute("hidden", "until-found");
      body.classList.remove("modal-locked");

      if (lastActiveTrigger) {
        lastActiveTrigger.focus();
        lastActiveTrigger = null;
      }
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(trigger);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    if (backdrop) {
      backdrop.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", (e) => {
      if (!videoModal.classList.contains("is-open")) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab") {
        const focusable = videoModal.querySelectorAll("button, [href], video, [tabindex]:not([tabindex='-1'])");
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
     7. FAQ Accordion (Contact Page)
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
    initVideoModal();
    initFaq();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
