class Task {
  constructor(name) {
    this.name = name;
    this.isDone = false;
  }

  markdone() {
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

}

const workout = new Task('workout')
console.log(workout.toString())
workout.markdone()
console.log(workout.toString())

const shower = new Task('shower')
console.log(shower.toString())