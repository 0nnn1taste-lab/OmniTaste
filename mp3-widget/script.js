const messages = [
  "지금 안 하면, 내일도 하지 않는다.",
  "완벽 말고 완료. 지금 시작.",
  "딱 10분만 해도 흐름은 바뀐다.",
  "미루는 순간, 목표는 멀어진다.",
  "오늘의 선택이 다음 달의 나를 만든다."
];

let index = 0;
let timer = null;
const text = document.getElementById("text");

function showMessage(i) {
  text.style.opacity = 0;
  text.style.transform = "translateY(-12px)";

  setTimeout(() => {
    text.textContent = messages[i];
    text.style.opacity = 1;
    text.style.transform = "translateY(0)";
  }, 600);
}

function autoPlay() {
  clearInterval(timer);
  timer = setInterval(() => {
    index = (index + 1) % messages.length;
    showMessage(index);
  }, 4000);
}

document.getElementById("play").onclick = autoPlay;

document.getElementById("next").onclick = () => {
  index = (index + 1) % messages.length;
  showMessage(index);
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + messages.length) % messages.length;
  showMessage(index);
};

showMessage(index);
autoPlay();
