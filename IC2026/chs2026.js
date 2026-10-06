(function () {
  document.documentElement.classList.add("js");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealSections() {
    var elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reducedMotion) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function animateCounter(element) {
    var target = Number(element.getAttribute("data-count"));
    if (!Number.isFinite(target)) {
      return;
    }
    if (reducedMotion || !("IntersectionObserver" in window)) {
      element.textContent = target.toLocaleString();
      return;
    }

    var observer = new IntersectionObserver(function (entries, currentObserver) {
      if (!entries[0].isIntersecting) {
        return;
      }
      currentObserver.disconnect();
      var start = performance.now();
      var duration = 1000;

      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased).toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      }

      window.requestAnimationFrame(tick);
    }, { threshold: 0.65 });
    observer.observe(element);
  }

  function parseCsvLine(line) {
    var fields = [];
    var field = "";
    var quoted = false;

    for (var index = 0; index < line.length; index += 1) {
      var character = line[index];
      if (character === '"' && quoted && line[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (character === "," && !quoted) {
        fields.push(field.trim());
        field = "";
      } else {
        field += character;
      }
    }
    fields.push(field.trim());
    return fields;
  }

  function parseSchoolData(csv) {
    var lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter(function (line) {
      return line.trim() !== "";
    });
    if (lines.length < 2) {
      return [];
    }

    var headers = parseCsvLine(lines[0]);
    return lines.slice(1).map(function (line) {
      var fields = parseCsvLine(line);
      var record = {};
      headers.forEach(function (header, index) {
        record[header] = fields[index] || "";
      });
      return record;
    }).filter(function (record) {
      return record.Category === "CTAE" && record.Subcategory && Number.isFinite(Number(record.Value));
    }).map(function (record) {
      return { label: record.Subcategory, value: Number(record.Value) };
    });
  }

  function renderProgramChart(programs) {
    var chart = document.getElementById("program-chart");
    var status = document.getElementById("data-status");
    if (!chart || !status) {
      return;
    }
    if (!programs.length) {
      chart.innerHTML = '<p class="chart-placeholder">No CTAE pathway completer rows were found in the school data.</p>';
      status.textContent = "No CTAE records found";
      return;
    }

    var maximum = Math.max.apply(null, programs.map(function (program) { return program.value; })) || 1;
    chart.replaceChildren();
    programs.slice().sort(function (first, second) {
      return second.value - first.value;
    }).forEach(function (program) {
      var row = document.createElement("div");
      var label = document.createElement("span");
      var track = document.createElement("span");
      var fill = document.createElement("span");
      var value = document.createElement("span");

      row.className = "bar-row";
      label.className = "bar-label";
      label.textContent = program.label;
      label.title = program.label;
      track.className = "bar-track";
      fill.className = "bar-fill";
      fill.setAttribute("aria-hidden", "true");
      value.className = "bar-value";
      value.textContent = program.value.toLocaleString();
      row.setAttribute("aria-label", program.label + ": " + program.value);
      track.appendChild(fill);
      row.append(label, track, value);
      chart.appendChild(row);

      window.requestAnimationFrame(function () {
        fill.style.width = Math.max((program.value / maximum) * 100, 2) + "%";
      });
    });

    status.classList.add("is-loaded");
    status.innerHTML = "<i></i> " + programs.length + " pathway rows loaded";
    ["Financial Services", "Computer Science"].forEach(function (label) {
      var program = programs.find(function (item) { return item.label === label; });
      var metric = document.querySelector('[data-csv="' + label + '"]');
      if (program && metric) {
        metric.setAttribute("data-count", program.value);
        animateCounter(metric);
      }
    });
    var totalMetric = document.querySelector("[data-csv-total]");
    var pathwayCount = document.querySelector("[data-pathway-count]");
    var total = programs.reduce(function (sum, program) { return sum + program.value; }, 0);
    if (totalMetric) {
      totalMetric.setAttribute("data-count", total);
      animateCounter(totalMetric);
    }
    if (pathwayCount) {
      pathwayCount.textContent = programs.length + (programs.length === 1 ? " pathway" : " pathways");
    }
  }

  function loadSchoolData() {
    var status = document.getElementById("data-status");
    fetch("data/school-data.csv")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("School data could not be loaded");
        }
        return response.text();
      })
      .then(parseSchoolData)
      .then(renderProgramChart)
      .catch(function () {
        var chart = document.getElementById("program-chart");
        if (chart) {
          chart.innerHTML = '<p class="chart-placeholder">School data is unavailable. Please open this page through a local web server to load the CSV.</p>';
        }
        if (status) {
          status.textContent = "Data unavailable";
        }
      });
  }

  function setupPartnerNetwork() {
    var descriptions = {
      "Business Partners": "Bring current industry insight into class through projects, career conversations, visits, and mentoring.",
      "Advisory Committees": "Share workforce feedback that helps programs stay relevant and certification-ready.",
      "Industry Professionals": "Help students connect classroom learning to the tools, expectations, and pathways used at work.",
      "CTAE Programs": "Connect with Financial Services, Computer Programming, and Unity Game Development learning.",
      "FBLA": "Support student-led leadership, career development, service, and professional proposals.",
      "School Leadership": "Align student opportunities with school priorities, pathway visibility, and long-term program growth.",
      "Community Organizations": "Create local connections through service, career exploration, and experiences beyond campus."
    };
    var title = document.getElementById("partner-title");
    var description = document.getElementById("partner-description");
    document.querySelectorAll("[data-partner]").forEach(function (button) {
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", function () {
        var partner = button.getAttribute("data-partner");
        document.querySelectorAll("[data-partner]").forEach(function (node) {
          node.classList.remove("is-active");
          node.setAttribute("aria-pressed", "false");
        });
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");
        title.textContent = partner;
        description.textContent = descriptions[partner];
      });
    });
  }

  function setupRotatingMessage() {
    var message = document.getElementById("rotating-message");
    var toggle = document.getElementById("banner-toggle");
    if (!message || reducedMotion) {
      return;
    }
    var messages = [
      "28 FBLA members registered for FLC",
      "Industry certification in progress",
      "Growing student leadership",
      "Building community partnerships"
    ];
    var current = 0;
    var paused = false;
    window.setInterval(function () {
      if (!paused) {
        current = (current + 1) % messages.length;
        message.textContent = messages[current];
      }
    }, 5000);
    if (toggle) {
      toggle.addEventListener("click", function () {
        paused = !paused;
        toggle.setAttribute("aria-label", paused ? "Play rotating highlights" : "Pause rotating highlights");
        toggle.textContent = paused ? "▶" : "Ⅱ";
      });
    }
  }

  document.querySelectorAll("[data-count]").forEach(animateCounter);
  revealSections();
  loadSchoolData();
  setupPartnerNetwork();
  setupRotatingMessage();
})();
