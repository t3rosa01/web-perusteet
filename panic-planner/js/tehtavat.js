function addTask() {
    const task = document.getElementById('taskInput').value.trim();
    const date = document.getElementById('taskDate').value;
  
    if (!task || !date) return;
  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    if (!tasks[date]) tasks[date] = [];
  
    tasks[date].push({ text: task, done: false, important: false });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(date);
    showAllTasks();
    document.getElementById('taskInput').value = '';
  }
  
  function toggleDone(date, index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    tasks[date][index].done = !tasks[date][index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(date);
    showAllTasks();
  }
  
  function toggleImportant(date, index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    tasks[date][index].important = !tasks[date][index].important;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(date);
    showAllTasks();
  }
  
  function deleteTask(date, index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    tasks[date].splice(index, 1);
    if (tasks[date].length === 0) delete tasks[date]; 
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(date);
    showAllTasks();
  }
  
  function showTasks(date) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const list = document.getElementById('taskList');
    list.innerHTML = '';
  
    if (tasks[date]) {
      tasks[date].forEach((t, i) => {
        list.appendChild(createTaskElement(t, date, i));
      });
    }
  }
  
  function showAllTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const container = document.getElementById('allTasks');
    container.innerHTML = '';
  
    Object.keys(tasks).sort().forEach(date => {
      const heading = document.createElement('h4');
      heading.textContent = date;
      container.appendChild(heading);
  
      tasks[date].forEach((t, i) => {
        container.appendChild(createTaskElement(t, date, i));
      });
    });
  }
  
  function createTaskElement(task, date, index) {
    const item = document.createElement('div');
    item.className = 'taskItem';
    if (task.important) item.classList.add('important');
  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.onchange = () => toggleDone(date, index);
  
    const label = document.createElement('span');
    label.textContent = task.text;
    if (task.done) {
      label.style.textDecoration = 'line-through';
      label.style.opacity = 0.6;
    }
  
    const star = document.createElement('button');
    star.innerHTML = task.important ? '🌟' : '☆';
    star.onclick = () => toggleImportant(date, index);
  
    const del = document.createElement('button');
    del.textContent = '🗑️';
    del.onclick = () => deleteTask(date, index);
  
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(star);
    item.appendChild(del);
  
    return item;
  }
  
  
  const dateField = document.getElementById('taskDate');
  if (dateField) {
    const today = new Date().toISOString().split("T")[0];
    dateField.value = today;
    showTasks(today);
    showAllTasks();
    dateField.addEventListener('change', e => {
      showTasks(e.target.value);
    });
  }