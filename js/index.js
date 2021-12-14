import { renderCalender, switchDate} from "./date.js";

import {newTodo, loadTodo, removeTodo, editTodo} from "./storage.js"



const date = document.getElementById('dateTest')
const formTesr = document.getElementById('testForm')


formTesr.addEventListener('submit', async function(e) {
    e.preventDefault()
    let value = date.value.replace('-', '');
    let value1 = value.replace('-', '')
})



loadTodo()
renderCalender();
switchDate()

