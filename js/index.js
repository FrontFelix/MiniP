import { renderCalender, switchDate, renderHolidays, date} from "./date.js";

import {newTodo, loadTodo, removeTodo, editTodo} from "./storage.js"

renderCalender();
switchDate();
renderHolidays(date.getFullYear())


const date1 = document.getElementById('dateTest')
const formTesr = document.getElementById('testForm')


formTesr.addEventListener('submit', async function(e) {
    e.preventDefault()
    let value = date1.value.replace('-', '');
    let value1 = value.replace('-', '')
    newTodo("test", value1, "test", "test")
    console.log(value1)
})



let todoList = JSON.parse(localStorage.getItem('TodoList'))
if(todoList) {
    await loadTodo()
}
