var todo = [];

let todoLocal = localStorage.getItem('TodoList') ? JSON.parse(localStorage.getItem('TodoList')) : [];   

export async function newTodo(activity, id, title, desc) {
    let iD = parseInt(id)
    let obj = {}
    let innerlist = []
    let innerobj = {}

    //If localStorage empty / unset, return empty array. if not, return localStorage item. I am lost. Quick call? Sure 
    obj["ID"] = iD
    obj["list"] = innerlist

    innerobj["activity"] = activity
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
    if (!todoLocal) return;
    for (var todoItem of todoLocal) {
        if (document.getElementById(todoItem.ID)) {
            document.getElementById(todoItem.ID).style.backgroundColor = "blue"
        }
    }
}


//Ladda in todo, sen för varje ID på todo, leta efter det id på ett kalender datum. Lägg in todo aktiviteten.