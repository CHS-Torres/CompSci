(function () {
  function setupContentRouter() {
    var frame = document.getElementById("content-frame");
    var title = document.getElementById("content-title");
    var links = document.querySelectorAll("[data-view-src]");

    if (!frame || !title || links.length === 0) {
      return;
    }

    function setView(src, label) {
      if (!src) {
        return;
      }
      frame.src = src;
      title.textContent = label || "Selected Content";
    }

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var src = link.getAttribute("data-view-src");
        var label = link.getAttribute("data-view-title") || link.textContent.trim();

        if (!src) {
          return;
        }

        event.preventDefault();
        setView(src, label);
      });
    });
  }

  setupContentRouter();
})();
