// ===== 오늘의 문구 (여기만 수정하면 됨) =====
const todayTodos = [
  "지금 안 하면, 내일도 하지 않는다.",
  "완벽 말고 완료. 지금 시작.",
  "딱 10분만 해도 흐름은 바뀐다.",
  "미루는 순간, 목표는 멀어진다.",
  "오늘의 선택이 다음 달의 나를 만든다."
];

// ===== DOM =====
const widget = document.getElementById("mp3Widget");
const textEl = document.getElementById("todoText");

// 문구 없으면 위젯 숨김
if (!todayTodos || todayTodos.length === 0) {
  widget.style.display = "none";
} else {
  let idx = 0;

  function showTodo() {
    textEl.style.opacity = 0;
    textEl.style.transform = "translateY(-80%)";

    setTimeout(() => {
      textEl.textContent = todayTodos[idx];
      textEl.style.opacity = 1;
      textEl.style.transform = "translateY(-50%)";
      idx = (idx + 1) % todayTodos.length;
    }, 400);
  }

  showTodo();
  setInterval(showTodo, 3000);
}
