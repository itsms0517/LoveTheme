// =======================================================================
//  ENVELOPE WELCOME SCREEN & INTERACTION
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

    // 1. Play seal break & start romantic music
    envelopeWrapper.classList.add('open');
    if (window.playRomanticMusic) {
      window.playRomanticMusic();
    }

    // 2. Initial mini confetti burst
    if (window.triggerConfettiExplosion) {
      window.triggerConfettiExplosion();
    }

    // 3. Smooth transition to main website
    setTimeout(() => {
      envelopeScreen.classList.add('opened');
      
      // Secondary big celebration burst
      setTimeout(() => {
        if (window.triggerConfettiExplosion) {
          window.triggerConfettiExplosion();
        }
        envelopeScreen.style.display = 'none';
      }, 700);
    }, 850);
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
