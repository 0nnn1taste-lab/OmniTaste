const params = new URLSearchParams(window.location.search);
const start = params.get("start"); // YYYY-MM-DD

const messageEl = document.getElementById("message");

function daysBetween(startDate) {
  const startDay = new Date(startDate);
  const today = new Date();

  startDay.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  return Math.floor((today - startDay) / (1000 * 60 * 60 * 24)) + 1;
}

let day = start ? daysBetween(start) : 1;
if (day < 1) day = 1;

let message = "";

if (day <= 3) {
  message = `습관을 시작한 지 D+${day} ✨ 잘 시작했어요`;
} else if (day <= 7) {
  message = `D+${day} 🌱 루틴이 만들어지는 중`;
} else if (day <= 14) {
  message = `D+${day} 💗 벌써 2주차예요`;
} else if (day <= 21) {
  message = `D+${day} 🔥 꾸준함이 쌓이고 있어요`;
} else if (day <= 28) {
  message = `D+${day} 🪽 4주 완주가 보여요`;
} else {
  message = `D+${day} 🎉 이젠 습관이에요`;
}

setTimeout(() => {
  messageEl.textContent = message;
  messageEl.classList.add("show");
}, 300);
