

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

    localStorage.setItem('TodoList', JSON.stringify(todoLocal))
    let styledDiv
    styledDiv = document.getElementById(iD)
    if (!styledDiv) return
    await loadTodo()
    await renderTodoList()

}




export async function loadTodo() {
    if (!todoLocal) return;
    for (var todoItem of todoLocal) {
        if (document.getElementById(todoItem.ID)) {
            document.getElementById(todoItem.ID).style.backgroundColor = "blue"
        }
    }
    renderTodoList()
}

export async function renderTodoList() {
    for (var todoItem of todoLocal) {
        let todoListDiv = document.getElementById('todoList')
        let bigTodoDiv = document.createElement('div')
        bigTodoDiv.setAttribute('class', 'todo')
        bigTodoDiv.setAttribute('id', `todo-${todoItem.ID}`)
        let datumText = document.createElement('h2')
        datumText.innerHTML = todoItem.ID
        bigTodoDiv.append(datumText)


        for (var innerItem of todoItem.list) {
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
            dateInput.setAttribute("type", "date");
            titleInput.setAttribute('placeholder', "Din Titel Här")
            descInput.setAttribute('placeholder', "Din Desc Här")
            editSubmit.innerText = "test"
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
        if(!checkDiv) {
            todoListDiv.append(bigTodoDiv)
        }
    }
}




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


export async function filterTodo(id) {
    let todoID = parseInt(id)
    // TodoListan Checkas IF STATEMENT
    for(var todoItem of todoLocal) {
        if(todoID === todoItem.ID) {
            let todoList = document.getElementById('todoList')
            let todoListChildren = document.getElementById('todoList').childNodes
            for(let i = 0; i < todoListChildren.length; i++) {
                todoList.remove(todoListChildren[i])
            }
            for(var innerItem of todoItem.list) {
                console.log(innerItem)
            }
        }
    }

        // Få fram arrayen med Todos från listan

        // Gömma alla andra Todos

        // Visa dem som finns i lista

}

