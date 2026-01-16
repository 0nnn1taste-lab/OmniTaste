const params = new URLSearchParams(window.location.search);

const done = Number(params.get("done")) || 0;
const total = Number(params.get("total")) || 0;

const countText = document.getElementById("countText");
const message = document.getElementById("message");
const fillBar = document.getElementById("fillBar");

countText.textContent = `💗 오늘 ${done} / ${total} 완료`;

let percent = total > 0 ? (done / total) * 100 : 0;
percent = Math.min(percent, 100);
fillBar.style.width = percent + "%";

if (done === 0) {
  message.textContent = "아직 시작 전이에요 🌱";
} else if (done < total) {
  message.textContent = `조금만 더! ${total - done}개 남았어요 🌸`;
} else {
  message.textContent = "✨ 오늘도 전부 완료! ✨";
}
