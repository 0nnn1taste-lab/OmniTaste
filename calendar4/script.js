const grid = document.getElementById("grid");
const ymEl = document.getElementById("ym");
const ganjiEl = document.getElementById("ganji");

const klc = new KoreanLunarCalendar();
const today = new Date();

let Y = today.getFullYear();
let M = today.getMonth() + 1;

const heavenly = ["갑","을","병","정","무","기","경","신","임","계"];
const earthly  = ["자","축","인","묘","진","사","오","미","신","유","술","해"];

const solarHolidays = {
  "1-1":"신정","3-1":"삼일절","5-5":"어린이날",
  "6-6":"현충일","8-15":"광복절",
  "10-3":"개천절","10-9":"한글날","12-25":"성탄절"
};

function getGanji(year){
  const h = heavenly[(year - 4) % 10];
  const e = earthly[(year - 4) % 12];
  return `${h}${e}년(${h}${e}年)`;
}

function daysInMonth(y,m){
  return new Date(y,m,0).getDate();
}

function firstDow(y,m){
  return new Date(y,m-1,1).getDay();
}

function render(){
  ymEl.textContent = `${Y}年 ${M}月`;
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

    let d, isOther=false, cy=Y, cm=M;

    if(i<first){
      d = prevLast-first+i+1;
      isOther=true;
      cm=prevM; cy=prevY;
    }else if(i>=first+last){
      d = i-first-last+1;
      isOther=true;
      cm=M+1; cy=Y;
      if(cm===13){cm=1; cy++;}
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

    if(isHoliday) dayEl.classList.add("holiday");
    if(isOther){
      cell.classList.add("otherMonth");
      if(isHoliday) cell.classList.add("holiday");
    }

    // 오늘 날짜 ●
    if(
      cy===today.getFullYear() &&
      cm===today.getMonth()+1 &&
      d===today.getDate()
    ){
      const dot=document.createElement("div");
      dot.className="todayDot";
      dot.textContent="●";
      cell.append(dot);
    }

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
