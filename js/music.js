// =======================================================================
//  ROMANTIC MUSIC PLAYER (HTML5 Audio + Web Audio Synth Fallback)
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
  let useSynthFallback = false;

  // Set titles
  if (musicTitle) musicTitle.textContent = config.title || "Romantic Melody";
  if (musicArtist) musicArtist.textContent = config.artist || "For You ❤️";

  // 1. Initialize HTML5 Audio if URL exists
  if (config.audioUrl) {
    audio = new Audio(config.audioUrl);
    audio.loop = true;
    audio.volume = 0.65;

    audio.addEventListener('error', () => {
      console.warn("Audio file could not be loaded. Falling back to built-in romantic melody synthesizer.");
      useSynthFallback = true;
    });
  } else {
    useSynthFallback = true;
  }

  // 2. Romantic Music Box Web Audio Synth (Plays gentle, soothing arpeggios)
  const romanticMelodyNotes = [
    // Frequencies for C4, E4, G4, B4, C5, etc.
    261.63, 329.63, 392.00, 493.88, 523.25, 392.00, 329.63,
    220.00, 261.63, 329.63, 440.00, 523.25, 440.00, 329.63,
    174.61, 220.00, 261.63, 349.23, 440.00, 349.23, 261.63,
    196.00, 246.94, 293.66, 392.00, 493.88, 392.00, 293.66
  ];
  let noteIndex = 0;

  function playSynthNote(freq) {
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

    // Soft chime / music box wave
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.25);
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
      }).catch((err) => {
        console.warn("Audio play prevented or failed, switching to synth:", err);
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
      if (playBtn) playBtn.innerHTML = '<i data-lucide="pause" class="w-4 h-4 text-rose-600"></i>';
    } else {
      vinylDisc?.classList.remove('spin');
      if (playBtn) playBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4 text-rose-600"></i>';
    }
    if (window.lucide) {
      window.lucide.createIcons();
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
