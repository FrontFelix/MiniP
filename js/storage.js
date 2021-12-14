var todo = [];

export async function newTodo(activity, id, title, desc) {
    let obj = {}
    obj["activity"] = activity
    obj["ID"] = id
    obj["title"] = title
    obj["desctiption"] = desc
    todo.push(obj)
    localStorage.setItem('TodoList', JSON.stringify(todo))
}

export async function removeTodo(idInput) {
    for(var i = 0; i < todo.length; i++) {
        console.log(todo[i].title)
        if(idInput === todo[i].ID ) {
            let correctID = todo[i].ID
            todo = todo.filter(item => item.ID != correctID)
            localStorage.setItem('TodoList', JSON.stringify(todo))
            console.log(item.title)
        }else {
        }
    }
}

export async function editTodo(idInput, activity, title, desc) {
    for(var i = 0; i < todo.length; i++) {
        if(idInput === todo[i].ID ) {
            todo[i].title = title
            todo[i].desctiption = desc
            todo[i].activity = activity
            localStorage.setItem('TodoList', JSON.stringify(todo))
        }
    }
}


export async function loadTodo() {
    todo = JSON.parse(localStorage.getItem('TodoList'))
    for(var i = 0; i < todo.length; i++) {
        console.log(todo[i].title)
        if(idInput === todo[i].ID ) {
            
        }else {
        }
    }
}


//Ladda in todo, sen för varje ID på todo, leta efter det id på ett kalender datum. Lägg in todo aktiviteten.