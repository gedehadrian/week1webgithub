// Hadrian Astrawinata — Personal portfolio interactions
// ES module — loaded via <script type="module">

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* =========================================================
   1) Portfolio data (single source of truth)
   Add / edit / remove projects here — the grid re-renders.
   ========================================================= */
const UNSPLASH = (id, w = 700, h = 440, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;

export const projects = [
  {
    id: "mixera",
    title: "Mixéra — AI Fashion E-Commerce",
    category: ["mobile", "ai-iot"],
    categoryLabel: "Mobile · AI · E-Commerce",
    description:
      "Flutter + Django fashion app combining e-commerce, digital wardrobe, AI mix-and-match, and virtual try-on. Includes OTP auth, cart, checkout, Midtrans payments, wallet, and saved addresses.",
    tech: ["Flutter", "Dart", "GetX", "Django", "DRF", "Midtrans", "JWT", "Firebase"],
    image: UNSPLASH("1483985988355-763728e1935b"),
    imageAlt: "Fashion outfit flat lay representing Mixéra e-commerce app",
    thumbClass: "thumb-mobile",
    links: { view: "#", code: "#" },
  },
  {
    id: "anusa",
    title: "ANUSA — Rural Price Reference App",
    category: ["mobile", "uiux"],
    categoryLabel: "Mobile · Research · Social Impact",
    description:
      "Prototype app that helps farmers access clearer commodity price information. Built on the Technology Acceptance Model with a focus on rural price uncertainty and limited access.",
    tech: ["Mobile Prototyping", "UI/UX", "Research", "Data Analysis"],
    image: UNSPLASH("1500937386664-56d1dfef3854"),
    imageAlt: "Rural rice fields and farmland at sunrise",
    thumbClass: "thumb-uiux",
    links: { view: "#", code: "#" },
  },
  {
    id: "enerbyte",
    title: "Enerbyte — Smart Energy Monitoring",
    category: ["ai-iot", "mobile"],
    categoryLabel: "IoT · Mobile · Sustainability",
    description:
      "IoT smart energy system that monitors electricity use and detects device fault patterns. Uses ESP32, current sensors, and smart relays connected to a mobile app and monitoring dashboard.",
    tech: ["ESP32", "ACS712", "MQTT", "Supabase", "Flutter", "IoT"],
    image: UNSPLASH("1509390144018-eeaf60de3aa1"),
    imageAlt: "Electric meter and wiring — smart energy monitoring",
    thumbClass: "thumb-iot",
    links: { view: "#", code: "#" },
  },
  {
    id: "saga",
    title: "Saga Bercerita — Cultural AR Website",
    category: ["web", "ai-iot"],
    categoryLabel: "Web · Augmented Reality · Culture",
    description:
      "Interactive web platform that tells the stories behind batik motifs through augmented reality. Built to help digitize culture and promote village SMB products.",
    tech: ["Next.js", "React", "Tailwind CSS", "WebAR", "MindAR", "Figma"],
    image: UNSPLASH("1580188912912-2c7fbba1d10a"),
    imageAlt: "Traditional Indonesian batik textile pattern",
    thumbClass: "thumb-web",
    links: { view: "#", code: "#" },
  },
  {
    id: "lostfound",
    title: "Campus Lost & Found System",
    category: ["web"],
    categoryLabel: "Desktop · Database",
    description:
      "Reporting app for lost and found items on campus. Provides auth, OTP, multi-image upload, claim submission, admin approval flow, and user notifications.",
    tech: ["Python", "Tkinter", "MySQL"],
    image: UNSPLASH("1523050854058-8df90110c9f1"),
    imageAlt: "University campus building with students",
    thumbClass: "thumb-desktop",
    links: { view: "#", code: "#" },
  },
  {
    id: "coop",
    title: "COOP Program Management System",
    category: ["web"],
    categoryLabel: "Web · Information System",
    description:
      "Django information system for managing COOP program registration, job listings, monthly progress reports, supervisor evaluations, and student certificate issuance.",
    tech: ["Django", "Python", "HTML", "CSS", "Bootstrap", "MySQL"],
    image: UNSPLASH("1552664730-d307ca884978"),
    imageAlt: "Team collaborating in a modern office",
    thumbClass: "thumb-web",
    links: { view: "#", code: "#" },
  },
  {
    id: "excel-biz",
    title: "Excel Business Automation",
    category: ["excel"],
    categoryLabel: "Excel · Business Tools",
    description:
      "Microsoft Excel + VBA automation system for tracking sales, purchases, expenses, income, stock, and simple financial reports. Can include input forms, validation, macro buttons, and a performance dashboard.",
    tech: ["Excel", "VBA", "Pivot Table", "Charts", "Macro Automation"],
    image: UNSPLASH("1543286386-713bdd548da4"),
    imageAlt: "Business charts and analytics on a laptop screen",
    thumbClass: "thumb-excel",
    links: { view: "#", code: "#" },
  },
  {
    id: "digital-art",
    title: "Digital Art & Illustration Collection",
    category: ["art"],
    categoryLabel: "Digital Art",
    description:
      "A collection of digital illustrations spanning character art, anime-inspired pieces, environmental artwork, portraits, and cinematic / fantasy visuals.",
    tech: ["Clip Studio Paint", "Huion Pen Tablet", "Adobe Photoshop"],
    image: UNSPLASH("1513364776144-60967b0f800f"),
    imageAlt: "Colorful art brushes and paint palette",
    thumbClass: "thumb-art",
    links: { view: "#", code: null },
  },
  {
    id: "branding",
    title: "Branding & Event Visual Design",
    category: ["art", "uiux"],
    categoryLabel: "Graphic Design · Branding",
    description:
      "Design work for campus organizations and events — visual identity, social media, banners, merchandise, posters, presentation assets, and event branding.",
    tech: ["Illustrator", "Photoshop", "Figma", "Canva"],
    image: UNSPLASH("1626785774573-4b799315345d"),
    imageAlt: "Brand identity mockups and design materials",
    thumbClass: "thumb-brand",
    links: { view: "#", code: null },
  },
];

/* =========================================================
   2) Render projects + filtering
   ========================================================= */
const grid = $("#projectGrid");
const filtersRoot = $("#filters");

function renderProjects(filter = "all") {
  if (!grid) return;
  const list = filter === "all"
    ? projects
    : projects.filter((p) => p.category.includes(filter));

  grid.innerHTML = list.map((p, i) => {
    const viewBtn = p.links?.view
      ? `<a class="btn btn-primary" href="${p.links.view}" target="_blank" rel="noopener">View Project</a>`
      : "";
    const codeBtn = p.links?.code
      ? `<a class="btn btn-outline" href="${p.links.code}" target="_blank" rel="noopener">${
          p.category.includes("art") ? "Case Study" : "Code"
        }</a>`
      : "";
    return `
      <article class="project" style="animation-delay:${i * 50}ms">
        <a class="project-thumb ${p.thumbClass}" href="${p.links?.view || '#'}" ${p.links?.view ? 'target="_blank" rel="noopener"' : ''} aria-label="Open ${p.title}">
          <img src="${p.image}" alt="${p.imageAlt || p.title}" loading="lazy" decoding="async" />
          <span class="project-thumb-cat">${p.categoryLabel}</span>
        </a>
        <div class="project-body">
          <span class="project-cat">${p.categoryLabel}</span>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <ul class="project-tech" aria-label="Technologies used">
            ${p.tech.map((t) => `<li>${t}</li>`).join("")}
          </ul>
          <div class="project-actions">
            ${viewBtn}${codeBtn}
          </div>
        </div>
      </article>
    `;
  }).join("");

  if (!list.length) {
    grid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:32px">No projects in this category yet — check back soon.</p>`;
  }
}

filtersRoot?.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  $$(".filter", filtersRoot).forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-selected", "false");
  });
  btn.classList.add("active");
  btn.setAttribute("aria-selected", "true");
  renderProjects(btn.dataset.filter);
});

