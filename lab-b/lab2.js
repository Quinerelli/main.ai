document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const searchInput = document.getElementById('search');


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const searchTerm = searchInput.value.trim().toLowerCase();
        tasks.forEach((task, index) => {
            if (searchTerm.length < 2 || task.text.toLowerCase().includes(searchTerm)) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="task-text">${highlightSearch(task.text)}</span>
                    <span class="task-deadline">${task.deadline || ''}</span>
                    <button data-index="${index}" class="delete">🗑</button>
                `;
                li.dataset.index = index;
                taskList.appendChild(li);
            }
        });
    }

    addTaskButton.addEventListener('click', function() {
        const newTaskText = newTaskInput.value.trim();
        const taskDeadline = taskDeadlineInput.value;

        if (newTaskText.length < 3 || newTaskText.length > 255) {
            alert('Zadanie musi mieć od 3 do 255 znaków.');
            return;
        }

        if (taskDeadline && new Date(taskDeadline) < new Date()) {
            alert('Data musi być w przyszłości.');
            return;
        }

        tasks.push({ text: newTaskText, deadline: taskDeadline });
        newTaskInput.value = '';
        taskDeadlineInput.value = '';
        saveTasks();
        renderTasks();
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    searchInput.addEventListener('input', function() {
        renderTasks();
    });

    function highlightSearch(text) {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length >= 2) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }
        return text;
    }

    taskList.addEventListener('click', function(e) {
        const target = e.target;
        const taskIndex = target.parentElement.dataset.index;

        if (target.classList.contains('task-text') || target.classList.contains('task-deadline')) {
            const originalText = tasks[taskIndex].text;
            const originalDeadline = tasks[taskIndex].deadline;


            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = originalText;
            textInput.className = 'edit-task-text';


            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = originalDeadline || '';
            dateInput.className = 'edit-task-deadline';


            target.classList.contains('task-text') && target.replaceWith(textInput);
            target.classList.contains('task-deadline') && target.replaceWith(dateInput);


            function saveChanges() {
                const updatedText = textInput.value.trim();
                const updatedDeadline = dateInput.value;

                if (updatedText.length >= 3 && updatedText.length <= 255) {
                    tasks[taskIndex].text = updatedText;
                    tasks[taskIndex].deadline = updatedDeadline;
                    saveTasks();
                    renderTasks();
                } else {
                    alert('Zadanie musi mieć od 3 do 255 znaków.');
                    textInput.value = originalText;
                    renderTasks();
                }
            }


            textInput.addEventListener('blur', saveChanges);
            dateInput.addEventListener('blur', saveChanges);


            textInput.focus();
        }
    });


    renderTasks();
});
