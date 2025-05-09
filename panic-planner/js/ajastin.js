let timer;
let totalSeconds = 1500;
let isPaused = false;

function startTimer() {
  const input = document.getElementById('timeInput');
  let minutes = parseInt(input.value);
  if (isNaN(minutes) || minutes < 1) minutes = 25;

  totalSeconds = minutes * 60;
  updateDisplay();

  clearInterval(timer);
  isPaused = false;

  timer = setInterval(() => {
    if (!isPaused) {
      if (totalSeconds <= 0) {
        clearInterval(timer);
        alert("Aika loppui!");
        return;
      }
      totalSeconds--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = !isPaused;
}

function resetTimer() {
  clearInterval(timer);
  const minutes = parseInt(document.getElementById('timeInput').value);
  totalSeconds = minutes * 60;
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById('timerDisplay');
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
