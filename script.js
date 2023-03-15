// selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')


// event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)

// functions
function addTodo(event){
    
    if(todoInput.value !== "") {
        event.preventDefault()

        // todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("todo")

        // create li
        const newTodo = document.createElement('li')
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        // add todo to local storage
        saveLocalTodos(todoInput.value)    

        // completed button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-button")
        todoDiv.appendChild(completedButton)

        // delete button
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add("delete-button")
        todoDiv.appendChild(deleteButton)

        // append to list
        todoList.appendChild(todoDiv)

        // clear todo input
        todoInput.value = ""
    }
}

function deleteCheck(event) {
    const item = event.target

    // delete todo
    if(item.classList[0] === "delete-button") {
        const todo = item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function() {
            todo.remove()
        })
    }

    if(item.classList[0] === "complete-button") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}


function saveLocalTodos(todo) {
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
            // todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")

    // create li
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    // completed button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-button")
    todoDiv.appendChild(completedButton)

    // delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add("delete-button")
    todoDiv.appendChild(deleteButton)

    // append to list
    todoList.appendChild(todoDiv)
    
    })
}

function removeLocalTodos(todo){
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}
