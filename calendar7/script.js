const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const daysEl = document.getElementById("days");

let current = new Date();

const holidays = [
  "1-1",   // 신정
  "3-1",   // 삼일절
  "5-5",   // 어린이날
  "6-6",   // 현충일
  "8-15",  // 광복절
  "10-3",  // 개천절
  "10-9",  // 한글날
  "12-25"  // 성탄절
];

function render() {
  daysEl.innerHTML = "";

  const year = current.getFullYear();
  const month = current.getMonth();

  yearEl.textContent = year;
  monthEl.textContent = month + 1;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLast = new Date(year, month, 0).getDate();

  // 이전 달
  for (let i = firstDay - 1; i >= 0; i--) {
    daysEl.innerHTML += `<div class="day other-month">${prevLast - i}</div>`;
  }

  // 이번 달
  for (let d = 1; d <= lastDate; d++) {
    const dateKey = `${month + 1}-${d}`;
    let cls = "day";

    const today = new Date();
    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) cls += " today";

    if (holidays.includes(dateKey)) cls += " holiday";

    daysEl.innerHTML += `<div class="${cls}">${d}</div>`;
  }

  // 다음 달
  const total = daysEl.children.length;
  for (let i = 1; total + i <= 42; i++) {
    daysEl.innerHTML += `<div class="day other-month">${i}</div>`;
  }
}

document.getElementById("prev").onclick = () => {
  current.setMonth(current.getMonth() - 1);
  render();
};

document.getElementById("next").onclick = () => {
  current.setMonth(current.getMonth() + 1);
  render();
};

document.getElementById("today").onclick = () => {
  current = new Date();
  render();
};

render();
