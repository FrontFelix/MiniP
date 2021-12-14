var todo = [];
let todoItem;


export async function newTodo(activity, id, title, desc) {
    let iD = parseInt(id)
    let obj = {}
    let innerlist = []
    let innerobj = {}
    obj["ID"] = iD
    obj["list"] = innerlist

    innerobj["activity"] = activity
    innerobj["title"] = title
    innerobj["desc"] = desc

    
    if (!todo.length) {
        innerlist.push(innerobj)
        todo.push(obj)
    } else {
        for (todoItem of todo) {
            innerlist = []
            if (iD === todoItem.ID) {
                todoItem.list.push(innerobj)
            } else if(iD !== todoItem.ID){
                innerlist.push(innerobj)
                todo.push(obj)
            }
        }
    }




    localStorage.setItem('TodoList', JSON.stringify(todo))
    let styledDiv
    styledDiv = document.getElementById(iD)
    if (!styledDiv) return
    styledDiv.classList.add('test')

}

export async function removeTodo(idInput) {
    for (todoItem of todo) {
        if (idInput === todoItem.ID) {
            let correctID = todoItem.ID
            todo = todo.filter(item => item.ID != correctID)
            localStorage.setItem('TodoList', JSON.stringify(todo))
        }
    }
}

export async function editTodo(idInput, activity, title, desc) {
    for (todoItem of todo) {
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
    for (todoItem of todo) {
        if (document.getElementById(todoItem.ID)) {
            document.getElementById(todoItem.ID).style.backgroundColor = "blue"
        }
    }
}


//Ladda in todo, sen för varje ID på todo, leta efter det id på ett kalender datum. Lägg in todo aktiviteten.