class Day{
    constructor(date){
        this.date = date;
        this.usedHours =  Array(24).fill(false);
        this.hours = {};
    }

    addEvent(event){
        for(let i = 0; i < event.duration; i++){
            if(this.usedHours[event.time + i]){
                console.log(`Time slot at ${event.time+i} is already taken`);
                return;
            }
        }
        for(let i = 0; i < event.duration; i++){
            this.usedHours[event.time + i] = true;
            this.hours[event.time+i] = event.name;
    }
    console.log(`Event ${event.name} scheduled at ${event.time}:00 to ${event.time + event.duration}:00 added`);
}
    getEvents(hour){
        return this.hours[hour]||[];
    }
    printEvents(){
        for(let i = 0; i < 24; i++){
            if (this.getEvents(i).length === 0){
                // console.log("  No events scheduled");
                continue;
            }
            console.log(`${i}:00`);
            console.log(`  ${this.getEvents(i)}`);
        }
    }
}
const day = new Day(0);
day.addEvent({time: 0, duration: 2, name: "workout"});
day.addEvent({time: 1, duration: 1, name: "meeting"});
day.addEvent({time: 3, duration: 2, name: "study"});
day.addEvent({time: 5, duration: 4, name: "coding"});
day.addEvent({time: 6, duration: 1, name: "break"});
day.printEvents();