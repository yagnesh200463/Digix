/* Shared behaviour: config binding, WhatsApp, phone, Instagram, menu, animations */
(function () {
  "use strict";
  const C = window.SOCIAL_CONFIG || {};
  document.documentElement.classList.add("js");
  const digits = (v) => String(v || "").replace(/\D/g, "");

  function formatPhone(v) {
    const d = digits(v);
    if (d.length === 12 && d.startsWith("91")) return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
    return v ? String(v) : "";
  }

  function whatsappUrl(message) {
    const text = message || C.whatsappMessage || "";
    return `https://wa.me/${digits(C.whatsappNumber)}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  }

  function openWhatsApp(message) {
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  // Accepts "name", "@name" or a full instagram.com URL; returns "" if invalid
  function cleanInstagram(v) {
    let u = String(v || "").trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, "");
    u = u.replace(/^@/, "").split(/[/?#]/)[0];
    return /^[A-Za-z0-9._]{1,30}$/.test(u) ? u : "";
  }
  const instagramUser = cleanInstagram(C.instagramUsername);
  const instagramUrl = instagramUser ? `https://www.instagram.com/${instagramUser}/` : "";

  // Logos (set in config.js; nothing is built in)
  const logoBig = C.logo || "";
  const logoSmall = C.logoSmall || C.logo || "";
  document.querySelectorAll("[data-logo-small]").forEach((img) => {
    if (!logoSmall) return;
    img.addEventListener("error", () => { img.hidden = true; });
    img.src = logoSmall;
    img.hidden = false;
  });
  const heroLogo = document.getElementById("hero-logo");
  if (heroLogo) {
    const showPlaceholder = () => {
      heroLogo.replaceChildren();
      const ph = document.createElement("div");
      ph.className = "logo-placeholder";
      ph.textContent = "Your logo here";
      heroLogo.appendChild(ph);
    };
    if (logoBig) {
      const img = document.createElement("img");
      img.alt = "Sara Digix logo";
      img.addEventListener("error", showPlaceholder);
      img.src = logoBig;
      heroLogo.appendChild(img);
    } else showPlaceholder();
  }
  if (logoSmall) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = logoSmall;
    document.head.appendChild(link);
  }

  // Text fields
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    if (key === "phoneDisplay") el.textContent = formatPhone(C.contactPhone);
    else if (key === "whatsappDisplay") el.textContent = formatPhone(C.whatsappNumber);
    else if (C[key]) el.textContent = C[key];
  });

  // WhatsApp links (real wa.me conversation with prefilled message)
  document.querySelectorAll("[data-whatsapp]").forEach((a) => {
    a.href = whatsappUrl(a.dataset.whatsapp);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  // Phone links
  document.querySelectorAll("[data-phone]").forEach((a) => {
    a.href = `tel:${C.contactPhone}`;
    if (a.hasAttribute("data-phone-text")) a.textContent = formatPhone(C.contactPhone);
  });

  // Email (hidden until configured)
  document.querySelectorAll("[data-email]").forEach((a) => {
    if (C.email) {
      a.href = `mailto:${C.email}`;
      const t = a.querySelector("[data-email-text]");
      if (t) t.textContent = C.email;
      a.hidden = false;
    } else a.hidden = true;
  });

  // Instagram: real link when configured, otherwise a clearly disabled state
  document.querySelectorAll("[data-instagram]").forEach((a) => {
    if (instagramUrl) {
      a.href = instagramUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.classList.remove("is-disabled");
      a.removeAttribute("aria-disabled");
      a.removeAttribute("role");
      a.title = `Follow @${instagramUser} on Instagram`;
    } else {
      a.removeAttribute("href");
      a.classList.add("is-disabled");
      a.setAttribute("role", "link");
      a.setAttribute("aria-disabled", "true");
      a.title = "Instagram link coming soon";
    }
  });
  document.querySelectorAll("[data-instagram-note]").forEach((el) => {
    el.hidden = !!instagramUrl;
  });

  // Mobile menu
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Entrance animations
  const targets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    targets.forEach((t) => io.observe(t));
  } else targets.forEach((t) => t.classList.add("in"));

  window.SaraDigix = { openWhatsApp, whatsappUrl, instagramUrl, formatPhone };
})();
