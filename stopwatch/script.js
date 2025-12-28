let elapsed = 0;
let timer = null;

function format(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function start() {
  if (timer) return;
  const startTime = Date.now() - elapsed;
  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    document.getElementById("time").innerText = format(elapsed);
  }, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  elapsed = 0;
  document.getElementById("time").innerText = "00:00:00";
}
