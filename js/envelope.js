// =======================================================================
//  ENVELOPE WELCOME SCREEN & INSTANT ZERO-LAG REVEAL
// =======================================================================

(function () {
  const envelopeScreen = document.getElementById('envelope-screen');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const waxSeal = document.getElementById('wax-seal');

  if (!envelopeScreen || !envelopeWrapper) return;

  let isOpening = false;

  function openEnvelope() {
    if (isOpening) return;
    isOpening = true;

    // 1. Immediately disable pointer events to prevent duplicate clicks
    envelopeScreen.style.pointerEvents = 'none';

    // 2. Animate flap open
    envelopeWrapper.classList.add('open');

    // 3. Start romantic melody immediately
    try {
      if (window.playRomanticMusic) {
        window.playRomanticMusic();
      }
    } catch (e) {
      console.warn("Audio play error:", e);
    }

    // 4. Single gentle celebration burst
    try {
      if (window.triggerConfettiExplosion) {
        window.triggerConfettiExplosion();
      }
    } catch (e) {}

    // 5. Reveal main website smoothly in 280ms
    setTimeout(() => {
      envelopeScreen.classList.add('opened');

      // Fully remove from DOM after fade-out transition
      setTimeout(() => {
        envelopeScreen.style.display = 'none';
        if (envelopeScreen.parentNode) {
          envelopeScreen.parentNode.removeChild(envelopeScreen);
        }
      }, 300);
    }, 280);
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  envelopeWrapper.addEventListener('click', () => {
    openEnvelope();
  });
})();
