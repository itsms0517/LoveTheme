// =======================================================================
//  ENVELOPE WELCOME SCREEN & LIGHTNING-FAST TRANSITION
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

    // 1. Immediately disable pointer events so there is zero interaction delay
    envelopeScreen.style.pointerEvents = 'none';

    // 2. Play flap opening animation
    envelopeWrapper.classList.add('open');

    // 3. Start music in background without blocking rendering
    setTimeout(() => {
      if (window.playRomanticMusic) {
        window.playRomanticMusic();
      }
    }, 40);

    // 4. Initial celebration confetti
    if (window.triggerConfettiExplosion) {
      window.triggerConfettiExplosion();
    }

    // 5. Fast, smooth fade-out to main website (350ms instead of 850ms)
    setTimeout(() => {
      envelopeScreen.classList.add('opened');

      // Hide completely and fire welcoming celebration
      setTimeout(() => {
        envelopeScreen.style.display = 'none';
        if (window.triggerConfettiExplosion) {
          window.triggerConfettiExplosion();
        }
      }, 350);
    }, 380);
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
