const messages = [
  "지금 안 하면, 내일도 하지 않는다.",
  "완벽 말고 완료. 지금 시작.",
  "딱 10분만 해도 흐름은 바뀐다.",
  "미루는 순간, 목표는 멀어진다.",
  "오늘의 선택이 다음 달의 나를 만든다."
];

let index = 0;
let interval = null;
const textEl = document.getElementById("text");

function showText(i) {
  textEl.style.opacity = 0;

  setTimeout(() => {
    textEl.textContent = messages[i];
    textEl.style.opacity = 1;
  }, 500);
}

function startAuto() {
  clearInterval(interval);
  interval = setInterval(() => {
    index = (index + 1) % messages.length;
    showText(index);
  }, 4000);
}

document.getElementById("play").onclick = () => {
  startAuto();
};

document.getElementById("next").onclick = () => {
  index = (index + 1) % messages.length;
  showText(index);
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + messages.length) % messages.length;
  showText(index);
};

showText(index);
startAuto();
