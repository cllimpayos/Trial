// ============================
// Loading Screen
// ============================
(function loadingScreen() {
  const messages = [
    "Scooping awesomeness...",
    "Adding sprinkles...",
    "Brain freeze avoided.",
    "Calibrating topping ratios...",
    "Convincing the swirl machine to cooperate...",
    "Loading Master's degree (unused, but present)...",
    "Charging social battery to 45%...",
  ];
  const el = document.getElementById("loading-message");
  let i = 0;
  const interval = setInterval(() => {
    i = (i + 1) % messages.length;
    if (el) el.textContent = messages[i];
  }, 550);

  window.addEventListener("load", () => {
    setTimeout(() => {
      clearInterval(interval);
      const screen = document.getElementById("loading-screen");
      if (screen) screen.classList.add("hidden");
    }, 1400);
  });
})();

// ============================
// Footer year
// ============================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================
// Navbar: scroll shadow + mobile toggle + active link
// ============================
const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  toggleScrollTopButton();
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const navLinkMap = {};
navLinks.querySelectorAll("a").forEach((link) => {
  const id = link.getAttribute("href").replace("#", "");
  navLinkMap[id] = link;
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = navLinkMap[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        Object.values(navLinkMap).forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);
sections.forEach((s) => navObserver.observe(s));

// ============================
// Scroll reveal animations
// ============================
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ============================
// Animate fill bars (skills + stats + xp) when in view
// ============================
function animateFillsWithin(container) {
  container.querySelectorAll("[data-fill]").forEach((bar) => {
    const value = bar.getAttribute("data-fill");
    bar.style.width = value + "%";
  });
  const xp = container.querySelector(".xp-fill");
  if (xp) xp.style.width = "78%";
}

const fillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateFillsWithin(entry.target);
        fillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);
document.querySelectorAll("#skills, #stats").forEach((sec) => fillObserver.observe(sec));

// ============================
// Hero rotating subtitle
// ============================
(function heroRotator() {
  const phrases = [
    "Powered by frozen yoghurt and delusional optimism.",
    "Currently manifesting main character energy, one scoop at a time.",
    "485 visa. Zero regrets. Infinite toppings.",
    "Two degrees deep, one swirl machine away from a breakdown.",
    "Professionally underemployed. Personally thriving.",
  ];
  const el = document.getElementById("hero-rotator");
  let index = 0;
  setInterval(() => {
    index = (index + 1) % phrases.length;
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = phrases[index];
      el.style.opacity = 1;
    }, 300);
  }, 3800);
  el.style.transition = "opacity 0.3s ease";
})();

// ============================
// Toast helper (for easter eggs)
// ============================
function showToast(text) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============================
// Hero scoop click easter egg
// ============================
(function heroScoopEgg() {
  const scoop = document.getElementById("hero-scoop");
  const clickMessages = [
    "Hey, careful, that's a load-bearing yoghurt.",
    "Okay one more click and I'm charging admission.",
    "Brain freeze incoming...",
    "You really like clicking things. I respect it.",
    "Achievement Unlocked: Professional Button Masher",
  ];
  let clicks = 0;
  scoop.addEventListener("click", () => {
    showToast(clickMessages[Math.min(clicks, clickMessages.length - 1)]);
    clicks++;
    spawnConfettiBurst(scoop, ["🍦", "🍧", "✨"]);
  });
})();

// ============================
// Confetti burst
// ============================
function spawnConfettiBurst(originEl, emojiList, count = 14) {
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
    piece.style.left = originX + (Math.random() * 200 - 100) + "px";
    piece.style.top = "-20px";
    piece.style.fontSize = 1 + Math.random() * 1.2 + "rem";
    const duration = 2.2 + Math.random() * 1.6;
    piece.style.animationDuration = duration + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000 + 100);
  }
}

function rainbowConfettiBurst() {
  const emojis = ["🍦", "🍧", "🍫", "🍓", "🍒", "🍯", "✨", "🌈", "🎉"];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      piece.style.left = Math.random() * window.innerWidth + "px";
      piece.style.fontSize = 1 + Math.random() * 1.5 + "rem";
      const duration = 2.5 + Math.random() * 2;
      piece.style.animationDuration = duration + "s";
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), duration * 1000 + 100);
    }, i * 30);
  }
}

