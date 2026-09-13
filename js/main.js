/* ============================================================
   LifePointe Ministries — JavaScript
   Mobile menu toggle, hero video lazy-load, scroll reveal,
   and accessible interactions. No dependencies. MIT licensed.
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
      nav.classList.toggle("open");

      // Trap focus handling: close when Escape
      document.addEventListener("keydown", function keyHandler(e) {
        if (e.key === "Escape" && nav.classList.contains("open")) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
          document.removeEventListener("keydown", keyHandler);
        }
      });
    });

    // Close nav when clicking a link (mobile only)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 768 && nav.classList.contains("open")) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });
    });

    // Handle window resize — close mobile nav if going to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768 && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- Hero video lazy-load with poster fallback --- */
  (function () {
    var video = document.querySelector(".hero__video");
    var source = video && video.querySelector("source[data-src]");
    var poster = document.querySelector(".hero__poster");

    if (!video || !source) return;

    // Respect reduced motion — never autoplay video
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Show poster only; video will not play
      if (poster) poster.style.opacity = "1";
      video.removeAttribute("autoplay");
      video.removeAttribute("muted");
      video.removeAttribute("loop");
      return;
    }

    // Load video on desktop only (save mobile bandwidth)
    if (!window.matchMedia("(min-width: 768px)").matches) {
      // On mobile, show poster and don't load video
      video.removeAttribute("autoplay");
      video.setAttribute("preload", "none");
      return;
    }

    // Desktop with motion OK — load video
    var src = source.getAttribute("data-src");
    if (!src) return;

    // Set poster as alt while video loads
    source.src = src;
    video.load();

    var played = false;
    video.addEventListener("canplay", function () {
      video.play().then(function () {
        played = true;
        video.classList.add("playing");
        // Fade out poster
        if (poster) {
          poster.style.opacity = "0";
          poster.style.transition = "opacity .5s ease";
        }
      }).catch(function () {
        // Autoplay blocked (e.g. no user gesture) — show poster
        if (poster) {
          poster.style.opacity = "1";
        }
        video.classList.add("fallback");
      });
    }, { once: true });

    video.addEventListener("error", function () {
      // Video failed to load — show poster
      if (poster) poster.style.opacity = "1";
      video.classList.add("fallback");
    }, { once: true });
  })();

  /* --- Scroll reveal for [data-animate] elements --- */
  (function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var revealElements = document.querySelectorAll("[data-animate]");
    if (revealElements.length === 0) return;

    // Set initial state
    revealElements.forEach(function (el) {
      el.classList.add("is-initial");
    });

    // Use IntersectionObserver for performance
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px"
      });

      revealElements.forEach(function (el) { observer.observe(el); });
    } else {
      // Fallback: show all on load
      revealElements.forEach(function (el) {
        el.classList.add("visible");
      });
    }
  })();

  /* --- Current year in footer --- */
  (function () {
    var yearElements = document.querySelectorAll("#currentYear");
    var year = new Date().getFullYear().toString();
    yearElements.forEach(function (el) { el.textContent = year; });
  })();

  /* --- Video quality selector (if multiple sources) --- */
  (function () {
    var video = document.querySelector(".hero__video");
    if (!video || !video.querySelectorAll("source").length) return;

    // If we have multiple sources, let user choose quality
    var sources = video.querySelectorAll("source");
    if (sources.length < 2) return;

    var qualityButtons = document.querySelector(".video-quality");
    if (!qualityButtons) return;

    var currentSrc = sources[0].getAttribute("src");
    var currentQuality = sources[0].getAttribute("data-quality") || "auto";

    qualityButtons.addEventListener("click", function (e) {
      if (e.target.tagName !== "BUTTON") return;

      var quality = e.target.getAttribute("data-quality");
      if (!quality) return;

      // Find matching source
      var matchingSource = Array.from(sources).find(function (s) {
        return s.getAttribute("data-quality") === quality;
      });

      if (matchingSource && matchingSource.getAttribute("src") !== currentSrc) {
        sources.forEach(function (s) { s.remove(); });
        video.insertBefore(matchingSource, video.firstChild);
        video.load();
        currentSrc = matchingSource.getAttribute("src");
        currentQuality = quality;

        // Update active button
        Array.from(qualityButtons.children).forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-quality") === quality);
        });
      }
    });
  })();
})();
