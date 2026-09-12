/* ============================================================
   LifePointe Ministries — Mobile menu + small interactions
   ============================================================ */

(function () {
  "use strict";

  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("primaryNav");

  // Mobile menu toggle
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // "I need help" button scrolls to the contact section on the home page
  var helpBtn = document.getElementById("helpNowBtn");
  if (helpBtn) {
    helpBtn.addEventListener("click", function () {
      var target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  }

  // FAQ accordion: keep only one open at a time (optional, polite)
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
})();
