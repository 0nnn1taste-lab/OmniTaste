const light = document.getElementById("light");
const powerBtn = document.getElementById("powerBtn");
const brightBtn = document.getElementById("brightBtn");

let isOn = false;
let level = 1;

function updateLight() {
  if (!isOn) {
    light.style.opacity = 0;
    light.style.transform = "translateX(-50%) scale(0.5)";
    return;
  }

  if (level === 1) {
    light.style.opacity = 0.4;
    light.style.transform = "translateX(-50%) scale(0.8)";
  } else if (level === 2) {
    light.style.opacity = 0.6;
    light.style.transform = "translateX(-50%) scale(1.1)";
  } else if (level === 3) {
    light.style.opacity = 0.85;
    light.style.transform = "translateX(-50%) scale(1.4)";
  }
}

powerBtn.onclick = () => {
  isOn = !isOn;
  updateLight();
};

brightBtn.onclick = () => {
  if (!isOn) return;
  level = level === 3 ? 1 : level + 1;
  updateLight();
};
