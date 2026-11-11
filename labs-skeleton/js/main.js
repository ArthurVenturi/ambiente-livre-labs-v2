const THEME_STORAGE_KEY = "element-starter-theme";
const THEME_ATTRIBUTE = "light";

/** Resolve the initial theme from saved preference or the system preference. */
function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/** Set theme and persist it when storage is available. */
function setTheme(theme) {
  if (theme !== "light" && theme !== "dark") return;
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The theme still works for this page load if storage is unavailable.
  }
}

function initializeTheme() {
  setTheme(getInitialTheme());

  // Optional hook: add a button with [data-theme-toggle] when a theme control is needed.
  document.querySelectorAll("[data-theme-toggle]").forEach((control) => {
    control.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE);
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  });
}

function initializeApp() {
  initializeTheme();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp, { once: true });
} else {
  initializeApp();
}
