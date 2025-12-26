const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let current = new Date(2025, 11); // 2025.12

/* 한국 공휴일 (고정 공휴일) */
const holidays = {
  "01-01": true,
  "03-01": true,
  "05-05": true,
  "06-06": true,
  "08-15": true,
  "10-03": true,
  "10-09": true,
  "12-25": true
};

function renderCalendar(date) {
  calendar.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.textContent = `${year}.${String(month + 1).padStart(2, "0")}`;

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

    const number = document.createElement("div");
    number.textContent = d;
    day.appendChild(number);

    const key = `${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    if (holidays[key]) {
      day.classList.add("holiday");

      const paw = document.createElement("img");
      paw.src = "paw.png";
      paw.alt = "holiday";
      day.appendChild(paw);
    }

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
