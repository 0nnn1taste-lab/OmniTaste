const calendar = document.getElementById("calendar");
const yearTitle = document.getElementById("yearTitle");

const prevYearBtn = document.getElementById("prevYear");
const nextYearBtn = document.getElementById("nextYear");

let currentYear = 2025;
let currentMonth = 0;

function renderCalendar(year, month) {
  calendar.innerHTML = "";

  yearTitle.textContent = `${year}년`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendar.appendChild(empty);
  }

  for (let d = 1; d <= lastDate; d++) {
    const day = document.createElement("div");
    day.className = "day";
    day.textContent = d;
    calendar.appendChild(day);
  }
}

prevYearBtn.addEventListener("click", () => {
  currentYear--;
  renderCalendar(currentYear, currentMonth);
});

nextYearBtn.addEventListener("click", () => {
  currentYear++;
  renderCalendar(currentYear, currentMonth);
});

renderCalendar(currentYear, currentMonth);
