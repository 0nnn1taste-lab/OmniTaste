const dowLabels = ["일 Sun", "월 Mon", "화 Tue", "수 Wed", "목 Thu", "금 Fri", "토 Sat"];

const holidays = {
  "01-01": "신정",
  "03-01": "삼일절",
  "05-05": "어린이날",
  "06-06": "현충일",
  "08-15": "광복절",
  "10-03": "개천절",
  "10-09": "한글날",
  "12-25": "크리스마스"
};

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

  const first = new Date(y, m, 1);
  const start = new Date(y, m, 1 - first.getDay());

  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    const cell = document.createElement("div");
    cell.className = "day";

    if (d.getMonth() !== m) cell.classList.add("other");

    const day = d.getDay();
    if (day === 0) cell.classList.add("sun");
    if (day === 6) cell.classList.add("sat");

    const key = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (holidays[key]) {
      cell.classList.add("holiday");
    }

    if (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    ) {
      cell.classList.add("today");
    }

    const dateEl = document.createElement("div");
    dateEl.textContent = d.getDate();
    cell.appendChild(dateEl);

    if (holidays[key]) {
      const nameEl = document.createElement("div");
      nameEl.className = "holiday-name";
      nameEl.textContent = holidays[key];
      cell.appendChild(nameEl);
    }

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
