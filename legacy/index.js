/* =========================================================
   Footer dates
========================================================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================================
   Active nav link based on current page
   - On home (data-page="home" on <body>):    no link active by default,
     section-scroll spy will highlight About/Education/Experience/Contact.
   - On projects (data-page="projects"):      "Projects" link is active.
========================================================= */
const currentPage = document.body.dataset.page || "home";
document.querySelectorAll(".navlinks a").forEach(a => {
  if (a.dataset.page === currentPage && currentPage === "projects") {
    a.classList.add("active");
  }
});

/* =========================================================
   Smooth scroll for in-page anchor links (home page)
   - Accounts for fixed header height
   - Updates URL hash without a jump
========================================================= */
const NAV_OFFSET = 84;

function scrollToSection(id, { smooth = true } = {}) {
  const target = id ? document.getElementById(id) : null;
  if (!target) {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    return;
  }
  const y = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href^='#']");
  if (!a) return;
  const href = a.getAttribute("href");
  if (!href || href === "#") return;
  const id = href.slice(1);
  if (!document.getElementById(id)) return;
  e.preventDefault();
  history.replaceState(null, "", `#${id}`);
  scrollToSection(id);
});

window.addEventListener("DOMContentLoaded", () => {
  if (location.hash) {
    const id = location.hash.slice(1);
    if (document.getElementById(id)) {
      requestAnimationFrame(() => scrollToSection(id, { smooth: false }));
    }
  }
});

/* =========================================================
   Scroll-spy: highlight the nav link for the section in view
   (only meaningful on the home page where sections exist)
========================================================= */
const sectionIds = ["about", "education", "experience", "contact"];
const sectionEls = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);

if (sectionEls.length && currentPage === "home" && "IntersectionObserver" in window) {
  const linkBySection = new Map();
  document.querySelectorAll(".navlinks a").forEach(a => {
    const href = a.getAttribute("href") || "";
    const m = href.match(/#([\w-]+)$/);
    if (m) linkBySection.set(m[1], a);
  });

  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });
    const active = sectionIds.find(id => visible.has(id));
    linkBySection.forEach(link => link.classList.remove("active"));
    if (active) {
      const link = linkBySection.get(active);
      if (link) link.classList.add("active");
    }
  }, {
    rootMargin: `-${NAV_OFFSET + 20}px 0px -55% 0px`,
    threshold: 0,
  });

  sectionEls.forEach(el => observer.observe(el));
}

