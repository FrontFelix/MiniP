import { LoadMonth } from "./date.js";

// Får ut vilken dag det är idag


async function UpdateDate() {
    /*var dagarArray = await LoadMonth(2021, 12)
    console.log(dagarArray)*/
    var date = new Date(2021, 12, 1);
    var days = [];
    while (date.getMonth() === 12) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    console.log(days)
}

UpdateDate()