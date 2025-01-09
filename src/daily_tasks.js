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

const dailyTasks = new DailyTasks();
dailyTasks.addTask('workout');
// console.log(dailyTasks.listTasks());

dailyTasks.completeTask('workout');
// console.log(dailyTasks.listTasks());

dailyTasks.addTask('shower');

dailyTasks.resetTasks();
console.log(dailyTasks.listTasks());