/* =========================================================
   Constellation + shooting stars canvas (home page only)
========================================================= */
const canvas = document.getElementById("starCloud");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let animationId = null;
  let time = 0;
  let isActive = true;

  function resizeCanvas() {
    const container = canvas.parentElement;
    if (!container) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function cssSize() {
    return {
      w: parseFloat(canvas.style.width) || canvas.width,
      h: parseFloat(canvas.style.height) || canvas.height,
    };
  }

  resizeCanvas();

  // Aquarius constellation
  const aquariusStars = [
    { x: 0.30, y: 0.20, size: 4.0, brightness: 1.0 },
    { x: 0.35, y: 0.30, size: 3.5, brightness: 0.9 },
    { x: 0.40, y: 0.45, size: 3.0, brightness: 0.8 },
    { x: 0.45, y: 0.60, size: 3.0, brightness: 0.8 },
    { x: 0.50, y: 0.75, size: 3.5, brightness: 0.9 },
    { x: 0.55, y: 0.85, size: 3.0, brightness: 0.8 },
    { x: 0.50, y: 0.40, size: 3.0, brightness: 0.8 },
    { x: 0.60, y: 0.35, size: 3.5, brightness: 0.9 },
    { x: 0.65, y: 0.50, size: 2.5, brightness: 0.7 },
    { x: 0.70, y: 0.65, size: 2.0, brightness: 0.6 },
    { x: 0.75, y: 0.80, size: 2.0, brightness: 0.6 },
    { x: 0.25, y: 0.35, size: 2.5, brightness: 0.7 },
    { x: 0.30, y: 0.50, size: 2.5, brightness: 0.7 },
    { x: 0.35, y: 0.65, size: 2.5, brightness: 0.7 },
    { x: 0.40, y: 0.80, size: 2.5, brightness: 0.7 },
    { x: 0.55, y: 0.50, size: 2.5, brightness: 0.7 },
    { x: 0.60, y: 0.60, size: 2.5, brightness: 0.7 },
    { x: 0.70, y: 0.70, size: 2.5, brightness: 0.7 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [1, 6], [6, 7], [7, 8], [8, 9], [9, 10],
    [0, 11], [1, 11], [2, 12], [3, 13], [4, 13],
    [6, 14], [7, 15], [8, 15], [9, 16], [10, 16],
  ];

  const shootingStars = [
    { offset: 0,    speed: 0.12, length: 80, opacity: 0.85 },
    { offset: 2500, speed: 0.10, length: 65, opacity: 0.75 },
    { offset: 5000, speed: 0.14, length: 70, opacity: 0.80 },
  ];
  const shootAngle = 0.55;

  let backgroundStars = [];
  function initBackgroundStars() {
    backgroundStars = [];
    const { w, h } = cssSize();
    const count = Math.round((w * h) / 4000);
    for (let i = 0; i < Math.max(80, Math.min(180, count)); i++) {
      backgroundStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
  }
  initBackgroundStars();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initBackgroundStars();
  });

  function getStarPosition(star) {
    const { w, h } = cssSize();
    return { x: star.x * w, y: star.y * h, size: star.size, brightness: star.brightness };
  }

  function drawConstellationStar(x, y, size, brightness, twinkle) {
    const opacity = brightness * twinkle;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 8);
    grad.addColorStop(0, `rgba(109, 81, 166, ${opacity * 0.5})`);
    grad.addColorStop(0.4, `rgba(109, 81, 166, ${opacity * 0.3})`);
    grad.addColorStop(0.7, `rgba(109, 81, 166, ${opacity * 0.15})`);
    grad.addColorStop(1, "rgba(109, 81, 166, 0)");
    ctx.beginPath();
    ctx.arc(x, y, size * 8, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    const mid = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
    mid.addColorStop(0, `rgba(109, 81, 166, ${opacity * 0.7})`);
    mid.addColorStop(0.5, `rgba(109, 81, 166, ${opacity * 0.4})`);
    mid.addColorStop(1, "rgba(109, 81, 166, 0)");
    ctx.beginPath();
    ctx.arc(x, y, size * 4, 0, Math.PI * 2);
    ctx.fillStyle = mid;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, size * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();
  }

  function drawConstellationLines() {
    const positions = aquariusStars.map(getStarPosition);
    connections.forEach(([a, b]) => {
      const p1 = positions[a], p2 = positions[b];
      if (!p1 || !p2) return;
      const g = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      g.addColorStop(0, `rgba(109, 81, 166, ${p1.brightness * 0.5})`);
      g.addColorStop(1, `rgba(109, 81, 166, ${p2.brightness * 0.5})`);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = g;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(109, 81, 166, 0.4)";
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
  }

  function drawShootingStars() {
    const { w, h } = cssSize();
    const diag = Math.sqrt(w * w + h * h) * 1.5;
    shootingStars.forEach(s => {
      const t = ((time * s.speed + s.offset) % (diag + 2000)) - 500;
      const x = -100 + t * Math.cos(shootAngle);
      const y = -80 + t * Math.sin(shootAngle);
      if (x > w + 100 || y > h + 100) return;
      const decay = Math.max(0, 1 - Math.max(0, t) / diag);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(shootAngle);
      const grad = ctx.createLinearGradient(0, 0, -s.length, 0);
      grad.addColorStop(0,    `rgba(255, 255, 255, ${s.opacity * decay})`);
      grad.addColorStop(0.15, `rgba(220, 180, 255, ${s.opacity * 0.7 * decay})`);
      grad.addColorStop(0.4,  `rgba(150,  80, 200, ${s.opacity * 0.3 * decay})`);
      grad.addColorStop(1,    "rgba(109, 81, 166, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(-s.length, -1.5, s.length, 3);

      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * decay})`;
      ctx.fill();
      ctx.restore();
    });
  }

  function animate() {
    if (!isActive) {
      animationId = null;
      return;
    }
    time += 16;

    const { w, h } = cssSize();
    ctx.fillStyle = "rgba(3, 1, 31, 0.2)";
    ctx.fillRect(0, 0, w, h);

    backgroundStars.forEach(s => {
      const tw = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * tw})`;
      ctx.fill();
    });

    drawConstellationLines();
    aquariusStars.forEach((star, i) => {
      const pos = getStarPosition(star);
      const twinkle = Math.sin(time * 0.005 + i * 0.5) * 0.2 + 0.8;
      drawConstellationStar(pos.x, pos.y, pos.size, pos.brightness, twinkle);
    });
    drawShootingStars();

    animationId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (animationId !== null) cancelAnimationFrame(animationId);
      animationId = null;
    } else if (isActive) {
      animate();
    }
  });
}

/* =========================================================
   Gallery carousel — one slide at a time with arrows
========================================================= */
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".gallery-slide")];
  const prevBtn = carousel.querySelector(".gallery-arrow-prev");
  const nextBtn = carousel.querySelector(".gallery-arrow-next");
  const captionEl = carousel.querySelector(".gallery-caption");
  const counterEl = carousel.querySelector(".gallery-counter");
  if (!slides.length) return;

  let index = slides.findIndex((s) => s.classList.contains("is-active"));
  if (index < 0) index = 0;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, j) => slide.classList.toggle("is-active", j === index));
    if (captionEl) captionEl.textContent = slides[index].dataset.caption || "";
    if (counterEl) counterEl.textContent = `${index + 1} / ${slides.length}`;
    const single = slides.length <= 1;
    if (prevBtn) prevBtn.disabled = single;
    if (nextBtn) nextBtn.disabled = single;
  }

  prevBtn?.addEventListener("click", () => show(index - 1));
  nextBtn?.addEventListener("click", () => show(index + 1));

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  show(index);
});
