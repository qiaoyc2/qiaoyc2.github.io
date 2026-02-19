// Footer dates
const yearEl = document.getElementById("year");
const lastUpdatedEl = document.getElementById("lastUpdated");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastUpdatedEl) lastUpdatedEl.textContent = new Date().toLocaleDateString(undefined, { year:"numeric", month:"short", day:"numeric" });

// Aquarius constellation + shooting stars
const canvas = document.getElementById("starCloud");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let animationId;
  let time = 0;
  
  function resizeCanvas() {
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }
  
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    if (typeof initBackgroundStars === 'function') initBackgroundStars();
  });
  
  // Original Aquarius constellation (water bearer)
  const aquariusStars = [
    { x: 0.3, y: 0.2, size: 4, brightness: 1.0 },
    { x: 0.35, y: 0.3, size: 3.5, brightness: 0.9 },
    { x: 0.4, y: 0.45, size: 3, brightness: 0.8 },
    { x: 0.45, y: 0.6, size: 3, brightness: 0.8 },
    { x: 0.5, y: 0.75, size: 3.5, brightness: 0.9 },
    { x: 0.55, y: 0.85, size: 3, brightness: 0.8 },
    { x: 0.5, y: 0.4, size: 3, brightness: 0.8 },
    { x: 0.6, y: 0.35, size: 3.5, brightness: 0.9 },
    { x: 0.65, y: 0.5, size: 2.5, brightness: 0.7 },
    { x: 0.7, y: 0.65, size: 2, brightness: 0.6 },
    { x: 0.75, y: 0.8, size: 2, brightness: 0.6 },
    { x: 0.25, y: 0.35, size: 2.5, brightness: 0.7 },
    { x: 0.3, y: 0.5, size: 2.5, brightness: 0.7 },
    { x: 0.35, y: 0.65, size: 2.5, brightness: 0.7 },
    { x: 0.4, y: 0.8, size: 2.5, brightness: 0.7 },
    { x: 0.55, y: 0.5, size: 2.5, brightness: 0.7 },
    { x: 0.6, y: 0.6, size: 2.5, brightness: 0.7 },
    { x: 0.7, y: 0.7, size: 2.5, brightness: 0.7 },
  ];
  
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [1, 6], [6, 7], [7, 8], [8, 9], [9, 10],
    [0, 11], [1, 11], [2, 12], [3, 13], [4, 13],
    [6, 14], [7, 15], [8, 15], [9, 16], [10, 16],
  ];
  
  // 2-3 shooting stars
  const shootingStars = [
    { offset: 0, speed: 0.12, length: 80, opacity: 0.85 },
    { offset: 2500, speed: 0.1, length: 65, opacity: 0.75 },
    { offset: 5000, speed: 0.14, length: 70, opacity: 0.8 },
  ];
  const shootAngle = 0.55;
  
  let backgroundStars = [];
  function initBackgroundStars() {
    backgroundStars = [];
    const w = canvas.width || 400, h = canvas.height || 400;
    for (let i = 0; i < 150; i++) {
      backgroundStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }
  initBackgroundStars();
  window.addEventListener('resize', initBackgroundStars);
  
  function getStarPosition(star) {
    return {
      x: star.x * canvas.width,
      y: star.y * canvas.height,
      size: star.size,
      brightness: star.brightness
    };
  }
  
  function drawConstellationStar(x, y, size, brightness, twinkle) {
    const opacity = brightness * twinkle;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 8);
    grad.addColorStop(0, `rgba(109, 81, 166, ${opacity * 0.5})`);
    grad.addColorStop(0.4, `rgba(109, 81, 166, ${opacity * 0.3})`);
    grad.addColorStop(0.7, `rgba(109, 81, 166, ${opacity * 0.15})`);
    grad.addColorStop(1, `rgba(109, 81, 166, 0)`);
    ctx.beginPath();
    ctx.arc(x, y, size * 8, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    const mid = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
    mid.addColorStop(0, `rgba(109, 81, 166, ${opacity * 0.7})`);
    mid.addColorStop(0.5, `rgba(109, 81, 166, ${opacity * 0.4})`);
    mid.addColorStop(1, `rgba(109, 81, 166, 0)`);
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
    const positions = aquariusStars.map(s => getStarPosition(s));
    connections.forEach(([a, b]) => {
      const p1 = positions[a], p2 = positions[b];
      if (p1 && p2) {
        const g = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        g.addColorStop(0, `rgba(109, 81, 166, ${p1.brightness * 0.5})`);
        g.addColorStop(1, `rgba(109, 81, 166, ${p2.brightness * 0.5})`);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(109, 81, 166, 0.4)`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    });
  }
  
  function drawShootingStars() {
    const w = canvas.width, h = canvas.height;
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
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * decay})`);
      grad.addColorStop(0.15, `rgba(220, 180, 255, ${s.opacity * 0.7 * decay})`);
      grad.addColorStop(0.4, `rgba(150, 80, 200, ${s.opacity * 0.3 * decay})`);
      grad.addColorStop(1, `rgba(109, 81, 166, 0)`);
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
    time += 16;
    ctx.fillStyle = 'rgba(3, 1, 31, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (backgroundStars.length > 0) {
      backgroundStars.forEach(s => {
        const tw = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * tw})`;
        ctx.fill();
      });
    }
    
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
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animationId);
    else animate();
  });
}
