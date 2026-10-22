/* Display-only gallery: shows the items listed in js/content.js */
(function () {
  "use strict";
  const root = document.querySelector("[data-showcase]");
  if (!root) return;
  const kind = root.dataset.kind;
  const items = ((window.SITE_CONTENT || {})[root.dataset.showcase] || []).filter(Boolean);
  const cats = root.dataset.categories ? JSON.parse(root.dataset.categories) : [];
  const grid = document.getElementById("gallery-grid"), filters = document.getElementById("filters");
  let current = "All";

  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x) n.textContent = x; return n; };

  function media(i) {
    if (!i.src) {
      const ph = el("div", "placeholder");
      ph.innerHTML = kind === "video"
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M10.500 8.500l5 3.500-5 3.500z" fill="currentColor"/></svg><span>Video will appear here</span>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 16l-5-5-9 9"/></svg><span>Image will appear here</span>';
      return ph;
    }
    if (kind === "video") {
      const v = document.createElement("video");
      v.src = i.src; v.controls = true; v.playsInline = true; v.preload = "metadata"; v.setAttribute("aria-label", i.title || "Reel");
      v.addEventListener("error", () => v.replaceWith(el("div", "media-error", "This video can\u2019t play. Check that the file exists at \u201c" + i.src + "\u201d and is an MP4 (H.264).")));
      return v;
    }
    const img = document.createElement("img");
    img.src = i.src; img.alt = i.title || "Sara Digix work"; img.loading = "lazy";
    img.addEventListener("error", () => img.replaceWith(el("div", "media-error", "Image not found: " + i.src)));
    return img;
  }

  function render() {
    grid.replaceChildren();
    const shown = items.filter((i) => current === "All" || i.category === current);
    grid.classList.toggle("single", shown.length === 1);
    shown.forEach((i) => {
      const card = el("article", "card hover-lift");
      const m = el("div", "media"); m.appendChild(media(i)); card.appendChild(m);
      const body = el("div", "card-body");
      if (i.category) body.append(el("span", "badge", i.category));
      if (i.title) body.append(el("h3", "", i.title));
      const desc = i.description || i.caption;
      if (desc) body.append(el("p", "caption", desc));
      card.appendChild(body); grid.appendChild(card);
    });
  }

  if (filters && cats.length && items.length > 1) {
    ["All", ...cats].forEach((c) => {
      const b = el("button", "chip" + (c === current ? " active" : ""), c); b.type = "button";
      b.addEventListener("click", () => {
        current = c;
        filters.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === b));
        render();
      });
      filters.appendChild(b);
    });
  }
  if (filters && items.length <= 1) filters.hidden = true;
  render();
})();
