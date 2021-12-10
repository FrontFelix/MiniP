var todo = [];

export async function loadTodo() {
    localStorage.setItem('TodoList', todo)

    

}
export async function newTodo(activity, year, month, day, id) {
    let obj = {}
    obj["year"] = year
    obj["month"] = month
    obj["day"] = day
    obj["activity"] = activity
    obj["ID"] = id
    todo.push(obj)
    localStorage.setItem('TodoList', JSON.stringify(todo))
}

export async function removeTodo(idInput) {
    for(var i = 0; i < todo.length; i++) {
        if(idInput === todo[i].ID ) {
            let correctID = todo[i].ID
            todo = todo.filter(item => item.ID != correctID)
            localStorage.setItem('TodoList', JSON.stringify(todo))
            console.log(todo)
        }
    }
}