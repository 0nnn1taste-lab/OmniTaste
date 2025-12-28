const grid = document.getElementById("grid");
const today = new Date();
const Y = 2026;
const M = 1; // 기본 1월 (URL로 확장 가능)

const holidaysSolar = {
  "1-1":"신정",
  "3-1":"삼일절",
  "5-5":"어린이날",
  "6-6":"현충일",
  "8-15":"광복절",
  "10-3":"개천절",
  "10-9":"한글날",
  "12-25":"성탄절"
};

function daysInMonth(y,m){
  return new Date(y,m,0).getDate();
}

function firstDow(y,m){
  return new Date(y,m-1,1).getDay();
}

const klc = new KoreanLunarCalendar();

function render(){
  grid.innerHTML="";
  const first = firstDow(Y,M);
  const last = daysInMonth(Y,M);

  for(let i=0;i<42;i++){
    const cell = document.createElement("div");
    cell.className="cell";
    const col = i%7;
    if(col===0) cell.classList.add("sun");
    if(col===6) cell.classList.add("sat");

    let d = i-first+1;
    if(d<1 || d>last){
      cell.classList.add("dim");
      grid.appendChild(cell);
      continue;
    }

    const day = document.createElement("div");
    day.className="day";
    day.textContent=d;

    const sub = document.createElement("div");
    sub.className="sub";

    // 음력 계산
    klc.setSolarDate(Y,M,d);
    const lunar = klc.getLunarCalendar();
    if(lunar.lunarDay===1) sub.textContent="음력 1일";
    if(lunar.lunarDay===15) sub.textContent="음력 15일";

    // 설날 / 추석
    if(lunar.lunarMonth===1 && lunar.lunarDay===1){
      sub.textContent="설날";
      sub.classList.add("holiday");
    }
    if(lunar.lunarMonth===8 && lunar.lunarDay===15){
      sub.textContent="추석";
      sub.classList.add("holiday");
    }

    // 양력 공휴일
    const key=`${M}-${d}`;
    if(holidaysSolar[key]){
      sub.textContent=holidaysSolar[key];
      sub.classList.add("holiday");
    }

    cell.append(day);
    if(sub.textContent) cell.append(sub);
    grid.append(cell);
  }
}

render();
