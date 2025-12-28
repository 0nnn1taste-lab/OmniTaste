const grid = document.getElementById("grid");
const ymEl = document.getElementById("ym");
const ganjiEl = document.getElementById("ganji");

const klc = new KoreanLunarCalendar();
const today = new Date();

let Y = today.getFullYear();
let M = today.getMonth() + 1;

const heavenly = ["갑","을","병","정","무","기","경","신","임","계"];
const earthly  = ["자","축","인","묘","진","사","오","미","신","유","술","해"];
const animals  = ["쥐","소","호랑이","토끼","용","뱀","말","양","원숭이","닭","개","돼지"];

const solarHolidays = {
  "1-1":"신정","3-1":"삼일절","5-5":"어린이날",
  "6-6":"현충일","8-15":"광복절",
  "10-3":"개천절","10-9":"한글날","12-25":"성탄절"
};

function getGanji(year){
  const h = heavenly[(year - 4) % 10];
  const e = earthly[(year - 4) % 12];
  const a = animals[(year - 4) % 12];
  return `${h}${e}년(${h}${e}年, ${a}띠)`;
}

function daysInMonth(y,m){
  return new Date(y,m,0).getDate();
}

function firstDow(y,m){
  return new Date(y,m-1,1).getDay();
}

function render(){
  const isCurrentMonth =
    Y === today.getFullYear() &&
    M === today.getMonth() + 1;

  ymEl.innerHTML =
    `${Y}<span class="unit">年</span> ${M}<span class="unit">月</span>` +
    (isCurrentMonth ? `<span class="currentDot">●</span>` : "");

  ganjiEl.textContent = getGanji(Y);
  grid.innerHTML = "";

  const first = firstDow(Y,M);
  const last = daysInMonth(Y,M);

  let prevM = M-1 || 12;
  let prevY = M===1 ? Y-1 : Y;
  let prevLast = daysInMonth(prevY,prevM);

  for(let i=0;i<42;i++){
    const cell = document.createElement("div");
    cell.className="cell";
    const col=i%7;
    if(col===0) cell.classList.add("sun");
    if(col===6) cell.classList.add("sat");

    let d, isDim=false, cy=Y, cm=M;

    if(i<first){
      d = prevLast-first+i+1;
      isDim=true;
    }else if(i>=first+last){
      d = i-first-last+1;
      cm = M+1; if(cm===13){cm=1; cy++;}
      isDim=true;
    }else{
      d=i-first+1;
    }

    klc.setSolarDate(cy,cm,d);
    const lunar = klc.getLunarCalendar();

    const dayEl=document.createElement("div");
    dayEl.className="day";
    dayEl.textContent=d;

    const sub=document.createElement("div");
    sub.className="sub";

    let isHoliday=false;

    if(lunar.lunarMonth===1 && lunar.lunarDay===1){
      sub.textContent="설날"; isHoliday=true;
    }
    if(lunar.lunarMonth===8 && lunar.lunarDay===15){
      sub.textContent="추석"; isHoliday=true;
    }
    if(solarHolidays[`${cm}-${d}`]){
      sub.textContent=solarHolidays[`${cm}-${d}`];
      isHoliday=true;
    }

    if(lunar.lunarDay===1) sub.textContent="음력 1일";
    if(lunar.lunarDay===15) sub.textContent="음력 15일";

    if(isHoliday){
      dayEl.classList.add("holiday");
      cell.classList.add("holidayBorder");
    }

    if(isDim) cell.classList.add("dim");

    cell.append(dayEl);
    if(sub.textContent) cell.append(sub);
    grid.append(cell);
  }
}

document.getElementById("prev").onclick=()=>{
  M--; if(M===0){M=12;Y--;} render();
};
document.getElementById("next").onclick=()=>{
  M++; if(M===13){M=1;Y++;} render();
};
document.getElementById("todayBtn").onclick=()=>{
  Y=today.getFullYear();
  M=today.getMonth()+1;
  render();
};

render();
