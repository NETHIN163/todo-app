let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "") {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks.filter(t => t.text.toLowerCase().includes(filter.toLowerCase()));

  filtered.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerText = task.text;

    if (task.done) li.classList.add("completed");

    li.onclick = () => toggleTask(index);

    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      let newText = prompt("Edit task:", task.text);
      if (newText) {
        tasks[index].text = newText;
        renderTasks();
      }
    };

    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  document.getElementById("counter").innerText =
    `Total: ${tasks.length} | Completed: ${tasks.filter(t => t.done).length}`;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value === "") return;

  tasks.push({ text: input.value, done: false });
  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function searchTask() {
  let val = document.getElementById("searchInput").value;
  renderTasks(val);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

renderTasks();