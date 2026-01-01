const DOW_LABELS = ["일 Sun", "월 Mon", "화 Tue", "수 Wed", "목 Thu", "금 Fri", "토 Sat"];

const monthTitle = document.getElementById("monthTitle");
const grid = document.getElementById("grid");
const dowRow = document.getElementById("dowRow");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const todayBtn = document.getElementById("todayBtn");

// init DOW row
dowRow.innerHTML = DOW_LABELS.map(d => `<div>${d}</div>`).join("");

const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth(); // 0-11

function pad2(n){ return String(n).padStart(2, "0"); }

function isSameDate(a, b){
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function render(year, month){
  // header
  monthTitle.textContent = `${year}.${pad2(month + 1)}`;

  grid.innerHTML = "";

  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  // start from Sunday of the first week
  const start = new Date(year, month, 1 - first.getDay());
  // end at Saturday of the last week
  const end = new Date(year, month, last.getDate() + (6 - last.getDay()));

  const cursor = new Date(start);

  while (cursor <= end){
    const cell = document.createElement("div");
    cell.className = "day";

    const inThisMonth = cursor.getMonth() === month;
    if (!inThisMonth) cell.classList.add("other-month");

    const cursorCopy = new Date(cursor);
    if (isSameDate(cursorCopy, today)) cell.classList.add("today");

    cell.textContent = cursor.getDate();

    grid.appendChild(cell);

    cursor.setDate(cursor.getDate() + 1);
  }
}

function moveMonth(delta){
  const d = new Date(viewYear, viewMonth + delta, 1);
  viewYear = d.getFullYear();
  viewMonth = d.getMonth();
  render(viewYear, viewMonth);
}

prevBtn.addEventListener("click", () => moveMonth(-1));
nextBtn.addEventListener("click", () => moveMonth(1));
todayBtn.addEventListener("click", () => {
  viewYear = today.getFullYear();
  viewMonth = today.getMonth();
  render(viewYear, viewMonth);
});

// initial render
render(viewYear, viewMonth);
