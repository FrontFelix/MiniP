/**  */
var todo = [];

let todoLocal = localStorage.getItem('TodoList') ? JSON.parse(localStorage.getItem('TodoList')) : [];

/** Export newTodo function */
export async function newTodo(id, title, desc) {
    let iD = parseInt(id)
    let obj = {}
    let innerlist = []
    let innerobj = {}

    
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

    localStorage.setItem('TodoList', JSON.stringify(todoLocal))
    let styledDiv
    styledDiv = document.getElementById(iD)
    if (!styledDiv) return

    await renderTodoList()


}


/** Render Todo list */
export async function renderTodoList() {

    

    for (let todoItem of todoLocal) {

        if (document.getElementById(todoItem.ID)) { // FUCK UP
            document.getElementById(todoItem.ID).style.backgroundColor = "#09646e"
            if(document.getElementById(`list-${todoItem.ID}`)) return
            let arrayList = document.createElement('p')
            arrayList.setAttribute('id', `list-${todoItem.ID}`)
            arrayList.setAttribute('class', 'todoListNumber')
            arrayList.innerHTML = todoItem.list.length
            document.getElementById(todoItem.ID).append(arrayList)

            //console.log('Om id finns')
            //console.log('------------------------------')
        }
        //console.log(todoLocal)
        //console.log('LOOPAR IGENOM VARJE ITEM I LISTAN')
        //console.log(todoItem)
        let todoListDiv = document.getElementById('todoList')
        let bigTodoDiv = document.createElement('div')
        bigTodoDiv.setAttribute('class', 'todo')
        bigTodoDiv.setAttribute('id', `todo-${todoItem.ID}`)
        let datumText = document.createElement('h2')
        let arrayList = document.createElement('h2')
        arrayList.innerText = `Händelser ${todoItem.list.length}`
        datumText.innerHTML = todoItem.ID
        bigTodoDiv.append(datumText)
        bigTodoDiv.append(arrayList)



        for (let innerItem of todoItem.list) {
            //console.log('LOOPAR IGENOM VARJE LISTAN I OBJEKTET')
            let arrayID = todoItem.list.findIndex(x => x.title === innerItem.title && x.desc === innerItem.desc)
            
            let todoDiv = document.createElement('div')
            todoDiv.setAttribute('id', `${todoItem.ID}:${arrayID}`)
            todoDiv.setAttribute('class', 'todoItem')
            let hoverDiv = document.createElement('div')
            let hoverDesc = document.createElement('p')
            hoverDiv.setAttribute('class', 'hoverDiv')
            hoverDesc.innerHTML = innerItem.desc
            hoverDiv.append(hoverDesc)
            let editDiv = document.createElement('div')
            editDiv.setAttribute('class', "editForm")
            let editForm = document.createElement('form')
            editForm.setAttribute('id', "editForm")
            let dateInput = document.createElement('input')
            let titleInput = document.createElement('input')
            titleInput.setAttribute('required', true)
            let descInput = document.createElement('input')
            descInput.setAttribute('required', true)
            let editSubmit = document.createElement('button')
            editSubmit.setAttribute("class", "edit-button");
            dateInput.setAttribute("type", "date");
            titleInput.setAttribute('placeholder', "Titel")
            descInput.setAttribute('placeholder', "Beskrivning")
            editSubmit.innerText = "Ändra"
            editDiv.append(editForm)
            editForm.append(dateInput, titleInput, descInput, editSubmit)



            let titleText = document.createElement('p')
            let removeBtn = document.createElement('button')
            let editBtn = document.createElement('button')
            let removeIcon = document.createElement('i')
            let editIcon = document.createElement('i')

            editBtn.setAttribute('id', `${todoItem.ID}:${arrayID}`)
            editBtn.setAttribute('class', 'editButton')
            editIcon.setAttribute('class', 'far fa-edit')
            editBtn.append(editIcon)

            removeBtn.setAttribute('id', `${todoItem.ID}:${arrayID}`)
            removeIcon.setAttribute('class', 'far fa-trash-alt')
            removeBtn.append(removeIcon)
            
            titleText.innerHTML = innerItem.title
            todoDiv.append(titleText)
            todoDiv.append(removeBtn)
            todoDiv.append(editBtn)
            todoDiv.append(hoverDiv)
            todoDiv.append(editDiv)
            bigTodoDiv.append(todoDiv)


            //removeBtn.addEventListener("click", removeTodo);
            editBtn.addEventListener("click", () => {
                editDiv.classList.toggle('block1')
            });

            editForm.addEventListener('submit', async e => {
                e.preventDefault()
                let parentDiv = editForm.parentNode
                let id = parentDiv.parentNode.id
                let inputs = editForm.elements;
                let newDate = inputs[0]
                let newTitle = inputs[1]
                let newDesc = inputs[2]

                editTodo(id, newDate, newTitle.value, newDesc.value)
            })


            removeBtn.onclick = function(){removeTodo(removeBtn.id)};  
        }

            let checkDiv = document.getElementById(`todo-${todoItem.ID}`)
            if(checkDiv) continue
            //console.log('Sätt in Todos')
            todoListDiv.append(bigTodoDiv)
            //console.log('-------------------------')
    }
}



