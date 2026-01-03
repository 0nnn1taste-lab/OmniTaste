const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

const snowflakes = [];

for (let i = 0; i < 120; i++) {
  snowflakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1.5,   // 함박눈 크기
    d: Math.random() + 0.5        // 떨어지는 속도
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();

  for (let s of snowflakes) {
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
  }

  ctx.fill();
  moveSnow();
}

let angle = 0;
function moveSnow() {
  angle += 0.01;
  for (let s of snowflakes) {
    s.y += Math.pow(s.d, 2);
    s.x += Math.sin(angle) * 0.6;

    if (s.y > canvas.height) {
      s.y = -5;
      s.x = Math.random() * canvas.width;
    }
  }
}

function animate() {
  drawSnow();
  requestAnimationFrame(animate);
}

animate();
