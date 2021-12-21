/** Import functions from date.js and storage.js */

import { renderCalender, switchDate, renderHolidays, date} from "./date.js";

import {newTodo, renderTodoList, filterTodo} from "./storage.js"

renderCalender();
switchDate();
renderHolidays(date.getFullYear())


/** Get id from buttons */
const newSubmit = document.getElementById('newSubmit')
let editForm = document.getElementById('editForm')

newSubmit.addEventListener('submit',async e => {
    e.preventDefault()
    let datum = document.getElementById("newDatum")
    datum = datum.value.replace('-', '');
    datum = datum.replace('-', '')
    let title = document.getElementById('newTitel').value
    let desc = document.getElementById('newDesc').value

    newTodo(datum,title,desc)
    newSubmit.reset()
    document.getElementById('todo1').classList.remove('block1')
})


let daysDiv = document.getElementById('calender-days').childNodes


for(let i = 0; i < daysDiv.length; i++) {
    daysDiv[i].addEventListener('click', () => { // u see we get the correct fucking shit id
        filterTodo(daysDiv[i].id)        
    })
    
}

/*editForm.addEventListener('submit', async e => {
    e.preventDefault()
    let parentDiv = editForm.parentNode
    console.log(parentDiv.parentNode.id)
})*/




let todoList = JSON.parse(localStorage.getItem('TodoList'))
if(todoList) {
    await renderTodoList()
}


/** Onclick event render todolist */
let showAll = document.getElementById('showAllTodos')
showAll.addEventListener('click', async () => {
    renderTodoList();    
}
)


