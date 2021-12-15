import { renderCalender, switchDate, renderHolidays, date} from "./date.js";

import {newTodo, loadTodo, removeTodo, editTodo} from "./storage.js"

renderCalender();
switchDate();
renderHolidays(date.getFullYear())


const newSubmit = document.getElementById('newSubmit')
newSubmit.addEventListener('submit',async e => {
    e.preventDefault()
    let datum = document.getElementById("newDatum")
    datum = datum.value.replace('-', '');
    datum = datum.replace('-', '')
    let title = document.getElementById('newTitel').value
    let desc = document.getElementById('newDesc').value

    newTodo(datum,title,desc)
    newSubmit.reset()
})


let todoList = JSON.parse(localStorage.getItem('TodoList'))
if(todoList) {
    await loadTodo()
}
