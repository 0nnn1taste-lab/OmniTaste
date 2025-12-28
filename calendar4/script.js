const grid = document.getElementById("grid");
const ymEl = document.getElementById("ym");
const ganjiEl = document.getElementById("ganji");

const klc = new KoreanLunarCalendar();
const today = new Date();

let Y = today.getFullYear();
let M = today.getMonth() + 1;

// 간지
const heavenly = ["갑","을","병","정","무","기","경","신","임","계"];
const earthly  = ["자","축","인","묘","진","사","오","미","신","유","술","해"];
const heavenlyH = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const earthlyH  = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

// 양력 공휴일
const solarHolidays = {
  "1-1":"신정",
  "3-1":"삼일절",
  "5-5":"어린이날",
  "6-6":"현충일",
  "8-15":"광복절",
  "10-3":"개천절",
  "10-9":"한글날",
  "12-25":"성탄절"
};

function getGanji(year){
  const i10=(year-4)%10, i12=(year-4)%12;
  return `${heavenly[i10]}${earthly[i12]}년(${heavenlyH[i10]}${earthlyH[i12]}年)`;
}

function daysInMonth(y,m){ 
  return new Date(y,m,0).getDate(); 
}

function firstDow(y,m){ 
  return new Date(y,m-1,1).getDay(); 
}

// ✅ 설날 / 추석 (2026년만 고정)
function fixedKoreanHoliday(y, cm, d){
  if (y === 2026 && cm === 2 && d >= 16 && d <= 18) return "설날";
  if (y === 2026 && cm === 9 && d >= 24 && d <= 26) return "추석";
  return null;
}

function render(){
  ymEl.textContent = `${Y}年 ${M}月`;
  ganjiEl.textContent = getGanji(Y);
  grid.innerHTML = "";

  const first = firstDow(Y,M);
  const last = daysInMonth(Y,M);

  let prevM = M - 1 || 12;
  let prevY = M === 1 ? Y - 1 : Y;
  let prevLast = daysInMonth(prevY, prevM);

  for(let i = 0; i < 42; i++){
    const cell = document.createElement("div");
    cell.className = "cell";

    const col = i % 7;
    if(col === 0) cell.classList.add("sun");
    if(col === 6) cell.classList.add("sat");

    let d, cy = Y, cm = M, other = false;

    if(i < first){
      d = prevLast - first + i + 1;
      other = true;
      cm = prevM;
      cy = prevY;
    }else if(i >= first + last){
      d = i - first - last + 1;
      other = true;
      cm = M + 1;
      cy = Y;
      if(cm === 13){ cm = 1; cy++; }
    }else{
      d = i - first + 1;
    }

    // 음력 라이브러리는 유지 (간지 계산용)
    klc.setSolarDate(cy, cm, d);

    const day = document.createElement("div");
    day.className = "day";
    day.textContent = d;

    const sub = document.createElement("div");
    sub.className = "sub";

    let holidayName = null;

    // 1️⃣ 양력 공휴일
    if (solarHolidays[`${cm}-${d}`]) {
      holidayName = solarHolidays[`${cm}-${d}`];
    }

    // 2️⃣ 설날 / 추석 (2026년만)
    const fixedHoliday = fixedKoreanHoliday(cy, cm, d);
    if (fixedHoliday) {
      holidayName = fixedHoliday;
    }

    if (holidayName) {
      cell.classList.add("holiday");
      sub.textContent = holidayName;
    }

    if (other) cell.classList.add("otherMonth");

    // 오늘 ●
    if (
      cy === today.getFullYear() &&
      cm === today.getMonth() + 1 &&
      d === today.getDate()
    ) {
      const dot = document.createElement("div");
      dot.className = "todayDot";
      dot.textContent = "●";
      cell.append(dot);
    }

    cell.append(day);
    if (sub.textContent) cell.append(sub);
    grid.append(cell);
  }
}

document.getElementById("prev").onclick = () => {
  M--;
  if(M === 0){ M = 12; Y--; }
  render();
};

document.getElementById("next").onclick = () => {
  M++;
  if(M === 13){ M = 1; Y++; }
  render();
};

document.getElementById("todayBtn").onclick = () => {
  Y = today.getFullYear();
  M = today.getMonth() + 1;
  render();
};

render();
