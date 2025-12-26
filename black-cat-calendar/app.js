const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let current = new Date(2025, 11); // 2025.12

/* 한국 공휴일 (고정) */
const holidays = {
  "01-01": true, // 신정
  "03-01": true, // 삼일절
  "05-05": true, // 어린이날
  "06-06": true, // 현충일
  "08-15": true, // 광복절
  "10-03": true, // 개천절
  "10-09": true, // 한글날
  "12-25": true  // 성탄절
};

function renderCalendar(date) {
  calendar.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.textContent = `${year}.${String(month + 1).padStart(2, "0")}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div")).className = "day empty";
  }

  for (let d = 1; d <= lastDate; d++) {
    const day = document.createElement("div");
    day.className = "day";
    day.textContent = d;

    const key = `${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    if (holidays[key]) day.classList.add("holiday");

    calendar.appendChild(day);
  }
}

prevBtn.onclick = () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar(current);
};

nextBtn.onclick = () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar(current);
};

renderCalendar(current);
