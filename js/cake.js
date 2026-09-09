// =======================================================================
//  INTERACTIVE BIRTHDAY CAKE & CANDLE BLOW
// =======================================================================

(function () {
  const cakeContainer = document.getElementById('interactive-cake');
  const cakeStatus = document.getElementById('cake-status-message');
  const relightBtn = document.getElementById('cake-relight-btn');
  const candlesRow = document.getElementById('candles-row');

  if (!cakeContainer) return;

  const cakeConfig = window.BIRTHDAY_CONFIG?.cake || {};
  let candlesBlown = false;

  // Render Candles
  function setupCandles() {
    if (!candlesRow) return;
    candlesRow.innerHTML = '';
    const count = cakeConfig.candlesCount || 3;

    for (let i = 0; i < count; i++) {
      const candle = document.createElement('div');
      candle.className = 'candle';
      candle.innerHTML = `
        <div class="candle-wick"></div>
        <div class="candle-flame"></div>
        <div class="smoke-puff">💨</div>
      `;
      candlesRow.appendChild(candle);
    }
  }

  setupCandles();

  // Gentle chime sound on candle blow
  function playWishChime() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
      });
    } catch (e) {
      console.warn("Chime sound unavailable:", e);
    }
  }

  // Blow out candles function
  function blowOutCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    // Blow all candles
    const candles = cakeContainer.querySelectorAll('.candle');
    candles.forEach((c, idx) => {
      setTimeout(() => {
        c.classList.add('blown');
      }, idx * 100);
    });

    // Play chime sound
    playWishChime();

    // Trigger fireworks and confetti!
    if (window.triggerConfettiExplosion) {
      window.triggerConfettiExplosion();
      setTimeout(window.triggerConfettiExplosion, 500);
    }

    // Update Status Message
    if (cakeStatus) {
      cakeStatus.innerHTML = `
        <span class="inline-block px-4 py-2 rounded-full bg-rose-100 text-rose-700 font-medium text-sm md:text-base animate-bounce shadow-sm border border-rose-200">
          ${cakeConfig.blownMessage || "✨ Yay! May all your birthday wishes come true! I love you so much! 🎉💖"}
        </span>
      `;
    }

    // Show Relight Button
    if (relightBtn) {
      relightBtn.classList.remove('hidden');
    }
  }

  // Relight candles function
  function relightCandles() {
    candlesBlown = false;
    const candles = cakeContainer.querySelectorAll('.candle');
    candles.forEach((c) => {
      c.classList.remove('blown');
    });

    if (cakeStatus) {
      cakeStatus.innerHTML = `
        <span class="text-rose-800 text-sm md:text-base font-medium">
          ${cakeConfig.initialMessage || "Make a wish and click or tap the candles to blow them out! 🎂"}
        </span>
      `;
    }

    if (relightBtn) {
      relightBtn.classList.add('hidden');
    }
  }

  cakeContainer.addEventListener('click', blowOutCandles);

  if (relightBtn) {
    relightBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      relightCandles();
    });
  }
})();
