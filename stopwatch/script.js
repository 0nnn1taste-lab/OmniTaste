let elapsed = 0;
let interval = null;

function format(ms) {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function start() {
  if (interval) return;
  const base = Date.now() - elapsed;
  interval = setInterval(() => {
    elapsed = Date.now() - base;
    document.getElementById("time").innerText = format(elapsed);
  }, 1000);
}

function pause() {
  clearInterval(interval);
  interval = null;
}

function reset() {
  pause();
  elapsed = 0;
  document.getElementById("time").innerText = "00:00:00";
}