renderProjects();

/* =========================================================
   3) Theme toggle (persist)
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
   4) Mobile menu
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
   5) Sticky header shadow + scroll spy
   ========================================================= */
const header = $("#siteHeader");
const sections = ["home", "about", "skills", "portfolio", "experience", "services", "contact"]
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
   6) Fan parallax (mouse tilt) — hero cards
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
   7) Reveal on scroll
   ========================================================= */
const revealTargets = [
  ".section-head",
  ".about-copy",
  ".about-card",
  ".skill-group",
  ".project",
  ".tl-item",
  ".feature",
  ".strength-list li",
  ".contact-copy",
  ".contact-form",
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
   8) Contact form (client-side handling — placeholder)
   ========================================================= */
const form = $("#contactForm");
const status = $("#formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  status.classList.remove("error");
  status.textContent = "";

  const data = Object.fromEntries(new FormData(form).entries());

  if (!data.name || !data.email || !data.subject || !data.message) {
    status.classList.add("error");
    status.textContent = "Please fill in all fields before sending.";
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email));
  if (!emailOk) {
    status.classList.add("error");
    status.textContent = "Please enter a valid email address.";
    return;
  }

  status.textContent = "Thanks! Your message has been prepared — I'll get back to you soon.";
  form.reset();

  // Optional: open user's mail client as a fallback until a backend is wired up.
  const to = "hadrian.astrawinata@example.com";
  const subject = encodeURIComponent(`[Portfolio] ${data.subject}`);
  const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
  window.setTimeout(() => {
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }, 400);
});

/* =========================================================
   9) Footer year
   ========================================================= */
const year = $("#year");
if (year) year.textContent = String(new Date().getFullYear());

/* =========================================================
   10) Card stagger entry
   ========================================================= */
$$(".fan .card").forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transitionDelay = `${i * 60}ms`;
  requestAnimationFrame(() => {
    setTimeout(() => { card.style.opacity = "1"; }, 120);
  });
});
