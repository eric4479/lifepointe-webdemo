/* ============================================================
   LifePointe Ministries — Calendar
   Reads data/events.json and renders a branded monthly calendar
   plus upcoming event lists. No dependencies. MIT licensed.
   ============================================================ */

(function () {
  "use strict";

  var EVENTS_URL = "/data/events.json";
  var MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var TYPE_COLORS = {
    worship:    "#1080C0",
    outreach:   "#60B040",
    community:  "#DD6B20",
    event:      "#9333EA",
    training:   "#059669",
    rental:     "#718096"
  };
  var TYPE_LABELS = {
    worship:   "Worship",
    outreach:  "Outreach",
    community: "Community",
    event:     "Special Event",
    training:  "Training",
    rental:    "Rental"
  };

  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();

  var calendarGrid = document.getElementById("calendarGrid");
  var upcomingList = document.getElementById("upcomingList");
  var fullEventList = document.getElementById("fullEventList");
  var prevBtn = document.querySelector(".btn--secondary-cal[aria-label='Previous month']");
  var nextBtn = document.querySelector(".btn--secondary-cal[aria-label='Next month']");

  var events = [];
  var isLoading = true;

  function padZero(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function loadEvents() {
    if (typeof fetch === "undefined") {
      renderFallback();
      return;
    }
    fetch(EVENTS_URL)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        events = data;
        renderAll();
        isLoading = false;
      })
      .catch(function (err) {
        console.warn("Calendar: could not load events.json — " + err.message);
        renderFallback();
      });
  }

  function renderAll() {
    renderCalendar(currentYear, currentMonth);
    renderUpcoming();
    renderFullList();
  }

  function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderAll();
  }

  function renderCalendar(year, month) {
    if (!calendarGrid) return;

    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var daysInMonth = lastDay.getDate();
    var startingWeekday = firstDay.getDay();

    var header = document.getElementById("calendar-heading");
    if (header) {
      header.textContent = MONTH_NAMES[month] + " " + year;
    }

    var html = "";

    // Day-of-week header row
    for (var h = 0; h < 7; h++) {
      html += '<div class="cal-dow">' + DAY_HEADERS[h] + '</div>';
    }

    // Empty cells before first day
    for (var i = 0; i < startingWeekday; i++) {
      html += '<div class="calendar-day empty"></div>';
    }

    // Day cells
    for (var d = 1; d <= daysInMonth; d++) {
      var dateStr = year + "-" + padZero(month + 1) + "-" + padZero(d);
      var dayEvents = events.filter(function (e) {
        return e.startsOn === dateStr;
      });
      var hasEvents = dayEvents.length > 0;
      var isToday = (d === currentDate.getDate() &&
                     month === currentDate.getMonth() &&
                     year === currentDate.getFullYear());

      var classes = "calendar-day";
      if (hasEvents) classes += " has-events";
      if (isToday) classes += " today";

      var dayLabel = d + " " + MONTH_NAMES[month].substring(0, 3);
      var ariaLabel = d + " " + MONTH_NAMES[month] + " " + year;
      if (hasEvents) {
        var names = dayEvents.map(function (e) { return e.name; });
        ariaLabel += " — " + names.join(", ");
      }

      html += '<div class="' + classes + '" role="gridcell" aria-label="' + ariaLabel + '">';
      html += '<span class="day-number">' + d + '</span>';

      if (hasEvents) {
        html += '<div class="day-events">';
        dayEvents.forEach(function (ev) {
          var color = TYPE_COLORS[ev.type] || "#1080C0";
          var shortTime = ev.allDay ? "All day" : (ev.time || "");
          var shortName = ev.name.length > 18 ? ev.name.substring(0, 18) + "\u2026" : ev.name;
          html += '<div class="day-event-badge" title="' + ev.name + (shortTime ? " · " + shortTime : "") + '">';
          html += '<span class="badge-dot" style="background:' + color + '"></span>';
          html += '<span class="badge-label">' + shortName + '</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      html += '</div>';
    }

    // Remaining cells in last week
    var totalCells = startingWeekday + daysInMonth;
    var remaining = (7 - (totalCells % 7)) % 7;
    for (var r = 0; r < remaining; r++) {
      html += '<div class="calendar-day empty"></div>';
    }

    calendarGrid.innerHTML = html;

    // Click handlers on day cells
    var cells = calendarGrid.querySelectorAll(".has-events");
    for (var c = 0; c < cells.length; c++) {
      (function (cell) {
        cell.addEventListener("click", function () {
          var dayNum = cell.querySelector(".day-number").textContent;
          var dateClicked = currentYear + "-" + padZero(month + 1) + "-" + padZero(parseInt(dayNum, 10));
          showDayEvents(dateClicked);
        });
      })(cells[c]);
    }

    // Update nav button states
    updateNavButtons(year, month);
  }

  function updateNavButtons(year, month) {
    if (prevBtn) {
      var atStart = (year === 2026 && month === 0);
      prevBtn.disabled = atStart;
      prevBtn.style.opacity = atStart ? "0.4" : "1";
      prevBtn.style.cursor = atStart ? "not-allowed" : "pointer";
    }
  }

  function showDayEvents(dateStr) {
    var dayEvents = events.filter(function (e) { return e.startsOn === dateStr; });
    if (dayEvents.length === 0) return;

    var existing = document.querySelector(".day-events-popover");
    if (existing) existing.remove();

    var popover = document.createElement("div");
    popover.className = "day-events-popover";
    popover.style.cssText =
      "position:absolute;background:#fff;border:1px solid #e5e7eb;border-radius:10px;" +
      "box-shadow:0 8px 24px rgba(0,0,0,.15);padding:1rem;z-index:100;max-width:280px;font-size:.9rem;";

    var title = "Events for " + MONTH_NAMES[new Date(dateStr + "T00:00:00").getMonth()] +
      " " + new Date(dateStr + "T00:00:00").getDate() + ", " +
      new Date(dateStr + "T00:00:00").getFullYear();
    popover.innerHTML = '<h4 style="margin:0 0 .5rem;font-size:1rem;color:#111827;">' + title + "</h4>";

    dayEvents.forEach(function (ev) {
      var color = TYPE_COLORS[ev.type] || "#1080C0";
      var label = TYPE_LABELS[ev.type] || ev.type;
      var timeStr = ev.time ? " · " + ev.time : "";
      var allDayStr = ev.allDay ? " · All day" : "";
      popover.innerHTML +=
        '<div style="padding:.4rem 0;border-bottom:1px solid #e5e7eb;">' +
        '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem;">' +
        '<span style="width:8px;height:8px;background:' + color + ';border-radius:50%;"></span>' +
        '<strong style="color:#111827;">' + ev.name + "</strong>" +
        '</div>' +
        '<p style="margin:.2rem 0 0;color:#6B7280;font-size:.82rem;">' +
        '<span style="text-transform:uppercase;font-size:.7rem;letter-spacing:.03em;color:#9CA3AF;">' + label + "</span>" +
        timeStr + allDayStr +
        '</p>' +
        '<p style="margin:.2rem 0 0;color:#6B7280;font-size:.82rem;">\uD83D\uDCC2 ' + (ev.location || "") + "</p>" +
        '</div>';
    });

    popover.innerHTML += '<p style="margin:.6rem 0 0;color:#9CA3AF;font-size:.78rem;">Click outside or press Esc to close.</p>';
    document.body.appendChild(popover);

    // Position near the clicked cell
    var cell = document.activeElement;
    if (cell && cell.classList.contains("has-events")) {
      var rect = cell.getBoundingClientRect();
      popover.style.top = (rect.bottom + 8) + "px";
      popover.style.left = Math.max(8, rect.left) + "px";
      if (popover.getBoundingClientRect().right > window.innerWidth) {
        popover.style.left = (window.innerWidth - popover.getBoundingClientRect().width - 8) + "px";
      }
    } else {
      popover.style.top = "50%";
      popover.style.left = "50%";
      popover.style.transform = "translate(-50%,-50%)";
    }

    // Close on Esc or outside click
    var closePopover = function () {
      if (popover.parentNode) popover.parentNode.removeChild(popover);
    };
    var escHandler = function (e) { if (e.key === "Escape") closePopover(); };
    var outsideHandler = function (e) {
      if (popover && !popover.contains(e.target)) closePopover();
    };
    document.addEventListener("keydown", escHandler);
    document.addEventListener("click", outsideHandler);
  }

  function renderUpcoming() {
    if (!upcomingList) return;
    var sorted = events.slice().sort(function (a, b) {
      return a.startsOn.localeCompare(b.startsOn);
    });
    var upcoming = sorted.slice(0, 6);

    if (upcoming.length === 0) {
      upcomingList.innerHTML = '<p style="color:#6B7280;text-align:center;padding:2rem;">No events scheduled.</p>';
      return;
    }

    var html = "";
    for (var i = 0; i < upcoming.length; i++) {
      var ev = upcoming[i];
      var dateObj = new Date(ev.startsOn + "T00:00:00");
      var dateStr = MONTH_NAMES[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear();
      var color = TYPE_COLORS[ev.type] || "#1080C0";
      var label = TYPE_LABELS[ev.type] || ev.type;

      html += '<div class="event-item" style="display:flex;gap:1rem;align-items:flex-start;padding:1rem;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:.75rem;background:#fff;">';
      html += '<div style="flex:0 0 64px;text-align:center;padding:.3rem 0;">';
      html += '<div style="background:' + color + ';color:#fff;font-size:.65rem;font-weight:700;padding:.2rem .4rem;border-radius:4px;display:inline-block;margin-bottom:.3rem;text-transform:uppercase;letter-spacing:.04em;">' +
        (dateObj.getMonth() + 1) + '</div>';
      html += '<div style="font-size:1.4rem;font-weight:700;color:#111827;line-height:1;">' + dateObj.getDate() + '</div>';
      html += '</div>';
      html += '<div style="flex:1;min-width:0;">';
      html += '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem;flex-wrap:wrap;">';
      html += '<span style="background:' + color + ';color:#fff;font-size:.65rem;font-weight:700;padding:.15rem .5rem;border-radius:4px;text-transform:uppercase;letter-spacing:.04em;">' + label + '</span>';
      if (ev.recurring) {
        html += '<span style="color:#9CA3AF;font-size:.75rem;font-style:italic;margin-left:.5rem;">' + ev.recurring + "</span>";
      }
      html += '</div>';
      html += '<h3 style="font-size:1rem;font-weight:700;margin:0 0 .3rem;color:#111827;">' + ev.name + "</h3>";
      if (ev.time && !ev.allDay) {
        html += '<p style="color:#6B7280;font-size:.88rem;margin:0 0 .4rem;">\u23F0 ' + ev.time + "</p>";
      }
      html += '<p style="color:#6B7280;font-size:.85rem;margin:0 0 .5rem;">\uD83D\uDCC2 ' + (ev.location || "Titusville Civic Center") + "</p>";
      if (ev.description) {
        html += '<p style="color:#4B5563;font-size:.88rem;line-height:1.5;margin:0;">' + ev.description + "</p>";
      }
      html += '</div></div>';
    }

    upcomingList.innerHTML = html;
  }

  function renderFullList() {
    if (!fullEventList) return;
    var sorted = events.slice().sort(function (a, b) {
      return a.startsOn.localeCompare(b.startsOn);
    });

    if (sorted.length === 0) {
      fullEventList.innerHTML = '<p style="color:#6B7280;text-align:center;padding:2rem;">No events recorded.</p>';
      return;
    }

    var todayStr = currentYear + "-" + padZero(currentMonth + 1) + "-" + padZero(currentDate.getDate());
    var html = "";
    for (var i = 0; i < sorted.length; i++) {
      var ev = sorted[i];
      var dateObj = new Date(ev.startsOn + "T00:00:00");
      var dateStr = MONTH_NAMES[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear();
      var endStr = "";
      if (ev.endsOn && ev.endsOn !== ev.startsOn) {
        var endObj = new Date(ev.endsOn + "T00:00:00");
        endStr = " \u2013 " + MONTH_NAMES[endObj.getMonth()] + " " + endObj.getDate() + ", " + endObj.getFullYear();
      }
      var color = TYPE_COLORS[ev.type] || "#1080C0";
      var label = TYPE_LABELS[ev.type] || ev.type;
      var past = ev.startsOn < todayStr;
      var opacity = past ? "opacity:.45;" : "";

      html += '<div class="event-item-full" style="' + opacity +
        'display:flex;gap:1rem;align-items:flex-start;padding:1rem;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:.75rem;background:#fff;">';

      html += '<div style="flex:0 0 64px;text-align:center;">';
      html += '<div style="background:' + color + ';color:#fff;font-size:.65rem;font-weight:700;padding:.2rem .4rem;border-radius:4px;display:inline-block;margin-bottom:.3rem;text-transform:uppercase;letter-spacing:.04em;">' +
        (dateObj.getMonth() + 1) + '</div>';
      html += '<div style="font-size:1.4rem;font-weight:700;color:#111827;line-height:1;">' + dateObj.getDate() + '</div>';
      html += '</div>';

      html += '<div style="flex:1;min-width:0;">';
      html += '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem;flex-wrap:wrap;">';
      html += '<span style="background:' + color + ';color:#fff;font-size:.65rem;font-weight:700;padding:.15rem .5rem;border-radius:4px;text-transform:uppercase;letter-spacing:.04em;">' + label + '</span>';
      if (ev.recurring) {
        html += '<span style="color:#9CA3AF;font-size:.75rem;font-style:italic;margin-left:.5rem;">' + ev.recurring + "</span>";
      }
      html += '</div>';
      html += '<h3 style="font-size:1rem;font-weight:700;margin:0 0 .3rem;color:#111827;">' + ev.name + "</h3>";
      if (ev.time && !ev.allDay) {
        html += '<p style="color:#6B7280;font-size:.85rem;margin:0 0 .3rem;">\u23F0 ' + ev.time + "</p>";
      } else if (ev.allDay) {
        html += '<p style="color:#6B7280;font-size:.85rem;margin:0 0 .3rem;">\uD83D\uDCC5 All day</p>';
      }
      html += '<p style="color:#6B7280;font-size:.85rem;margin:0 0 .3rem;">\uD83D\uDCC2 ' + (ev.location || "Titusville Civic Center") + "</p>";
      if (ev.description) {
        html += '<p style="color:#4B5563;font-size:.88rem;line-height:1.5;margin:0 0 .3rem;">' + ev.description + "</p>";
      }
      html += '</div></div>';
    }

    fullEventList.innerHTML = html;
  }

  function renderFallback() {
    if (calendarGrid) {
      calendarGrid.innerHTML = '<div style="grid-column:1 / -1;padding:2rem;text-align:center;color:#6B7280;background:#f8fafc;border-top:1px solid #e5e7eb;">\u26A0 Calendar data unavailable \u2014 showing sample events below.</div>';
    }
    if (upcomingList) {
      upcomingList.innerHTML = '<p style="color:#6B7280;text-align:center;padding:2rem;">\u26A0 Events data not loaded.</p>';
    }
    if (fullEventList) {
      fullEventList.innerHTML = '<p style="color:#6B7280;text-align:center;padding:2rem;">\u26A0 Events data not loaded.</p>';
    }
    isLoading = false;
  }

  // Wire up nav buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (prevBtn.disabled) return;
      changeMonth(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      changeMonth(1);
    });
  }

  // Keyboard nav
  document.addEventListener("keydown", function (e) {
    if (!calendarGrid) return;
    if (e.key === "ArrowLeft" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (prevBtn && !prevBtn.disabled) prevBtn.click();
      e.preventDefault();
    } else if (e.key === "ArrowRight" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (nextBtn) nextBtn.click();
      e.preventDefault();
    }
  });

  // Initial render
  loadEvents();
})();
