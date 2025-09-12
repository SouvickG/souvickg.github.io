// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Rotating interests — typing + erasing
const interests = [
  "conversational AI and information retrieval",
  "ethical AI, trust, and governance",
  "human–AI interaction and evaluation",
  "data mining with language models",
  "applied AI for community well-being"
];

const el = document.getElementById("interest");
const typingSpeed = 40;     // ms per char
const holdTime = 1200;      // ms to hold full text
const eraseSpeed = 30;      // ms per char
let idx = 0;

async function type(text) {
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
    const text = interests[idx % interests.length];
    await type(text);
    await new Promise(r => setTimeout(r, holdTime));
    await erase();
    idx++;
  }
}
loop();
