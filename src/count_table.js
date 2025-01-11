import { Task, DailyTasks } from './daily_tasks.js';
import { Calendar } from './calendar.js';
class CountTask extends Task {
  constructor(name, goal = 0, completedCount = 0) {
    super(name);
    this.goal = goal;
    this.completedCount = completedCount;
  }

  // Increment the completed count by a specified amount, capped at the goal
  incrementCount(amount) {
    if (amount > 0)
      this.completedCount = Math.min(this.completedCount + amount, this.goal); // Ensure it doesn't exceed the goal
  }

  // Check if the goal has been reached
  isGoalReached() {
    return (this.completedCount == this.goal);
  }

  // Return a string representation of the task, including the goal and completed count
  toString() {
    const status = this.isDone ? "Done" : "Not Done";
    return `[${status}] ${this.name} - Completed: ${this.completedCount}/${this.goal}`;
  }
}

class WeeklyTasks extends DailyTasks {
  constructor() {
    super();
  }

  addTask(task_name, count) {
    const newTask = new CountTask(task_name, count)
    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskCount(task_name, count) {
    // Find the task with the given task_name
    const task = this.tasks.find(t => t.name === task_name);

    if (task) {
      // Increment the completedCount by 1
      task.incrementCount(count);
      task.isDone = task.isGoalReached();
    }
  }

  completeTask() {
    // do nothing
  }

  incompleteTask() {
    // do nothing
  }

  resetTasks() {
    // do nothing
  }
}

class DisplayController {
  constructor() {
    this.weeklyTasks = new WeeklyTasks();
    this.taskListContainer = document.getElementById('weekly-count-container');
    this.addTaskButton = document.getElementById('add-weekly-task');
    this.taskNameInput = document.getElementById('weekly-task-input');
    this.taskGoalInput = document.getElementById('weekly-goal');

    this.addTaskButton.addEventListener('click', () => this.addTask());
    this.render();
  }

  render() {
    this.taskListContainer.innerHTML = '';

    this.weeklyTasks.tasks.forEach((task) => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('weekly-task-item');
      const status = task.isDone ? "Done" : "Not Done";

      taskElement.innerHTML = `
        <label>
          ${task.name} - ${task.completedCount}/${task.goal} (${status})
        </label>
        <input type="number" class="update-count" data-name="${task.name}" placeholder="Add Count">
        <button class="update-task" data-name="${task.name}">Update</button>
      `;

      taskElement.querySelector('.update-task').addEventListener('click', () => {
        const countInput = taskElement.querySelector('.update-count');
        const count = parseInt(countInput.value, 10);

        if (!isNaN(count)) {
          this.updateTaskCount(task.name, count);
          countInput.value = '';
        }
      });

      this.taskListContainer.appendChild(taskElement);
    });
  }

  addTask() {
    const taskName = this.taskNameInput.value.trim();
    const goal = parseInt(this.taskGoalInput.value, 10);

    if (taskName && !isNaN(goal) && goal > 0) {
      this.weeklyTasks.addTask(taskName, goal);
      this.taskNameInput.value = '';
      this.taskGoalInput.value = '';
      this.render();
    }
  }

  updateTaskCount(taskName, count) {
    this.weeklyTasks.updateTaskCount(taskName, count);
    this.render();
  }
}

export { CountTask, WeeklyTasks, DisplayController };

// const weeklyTasks = new WeeklyTasks()
// weeklyTasks.addTask('Leetcode', 10);
// weeklyTasks.addTask('Mock', 3);

// weeklyTasks.updateTaskCount('Leetcode', 9);
// console.log(weeklyTasks.listTasks());