console.log("Hello, World!");

const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const exportButton = document.getElementById("export-tasks");
const toggleModeButton = document.getElementById("toggle-mode");

document.addEventListener("DOMContentLoaded", renderTasks);

addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({
            text: taskText,
            timestamp: new Date().toISOString(),
            completed: false 
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks();
    } else {
        alert("must i beg you to put something? 🔫😎");
    }
});

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskCompletion(${index})">
            <strong class="${task.completed ? 'completed' : ''}">${task.text}</strong> 
            <small>${formatDate(task.timestamp)}</small>
            <button class="delete-task" data-task-id="${index}">👀</button>
        `;

        taskList.appendChild(li);
    });

    document.querySelectorAll(".delete-task").forEach(button => {
        button.addEventListener("click", function () {
            deleteTask(parseInt(button.dataset.taskId));
        });
    });
}

function toggleTaskCompletion(taskIndex) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(taskIndex) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!tasks[taskIndex].completed) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    } else {
        alert("You don complete the task, why u wan delete ham? are u normal👀?");
    }
}

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString();
}



exportButton.addEventListener("click", function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let jsonStr = JSON.stringify(tasks, null, 2);
    let blob = new Blob([jsonStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    document.body.appendChild(a);
    a.click();
    a.remove(); 
});




toggleModeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        toggleModeButton.textContent = "Dark Mode";
    } else {
        toggleModeButton.textContent = "Light Mode";
    }
});
