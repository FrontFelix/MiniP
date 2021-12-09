export async function LoadMonth(year, month) {
    /*let api = await fetch("https://sholiday.faboul.se/dagar/v2.1/2021/12") // Avgränsning bara December Månad
    let data = await api.json()
    let daysArray = data.dagar
    return daysArray*/

    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days
}
