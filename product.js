document.addEventListener("DOMContentLoaded", function () {

    const addTaskBtn = document.getElementById("addTaskBtn");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to add a task to the list
    function addTask() {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            displayTasks();
            taskInput.value = "";
            showToast("Task Added");
        } else {
            alert("Please enter a task!");
        }
    }

    // Function to display tasks
    function displayTasks() {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;

            const markAsReadBtn = document.createElement("button");
            markAsReadBtn.innerHTML = '<i class="fas fa-check"></i>';
            markAsReadBtn.classList.add("mark-as-read-btn");
            markAsReadBtn.addEventListener("click", function () {
                markCompleted(index);
                showToast("Task is done");
            });

            li.appendChild(markAsReadBtn);
            todoList.appendChild(li);
        });


        // Update localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to mark a task as completed
    function markCompleted(index) {
        tasks.splice(index, 1);
        displayTasks();
    }

    // Function to show toast notifications
    function showToast(message) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "center", // top, bottom, or center
            position: "center", // left, center, or right
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
    }

    // Event listener for adding a task
    addTaskBtn.addEventListener("click", addTask);
});
