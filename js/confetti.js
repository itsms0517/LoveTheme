// =======================================================================
//  CELEBRATION PARTICLES & FLOATING HEARTS (100% PURE DOM & CSS - ZERO CANVAS)
//  Guarantees 0% white screen on every mobile browser & WebView!
// =======================================================================

(function () {
  // 1. Initialize Floating Background Hearts & Sparkles
  function initBackgroundParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;

    container.innerHTML = '';
    const items = ['💖', '✨', '🌸', '💕', '⭐', '🌹', '✨', '💖'];
    const count = window.innerWidth < 640 ? 14 : 24;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'floating-bg-item';
      el.textContent = items[i % items.length];
      
      const left = Math.random() * 100;
      const size = Math.random() * 12 + 14;
      const duration = Math.random() * 6 + 8; // 8s to 14s
      const delay = Math.random() * 8; // 0s to 8s
      
      el.style.left = left + '%';
      el.style.fontSize = size + 'px';
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';
      
      container.appendChild(el);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackgroundParticles);
  } else {
    initBackgroundParticles();
  }

  // 2. Tap / Click Anywhere to Spawn Floating Hearts
  let lastTapTime = 0;
  window.addEventListener('pointerdown', (e) => {
    // Ignore interactive controls
    if (e.target.closest('button, input, a, .coupon-card, .flip-card, .wax-seal, #interactive-cake, #music-widget')) return;

    const now = Date.now();
    if (now - lastTapTime < 150) return;
    lastTapTime = now;

    createTapHeart(e.clientX, e.clientY);
  }, { passive: true });

  function createTapHeart(x, y) {
    const heart = document.createElement('div');
    const emojis = ['💖', '✨', '🌸', '💕', '🥰', '🌹'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = (Math.random() * 8 + 18) + 'px';
    heart.style.zIndex = '9999';
    heart.style.transform = 'translate(-50%, -50%) scale(0.6)';
    heart.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    heart.style.opacity = '1';
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      const offsetX = (Math.random() - 0.5) * 60;
      const offsetY = -50 - Math.random() * 50;
      heart.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1.3)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => {
      heart.remove();
    }, 850);
  }

  // 3. Pure DOM Celebration Explosion (Replaces canvas-confetti completely)
  window.triggerConfettiExplosion = function () {
    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 38 : 60;
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#ec4899', '#fbcfe8', '#ffffff'];
    const emojis = ['💖', '✨', '🎉', '💕', '⭐', '🌸'];

    const originX = window.innerWidth / 2;
    const originY = window.innerHeight * 0.55;

    for (let i = 0; i < particleCount; i++) {
      const isEmoji = Math.random() > 0.6;
      const p = document.createElement('div');
      p.className = 'dom-confetti-particle';
      p.style.left = originX + 'px';
      p.style.top = originY + 'px';
      p.style.transform = 'translate(-50%, -50%) scale(0.2)';
      p.style.opacity = '1';

      if (isEmoji) {
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.fontSize = (Math.random() * 10 + 16) + 'px';
      } else {
        const width = Math.random() * 6 + 7;
        const height = Math.random() * 8 + 12;
        p.style.width = width + 'px';
        p.style.height = height + 'px';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = '2px';
        p.style.boxShadow = '0 2px 6px rgba(244, 63, 94, 0.3)';
      }

      document.body.appendChild(p);

      // Random trajectories
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (isMobile ? 180 : 280) + 70;
      const targetX = Math.cos(angle) * speed;
      const targetY = Math.sin(angle) * speed * 0.75 + (Math.random() * 80 + 40); // gravity pull
      const rotation = (Math.random() - 0.5) * 720;
      const duration = Math.random() * 0.5 + 1.1; // 1.1s to 1.6s

      p.style.transition = `transform ${duration}s cubic-bezier(0.12, 0.8, 0.32, 1), opacity ${duration}s ease-in`;

      requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) rotate(${rotation}deg) scale(1)`;
        setTimeout(() => {
          p.style.opacity = '0';
        }, (duration - 0.45) * 1000);
      });

      setTimeout(() => {
        p.remove();
      }, duration * 1000 + 100);
    }
  };
})();
