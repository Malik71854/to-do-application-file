let todoele = document.getElementById("taskinfo");
let tasklist = document.getElementById("tasklist");
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

document.getElementById("add").onclick = function() {
    if (todoele.value.length == 0) {
        alert("Enter a task details");
    } else {
        tasklist.innerHTML = tasklist.innerHTML + `
            <div class="task"> 
                <span id="work">${todoele.value}</span>
                <button class="del"><i class="fa fa-trash"></i></button>
            </div>`;
        saveTasksToLocalStorage();
        setDeleteButtonEventHandlers();

        todoele.value = "";
    }
};

function setDeleteButtonEventHandlers() {
    let alltasks = document.querySelectorAll('.del');
    for (let i = 0; i < alltasks.length; i++) {
        alltasks[i].onclick = function() {
            console.log(this);
            console.log(this.parentNode);
            this.parentNode.remove();
            saveTasksToLocalStorage();
        };
    }
}

function saveTasksToLocalStorage() {
    let tasks = [];
    let taskElements = document.querySelectorAll('.task span');
    taskElements.forEach(function(taskElement) {
        tasks.push(taskElement.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        tasklist.innerHTML += `
            <div class="task"> 
                <span id="work">${task}</span>
                <button class="del"><i class="fa fa-trash"></i></button>
            </div>`;
    });
    setDeleteButtonEventHandlers();
}

