import { Task, DailyTasks } from './daily_tasks.js';

class CountTask extends Task {
  constructor(name, goal = 0, completedCount = 0) {
    super(name);
    this.goal = goal;
    this.completedCount = completedCount;
  }

  // Increment the completed count by a specified amount, capped at the goal
  incrementCount(amount) {
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

const weeklyTasks = new WeeklyTasks()
weeklyTasks.addTask('Leetcode', 10);
weeklyTasks.addTask('Mock', 3);

weeklyTasks.updateTaskCount('Leetcode', 9)
console.log(weeklyTasks.listTasks());