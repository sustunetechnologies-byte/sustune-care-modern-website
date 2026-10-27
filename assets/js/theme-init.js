/**
 * Sustune Care - Theme Initialization Script
 * Runs in <head> before first paint to prevent theme flashing.
 * Default theme is ALWAYS 'light', regardless of system prefers-color-scheme.
 * Reads 'sc-theme' from localStorage if explicitly set by visitor toggle.
 */
(function () {
  try {
    var storedTheme = localStorage.getItem("sc-theme");
    if (storedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
