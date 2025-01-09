class Day{
    constructor(date){
        this.date = date;
        this.usedHours = [false]*24;
        this.hours = {};
    }

    addEvent(event){
        if(!this.hours[event.time]){
            this.hours[event.time] = [];
        }
        for(let i = 0; i < event.duration; i++){
            if(this.usedHours[event.time + i]){
                throw new Error("Time slot is already taken");
            }
            return;
        }
        this.events.push(event);
    }

    getEvents(hour){
        return this.hours[hour]||[];
    }
}