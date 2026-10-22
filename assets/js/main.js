/**
 * Sustune Care - Website 2: Modern, Interactive & Visual
 * Main JavaScript (Vanilla JS, self-contained, no frameworks, no inline handlers)
 */

// 1. Single authoritative Google Form enquiry endpoint
const GOOGLE_FORM_URL = "https://forms.gle/o1y5bqXmaM8fCLvF8";

(function () {
  "use strict";

  // Cache DOM references
  const doc = document.documentElement;
  const body = document.body;

  /* ==========================================================================
     1. Enquiry & Booking Buttons Wiring
     ========================================================================== */
  function initEnquiryButtons() {
    // Select all enquire, book, and get started action buttons/links
    const enquiryButtons = document.querySelectorAll(".btn-enquire, .js-enquire-btn");
    enquiryButtons.forEach((btn) => {
      btn.setAttribute("href", GOOGLE_FORM_URL);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ==========================================================================
     2. Theme Management (Dark Default, Light Available, Persisted in localStorage)
     ========================================================================== */
  function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-toggle-icon");
    const themeLabel = document.getElementById("theme-toggle-label");

    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem("sustune_theme");
    } catch (e) {
      // localStorage may be disabled or restricted
    }

    // Determine initial theme: saved preference -> system preference -> 'dark' default
    let initialTheme = "dark";
    if (savedTheme === "light" || savedTheme === "dark") {
      initialTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      initialTheme = "light";
    }

    applyTheme(initialTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const currentTheme = doc.getAttribute("data-theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        try {
          localStorage.setItem("sustune_theme", nextTheme);
        } catch (e) {
          // Ignore storage quota or security errors
        }
      });
    }

    // Listen to system theme changes if user has not explicitly chosen
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
        try {
          if (!localStorage.getItem("sustune_theme")) {
            applyTheme(e.matches ? "light" : "dark");
          }
        } catch (err) {
          applyTheme(e.matches ? "light" : "dark");
        }
      });
    }

    function applyTheme(theme) {
      doc.setAttribute("data-theme", theme);
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
        const nextTitle = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
        themeToggleBtn.setAttribute("aria-label", nextTitle);
        themeToggleBtn.setAttribute("title", nextTitle);
      }
      if (themeIcon) {
        // Toggle icon visual between sun and moon
        themeIcon.className = theme === "dark" ? "theme-icon icon-sun" : "theme-icon icon-moon";
      }
      if (themeLabel) {
        themeLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
      }
    }
  }

  /* ==========================================================================
     3. Scroll Progress Indicator
     ========================================================================== */
  function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress-bar");
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
      const scrollHeight = (doc.scrollHeight || body.scrollHeight) - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();
  }

  /* ==========================================================================
     4. Accessible Mobile Navigation (under 1024px)
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

      // Focus first actionable link in the menu
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

    // Close on any navigation link click
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener("click", closeMenu);
    }

    // Close on Escape key and trap tab inside open menu
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

    // Handle viewport resize above 1024px
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024 && hamburgerBtn.getAttribute("aria-expanded") === "true") {
        closeMenu();
      }
    }, { passive: true });
  }

  /* ==========================================================================
     5. Hero Video & Aegis / Sparsh Hero Toggle
     ========================================================================== */
  function initHero() {
    const video = document.getElementById("hero-video");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (video) {
      video.muted = true;
      video.defaultMuted = true;

      const attemptPlay = () => {
        if (!reducedMotionQuery.matches) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser autoplay policy prevented playback; retry on first interaction
              const retryAutoplay = () => {
                video.play().catch(() => {});
                document.removeEventListener("click", retryAutoplay);
                document.removeEventListener("touchstart", retryAutoplay);
                document.removeEventListener("keydown", retryAutoplay);
              };
              document.addEventListener("click", retryAutoplay, { once: true });
              document.addEventListener("touchstart", retryAutoplay, { once: true });
              document.addEventListener("keydown", retryAutoplay, { once: true });
            });
          }
        } else {
          video.pause();
        }
      };

      attemptPlay();

      reducedMotionQuery.addEventListener("change", (e) => {
        if (e.matches) {
          video.pause();
        } else {
          attemptPlay();
        }
      });
    }

    // Aegis | Sparsh Hero Segmented Toggle
    const toggleAegis = document.getElementById("hero-toggle-aegis");
    const toggleSparsh = document.getElementById("hero-toggle-sparsh");
    const heroHeadline = document.getElementById("hero-dynamic-headline");
    const heroSubtext = document.getElementById("hero-dynamic-subtext");
    const heroServiceBadge = document.getElementById("hero-service-badge");
    const heroCard = document.getElementById("hero-content-card");

    if (toggleAegis && toggleSparsh && heroHeadline && heroSubtext && heroServiceBadge && heroCard) {
      function switchHeroService(service) {
        if (service === "aegis") {
          toggleAegis.setAttribute("aria-pressed", "true");
          toggleSparsh.setAttribute("aria-pressed", "false");
          toggleAegis.classList.add("is-active");
          toggleSparsh.classList.remove("is-active");

          heroCard.classList.remove("accent-emerald");
          heroCard.classList.add("accent-cerulean");

          heroServiceBadge.textContent = "AEGIS: PROPERTY STEWARDSHIP";
          heroServiceBadge.className = "service-badge badge-cerulean";

          heroHeadline.textContent = "Care For Your Property. Complete Peace Of Mind.";
          heroSubtext.textContent =
            "Comprehensive rental management, tenant scouting, maintenance oversight, and timestamped inspection reports for NRI-owned assets in Hyderabad and Bengaluru.";
        } else {
          toggleAegis.setAttribute("aria-pressed", "false");
          toggleSparsh.setAttribute("aria-pressed", "true");
          toggleAegis.classList.remove("is-active");
          toggleSparsh.classList.add("is-active");

          heroCard.classList.remove("accent-cerulean");
          heroCard.classList.add("accent-emerald");

          heroServiceBadge.textContent = "SPARSH: ELDERLY PARENT CARE";
          heroServiceBadge.className = "service-badge badge-emerald";

          heroHeadline.textContent = "Care For Your Parents. Sustained Dignity & Attention.";
          heroSubtext.textContent =
            "24/7 emergency SOS escalation, dedicated doctor visits escort, daily errands, and compassionate companionship for your elderly parents living in Hyderabad and Bengaluru.";
        }
      }

      toggleAegis.addEventListener("click", () => switchHeroService("aegis"));
      toggleSparsh.addEventListener("click", () => switchHeroService("sparsh"));
    }
  }

  /* ==========================================================================
     6. Services Section ARIA Tabs (Keyboard Accessible)
     ========================================================================== */
  function initServicesTabs() {
    const tabList = document.querySelector('[role="tablist"].services-tablist');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"].services-tabpanel'));

    function selectTab(newTab) {
      // Deactivate all tabs
      tabs.forEach((tab) => {
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("tabindex", "-1");
        tab.classList.remove("is-active");
      });

      // Hide all panels
      panels.forEach((panel) => {
        panel.classList.remove("is-active");
        panel.setAttribute("hidden", "until-found");
      });

      // Activate target tab
      newTab.setAttribute("aria-selected", "true");
      newTab.setAttribute("tabindex", "0");
      newTab.classList.add("is-active");
      newTab.focus();

      // Show associated panel
      const targetPanelId = newTab.getAttribute("aria-controls");
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add("is-active");
        targetPanel.removeAttribute("hidden");
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        selectTab(tab);
      });

      tab.addEventListener("keydown", (e) => {
        let targetIndex = null;
        if (e.key === "ArrowRight") {
          targetIndex = (index + 1) % tabs.length;
        } else if (e.key === "ArrowLeft") {
          targetIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === "Home") {
          targetIndex = 0;
        } else if (e.key === "End") {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          selectTab(tabs[targetIndex]);
        }
      });
    });
  }

  /* ==========================================================================
     7. Interactive 4-Step Stepper (How It Works)
     ========================================================================== */
  function initStepper() {
    const stepButtons = document.querySelectorAll(".stepper-nav-btn");
    const stepPanels = document.querySelectorAll(".stepper-content-panel");
    const prevBtn = document.getElementById("stepper-prev-btn");
    const nextBtn = document.getElementById("stepper-next-btn");
    const progressFill = document.getElementById("stepper-progress-fill");

    if (stepButtons.length === 0 || stepPanels.length === 0) return;

    let currentStepIndex = 0;

    function activateStep(index) {
      currentStepIndex = Math.max(0, Math.min(stepButtons.length - 1, index));

      stepButtons.forEach((btn, idx) => {
        const isCurrent = idx === currentStepIndex;
        const isDone = idx < currentStepIndex;

        btn.classList.toggle("is-active", isCurrent);
        btn.classList.toggle("is-completed", isDone);
        btn.setAttribute("aria-current", isCurrent ? "step" : "false");
      });

      stepPanels.forEach((panel, idx) => {
        panel.classList.toggle("is-active", idx === currentStepIndex);
      });

      if (progressFill) {
        const percent = (currentStepIndex / (stepButtons.length - 1)) * 100;
        progressFill.style.width = percent + "%";
      }

      if (prevBtn) {
        prevBtn.disabled = currentStepIndex === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = currentStepIndex === stepButtons.length - 1;
      }
    }

    stepButtons.forEach((btn, idx) => {
      btn.addEventListener("click", () => activateStep(idx));
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => activateStep(currentStepIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => activateStep(currentStepIndex + 1));
    }

    activateStep(0);
  }

  /* ==========================================================================
     8. "What You Need" Needs Selector (Property / Parents / Both)
     ========================================================================== */
  function initNeedsSelector() {
    const needButtons = document.querySelectorAll(".needs-selector-btn");
    const needCards = document.querySelectorAll(".needs-card");

    if (needButtons.length === 0) return;

    needButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-need");

        needButtons.forEach((b) => {
          const isSelected = b === btn;
          b.classList.toggle("is-active", isSelected);
          b.setAttribute("aria-pressed", isSelected ? "true" : "false");
        });

        needCards.forEach((card) => {
          const cardType = card.getAttribute("data-need-card");
          card.classList.toggle("is-active", cardType === targetId);
        });
      });
    });
  }

  /* ==========================================================================
     9. Plan Your Care Estimator (Sample Inputs, Zero Invented Pricing)
     ========================================================================== */
  function initCareEstimator() {
    const citySelect = document.getElementById("estimator-city");
    const serviceRadios = document.querySelectorAll('input[name="estimator-service"]');
    const addonCheckboxes = document.querySelectorAll(".estimator-addon");
    const summaryCity = document.getElementById("summary-city");
    const summaryTier = document.getElementById("summary-tier");
    const summaryScopeList = document.getElementById("summary-scope-list");

    if (!citySelect || serviceRadios.length === 0 || !summaryCity || !summaryTier || !summaryScopeList) {
      return;
    }

    const scopeDescriptions = {
      aegis: {
        title: "Aegis Property Stewardship Package",
        items: [
          "Rigorous tenant scouting and background verification",
          "Automated rental collection & escrow reporting",
          "Quarterly physical audit with high-definition photo reports",
          "Vendor oversight for routine and emergency maintenance"
        ]
      },
      sparsh: {
        title: "Sparsh Elderly Parent Care Package",
        items: [
          "24/7 emergency response protocol with trained doctor escort",
          "Scheduled doctor appointments and routine checkup coordination",
          "Assistance with grocery, pharmacy and daily household errands",
          "Weekly dedicated companionship and wellness check-in sessions"
        ]
      },
      both: {
        title: "Holistic NRI Care: Aegis + Sparsh Combined Blueprint",
        items: [
          "Complete property protection & rental management",
          "24/7 medical SOS and rapid hospital admission support for parents",
          "Single dedicated relationship manager for family & real estate",
          "Timestamped inspection audits and weekly parental wellness logs"
        ]
      }
    };

    function updateEstimator() {
      const selectedCity = citySelect.options[citySelect.selectedIndex].text;
      let selectedService = "both";
      serviceRadios.forEach((radio) => {
        if (radio.checked) {
          selectedService = radio.value;
        }
      });

      const selectedAddons = [];
      addonCheckboxes.forEach((chk) => {
        if (chk.checked) {
          selectedAddons.push(chk.getAttribute("data-label"));
        }
      });

      // Update UI elements using textContent and safe DOM nodes
      summaryCity.textContent = selectedCity;
      const config = scopeDescriptions[selectedService] || scopeDescriptions.both;
      summaryTier.textContent = config.title;

      // Rebuild scope list safely
      summaryScopeList.textContent = "";
      config.items.forEach((itemText) => {
        const li = document.createElement("li");
        li.textContent = itemText;
        summaryScopeList.appendChild(li);
      });

      if (selectedAddons.length > 0) {
        selectedAddons.forEach((addonText) => {
          const li = document.createElement("li");
          li.className = "addon-item";
          li.textContent = "[Custom Add-on] " + addonText;
          summaryScopeList.appendChild(li);
        });
      }
    }

    citySelect.addEventListener("change", updateEstimator);
    serviceRadios.forEach((r) => r.addEventListener("change", updateEstimator));
    addonCheckboxes.forEach((c) => c.addEventListener("change", updateEstimator));

    updateEstimator();
  }

  /* ==========================================================================
     10. Accessible FAQ Accordion
     ========================================================================== */
  function initFaq() {
    const faqButtons = document.querySelectorAll(".faq-trigger");

    faqButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        const targetPanelId = btn.getAttribute("aria-controls");
        const panel = document.getElementById(targetPanelId);

        // Close other items for a clean single-open accordion (or allow multiple toggle)
        faqButtons.forEach((otherBtn) => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute("aria-expanded", "false");
            const otherPanelId = otherBtn.getAttribute("aria-controls");
            const otherPanel = document.getElementById(otherPanelId);
            if (otherPanel) {
              otherPanel.classList.remove("is-open");
              otherPanel.setAttribute("hidden", "until-found");
            }
          }
        });

        // Toggle clicked item
        if (isExpanded) {
          btn.setAttribute("aria-expanded", "false");
          if (panel) {
            panel.classList.remove("is-open");
            panel.setAttribute("hidden", "until-found");
          }
        } else {
          btn.setAttribute("aria-expanded", "true");
          if (panel) {
            panel.classList.add("is-open");
            panel.removeAttribute("hidden");
          }
        }
      });
    });
  }

  /* ==========================================================================
     11. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /* ==========================================================================
     12. Smooth Anchor Navigation with Header Offset
     ========================================================================== */
  function initSmoothScroll() {
    const internalAnchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    internalAnchors.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = document.querySelector(".site-header") ? 80 : 0;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

          // Set focus for accessibility without shifting layout
          targetEl.setAttribute("tabindex", "-1");
          targetEl.focus({ preventScroll: true });
        }
      });
    });
  }

  /* ==========================================================================
     DOM Ready Bootstrapper
     ========================================================================== */
  function initApp() {
    initEnquiryButtons();
    initTheme();
    initScrollProgress();
    initMobileMenu();
    initHero();
    initServicesTabs();
    initStepper();
    initNeedsSelector();
    initCareEstimator();
    initFaq();
    initScrollReveal();
    initSmoothScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
