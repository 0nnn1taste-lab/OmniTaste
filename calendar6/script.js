const dowLabels = ["일 Sun", "월 Mon", "화 Tue", "수 Wed", "목 Thu", "금 Fri", "토 Sat"];

const monthTitle = document.getElementById("monthTitle");
const grid = document.getElementById("grid");
const dowRow = document.getElementById("dowRow");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const todayBtn = document.getElementById("todayBtn");

dowRow.innerHTML = dowLabels.map(d => `<div>${d}</div>`).join("");

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

function renderCalendar(y, m) {
  grid.innerHTML = "";
  monthTitle.textContent = `${y}.${String(m + 1).padStart(2, "0")}`;

  const firstDay = new Date(y, m, 1);
  const startDate = new Date(y, m, 1 - firstDay.getDay());

  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const cell = document.createElement("div");
    cell.className = "day";

    if (d.getMonth() !== m) cell.classList.add("other");
    if (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    ) {
      cell.classList.add("today");
    }

    cell.textContent = d.getDate();
    grid.appendChild(cell);
  }
}

prevBtn.onclick = () => {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  renderCalendar(year, month);
};

nextBtn.onclick = () => {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  renderCalendar(year, month);
};

todayBtn.onclick = () => {
  year = today.getFullYear();
  month = today.getMonth();
  renderCalendar(year, month);
};

renderCalendar(year, month);
