const messages = [
  "TODAY IS ENOUGH 🌱",
  "YOU ARE DOING GREAT 💗",
  "ONE STEP IS STILL PROGRESS",
  "SAVE YOUR ENERGY ✨",
  "NO RUSH. JUST KEEP GOING",
  "SMALL WINS MATTER 🎮",
  "YOU SHOWED UP TODAY",
  "PAUSE IS NOT FAILURE",
  "TRY AGAIN TOMORROW 🌸",
  "STILL PROUD OF YOU"
];

const messageEl = document.getElementById("message");

const randomIndex = Math.floor(Math.random() * messages.length);
messageEl.textContent = messages[randomIndex];
