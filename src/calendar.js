import { Day } from "./day.js";
import { CountTask,WeeklyTasks}  from "./count_table.js";
class Calendar{
    constructor() {
        this.days = [];
        this.monday = new Day();
        this.tuesday = new Day();
        this.wednesday = new Day();
        this.thursday = new Day();
        this.friday = new Day();
        this.saturday = new Day();
        this.sunday = new Day();
        this.days.push(this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday);
        this.weeklyTasks = [];
    }

}


class DisplayController {
    constructor() {
        this.calendar = new Calendar();
        this.weeklyTasks = new WeeklyTasks();
        this.calendarTable = document.getElementById("calendar-table");
        this.taskListContainer = document.getElementById('weekly-count-container');
        this.dropdown = document.getElementById("weekly-tasks-dropdown");
        this.addWeeklyTaskButton = document.getElementById("add-weekly-task");
        this.taskNameInput = document.getElementById("weekly-task-input");
        this.taskGoalInput = document.getElementById('weekly-goal');

        this.addWeeklyTaskButton.addEventListener('click', () => this.addTask());
        this.render();
        document.addEventListener("DOMContentLoaded", ()=> {
            
            // // Create table header
            // const days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            // let headerRow = "<tr>";
            // for (let day of days) {
            //     headerRow += `<th>${day}</th>`;
            // }
            // headerRow += "</tr>";
            // this.calendarTable.innerHTML += headerRow;
        
            // // Create table rows for each hour
            // for (let hour = 0; hour < 24; hour++) {
            //     let row = `<tr><td>${hour}:00-${(hour+1)%24}:00</td>`; // First column for time
            //     for (let day = 0; day < 7; day++) {
            //         row += `<td></td>`; // Empty cells for each day
            //     }
            //     row += "</tr>";
            //     this.calendarTable.innerHTML += row;
            // }
            this.calendar.weeklyTasks.forEach(task => {
                const option = document.createElement("option");
                option.value = task;
                option.textContent = task.name;
                this.dropdown.appendChild(option);
            });
        });
    }
    updateDropdown() {
        this.dropdown.innerHTML = '<option value="" disabled selected>Select a task</option>';
        this.calendar.weeklyTasks.forEach(task => {
            const option = document.createElement("option");
            option.value = task;
            option.textContent = task.name;
            this.dropdown.appendChild(option);
        });
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
            const newTask = new CountTask(taskName, goal);
            this.calendar.weeklyTasks.push(newTask);
            this.weeklyTasks.addTask(taskName, goal);
            this.taskNameInput.value = '';
            this.taskGoalInput.value = '';
            this.updateDropdown();
            this.render();
        }
      }
    
      updateTaskCount(taskName, count) {
        this.weeklyTasks.updateTaskCount(taskName, count);
        this.render();
      }
}
export { DisplayController, Calendar };

