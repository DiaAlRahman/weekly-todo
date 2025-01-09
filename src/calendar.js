class Calendar{
    constructor(){
        this.days = [];
        for (let i = 0; i < 7; i++){
            this.days.push(new Day(i));
        }
    }
}



// document.addEventListener("DOMContentLoaded", function() {
//     const calendarTable = document.getElementById("calendar-table");

//     // Create table header
//     const days = ["Time", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     let headerRow = "<tr>";
//     for (let day of days) {
//         headerRow += `<th>${day}</th>`;
//     }
//     headerRow += "</tr>";
//     calendarTable.innerHTML += headerRow;

//     // Create table rows for each hour
//     for (let hour = 0; hour < 24; hour++) {
//         let row = `<tr><td>${hour}:00-${(hour+1)%24}:00</td>`; // First column for time
//         for (let day = 0; day < 7; day++) {
//             row += `<td></td>`; // Empty cells for each day
//         }
//         row += "</tr>";
//         calendarTable.innerHTML += row;
//     }
// });

