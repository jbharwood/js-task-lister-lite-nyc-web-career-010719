
document.addEventListener("DOMContentLoaded", () => {
  // const taskList = new TaskList();
  const form = document.querySelector("#create-task-form")
  const submit = document.querySelector(".submit")
  submit.addEventListener("click", function(e) {
    e.preventDefault()
    let taskName = document.querySelector("#new-task-description").value
    createTask(taskName)
  })

  const list = document.querySelector("#tasks")
  list.addEventListener("click", function(e) {
    if (e.target.id === "deleteBtn") {
      let task = allTasks.find(task => task.id == e.target.dataset.description)
      deleteTask(task)
    }
  })

});

let allTasks = []

function createTask(taskName) {
  fetch("http://localhost:3000/posts", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: taskName})
  })
  .then(response => response.json())
  .then(function(task) {
    allTasks.push(task)
    let tasks = document.querySelector("#tasks")
    tasks.innerHTML += `
    <li id="d${task.id}"> ${task.name}
      <button id="deleteBtn" data-description="${task.id}">x</button>
    </li>`
  })
}

function deleteTask(taskName) {
  fetch(`http://localhost:3000/posts/${taskName.id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: taskName})
  })
  .then(response => response.json())
  .then(function(task) {
    allTasks = allTasks.filter((t) => t.id !== task.id)
    let tasks = document.querySelector("#tasks")
    let thing = tasks.querySelector(`#d${taskName.id}`)
    tasks.removeChild(thing)
  })
}
