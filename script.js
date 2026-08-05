// Hadrian Art Studio — static commission site interactions
// ES module — loaded via <script type="module">

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* =========================================================
   1) Theme toggle (persist)
   ========================================================= */
const themeToggle = $("#themeToggle");
const root = document.documentElement;

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  try { localStorage.setItem("hadrian-theme", theme); } catch { /* ignore */ }
};

const initTheme = () => {
  let saved;
  try { saved = localStorage.getItem("hadrian-theme"); } catch { /* ignore */ }
  if (saved === "dark" || saved === "light") { applyTheme(saved); return; }
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
};

themeToggle?.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
});

initTheme();

/* =========================================================
   2) Mobile menu
   ========================================================= */
const menuBtn = $("#menuBtn");
const nav = $("#siteNav");

const closeMenu = () => {
  menuBtn?.classList.remove("open");
  nav?.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded", "false");
};

menuBtn?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open");
  menuBtn.classList.toggle("open", !!isOpen);
  menuBtn.setAttribute("aria-expanded", String(!!isOpen));
});

$$("#siteNav a").forEach((a) => a.addEventListener("click", closeMenu));

/* =========================================================
   3) Sticky header shadow + scroll spy
   ========================================================= */
const header = $("#siteHeader");
const sections = ["home", "about", "packages", "process", "included", "faq", "order"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = $$("#siteNav a");

const onScroll = () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 8);

  const y = window.scrollY + 120;
  let currentId = sections[0]?.id;
  for (const s of sections) {
    if (s.offsetTop <= y) currentId = s.id;
  }
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* =========================================================
   4) Fan parallax (mouse tilt) — hero cards
   Scoped to .hero so parallax doesn't fire elsewhere on the page.
   Disabled while a card is being hovered so hover animations stay
   perfectly stable (no jitter from compounding transforms).
   ========================================================= */
const fan = $("#fan");
const fanStage = $("#fanStage");
const heroInner = document.querySelector(".hero-inner");

if (fan && fanStage && heroInner && window.matchMedia("(pointer: fine)").matches) {
  let raf = null;
  let hoveringCard = false;

  const onMove = (e) => {
    if (hoveringCard) return;
    const rect = fanStage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rotY = dx * 5;
      const rotX = -dy * 3;
      const tx   = dx * 6;
      fan.style.transform =
        `translate3d(${tx}px, 0, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  };
  const reset = () => { fan.style.transform = ""; };

  heroInner.addEventListener("mousemove", onMove);
  heroInner.addEventListener("mouseleave", reset);

  fanStage.querySelectorAll(".card").forEach((c) => {
    c.addEventListener("mouseenter", () => { hoveringCard = true; reset(); });
    c.addEventListener("mouseleave", () => { hoveringCard = false; });
  });
}

/* =========================================================
   5) Reveal on scroll
   ========================================================= */
const revealTargets = [
  ".section-head",
  ".about-copy",
  ".about-card",
  ".skill-group",
  ".tl-item",
  ".feature",
  ".strength-list li",
  ".faq-item",
  ".contact-copy",
  ".chat-card",
];
revealTargets.forEach((sel) => $$(sel).forEach((el) => el.classList.add("reveal")));

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach((el) => io.observe(el));

/* =========================================================
   6) Footer year
   ========================================================= */
const year = $("#year");
if (year) year.textContent = String(new Date().getFullYear());

/* =========================================================
   7) Card stagger entry
   ========================================================= */
$$(".fan .card").forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transitionDelay = `${i * 60}ms`;
  requestAnimationFrame(() => {
    setTimeout(() => { card.style.opacity = "1"; }, 120);
  });
});
