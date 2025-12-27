const daysEl = document.getElementById("days");
const monthEl = document.getElementById("month");

let current = new Date(2025, 11); // 2025.12

function renderCalendar() {
  daysEl.innerHTML = "";

  const year = current.getFullYear();
  const month = current.getMonth();

  monthEl.textContent = `${year}.${String(month + 1).padStart(2, "0")}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    daysEl.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= lastDate; d++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = d;
    daysEl.appendChild(cell);
  }
}

document.getElementById("prev").onclick = () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
};

document.getElementById("next").onclick = () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
