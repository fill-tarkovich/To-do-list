const todoList = document.querySelector(".todo-form");
const taskInput = document.querySelector(".task-input");
const todoItemsList = document.querySelector(".todo-items");
let tasks = [];

todoList.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask(taskInput.value);
});

function addTask(item) {
  if (item !== "") {
    const task = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    tasks.push(task);
    addToLocalStorage(tasks);
    taskInput.value = "";
  }
}

function renderTasks(tasks) {
  todoItemsList.innerHTML = "";
  tasks.forEach(function (item) {
    const checked = item.completed ? "checked" : null;
    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);
    if (item.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      <p>${item.name}</p>
      <button class="delete-button">X</button>
    `;
    todoItemsList.append(li);
  });
}

function addToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem("tasks");
  if (reference) {
    tasks = JSON.parse(reference);
    renderTasks(tasks);
  }
}

function toggle(id) {
  tasks.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(tasks);
}

function deleteTodo(id) {
  tasks = tasks.filter(function (item) {
    return item.id != id;
  });
  addToLocalStorage(tasks);
}

getFromLocalStorage();

todoItemsList.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }
  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});
