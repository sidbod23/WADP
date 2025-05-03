let fakeServerDB = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(fakeServerDB));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  fakeServerDB.forEach((task, index) => {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actionsDiv);

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return alert("Task cannot be empty.");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/add-task", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const task = { text: taskText };
      fakeServerDB.push(task);
      saveToLocalStorage();
      renderTasks();
      input.value = "";
    }
  };

  xhr.send(JSON.stringify({ text: taskText }));
}

function editTask(index) {
  const updatedText = prompt("Edit your task:", fakeServerDB[index].text);
  if (updatedText === null || updatedText.trim() === "") return;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "/update-task", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      fakeServerDB[index].text = updatedText.trim();
      saveToLocalStorage();
      renderTasks();
    }
  };

  xhr.send(JSON.stringify({ index, newText: updatedText.trim() }));
}

function deleteTask(index) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/delete-task", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      fakeServerDB.splice(index, 1);
      saveToLocalStorage();
      renderTasks();
    }
  };

  xhr.send(JSON.stringify({ index }));
}

// Initial render
renderTasks();
