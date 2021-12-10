const date = new Date();
date.setDate(1);
export async function renderCalender() {

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const prevLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();



  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex;


  const months = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "July",
    "Agusti",
    "September",
    "Okteber",
    "November",
    "December",
  ];

  document.getElementById("showMonths").innerHTML = months[date.getMonth()];

  document.getElementById("showDay").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${ prevLastDay - x}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
      days += `<div class = "today">${i}</div>`;
    } else {
      days += `<div id="${date.getFullYear()}${date.getMonth()}${i}">${i}</div>`;
    }
  }
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }


}


export async function switchDate() {
  document.getElementById("leftArrow").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalender();
  })
  document.getElementById("rightArrow").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalender();
  })
}