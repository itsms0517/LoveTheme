// =======================================================================
//  ❤️ BIRTHDAY WEBSITE CONFIGURATION ❤️
//  Customize any text, photos, dates, and messages right here!
// =======================================================================

window.BIRTHDAY_CONFIG = {
  // 1. Basic Information
  girlfriendName: "My Love",        // Replace with her real name or nickname (e.g. "Sophia", "Babe", "Princess")
  yourName: "Yours Forever",       // Your name or how you sign off (e.g. "Alex", "Your Boy")
  birthdayDate: "2026-09-10",      // YYYY-MM-DD format (used for countdown or celebration)
  nickname: "Cutie Pie",           // A sweet nickname
  tagline: "Every second with you is a gift I will treasure forever. ✨",

  // 2. Music Player Settings
  music: {
    title: "Can't Help Falling in Love",
    artist: "Romantic Acoustic",
    // You can paste a direct MP3 link or path to a local audio file here (e.g., "music/song.mp3").
    // If left empty or on error, the website automatically plays a soothing built-in romantic melody!
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
    autoPlayPrompt: true           // Gentle prompt to start music on first interaction
  },

  // 3. Opening Envelope / Welcome Screen
  envelope: {
    sealText: "Open Me 💕",
    heading: "A Special Delivery For You",
    subheading: "Made with all my heart, exclusively for your special day."
  },

  // 4. Memory Scrapbook (Polaroid Gallery)
  // You can replace the image URLs with links to your own photos, or local files like "images/photo1.jpg"
  memories: [
    {
      title: "Where It All Began",
      date: "The Day We Met",
      caption: "The exact moment my life changed for the better. I still remember what you were wearing.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Under The Stars",
      date: "Our Late Night Talks",
      caption: "Talking for hours until 3 AM and never running out of things to laugh and dream about.",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "That Radiant Smile",
      date: "My Favorite View",
      caption: "Whenever you smile, everything else fades into the background. You make my world so bright.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Adventures With You",
      date: "Exploring Hand in Hand",
      caption: "It doesn't matter where we are—as long as I'm with you, anywhere feels like home.",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Little Silly Moments",
      date: "Pure Happiness",
      caption: "The goofy inside jokes, spontaneous dancing in the kitchen, and belly laughs that hurt so good.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Forever & Always",
      date: "Today & Every Tomorrow",
      caption: "I fall more deeply in love with you with every sunrise. Happy Birthday, my whole world.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // 5. Reasons Why I Love You (Interactive Flip Cards)
  loveReasons: [
    {
      number: "01",
      title: "Your Infectious Laugh",
      text: "It is my absolute favorite sound in the world. When you laugh, it lights up the entire room."
    },
    {
      number: "02",
      title: "The Kindness In Your Heart",
      text: "You treat everyone and everything with genuine warmth, empathy, and unconditional care."
    },
    {
      number: "03",
      title: "The Way You Look At Me",
      text: "In your eyes, I feel understood, safe, and loved beyond measure. It's my favorite sanctuary."
    },
    {
      number: "04",
      title: "Your Passion & Drive",
      text: "Watching you pursue things you care about with so much sparkle and determination inspires me every day."
    },
    {
      number: "05",
      title: "Our Warm Cuddles",
      text: "Resting my chin on your head and holding you close makes all the chaos in the world dissolve."
    },
    {
      number: "06",
      title: "You Are My Best Friend",
      text: "I can tell you anything, be my truest self with you, and always know you've got my back."
    },
    {
      number: "07",
      title: "Your Adorable Habits",
      text: "The cute little expressions you make, your sleepy morning voice, and your happy food dance."
    },
    {
      number: "08",
      title: "Simply Being You",
      text: "There is nobody else on this planet like you. You are my once-in-a-lifetime person."
    }
  ],

  // 6. Heartfelt Love Letter
  loveLetter: {
    salutation: "To My Dearest Love,",
    paragraphs: [
      "Happy Birthday, my beautiful soul. Today is a celebration of the wonderful, radiant human being you are, and I want to remind you just how deeply you are loved.",
      "From the first day we connected, you brought warmth, laughter, and an effortless peace into my life that I never knew I was missing. You make the ordinary moments feel extraordinary, whether we're dressed up for a fancy date or just lying on the couch doing absolutely nothing.",
      "I admire your strength, your gentle heart, and the beauty that radiates from you both inside and out. Thank you for choosing me, for believing in us, and for giving me your love.",
      "On this birthday, I wish for all your hopes and wildest dreams to unfold. May your year ahead be packed with endless laughter, exciting adventures, delicious treats, and zero worries. No matter what comes next, I promise to always stand by your side, cheering you on and loving you through every chapter."
    ],
    closing: "With all my love and devotion,",
    signature: "Always Yours ❤️"
  },

  // 7. Interactive Birthday Cake
  cake: {
    candlesCount: 3,
    initialMessage: "Make a wish and click or tap the candles to blow them out! 🎂",
    blownMessage: "✨ Yay! May all your birthday wishes come true! I love you so much! 🎉💖"
  },

  // 8. Secret Birthday Coupons / Surprise Gifts
  coupons: [
    {
      icon: "🎁",
      title: "One Free Wish",
      desc: "Redeemable anytime for anything you want. Valid forever!"
    },
    {
      icon: "🍝",
      title: "Romantic Dinner Date",
      desc: "Your favorite restaurant or a home-cooked meal by me, candles included."
    },
    {
      icon: "💆‍♀️",
      title: "Full Body Massage",
      desc: "One relaxing pampering session with zero complaints and soothing music."
    },
    {
      icon: "🍿",
      title: "Movie Marathon Pass",
      desc: "You pick all the movies and all the snacks. I won't complain once!"
    }
  ]
};
