const svg = document.getElementById('timer-svg');
const timeDisplay = document.getElementById('time-display');
const totalSegments = 60;
let countdownInterval = null;

// Create 60 segments around a circle
for (let i = 0; i < totalSegments; i++) {
  const angle = (360 / totalSegments) * i;
  const largeArc = 360 / totalSegments > 180 ? 1 : 0;

  const x1 = 100 + 90 * Math.cos((Math.PI / 180) * angle);
  const y1 = 100 + 90 * Math.sin((Math.PI / 180) * angle);

  const x2 = 100 + 90 * Math.cos((Math.PI / 180) * (angle + 6));
  const y2 = 100 + 90 * Math.sin((Math.PI / 180) * (angle + 6));

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", `M100,100 L${x1},${y1} A90,90 0 ${largeArc},1 ${x2},${y2} Z`);
  path.setAttribute("class", "segment");
  path.setAttribute("data-minute", i + 1);

  path.addEventListener("click", () => startTimer(i + 1));
  svg.appendChild(path);
}

function startTimer(minutes) {
  clearInterval(countdownInterval);
  let timeLeft = minutes * 60;
  updateTimeDisplay(timeLeft);

  document.querySelectorAll('.segment').forEach((seg, idx) => {
    seg.style.opacity = idx < minutes ? "1" : "0";
  });

  countdownInterval = setInterval(() => {
    timeLeft--;
    updateTimeDisplay(timeLeft);

    const segmentsToShow = Math.ceil(timeLeft / 60);
    document.querySelectorAll('.segment').forEach((seg, idx) => {
      seg.style.opacity = idx < segmentsToShow ? "1" : "0";
    });

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      const sound = document.getElementById("ding-sound");
      sound.play();
    }
  }, 1000);
}

function updateTimeDisplay(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  timeDisplay.textContent = `${mins}:${secs}`;
}

document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(countdownInterval);
  updateTimeDisplay(0);
  document.querySelectorAll('.segment').forEach(seg => {
    seg.style.opacity = "1";
  });
});
