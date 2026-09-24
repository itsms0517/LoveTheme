// =======================================================================
//  ROMANTIC MUSIC PLAYER (Instant Web Audio Synth + HTML5 Audio)
// =======================================================================

(function () {
  const config = window.BIRTHDAY_CONFIG?.music || {};
  const musicWidget = document.getElementById('music-widget');
  const vinylDisc = document.getElementById('vinyl-disc');
  const playBtn = document.getElementById('music-play-btn');
  const musicTitle = document.getElementById('music-track-title');
  const musicArtist = document.getElementById('music-track-artist');

  let isPlaying = false;
  let audio = null;
  let synthInterval = null;
  let audioCtx = null;
  let useSynthFallback = !config.audioUrl;

  // Set titles
  if (musicTitle) musicTitle.textContent = config.title || "Romantic Melody";
  if (musicArtist) musicArtist.textContent = config.artist || "For You ❤️";

  // 1. Initialize HTML5 Audio ONLY if a local or fast custom URL is provided
  if (config.audioUrl) {
    audio = new Audio(config.audioUrl);
    audio.loop = true;
    audio.volume = 0.65;

    audio.addEventListener('error', () => {
      useSynthFallback = true;
    });
  }

  // 2. Romantic Music Box Web Audio Synth (0ms network delay, 100% reliable)
  const romanticMelodyNotes = [
    261.63, 329.63, 392.00, 493.88, 523.25, 392.00, 329.63,
    220.00, 261.63, 329.63, 440.00, 523.25, 440.00, 329.63,
    174.61, 220.00, 261.63, 349.23, 440.00, 349.23, 261.63,
    196.00, 246.94, 293.66, 392.00, 493.88, 392.00, 293.66
  ];
  let noteIndex = 0;

  function playSynthNote(freq) {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.25);
    } catch (e) {}
  }

  function startSynthMelody() {
    stopSynthMelody();
    playSynthNote(romanticMelodyNotes[noteIndex]);
    noteIndex = (noteIndex + 1) % romanticMelodyNotes.length;

    synthInterval = setInterval(() => {
      playSynthNote(romanticMelodyNotes[noteIndex]);
      noteIndex = (noteIndex + 1) % romanticMelodyNotes.length;
    }, 450);
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  // 3. Play / Pause Control
  window.playRomanticMusic = function () {
    if (isPlaying) return;

    if (useSynthFallback || !audio) {
      startSynthMelody();
      isPlaying = true;
      updateUI();
    } else {
      audio.play().then(() => {
        isPlaying = true;
        updateUI();
      }).catch(() => {
        useSynthFallback = true;
        startSynthMelody();
        isPlaying = true;
        updateUI();
      });
    }
  };

  window.pauseRomanticMusic = function () {
    if (!isPlaying) return;

    if (audio) {
      audio.pause();
    }
    stopSynthMelody();
    isPlaying = false;
    updateUI();
  };

  window.toggleRomanticMusic = function () {
    if (isPlaying) {
      window.pauseRomanticMusic();
    } else {
      window.playRomanticMusic();
    }
  };

  function updateUI() {
    if (isPlaying) {
      vinylDisc?.classList.add('spin');
      if (playBtn) playBtn.innerHTML = '<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" viewBox="0 0 24 24" fill="currentColor"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg>';
    } else {
      vinylDisc?.classList.remove('spin');
      if (playBtn) playBtn.innerHTML = '<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>';
    }
  }

  // Toggle on widget click
  if (musicWidget) {
    musicWidget.addEventListener('click', (e) => {
      e.stopPropagation();
      window.toggleRomanticMusic();
    });
  }
})();
