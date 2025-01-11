import { DisplayController as DailyTasksDisplayController } from "./daily_tasks";
import { DisplayController as WeeklyCountsDisplayController } from "./count_table";
import { DisplayController as CalendarDisplayController } from "./calendar";

const displayDailyTasks = new DailyTasksDisplayController();
const displayWeeklyCounts = new WeeklyCountsDisplayController();
const displayCalendar = new CalendarDisplayController();

// all Tasks = [daily tasks + weekly tasks]
// init Calendar(all Tasks)



