import {
    renderCalender
} from "./date.js";


var todo = [];

let todoLocal = localStorage.getItem('TodoList') ? JSON.parse(localStorage.getItem('TodoList')) : [];

export async function newTodo(id, title, desc) {
    let iD = parseInt(id)
    let obj = {}
    let innerlist = []
    let innerobj = {}

    //If localStorage empty / unset, return empty array. if not, return localStorage item. I am lost. Quick call? Sure 
    obj["ID"] = iD
    obj["list"] = innerlist

    innerobj["title"] = title
    innerobj["desc"] = desc

    if (todoLocal) {
        let entry = todoLocal.find(x => x.ID === iD);
        if (!entry) {
            innerlist.push(innerobj)
            todoLocal.push(obj)
        } else {
            console.log('If entry exist');
            entry.list.push(innerobj);
        }
    }

    localStorage.setItem('TodoList', JSON.stringify(todoLocal)) // @connor
    let styledDiv
    styledDiv = document.getElementById(iD)
    if (!styledDiv) return
    styledDiv.classList.add('test')


}

export async function removeTodo(idInput) {
    for (var todoItem of todoLocal) {
        let innerTodo;
        if (todoItem.ID === parseInt(idInput)) {
            console.log(todoItem.list.length)
            if (todoItem.list.length > 1) {
                var arr1 = [1, 2, 3, 4],
                    arr2 = [2, 4],
                    res = arr1.filter(item => !arr2.includes(item));
                console.log //
                console.log(res);
                // Loopa igenom den inre arrayen
                for (innerTodo of todoItem.list) {
                    console.log(innerTodo.title + " POSITION I ARRAY " + todoItem.list.indexOf(innerTodo.title))
                }
            } else if (todoItem.list.length === 1) {
                // Ta bort den enskilda
                console.log('Bara en')
            }
        }
    }
}

export async function editTodo(idInput, activity, title, desc) {
    for (var todoItem of todoLocal) {
        if (idInput === todoItem.ID) {
            todoItem.title = title
            todoItem.description = desc
            todoItem.activity = activity
            localStorage.setItem('TodoList', JSON.stringify(todo))
        }
    }
}


export async function loadTodo() {
    if (!todoLocal) return;
    for (var todoItem of todoLocal) {
        if (document.getElementById(todoItem.ID)) {
            document.getElementById(todoItem.ID).style.backgroundColor = "blue"
        }
    }
}

export async function renderTodoList() {
    if (!todoLocal) return
    for (var todoItem of todoLocal) {
        let todoListDiv = document.getElementById('todoList')
        let bigTodoDiv = document.createElement('div')
        bigTodoDiv.setAttribute('class', 'todo')
        bigTodoDiv.setAttribute('id', `todo-${todoItem.ID}`)
        let datumText = document.createElement('h2')
        datumText.innerHTML = todoItem.ID
        bigTodoDiv.append(datumText)
        for (var innerItem of todoItem.list) {
            console.log("Title " + innerItem.title + " place in array " + todoItem.list.findIndex(x => x.title === innerItem.title && x.desc === innerItem.desc))
            let arrayID = todoItem.list.findIndex(x => x.title === innerItem.title && x.desc === innerItem.desc)
            let todoDiv = document.createElement('div')
            todoDiv.setAttribute('id', `${todoItem.ID}:${arrayID}`)
            let titleText = document.createElement('p')
            titleText.innerHTML = innerItem.title
            todoDiv.append(titleText)
            bigTodoDiv.append(todoDiv)
        }
        todoListDiv.append(bigTodoDiv)
    }
}


//Ladda in todo, sen för varje ID på todo, leta efter det id på ett kalender datum. Lägg in todo aktiviteten.