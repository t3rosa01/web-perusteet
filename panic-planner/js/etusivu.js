
function quickAddTask() {
  const task = document.getElementById('quickTask').value.trim();
  const today = new Date().toISOString().split("T")[0];
  if (!task) return;

  const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
  if (!tasks[today]) tasks[today] = [];
  tasks[today].push({ text: task, done: false, important: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  alert("Tehtävä lisätty tälle päivälle!");
  document.getElementById('quickTask').value = '';
}


let quickTimer;
let quickTotalSeconds = 1500;
let quickPaused = false;

function startQuickTimer() {
  const input = document.getElementById('quickTimeInput');
  let minutes = parseInt(input.value);
  if (isNaN(minutes) || minutes < 1) minutes = 25;

  quickTotalSeconds = minutes * 60;
  updateQuickTimerDisplay();

  clearInterval(quickTimer);
  quickPaused = false;

  quickTimer = setInterval(() => {
    if (!quickPaused) {
      if (quickTotalSeconds <= 0) {
        clearInterval(quickTimer);
        alert("Aika loppui!");
        return;
      }
      quickTotalSeconds--;
      updateQuickTimerDisplay();
    }
  }, 1000);
}

function pauseQuickTimer() {
  quickPaused = !quickPaused;
}

function resetQuickTimer() {
  clearInterval(quickTimer);
  const minutes = parseInt(document.getElementById('quickTimeInput').value);
  quickTotalSeconds = minutes * 60;
  updateQuickTimerDisplay();
}

function updateQuickTimerDisplay() {
  const display = document.getElementById('quickTimer');
  const minutes = Math.floor(quickTotalSeconds / 60);
  const seconds = quickTotalSeconds % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
