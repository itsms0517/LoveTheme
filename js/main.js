// =======================================================================
//  MAIN APP LOGIC - DATA POPULATION & INTERACTIONS
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
  const config = window.BIRTHDAY_CONFIG || {};

  // 1. Populate Basic Names & Texts
  const nameEls = document.querySelectorAll('.girlfriend-name');
  nameEls.forEach(el => el.textContent = config.girlfriendName || "My Love");

  const yourNameEls = document.querySelectorAll('.your-name');
  yourNameEls.forEach(el => el.textContent = config.yourName || "Yours Forever");

  const taglineEl = document.getElementById('hero-tagline');
  if (taglineEl) taglineEl.textContent = config.tagline || "Every second with you is a gift.";

  // Envelope texts
  const envelopeHeading = document.getElementById('envelope-heading');
  if (envelopeHeading && config.envelope?.heading) envelopeHeading.textContent = config.envelope.heading;

  const envelopeSubheading = document.getElementById('envelope-subheading');
  if (envelopeSubheading && config.envelope?.subheading) envelopeSubheading.textContent = config.envelope.subheading;

  const waxSealText = document.getElementById('wax-seal-text');
  if (waxSealText && config.envelope?.sealText) waxSealText.textContent = config.envelope.sealText;

  // 2. Birthday Countdown / Status
  setupBirthdayCountdown(config.birthdayDate);

  // 3. Render Polaroid Memory Scrapbook
  renderMemories(config.memories || []);

  // 4. Render Reasons Why I Love You
  renderLoveReasons(config.loveReasons || []);

  // 5. Render Love Letter
  renderLoveLetter(config.loveLetter || {});

  // 6. Render Birthday Coupons
  renderCoupons(config.coupons || []);

  // 7. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// --- Countdown Logic ---
