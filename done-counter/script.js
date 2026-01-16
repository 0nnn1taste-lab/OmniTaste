const messages = [
  "YOU ARE DOING ENOUGH",
  "SMALL WINS COUNT",
  "NO RUSH TODAY",
  "JUST KEEP GOING",
  "PROUD OF YOU",
  "PAUSE IS OK",
  "ONE STEP IS STILL A STEP",
  "YOU SHOWED UP"
];

const textEl = document.getElementById("text");
let index = 0;

function showMessage() {
  textEl.classList.remove("show");

  setTimeout(() => {
    textEl.textContent = messages[index];
    textEl.classList.add("show");
    index = (index + 1) % messages.length;
  }, 400);
}

showMessage();
setInterval(showMessage, 2800);
