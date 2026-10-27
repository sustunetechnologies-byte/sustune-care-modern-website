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
      savedTheme = localStorage.getItem("sc-theme");
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
          localStorage.setItem("sc-theme", nextTheme);
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
     5. Hero Video Autoplay, Sound & Motion Controls
     ========================================================================== */
  function initHeroVideo() {
    const video = document.getElementById("home-hero-video");
    const toggleBtn = document.getElementById("hero-video-toggle");
    const soundBtn = document.getElementById("hero-sound-toggle");
    if (!video) return;

    // Always starts muted on page load; sound state must NOT persist
    video.muted = true;
    video.defaultMuted = true;

    // Respect prefers-reduced-motion: if reduced, show poster + play button
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pauseForReducedMotion = () => {
      video.pause();
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-label", "Play background video");
        toggleBtn.setAttribute("title", "Play background video");
        toggleBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
      }
    };

    const startPlay = () => {
      if (reducedMotionQuery.matches) {
        pauseForReducedMotion();
        return;
      }
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          const retry = () => {
            video.muted = true;
            video.play().catch(() => {});
            window.removeEventListener("click", retry);
            window.removeEventListener("touchstart", retry);
          };
          window.addEventListener("click", retry, { once: true, passive: true });
          window.addEventListener("touchstart", retry, { once: true, passive: true });
        });
      }
    };

    startPlay();

    reducedMotionQuery.addEventListener("change", (e) => {
      if (e.matches) {
        pauseForReducedMotion();
      } else {
        video.play().catch(() => {});
        if (toggleBtn) {
          toggleBtn.setAttribute("aria-label", "Pause background video");
          toggleBtn.setAttribute("title", "Pause background video");
          toggleBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        }
      }
    });

    // Play/Pause button
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (video.paused) {
          video.play().catch(() => {});
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

    // Sound toggle button (Rule 1 & Rule 2)
    if (soundBtn) {
      const speakerOffSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
      const speakerOnSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';

      // Hide sound button if hero video has no audio track
      const verifyAudio = () => {
        if (video.audioTracks && video.audioTracks.length === 0) {
          soundBtn.hidden = true;
          soundBtn.style.display = "none";
        }
      };
      video.addEventListener("loadedmetadata", verifyAudio);

      const updateSoundUI = () => {
        const isMuted = video.muted;
        soundBtn.setAttribute("aria-pressed", isMuted ? "false" : "true");
        soundBtn.setAttribute("aria-label", isMuted ? "Turn sound on" : "Turn sound off");
        soundBtn.setAttribute("title", isMuted ? "Turn sound on" : "Turn sound off");
        soundBtn.innerHTML = isMuted ? speakerOffSvg : speakerOnSvg;
      };

      updateSoundUI();

      soundBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        updateSoundUI();
      });
    }
  }

  /* ==========================================================================
     6. Accessible Video Modal Player (Fixed Overlay with Sound & Focus Trap)
     ========================================================================== */
  function initVideoModal() {
    const videoModal = document.getElementById("video-modal");
    if (!videoModal) return;

    const modalVideo = document.getElementById("modal-video-element");
    const modalVideoSource = document.getElementById("modal-video-source");
    const modalTitle = document.getElementById("video-modal-title");
    const closeBtn = document.getElementById("video-modal-close-btn");
    const backdrop = document.getElementById("video-modal-backdrop") || videoModal.querySelector(".video-modal-backdrop");
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
        modalVideo.currentTime = 0;
        modalVideo.muted = false; // Modal videos play WITH sound after tap
        modalVideo.controls = true; // Native controls visible
      }

      body.classList.add("modal-locked");
      videoModal.classList.add("is-open");
      videoModal.setAttribute("aria-hidden", "false");
      videoModal.removeAttribute("hidden");

      if (modalVideo) {
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
        modalVideo.currentTime = 0; // Reset on close
      }

      videoModal.classList.remove("is-open");
      videoModal.setAttribute("aria-hidden", "true");
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
      if (trigger.getAttribute("role") === "button") {
        trigger.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(trigger);
          }
        });
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (backdrop) {
      backdrop.addEventListener("click", closeModal);
    }

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });

    // Escape and Tab focus trap
    document.addEventListener("keydown", (e) => {
      if (!videoModal.classList.contains("is-open")) return;

      if (e.key === "Escape") {
        e.preventDefault();
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
