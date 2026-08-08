document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector(".site-nav");
  const storageKey = "pilotofgolf-theme";
  const phoneRevealButton = document.getElementById("phone-reveal");
  const phoneCheckInput = document.getElementById("phone-check");
  const phoneNumber = document.getElementById("phone-number");

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
  };

  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  applyTheme(preferredTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, nextTheme);
      applyTheme(nextTheme);
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
  }

  if (phoneRevealButton && phoneCheckInput && phoneNumber) {
    phoneRevealButton.addEventListener("click", () => {
      if (phoneCheckInput.value.trim() === "12") {
        phoneNumber.style.display = "inline";
        phoneCheckInput.value = "";
      } else {
        phoneCheckInput.value = "";
        phoneCheckInput.focus();
      }
    });
  }
});