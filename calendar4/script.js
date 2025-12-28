const grid = document.getElementById("grid");
const ymEl = document.getElementById("ym");

const today = new Date();
let Y = today.getFullYear();
let M = today.getMonth() + 1;

// ✅ 양력 공휴일 + 설날/추석 (양력 고정 테이블)
// 필요하면 연도별로 추가
const holidays = {
  "1-1": "신정",
  "3-1": "삼일절",
  "5-5": "어린이날",
  "6-6": "현충일",
  "8-15": "광복절",
  "10-3": "개천절",
  "10-9": "한글날",
  "12-25": "성탄절",

  // 2026년 설날 / 추석 (양력 기준)
  "2026-2-16": "설날",
  "2026-2-17": "설날",
  "2026-2-18": "설날",

  "2026-9-24": "추석",
  "2026-9-25": "추석",
  "2026-9-26": "추석"
};

function daysInMonth(y,m){
  return new Date(y,m,0).getDate();
}

function firstDow(y,m){
  return new Date(y,m-1,1).getDay();
}

function render(){
  ymEl.textContent = `${Y}年 ${M}月`;
  grid.innerHTML="";

  const first = firstDow(Y,M);
  const last = daysInMonth(Y,M);

  let prevM=M-1||12, prevY=M===1?Y-1:Y;
  let prevLast=daysInMonth(prevY,prevM);

  for(let i=0;i<42;i++){
    const cell=document.createElement("div");
    cell.className="cell";

    const col=i%7;
    if(col===0) cell.classList.add("sun");
    if(col===6) cell.classList.add("sat");

    let d, cy=Y, cm=M, other=false;

    if(i<first){
      d=prevLast-first+i+1;
      other=true;
      cm=prevM; cy=prevY;
    }else if(i>=first+last){
      d=i-first-last+1;
      other=true;
      cm=M+1; if(cm===13){cm=1; cy++;}
    }else{
      d=i-first+1;
    }

    const day=document.createElement("div");
    day.className="day";
    day.textContent=d;

    const sub=document.createElement("div");
    sub.className="sub";

    const key1 = `${cm}-${d}`;
    const key2 = `${cy}-${cm}-${d}`;

    let holidayName = holidays[key2] || holidays[key1];

    if(holidayName){
      cell.classList.add("holiday");
      sub.textContent = holidayName;
    }

    if(other) cell.classList.add("otherMonth");

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

    cell.append(day);
    if(sub.textContent) cell.append(sub);
    grid.append(cell);
  }
}

document.getElementById("prev").onclick=()=>{ M--; if(M===0){M=12;Y--;} render(); };
document.getElementById("next").onclick=()=>{ M++; if(M===13){M=1;Y++;} render(); };
document.getElementById("todayBtn").onclick=()=>{
  Y=today.getFullYear();
  M=today.getMonth()+1;
  render();
};

render();
