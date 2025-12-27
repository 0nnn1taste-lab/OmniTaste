const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let seconds = 0;
let timer = null;

function renderTime() {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  timeEl.textContent = `${h}:${m}:${s}`;
}

startBtn.onclick = () => {
  if (timer) return;
  timer = setInterval(() => {
    seconds++;
    renderTime();
  }, 1000);
};

pauseBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
};

resetBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  renderTime();
};
