# 💖 Romantic Birthday Website for Your Girlfriend

A custom, interactive, and romantic website made to celebrate your girlfriend's special day.

---

## 🚀 How to View the Website Right Now

You can run this website immediately without installing anything:

### Method 1: Instant Browser Launch
1. Open File Explorer and navigate to:
   ```
   C:\Users\Mayur\.gemini\antigravity\scratch\birthday-website
   ```
2. Double-click **`index.html`** to open it in Chrome, Edge, or your favorite browser!

### Method 2: Open in Visual Studio Code
1. Open **VS Code**.
2. Click **File > Open Folder...** (or press `Ctrl + K`, `Ctrl + O`).
3. Select this folder:
   ```
   C:\Users\Mayur\.gemini\antigravity\scratch\birthday-website
   ```
4. *(Optional & Recommended)* Install the **"Live Server"** extension in VS Code:
   - Right-click `index.html` and choose **"Open with Live Server"**.
   - Any changes you make will instantly refresh in the browser!

---

## 🎨 How to Personalize the Website

All the customization is conveniently organized inside one single file: **[`config.js`](./config.js)**.

Open `config.js` to customize:
1. **Names**:
   - `girlfriendName`: Her real name or pet name (e.g. `"Sophia"`, `"Babe"`).
   - `yourName`: How you sign off (e.g. `"Alex"`, `"Yours Forever"`).
   - `birthdayDate`: Her birthday in `YYYY-MM-DD` format (e.g., `"2026-09-15"`).
2. **Music Player**:
   - `title` & `artist`: Track info.
   - `audioUrl`: An MP3 URL or a local file like `"music/her-favorite-song.mp3"`. If empty, the site automatically plays a soft built-in romantic melody!
3. **Photos & Memory Scrapbook**:
   - Replace the `memories` array with your own pictures, dates, and captions.
   - You can put your photos inside an `images/` folder (e.g., `"images/photo1.jpg"`) or use online links.
4. **Reasons Why I Love You**:
   - Add or tweak the 8 flip cards with your personal inside jokes and reasons.
5. **Love Letter**:
   - Update the heartfelt paragraphs in `loveLetter` with your personal words.
6. **Birthday Coupons**:
   - Customize the redeemable coupon perks (dinner dates, massages, favorite snacks).

---

## 🌐 How to Share It With Her (Hosting for Free)

When you're ready to send it to her:
1. **Netlify Drop (Easiest - 30 seconds)**:
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop the `birthday-website` folder.
   - You will get a custom live link (e.g., `https://happy-birthday-sophia.netlify.app`) to send to her!
2. **GitHub Pages**:
   - Push this folder to a GitHub repository.
   - Go to **Settings > Pages** and enable GitHub Pages on the `main` branch.
3. **Vercel**:
   - Import the repository or run `npx vercel` to deploy in seconds.

---

## 🎁 Features Included
- 💌 **Wax-Sealed Interactive Envelope**: Unwraps on click with celebratory confetti and starts background music.
- 🎂 **Interactive Multi-Tier Cake**: Lit candles she can click or tap to "blow out", triggering fireworks and sweet birthday wishes.
- 📸 **Polaroid Memory Scrapbook**: Handcrafted washi-taped cards with realistic tilt angles and a zoomable lightbox.
- 🃏 **"Reasons Why I Love You" Cards**: 3D flip cards with a counter tracking her progress.
- 📜 **Wax-Sealed Love Letter**: Parchment paper texture and elegant calligraphy.
- 🎟️ **Redeemable Birthday Coupons**: Interactive scratch cards she can redeem for dates and wishes.
- 🎵 **Floating Vinyl Record Music Player**: Smooth play/pause controls with soundwave animation.
- ✨ **Floating Hearts & Ambient Bokeh**: Canvas particle background that reacts when you click anywhere on screen.
