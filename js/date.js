/** Import function from storage.js */
import { renderTodoList} from "./storage.js";

/** Get date, day, month, year and previous and last days */
export const date = new Date();
date.setDate(1);
export async function renderCalender() {
  const monthDays = document.getElementById("calender-days");
 


  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = date.getDay();
  const lastDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDays;
 
  /** Array for months */
    const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "July",
      "Agusti", "September", "Okteber", "November", "December",
    ];

   /** Render months and days */
    document.getElementById("render-months").innerHTML = months[date.getMonth()];
  
    document.getElementById("render-day").innerHTML = new Date().toDateString();
  

    let days = "";
  
    for (let x = firstDay; x > 0; x--) {
      days += `<div class="prev-date">${ prevLastDay - x}</div>`;
    }
  
    for (let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() && date.getMonth() + 1 === new Date().getMonth() + 1 && date.getFullYear() === new Date().getFullYear()) {
        let dateMonth = date.getMonth() + 1;
        dateMonth = ("0" + dateMonth).slice(-2)
        let id = ("0" + i).slice(-2)
        days += `<div id="${date.getFullYear()}${dateMonth}${id}" class = "today day-active"><p class="calender-number">${i}</p></div>`; // hör days
      } else {
        let dateMonth = date.getMonth() + 1;
        dateMonth = ("0" + dateMonth).slice(-2)
        let id = ("0" + i).slice(-2)
        days += `<div class="day-active" id="${date.getFullYear()}${dateMonth}${id}"><p class="calender-number">${i}</p></div>`;

        let daysDiv = document.createElement('div')
        daysDiv.setAttribute('class', 'days-active')
        daysDiv.setAttribute('id', `${date.getFullYear()}${dateMonth}${id}`)
        let daysP = document.createElement('p')
        daysP.setAttribute('class', 'calender-number')
        daysP.innerHTML = i;
        daysDiv.append(daysP)

      }
    }
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
      monthDays.innerHTML = days; // Calender-days.append(days)
    }
    //await renderTodoList()
  }
  
  /** Switch between months with arrows */
  export async function switchDate() {
    document.getElementById("leftArrow").addEventListener("click", async () => {
      date.setMonth(date.getMonth() - 1);
      if(date.getMonth() == 11) {
        date.setFullYear(date.getFullYear())
      }
      renderCalender()
      await renderHolidays(date.getFullYear())
      renderTodoList()
    })
    document.getElementById("rightArrow").addEventListener("click", async () => {
      date.setMonth(date.getMonth() + 1);
      if(date.getMonth() == 0) {
        date.setFullYear(date.getFullYear())
      }
      renderCalender()
      renderTodoList()
      await renderHolidays(date.getFullYear())
    })
  }
  
/** Render swedish holidays in calender */
  export async function renderHolidays(year) {
    const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${year}`);
    const data = await response.json();
    const holidays = data.dagar.filter((day) => day.helgdag);

    for (const day of holidays) {
      let datum = day.datum
      datum = datum.replace('-', '');
      datum = datum.replace('-', '')
      let selectedDiv = document.getElementById(datum)
      let p = document.createElement('p');
      if(selectedDiv) {
        p.innerHTML = day.helgdag;
        p.setAttribute('id', 'holiday');
        selectedDiv.append(p)
      }
    }
  }










