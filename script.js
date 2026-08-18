// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Rotating interests — typing + erasing
const interests = [
  { text: "conversational AI and information retrieval", color: "#2563eb" }, // blue-600
  { text: "human-centered AI, trust, and governance", color: "#1d4ed8" }, // blue-700
  { text: "human–AI interaction and evaluation", color: "#0ea5e9" }, // sky-500
  { text: "data mining with language models", color: "#0891b2" }, // teal-600
  { text: "applied AI for community well-being", color: "#3730a3" } // indigo-800
];

const el = document.getElementById("interest");
const typingSpeed = 40;
const holdTime = 1200;
const eraseSpeed = 30;
let idx = 0;

async function type(text, color) {
  el.style.color = color; // set the color when typing starts
  el.style.transition = "color 0.4s ease";
  for (let i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    await new Promise(r => setTimeout(r, typingSpeed));
  }
}

async function erase() {
  const text = el.textContent;
  for (let i = text.length; i >= 0; i--) {
    el.textContent = text.slice(0, i);
    await new Promise(r => setTimeout(r, eraseSpeed));
  }
}

async function loop() {
  while (true) {
    const { text, color } = interests[idx % interests.length];
    await type(text, color);
    await new Promise(r => setTimeout(r, holdTime));
    await erase();
    idx++;
  }
}
if (el) loop();

