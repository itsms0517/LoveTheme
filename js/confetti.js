// =======================================================================
//  CELEBRATION PARTICLES & FLOATING HEARTS (MOBILE-OPTIMIZED)
// =======================================================================

(function () {
  // 1. Floating Hearts & Twinkles Background Canvas
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const heartColors = [
    'rgba(244, 63, 94, 0.45)',
    'rgba(251, 113, 133, 0.4)',
    'rgba(253, 164, 175, 0.5)',
    'rgba(245, 158, 11, 0.35)'
  ];

  class FloatingParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // initial spread
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + 20;
      this.size = Math.random() * 12 + 6;
      this.speed = Math.random() * 0.7 + 0.3;
      this.opacity = Math.random() * 0.45 + 0.2;
      this.swing = Math.random() * 1.8 - 0.9;
      this.swingSpeed = Math.random() * 0.02 + 0.01;
      this.angle = 0;
      this.isHeart = Math.random() > 0.4;
      this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    }

    update() {
      this.y -= this.speed;
      this.angle += this.swingSpeed;
      this.x += Math.sin(this.angle) * this.swing;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;

      if (this.isHeart) {
        // Draw Heart Shape
        const s = this.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.5, s * 0.4, 0, s * 1.3);
        ctx.bezierCurveTo(s * 1.5, s * 0.4, s, -s * 0.5, 0, s * 0.3);
        ctx.fill();
      } else {
        // Draw Twinkle Sparkle
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Optimize particle count for mobile screens (saves battery & keeps 60fps)
  const particleCount = window.innerWidth < 640 ? 18 : 38;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new FloatingParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

  // 2. Tap / Click Anywhere to spawn micro floating hearts
  let lastTapTime = 0;
  window.addEventListener('pointerdown', (e) => {
    // Ignore interactive elements
    if (e.target.closest('button, input, a, .coupon-card, .flip-card, .wax-seal, #interactive-cake, #music-widget')) return;
    
    // Throttle fast drags/taps to prevent clutter
    const now = Date.now();
    if (now - lastTapTime < 180) return;
    lastTapTime = now;

    createFloatingHeartAt(e.clientX, e.clientY);
  }, { passive: true });

  function createFloatingHeartAt(x, y) {
    const heart = document.createElement('div');
    const emojis = ['💖', '✨', '🌸', '💕', '🥰', '🌹'];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = `${Math.random() * 10 + 16}px`;
    heart.style.zIndex = '9999';
    heart.style.transform = 'translate(-50%, -50%) scale(0.5)';
    heart.style.transition = 'all 0.85s cubic-bezier(0.2, 0.8, 0.2, 1)';
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      const offsetX = (Math.random() - 0.5) * 50;
      const offsetY = -60 - Math.random() * 40;
      heart.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1.2)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => {
      heart.remove();
    }, 900);
  }

  // 3. Global Fireworks / Confetti Explosion helper (scaled for mobile performance)
  window.triggerConfettiExplosion = function () {
    if (typeof confetti !== 'function') return;

    const isMobile = window.innerWidth < 640;
    const centerCount = isMobile ? 50 : 80;
    const cannonCount = isMobile ? 35 : 55;

    // Center burst
    confetti({
      particleCount: centerCount,
      spread: isMobile ? 70 : 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#ffffff']
    });

    // Left cannon
    setTimeout(() => {
      confetti({
        particleCount: cannonCount,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#fbcfe8']
      });
    }, 180);

    // Right cannon
    setTimeout(() => {
      confetti({
        particleCount: cannonCount,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fef08a']
      });
    }, 360);
  };
})();