// ============================
// Topping picker widget
// ============================
(function toppingPicker() {
  const chips = document.querySelectorAll(".topping-chip");
  const cupToppings = document.getElementById("topping-cup-toppings");
  const verdictEl = document.getElementById("topping-verdict");
  const resetBtn = document.getElementById("topping-reset");
  const selected = new Set();

  const verdicts = [
    "Zero toppings selected. Bold. Slightly concerning. We should talk.",
    "One topping. A minimalist. Respectable, if a little shy.",
    "Two toppings. Very reasonable human being.",
    "Three toppings. Solid, balanced, no notes.",
    "Four toppings. Now we're having a genuine experience.",
    "Five toppings. Confident. I like where this is going.",
    "Six toppings. This is a whole personality now.",
    "Seven toppings. The queue behind you has feelings about this.",
    "Eight toppings. This isn't a topping anymore, it's a lifestyle.",
  ];

  function updateVerdict() {
    const n = Math.min(selected.size, verdicts.length - 1);
    verdictEl.textContent = verdicts[n];
  }

  function renderCup() {
    cupToppings.innerHTML = "";
    let i = 0;
    selected.forEach((emoji) => {
      const span = document.createElement("span");
      span.textContent = emoji;
      const angle = (i / Math.max(selected.size, 1)) * 360;
      const radius = 34;
      const rad = (angle * Math.PI) / 180;
      const x = 50 + radius * Math.cos(rad);
      const y = 20 + radius * Math.sin(rad) * 0.5;
      span.style.left = x + "px";
      span.style.top = y + "px";
      span.style.setProperty("--r", (Math.random() * 30 - 15) + "deg");
      cupToppings.appendChild(span);
      i++;
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const emoji = chip.getAttribute("data-emoji");
      if (selected.has(emoji)) {
        selected.delete(emoji);
        chip.classList.remove("selected");
      } else {
        selected.add(emoji);
        chip.classList.add("selected");
      }
      renderCup();
      updateVerdict();
      if (selected.size === 8) {
        showToast("Achievement Unlocked: Topping Maximalist 🏆");
        spawnConfettiBurst(document.getElementById("topping-cup"), ["🍫", "🍓", "🍬", "🥜", "🌰", "🍯", "🍒", "🧇"]);
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    selected.clear();
    chips.forEach((c) => c.classList.remove("selected"));
    renderCup();
    updateVerdict();
  });
})();

// ============================
// Life stat tooltips (click to reveal)
// ============================
document.querySelectorAll(".stat-row").forEach((row) => {
  row.addEventListener("click", () => {
    const wasActive = row.hasAttribute("data-tooltip-active");
    document.querySelectorAll(".stat-row").forEach((r) => r.removeAttribute("data-tooltip-active"));
    if (!wasActive) {
      row.setAttribute("data-tooltip-active", "true");
      setTimeout(() => row.removeAttribute("data-tooltip-active"), 2800);
    }
  });
});

// ============================
// Bucket list toggle + localStorage
// ============================
(function bucketList() {
  const items = document.querySelectorAll(".bucket-item");
  const storeKey = "charlize-bucket-list";
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storeKey)) || {};
  } catch (e) {
    saved = {};
  }

  items.forEach((item, idx) => {
    if (saved[idx] !== undefined) {
      item.setAttribute("data-checked", saved[idx] ? "true" : "false");
      item.querySelector(".bucket-box").textContent = saved[idx] ? "☑" : "☐";
    }
    item.addEventListener("click", () => {
      const checked = item.getAttribute("data-checked") === "true";
      item.setAttribute("data-checked", (!checked).toString());
      item.querySelector(".bucket-box").textContent = !checked ? "☑" : "☐";
      saved[idx] = !checked;
      localStorage.setItem(storeKey, JSON.stringify(saved));
      if (!checked) showToast("One step closer. Look at you go. ✨");
    });
  });
})();

// ============================
// Contact form -> mailto
// ============================
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent(`Hello from ${name || "a new friend"}!`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:cllimpayos@gmail.com?subject=${subject}&body=${body}`;
  showToast("Opening your email app now...");
});

// ============================
// Scroll to top button
// ============================
const scrollTopBtn = document.getElementById("scroll-top");
function toggleScrollTopButton() {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
}
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================
// Achievement toast when reaching footer
// ============================
(function footerAchievement() {
  const footer = document.querySelector(".site-footer");
  let fired = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !fired) {
        fired = true;
        showToast("Achievement Unlocked: Read The Whole Thing 🏆");
      }
    });
  }, { threshold: 0.3 });
  observer.observe(footer);
})();

// ============================
// Konami code easter egg
// ============================
(function konamiCode() {
  const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let position = 0;
  window.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === sequence[position]) {
      position++;
      if (position === sequence.length) {
        position = 0;
        showToast("Secret topping combo unlocked! 🌈🍦");
        rainbowConfettiBurst();
      }
    } else {
      position = key === sequence[0] ? 1 : 0;
    }
  });
})();

// ============================
// Console easter egg for devs
// ============================
console.log(
  "%c🍦 Hey there, fellow code-peeker!",
  "font-size: 16px; font-weight: bold; color: #ff8fc7;"
);
console.log(
  "%cIf you're reading this, you probably also read documentation for fun. We'd get along. Say hi: cllimpayos@gmail.com",
  "font-size: 13px; color: #b79bff;"
);
