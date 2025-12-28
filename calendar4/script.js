const grid = document.getElementById("grid");
const ymEl = document.getElementById("ym");
const ganjiEl = document.getElementById("ganji");

const today = new Date();
let Y = today.getFullYear();
let M = today.getMonth() + 1;

// 음력 라이브러리 안전 가드
const hasLunar = typeof KoreanLunarCalendar !== "undefined";
const klc = hasLunar ? new KoreanLunarCalendar() : null;

// 간지
const heavenly = ["갑","을","병","정","무","기","경","신","임","계"];
const earthly  = ["자","축","인","묘","진","사","오","미","신","유","술","해"];
const heavenlyH = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const earthlyH  = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

const solarHolidays = {
  "1-1":"신정","3-1":"삼일절","5-5":"어린이날",
  "6-6":"현충일","8-15":"광복절",
  "10-3":"개천절","10-9":"한글날","12-25":"성탄절"
};

function getGanji(year){
  const i10=(year-4)%10, i12=(year-4)%12;
  return `${heavenly[i10]}${earthly[i12]}년(${heavenlyH[i10]}${earthlyH[i12]}年)`;
}

function daysInMonth(y,m){ return new Date(y,m,0).getDate(); }
function firstDow(y,m){ return new Date(y,m-1,1).getDay(); }

function isKoreanLunarHoliday(lm, ld){
  if(lm===1 && [1,2,30].includes(ld)) return true;
  if(lm===8 && [14,15,16].includes(ld)) return true;
  return false;
}

function render(){
  ymEl.textContent = `${Y}年 ${M}月`;
  ganjiEl.textContent = getGanji(Y);
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
      d=prevLast-first+i+1; other=true;
      cm=prevM; cy=prevY;
    }else if(i>=first+last){
      d=i-first-last+1; other=true;
      cm=M+1; if(cm===13){cm=1; cy++;}
    }else d=i-first+1;

    const day=document.createElement("div");
    day.className="day";
    day.textContent=d;

    const sub=document.createElement("div");
    sub.className="sub";

    const labels=[];
    let holiday=false;

    // 음력 계산 (라이브러리 있을 때만)
    if(hasLunar){
      klc.setSolarDate(cy,cm,d);
      const lunar=klc.getLunarCalendar();

      if(lunar.lunarDay===1 || lunar.lunarDay===15){
        labels.push(`음 ${lunar.lunarMonth}.${lunar.lunarDay}`);
      }
      if(isKoreanLunarHoliday(lunar.lunarMonth, lunar.lunarDay)){
        labels.push(lunar.lunarMonth===1 ? "설날" : "추석");
        holiday=true;
      }
    }

    const solarName = solarHolidays[`${cm}-${d}`];
    if(solarName){
      labels.push(solarName);
      holiday=true;
    }

    if(holiday) cell.classList.add("holiday");
    if(other) cell.classList.add("otherMonth");

    if(
      cy===today.getFullYear() &&
      cm===today.getMonth()+1