function setupBirthdayCountdown(dateString) {
  const container = document.getElementById('countdown-section');
  if (!container || !dateString) return;

  function update() {
    const now = new Date();
    const target = new Date(dateString + "T00:00:00");
    const diff = target - now;

    // Check if it's the birthday today
    const isToday = now.toDateString() === target.toDateString();

    if (isToday) {
      container.innerHTML = `
        <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500/10 border border-rose-300 text-rose-600 font-semibold text-lg animate-pulse">
          <span>🎂 IT'S YOUR BIRTHDAY TODAY! HAPPY BIRTHDAY! 🎉</span>
        </div>
      `;
      return;
    }

    if (diff < 0) {
      container.innerHTML = `
        <div class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium">
          <span>Celebrating you today and every single day ❤️</span>
        </div>
      `;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    container.innerHTML = `
      <div class="flex items-center justify-center gap-3 md:gap-6 text-rose-900">
        <div class="flex flex-col items-center bg-white/80 backdrop-blur px-4 py-2 rounded-2xl shadow-sm border border-rose-100 min-w-[64px]">
          <span class="text-2xl md:text-3xl font-bold font-serif-romantic text-rose-600">${days}</span>
          <span class="text-xs text-rose-400 uppercase tracking-wider font-semibold">Days</span>
        </div>
        <span class="text-xl text-rose-300 font-bold">:</span>
        <div class="flex flex-col items-center bg-white/80 backdrop-blur px-4 py-2 rounded-2xl shadow-sm border border-rose-100 min-w-[64px]">
          <span class="text-2xl md:text-3xl font-bold font-serif-romantic text-rose-600">${hours}</span>
          <span class="text-xs text-rose-400 uppercase tracking-wider font-semibold">Hours</span>
        </div>
        <span class="text-xl text-rose-300 font-bold">:</span>
        <div class="flex flex-col items-center bg-white/80 backdrop-blur px-4 py-2 rounded-2xl shadow-sm border border-rose-100 min-w-[64px]">
          <span class="text-2xl md:text-3xl font-bold font-serif-romantic text-rose-600">${minutes}</span>
          <span class="text-xs text-rose-400 uppercase tracking-wider font-semibold">Mins</span>
        </div>
        <span class="text-xl text-rose-300 font-bold">:</span>
        <div class="flex flex-col items-center bg-white/80 backdrop-blur px-4 py-2 rounded-2xl shadow-sm border border-rose-100 min-w-[64px]">
          <span class="text-2xl md:text-3xl font-bold font-serif-romantic text-rose-600">${seconds}</span>
          <span class="text-xs text-rose-400 uppercase tracking-wider font-semibold">Secs</span>
        </div>
      </div>
    `;
  }

  update();
  setInterval(update, 1000);
}

// --- Polaroid Memory Scrapbook ---
function renderMemories(memories) {
  const grid = document.getElementById('memories-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const angles = [-3, 2, -2, 3, -1.5, 2.5];

  memories.forEach((item, idx) => {
    const angle = angles[idx % angles.length];
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.transform = `rotate(${angle}deg)`;

    card.innerHTML = `
      <div class="polaroid-img-wrapper">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="mt-4 text-center px-1">
        <p class="text-xs font-semibold text-rose-500 uppercase tracking-wider">${item.date || ''}</p>
        <h4 class="text-lg font-serif-romantic font-semibold text-gray-800 mt-1">${item.title}</h4>
        <p class="text-sm font-handwriting text-gray-600 mt-2 text-base leading-snug">${item.caption || ''}</p>
      </div>
    `;

    // Click to view modal lightbox
    card.addEventListener('click', () => openPhotoModal(item));
    grid.appendChild(card);
  });
}

// Photo Modal Lightbox
function openPhotoModal(item) {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalCaption = document.getElementById('modal-caption');

  if (!modal) return;

  modalImg.src = item.image;
  modalTitle.textContent = item.title;
  modalDate.textContent = item.date || '';
  modalCaption.textContent = item.caption || '';

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

window.closePhotoModal = function () {
  const modal = document.getElementById('photo-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// --- Reasons Why I Love You ---
function renderLoveReasons(reasons) {
  const grid = document.getElementById('reasons-grid');
  const counterEl = document.getElementById('reasons-counter');
  if (!grid) return;

  grid.innerHTML = '';
  let openedCount = 0;

  reasons.forEach((reason, index) => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-card-inner">
        <!-- Front -->
        <div class="flip-card-front group">
          <span class="text-xs font-bold text-rose-400 tracking-widest uppercase mb-2">REASON ${reason.number || index + 1}</span>
          <div class="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 text-xl mb-3 shadow-inner group-hover:scale-110 transition-transform">
            💖
          </div>
          <h4 class="font-serif-romantic font-semibold text-rose-900 text-base leading-snug">${reason.title}</h4>
          <span class="mt-3 text-xs text-rose-400 font-medium flex items-center gap-1">
            Tap to reveal <i data-lucide="sparkles" class="w-3 h-3"></i>
          </span>
        </div>
        <!-- Back -->
        <div class="flip-card-back">
          <span class="text-xs font-semibold text-rose-500 tracking-wider mb-2">#${reason.number || index + 1}</span>
          <p class="text-sm font-medium text-rose-950 leading-relaxed">${reason.text}</p>
          <span class="mt-4 text-xs text-rose-400">Tap to flip back</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      const wasFlipped = card.classList.contains('is-flipped');
      card.classList.toggle('is-flipped');

      if (!wasFlipped && !card.dataset.opened) {
        card.dataset.opened = "true";
        openedCount++;
        if (counterEl) {
          counterEl.textContent = `You've opened ${openedCount} of ${reasons.length} reasons 💕`;
        }
        if (openedCount === reasons.length && window.triggerConfettiExplosion) {
          window.triggerConfettiExplosion();
        }
      }
    });

    grid.appendChild(card);
  });
}

// --- Love Letter ---
function renderLoveLetter(letter) {
  const container = document.getElementById('love-letter-content');
  if (!container) return;

  const salutation = letter.salutation || "My Dearest Love,";
  const paragraphs = letter.paragraphs || [];
  const closing = letter.closing || "With all my love,";
  const signature = letter.signature || "Always Yours ❤️";

  let html = `<p class="font-calligraphy text-3xl md:text-4xl text-rose-800 mb-6">${salutation}</p>`;

  paragraphs.forEach(p => {
    html += `<p class="text-base md:text-lg text-gray-700 leading-relaxed mb-5 font-serif-romantic">${p}</p>`;
  });

  html += `
    <div class="mt-8 pt-6 border-t border-rose-200/60 text-right">
      <p class="font-serif-romantic italic text-rose-700 text-base">${closing}</p>
      <p class="font-calligraphy text-3xl md:text-4xl text-rose-900 mt-2">${signature}</p>
    </div>
  `;

  container.innerHTML = html;
}

// --- Birthday Coupons ---
function renderCoupons(coupons) {
  const grid = document.getElementById('coupons-grid');
  if (!grid) return;

  grid.innerHTML = '';

  coupons.forEach(coupon => {
    const card = document.createElement('div');
    card.className = 'coupon-card p-6 flex flex-col justify-between cursor-pointer group';
    card.innerHTML = `
      <div>
        <div class="text-3xl mb-3">${coupon.icon || '🎁'}</div>
        <h4 class="font-serif-romantic font-bold text-gray-900 text-lg group-hover:text-rose-600 transition-colors">${coupon.title}</h4>
        <p class="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">${coupon.desc}</p>
      </div>
      <div class="mt-6 pt-4 border-t border-dashed border-rose-200 flex items-center justify-between">
        <span class="coupon-status text-xs font-semibold uppercase tracking-wider text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Click to Redeem 🎟️
        </span>
        <span class="text-xs text-gray-400">Never Expires</span>
      </div>
    `;

    card.addEventListener('click', () => {
      const status = card.querySelector('.coupon-status');
      if (status && !card.dataset.redeemed) {
        card.dataset.redeemed = "true";
        status.textContent = "REDEEMED! ❤️";
        status.className = "coupon-status text-xs font-bold uppercase tracking-wider text-white bg-rose-600 px-3 py-1 rounded-full shadow-sm animate-pulse";
        if (window.triggerConfettiExplosion) window.triggerConfettiExplosion();
      }
    });

    grid.appendChild(card);
  });
}
