var todo = [];

export async function newTodo(activity, id, title, desc) {
    let iD = parseInt(id)
    let obj = {}
    let innerlist = []
    let innerobj = {}

    let todoLocal = JSON.parse(localStorage.getItem('TodoList'))
    obj["ID"] = iD
    obj["list"] = innerlist

    innerobj["activity"] = activity
    innerobj["title"] = title
    innerobj["desc"] = desc

    if(!todo.length) {
        innerlist.push(innerobj)
        todo.push(obj)
    }else {
        for(var todoItem of todoLocal)  {
            if(iD === todoItem.ID) {
                console.log('Match Found')
                console.log("ID SOM SKAPAS " + iD)
                console.log("KOLLAR EFTER " + todoItem.ID)
                todoItem.list.push(innerobj)
                break;
            }else {
                console.log("ID SOM SKAPAS " + iD)
                console.log("KOLLAR EFTER " + todoItem.ID)
                innerlist.push(innerobj)
                todo.push(obj)
                console.log('Match not Found')
                break;
            }
        }
    }
    /*if (!todo.length) {
        innerlist.push(innerobj)
        todo.push(obj)
    } else {
        for (todoItem of todoLocal) {
            innerlist = []
            if (iD === todoItem.ID) {
                todoItem.list.push(innerobj)
            } else if(iD !== todoItem.ID){
                innerlist.push(innerobj)
                todo.push(obj)
            }
        }
    }*/

    localStorage.setItem('TodoList', JSON.stringify(todo))
    let styledDiv
    styledDiv = document.getElementById(iD)
    if (!styledDiv) return
    styledDiv.classList.add('test')

}

export async function removeTodo(idInput) {
    for (var todoItem of todo) {
        if (idInput === todoItem.ID) {
            let correctID = todoItem.ID
            todo = todo.filter(item => item.ID != correctID)
            localStorage.setItem('TodoList', JSON.stringify(todo))
        }
    }
}

export async function editTodo(idInput, activity, title, desc) {
    for (var todoItem of todo) {
        if (idInput === todoItem.ID) {
            todoItem.title = title
            todoItem.description = desc
            todoItem.activity = activity
            localStorage.setItem('TodoList', JSON.stringify(todo))
        }
    }
}


export async function loadTodo() {
    todo = JSON.parse(localStorage.getItem('TodoList'))
    if (!todo) return;
    for (var todoItem of todo) {
        if (document.getElementById(todoItem.ID)) {
            document.getElementById(todoItem.ID).style.backgroundColor = "blue"
        }
    }
}


//Ladda in todo, sen för varje ID på todo, leta efter det id på ett kalender datum. Lägg in todo aktiviteten.