class Task {
  constructor(name) {
    this.name = name;
    this.isDone = false;
  }

  markDone() {
    this.isDone = true;
  }

  markNotDone() {
    this.isDone = false;
  }

  toString() {
    const status = this.isDone ? 'Done' : 'Not Done';
    return `${this.name} ${status}`;
  }
}

class DailyTasks {
  constructor() {
    this.tasks = []; // Array to store Task objects
  }

  addTask(task_name) {
    const newTask = new Task(task_name)
    this.tasks.push(newTask);
  }

  removeTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName);
  }

  listTasks() {
    return this.tasks.map((task) => task.toString()).join("\n");
  }

  completeTask(taskName) {
    const task = this.tasks.find((task) => task.name === taskName);
    if (task) task.markDone();
  }

  incompleteTask(taskName) {
    const task = this.tasks.find((task) => task.name === taskName);
    if (task) task.markNotDone();
  }

  resetTasks() {
    this.tasks.forEach((task) => task.markNotDone());
  }
}

class DisplayController {
  constructor() {
    this.dailyTasks = new DailyTasks();
    this.taskListContainer = document.getElementById('task-list-container');
    this.addTaskButton = document.getElementById('add-task-button');
    this.taskNameInput = document.getElementById('task-name-input');
    this.addTaskButton.addEventListener('click', () => this.addTask());
    this.render();
  }

  render() {
    this.taskListContainer.innerHTML = '';

    this.dailyTasks.tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task-item');
      taskElement.innerHTML = `
        <label>
          <input type="checkbox" class="task-status" data-name="${task.name}" ${task.isDone ? 'checked' : ''}>
          ${task.name}
        </label>
        <button class="remove-task" data-name="${task.name}">Remove</button>
      `;

      taskElement.querySelector('.task-status').addEventListener('change', (event) => {
        if (event.target.checked) {
          this.completeTask(task.name);
        } else {
          this.incompleteTask(task.name);
        }
      });

      taskElement.querySelector('.remove-task').addEventListener('click', () => this.removeTask(task.name));

      this.taskListContainer.appendChild(taskElement);
    });
  }

  addTask() {
    const taskName = this.taskNameInput.value.trim();
    if (taskName) {
      this.dailyTasks.addTask(taskName);
      this.taskNameInput.value = '';
      this.render();
    }
  }

  completeTask(taskName) {
    this.dailyTasks.completeTask(taskName);
    this.render();
  }

  incompleteTask(taskName) {
    this.dailyTasks.incompleteTask(taskName);
    this.render();
  }

  removeTask(taskName) {
    this.dailyTasks.removeTask(taskName);
    this.render();
  }
}

// const dailyTasks = new DailyTasks();
// dailyTasks.addTask('workout');
// // console.log(dailyTasks.listTasks());

// dailyTasks.completeTask('workout');
// // console.log(dailyTasks.listTasks());

// dailyTasks.addTask('shower');

// dailyTasks.resetTasks();
// console.log(dailyTasks.listTasks());

export { Task, DailyTasks, DisplayController };