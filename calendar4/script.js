const grid = document.getElementById("grid");
const yearEl = document.getElementById("year");
const klc = new KoreanLunarCalendar();

const today = new Date();
let Y = today.getFullYear();
let M = today.getMonth() + 1;

const solarHolidays = {
  "1-1":"신정","3-1":"삼일절","5-5":"어린이날",
  "6-6":"현충일","8-15":"광복절",
  "10-3":"개천절","10-9":"한글날","12-25":"성탄절"
};

function daysInMonth(y,m){
  return new Date(y,m,0).getDate();
}

function firstDow(y,m){
  return new Date(y,m-1,1).getDay();
}

function render(){
  yearEl.textContent = `${Y}.${String(M).padStart(2,"0")}`;
  grid.innerHTML="";

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
