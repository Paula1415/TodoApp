//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// Event Listeneres
todoButton.addEventListener('click', addTodo);
todolist.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', getTodos)


//Functions

// Every time that click on the input form a new todo will be created
function addTodo(event){
    // prevent from submiting
    event.preventDefault();
    //toddiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo);
    // Add todo to the local storage
    saveLocalTodos(todoInput.value)
    //Cheked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"> <i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton)

    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"> <i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton)
    // append to list
    todolist.appendChild(todoDiv)
    //clear todo input
    todoInput.value = "";
}

function deleteCheck(event){
    //console log what im clicking
    //console.log(event.target)
    const item = event.target
    // delete the todo
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement
        // get the inner text of the li element to remove it from local storage
        const liItem = todo.childNodes[0]
        // animation
        todo.classList.add('fall')
        removeLocalTodos(liItem.innerText)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }

    // Checked mark
    if(item.classList[0] === "completed-btn"){
        const todo = item.parentElement
        todo.classList.toggle("completed");

    }
}

function filterTodo(event){
    // get the todos elements (li)
    const todos = todolist.childNodes
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }break;
            case "uncompleted":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none'
                }else{
                    todo.style.display = 'flex'
                }
        }
    })
}


function saveLocalTodos(todo){
    let todos;
    // check if we have someyhing on the local storage or not
    if(localStorage.getItem('todos') === null){
        todos=[]
    //if we have we convert that json object to an array to push the new todo later
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        //Cheked button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"> <i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton)
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"> <i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton)
        // append to list
        todolist.appendChild(todoDiv)
    })
}


function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    // use the splice method to first, get the index of the element that i want to delete, and then remove it.
    todos.splice(todos.indexOf(todo), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

