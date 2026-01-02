const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const daysEl = document.getElementById("days");

let current = new Date();

function render() {
  daysEl.innerHTML = "";

  const year = current.getFullYear();
  const month = current.getMonth();

  yearEl.textContent = year + "년";
  monthEl.textContent = String(month + 1).padStart(2, "0") + "월";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLast = new Date(year, month, 0).getDate();

  // 이전 달
  for (let i = firstDay - 1; i >= 0; i--) {
    daysEl.innerHTML += `<div class="day other">${prevLast - i}</div>`;
  }

  // 이번 달
  for (let d = 1; d <= lastDate; d++) {
    let cls = "day";
    const today = new Date();

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) cls += " today";

    daysEl.innerHTML += `<div class="${cls}">${d}</div>`;
  }

  // 다음 달
  const total = daysEl.children.length;
  for (let i = 1; total + i <= 42; i++) {
    daysEl.innerHTML += `<div class="day other">${i}</div>`;
  }
}

render();
