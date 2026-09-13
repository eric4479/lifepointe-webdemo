/* ============================================================
   LifePointe Ministries — JavaScript
   Mobile menu, hero video lazy-load, and small interactions.
   No dependencies. MIT licensed.
   ============================================================ */

(function () {
  "use strict";

  /* --- Mobile menu toggle --- */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !expanded);
      toggle.classList.toggle("active");
      nav.classList.toggle("open");
      document.body.style.overflow = expanded ? "auto" : "hidden";
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "auto";
      }
    });

    // Close when clicking a link (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 768 && nav.classList.contains("open")) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "auto";
        }
      });
    });
  }

  /* --- Hero video lazy-load (desktop only) --- */
  (function () {
    // Find the <source> element inside the hero video (has data-src)
    var source = document.querySelector(".hero__video source[data-src]");
    if (!source) return;

    var src = source.getAttribute("data-src");
    if (!src) return;

    // Check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only load video on desktop (saves mobile bandwidth)
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    // Set the video source and load
    source.src = src;
    var vidEl = source.closest("video");
    if (vidEl) {
      vidEl.load();
      vidEl.play().catch(function () {});
      vidEl.classList.add("loaded");
    }
  })();

  /* --- Current year in footer --- */
  (function () {
    var spans = document.querySelectorAll("#currentYear");
    var year = new Date().getFullYear();
    spans.forEach(function (el) { el.textContent = year; });
  })();
})();
