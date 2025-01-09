import { DailyTasks } from "./daily_tasks.js";
import { CountTask, WeeklyTasks } from "./count_table.js";

class Day {
    constructor(allTasks) {
        this.tasks = allTasks;  // these are the tasks that im dealing with
        this.hours = Array(24).fill("");
    }

    addTask(task, startTime, duration) {
        // check if task object is an instance of CountTask
        if (task instanceof CountTask) {
            // ask user for how many today (for eg: 3 / 10 leetcodes in 5 hours)
        }
        // checks if the slot is empty
        let isAvailable = true;
        let endTime = startTime + duration - 1;
        for (let hour = startTime; hour <= endTime; hour++) {
            if (this.hours[hour] !== "")
                isAvailable = false;
        }
        if (isAvailable) {
            for (let hour = startTime; hour <= endTime; hour++) {
                this.hours[hour] = task.name;
            }
        }
    }

    toString() {
        return `${this.hours}`
    }
}

const dailies = new DailyTasks();
const weeklies = new WeeklyTasks();

const workout = dailies.addTask('workout');
const shower = dailies.addTask('shower');
const run = dailies.addTask('run');

const allTasks = dailies.tasksList;

const monday = new Day(allTasks);
monday.addTask(shower, 0, 2);
monday.addTask(workout, 0, 2);
monday.addTask(workout, 2, 5);
monday.addTask(run, 10, 8);

console.log(monday.toString())
