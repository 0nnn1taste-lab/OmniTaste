// ====== 설정: 날짜칸 아래 작은 글씨(일정/메모) 넣고 싶으면 여기만 수정 ======
// key 형식: "YYYY-MM-DD"  value: "메모"
const NOTES = {
  // 예시:
  // "2026-12-25": "성탄절",
  // "2026-12-31": "연말"
};

// URL 파라미터 지원: ?y=2026&m=12  (m=1~12)
function getParamInt(name) {
  const v = new URLSearchParams(location.search).get(name);
  if (!v) return null;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

const now = new Date();
let viewY = getParamInt("y") ?? now.getFullYear();
let viewM = (getParamInt("m") ?? (now.getMonth() + 1)); // 1~12

const yearText = document.getElementById("yearText");
const monthText = document.getElementById("monthText");
const grid = document.getElementById("grid");
const subText = document.getElementById("subText");

document.getElementById("prevBtn").addEventListener("click", () => {
  viewM -= 1;
  if (viewM <= 0) { viewM = 12; viewY -= 1; }
  render();
  syncUrl();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  viewM += 1;
  if (viewM >= 13) { viewM = 1; viewY += 1; }
  render();
  syncUrl();
});

function pad2(n){ return String(n).padStart(2, "0"); }
function ymd(y,m,d){ return `${y}-${pad2(m)}-${pad2(d)}`; }

function daysInMonth(y, m){ // m:1~12
  return new Date(y, m, 0).getDate();
}

function firstDow(y, m){ // 0=Sun
  return new Date(y, m-1, 1).getDay();
}

function render(){
  yearText.textContent = String(viewY);
  monthText.textContent = pad2(viewM);
  subText.textContent = `${viewY}.${pad2(viewM)} (Notion Embed)`;

  grid.innerHTML = "";

  const first = firstDow(viewY, viewM);
  const dimPrevDays = first; // 앞쪽 채울 칸 수

  // 이전 달 계산
  let prevY = viewY, prevM = viewM - 1;
  if (prevM === 0){ prevM = 12; prevY -= 1; }
  const prevLast = daysInMonth(prevY, prevM);

  // 이번 달
  const thisLast = daysInMonth(viewY, viewM);

  // 총 6주(42칸) 고정: 전통 달력 느낌 유지
  const totalCells = 42;

  for (let i=0; i<totalCells; i++){
    const cell = document.createElement("div");
    cell.className = "cell";

    const col = i % 7; // 0=Sun,6=Sat
    if (col === 0) cell.classList.add("sun");
    if (col === 6) cell.classList.add("sat");

    let cy=viewY, cm=viewM, cd=0;
    let isDim = false;

    if (i < dimPrevDays){
      // 이전 달
      cd = prevLast - (dimPrevDays - 1 - i);
      cy = prevY; cm = prevM;
      isDim = true;
    } else if (i < dimPrevDays + thisLast){
      // 이번 달
      cd = (i - dimPrevDays) + 1;
    } else {
      // 다음 달
      const nextIndex = i - (dimPrevDays + thisLast);
      cd = nextIndex + 1;
      cm = viewM + 1; cy = viewY;
      if (cm === 13){ cm = 1; cy += 1; }
      isDim = true;
    }

    if (isDim) cell.classList.add("dim");

    const num = document.createElement("div");
    num.className = "dayNum";
    num.textContent = String(cd);

    const note = document.createElement("div");
    note.className = "note";
    const key = ymd(cy, cm, cd);
    note.textContent = NOTES[key] ?? "";

    // 오늘 표시(현재 달력의 실제 오늘일 때만)
    const isToday =
      cy === now.getFullYear() &&
      cm === (now.getMonth() + 1) &&
      cd === now.getDate();

    if (isToday){
      const ring = document.createElement("div");
      ring.className = "todayRing";
      cell.appendChild(ring);
    }

    cell.appendChild(num);
    if (note.textContent) cell.appendChild(note);

    grid.appendChild(cell);
  }
}

function syncUrl(){
  const u = new URL(location.href);
  u.searchParams.set("y", String(viewY));
  u.searchParams.set("m", String(viewM));
  history.replaceState(null, "", u.toString());
}

render();
