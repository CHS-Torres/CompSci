(function () {
  var CSV_PATH = "data/school-data.csv";
  var SLIDE_DURATION = 3000;

  // Fallback mirrors school-data.csv in case the CSV can't be fetched (e.g. file:// protocol).
  var FALLBACK_DATA = {
    enrollment: { total: 1467, "9th Grade": 387, "10th Grade": 395, "11th Grade": 311, "12th Grade": 374 },
    gender: { Male: 761, Female: 706 },
    ethnicity: {
      "Hispanic/Latino": 506,
      "American Indian/Alaska Native": 3,
      Asian: 50,
      "Black or African American": 290,
      "Native Hawaiian/Pacific Islander": 0,
      White: 559,
      "Two or More Races": 58
    },
    ctae: {
      "AV Tech 1": 42,
      "AV Tech 2": 21,
      "Law Enforcement Services": 23,
      EMR: 20,
      "Financial Services": 16,
      JROTC: 14,
      "Comp Sci with IDT": 10,
      "Computer Science": 8,
      "Game Design": 6,
      "Sports Medicine": 6,
      "Allied Health & Medicine": 3
    }
  };

  var PALETTE = ["#0b4f8a", "#1d6ead", "#3d84be", "#6fa8d3", "#9fc4e2", "#c7dbef", "#25486d", "#4a7fb0"];

  function parseCsv(text) {
    var data = { enrollment: {}, gender: {}, ethnicity: {}, ctae: {} };
    var lines = text.split(/\r?\n/);
    for (var i = 1; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var parts = line.split(",");
      if (parts.length < 3) continue;
      var category = parts[0].trim();
      var subcategory = parts[1].trim();
      var value = Number(parts[2].trim());
      if (!category || !subcategory || Number.isNaN(value)) continue;

      if (category === "Enrollment") {
        var key = subcategory === "Total Students" ? "total" : subcategory;
        data.enrollment[key] = value;
      } else if (category === "Gender") {
        data.gender[subcategory] = value;
      } else if (category === "Ethnicity") {
        data.ethnicity[subcategory] = value;
      } else if (category === "CTAE") {
        data.ctae[subcategory] = value;
      }
    }
    return data;
  }

  function fitCanvas(canvas) {
    var ratio = window.devicePixelRatio || 1;
    var width = canvas.clientWidth || canvas.width;
    var height = canvas.clientHeight || canvas.height;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    var ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { ctx: ctx, width: width, height: height };
  }

  function drawHorizontalBarChart(canvas, labels, values, options) {
    options = options || {};
    var rowHeight = options.rowHeight || 34;
    var topPad = 10;
    var bottomPad = 10;
    var labelWidth = options.labelWidth || 170;
    var rightPad = 46;

    // Size the canvas to fit every row without overlapping labels.
    canvas.style.height = labels.length * rowHeight + topPad + bottomPad + "px";

    var setup = fitCanvas(canvas);
    var ctx = setup.ctx;
    var width = setup.width;
    ctx.clearRect(0, 0, width, setup.height);

    var chartLeft = labelWidth;
    var chartWidth = width - labelWidth - rightPad;
    var maxValue = Math.max.apply(null, values) * 1.15 || 1;

    ctx.textBaseline = "middle";

    values.forEach(function (value, i) {
      var rowY = topPad + i * rowHeight;
      var barHeight = rowHeight * 0.55;
      var barY = rowY + (rowHeight - barHeight) / 2;
      var barWidth = (value / maxValue) * chartWidth;

      ctx.fillStyle = options.color || PALETTE[i % PALETTE.length];
      ctx.fillRect(chartLeft, barY, Math.max(barWidth, 2), barHeight);

      ctx.fillStyle = "#25486d";
      ctx.font = "15px Segoe UI, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(labels[i], chartLeft - 10, barY + barHeight / 2);

      ctx.fillStyle = "#1a2433";
      ctx.font = "bold 16px Segoe UI, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(String(value), chartLeft + barWidth + 8, barY + barHeight / 2);
    });

    ctx.textBaseline = "alphabetic";
  }

  function drawPieChart(canvas, labels, values, colors) {
    canvas.style.height = "360px";
    var setup = fitCanvas(canvas);
    var ctx = setup.ctx;
    var width = setup.width;
    var height = setup.height;
    ctx.clearRect(0, 0, width, height);

    var total = values.reduce(function (sum, v) { return sum + v; }, 0) || 1;
    var cx = width * 0.32;
    var cy = height / 2;
    var radius = Math.min(cx, cy) - 10;
    var startAngle = -Math.PI / 2;

    values.forEach(function (value, i) {
      var sliceAngle = (value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      startAngle += sliceAngle;
    });

    var legendX = width * 0.58;
    var legendY = 20;
    var lineHeight = (height - 40) / labels.length;
    labels.forEach(function (label, i) {
      var y = legendY + i * lineHeight;
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(legendX, y, 14, 14);
      ctx.fillStyle = "#1a2433";
      ctx.font = "15px Segoe UI, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(label + " (" + values[i] + ")", legendX + 20, y + 12);
    });
  }

  function renderDashboard(data) {
    var enrollmentSubtitle = document.getElementById("enrollmentSubtitle");
    if (enrollmentSubtitle) {
      enrollmentSubtitle.textContent =
        "Total Students: " + data.enrollment.total + " | 2026-2027 School Year";
    }

    var enrollmentCanvas = document.getElementById("enrollmentChart");
    if (enrollmentCanvas) {
      drawHorizontalBarChart(
        enrollmentCanvas,
        ["9th Grade", "10th Grade", "11th Grade", "12th Grade"],
        [
          data.enrollment["9th Grade"],
          data.enrollment["10th Grade"],
          data.enrollment["11th Grade"],
          data.enrollment["12th Grade"]
        ],
        { color: "#0b4f8a", rowHeight: 60, labelWidth: 130 }
      );
    }

    var demographicsCanvas = document.getElementById("demographicsChart");
    if (demographicsCanvas) {
      var ethnicityLabels = Object.keys(data.ethnicity);
      var ethnicityValues = ethnicityLabels.map(function (label) {
        return data.ethnicity[label];
      });
      drawPieChart(demographicsCanvas, ethnicityLabels, ethnicityValues, PALETTE);
    }

    var genderSubtitle = document.getElementById("genderSubtitle");
    if (genderSubtitle) {
      genderSubtitle.textContent =
        "Male: " + data.gender.Male + " | Female: " + data.gender.Female;
    }

    var ctaeCanvas = document.getElementById("ctaeChart");
    if (ctaeCanvas) {
      var ctaeLabels = Object.keys(data.ctae);
      var ctaeValues = ctaeLabels.map(function (label) {
        return data.ctae[label];
      });
      drawHorizontalBarChart(ctaeCanvas, ctaeLabels, ctaeValues, {
        color: "#1d6ead",
        rowHeight: 36,
        labelWidth: 220
      });
    }
  }

  function setupCarousel() {
    var track = document.getElementById("carouselTrack");
    var dotsWrap = document.getElementById("carouselDots");
    if (!track) {
      return null;
    }

    var slides = Array.prototype.slice.call(track.querySelectorAll(".carousel-slide"));
    var dots = [];
    var current = 0;

    slides.forEach(function (slide, i) {
      if (!dotsWrap) return;
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show slide " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function goTo(index) {
      slides[current].classList.remove("active");
      if (dots[current]) dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      if (dots[current]) dots[current].classList.add("active");
    }

    var timer = setInterval(function () {
      goTo(current + 1);
    }, SLIDE_DURATION);

    return { goTo: goTo, timer: timer };
  }

  function init() {
    setupCarousel();

    fetch(CSV_PATH)
      .then(function (response) {
        if (!response.ok) throw new Error("CSV fetch failed");
        return response.text();
      })
      .then(function (text) {
        renderDashboard(parseCsv(text));
      })
      .catch(function () {
        renderDashboard(FALLBACK_DATA);
      });

    window.addEventListener("resize", function () {
      fetch(CSV_PATH)
        .then(function (response) {
          return response.ok ? response.text() : Promise.reject();
        })
        .then(function (text) {
          renderDashboard(parseCsv(text));
        })
        .catch(function () {
          renderDashboard(FALLBACK_DATA);
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