/** Delete todo from todo list */
async function removeTodo(id) {
    console.log(id)
    var fields = id.split(':');
    var date = parseInt(fields[0])
    var arrayID = parseInt(fields[1])
    let localPosition = todoLocal.findIndex(x => x.ID === date);


    if(todoLocal[localPosition].list.length > 1) {
        let todoInner
        todo = todoLocal
        // TA BORT OBJEKTET I LISTAN
        console.log('Mer än ett object')
        let innerItem = todoLocal[localPosition].list[arrayID]
        console.log(innerItem)
        todoInner = todoLocal[localPosition].list
        todoInner = todoInner.filter(item => item.title != innerItem.title)
        todo[localPosition].list = todoInner
        localStorage.setItem('TodoList', JSON.stringify(todo))



    }else {
        // Ta bort hela OBJEKTET FRÅN MAIN LISTAN
        console.log('Bara ett objekt')
        todo = todoLocal
        todo = todo.filter(item => item.ID != date)
        localStorage.setItem('TodoList', JSON.stringify(todo))
    }


}

/** Edit a todo in todo list */
export async function editTodo(id, newDate, title, desc) {

    if(!newDate.value) {
        var fields = id.split(':');
        todo = todoLocal
        var date = parseInt(fields[0])
        var arrayID = parseInt(fields[1])
        let localPosition = todo.findIndex(x => x.ID === date);
        let innerItem = todo[localPosition].list[arrayID]
        innerItem.title = title
        innerItem.desc = desc
        console.log(innerItem)
        localStorage.setItem('TodoList', JSON.stringify(todo))

    }else {
        newDate = newDate.value.replace('-', '');
        newDate = newDate.replace('-', '')
        newTodo(newDate, title, desc)
        removeTodo(id)
        
    }


}

/** Filter todos on a chosen day */
export async function filterTodo(id) {
    // TodoListan Checkas IF STATEMENT
    let todoListDiv = document.getElementById('todoList')

    let items = todoLocal.find(x => x.ID == id);
    if (items) {
        for(let todoItem of todoLocal)  {

            if(todoLocal.length + 1 === todoListDiv.childNodes.length) {
                if(todoItem.ID != items.ID) {
                    let todoListItems = todoListDiv.childNodes
                    for(let div of todoListItems) {
                        if(div.id !== `todo-${id}`) {
                            if(div.id) {
                                todoListDiv.removeChild(div)
                            }
                        }
                    }
                }
            }else {
                // Render the gay list which dosent work
            }
        }


    } else {
        //render list again here because items undefined
        //
    }
}

