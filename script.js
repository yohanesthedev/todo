//validation
function validateInput(e){
    e.preventDefault();
    
    //display warning if empty
    if(todo.item.value ===""){
      document.querySelector("#inputError").textContent = "cannot be empty";
    }
}

//selector
const filter = document.querySelector('#status');
const todoList = document.querySelector('.todo-list');

//event listeners 
document.addEventListener("DOMContentLoaded", getTodos);
document.querySelector('.add').addEventListener('click', validateInput);
document.querySelector('.add').addEventListener('click', createTodo);


//remove error when input not in focus
document.querySelector('#item').addEventListener("blur", function(){
    if(this.value !== ""){
        document.querySelector('#inputError').textContent="";
    }
});

// captures text input 
function getInput(){
    let input = document.querySelector("#item").value;
    return input;
}


// delete list element
function deleteTodo(e){
    const item = e.target;
    const todo = item.parentElement;
    todo.remove();
    removeLocalTodo(todo);
}

//filter todo
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'block';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'block';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'block';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
    
}

filter.addEventListener('change', filterTodo);

//todo class variable 
let todoId = 0;


//add event listener to delete todo burttons
function btnDeleteAddListener(btn){
    btn.addEventListener('click', deleteTodo);
}

//add event listsenr for compeleted todo button
function btnCompleteAddListener(btn) {
     btn.addEventListener('click', completedStyle);
}

//add css for completed task
function completedStyle(e){
    const item = e.target;
    const todo = item.parentElement;
    todo.classList.add('completed');
}

function createTodo(){
    let input = getInput();
    if(input !== ''){
        let ul = document.querySelector('.todo-list');
       
        //create div for todo item
        let todoItem = document.createElement('div');
        let todoClass = `todo${++todoId}`;
        ul.appendChild(todoItem);
        todoItem.setAttribute('class', todoClass);
        
        //create and append list items
        let li = document.createElement('li');
        let hr = document.createElement('hr');
        li.textContent = `${input}`;
        todoItem.appendChild(li);
        saveLocalTodos(input);
        btn = document.createElement('button');
        todoItem.appendChild(btn);
        btn.setAttribute('class','remove');
        btn.textContent = "Delete";
        btn.classList.add(todoClass);
        btnDeleteAddListener(btn);

        btn = document.createElement('button');
        todoItem.appendChild(btn);
        btn.setAttribute('class','completed-btn');
        btn.textContent = "Completed";
        btn.classList.add(todoClass);
        todoItem.appendChild(hr);
        btnCompleteAddListener(btn);

        document.querySelector("#item").value = "";
    }
}


//save to local storage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        let ul = document.querySelector('.todo-list');
       
        //create div for todo item
        let todoItem = document.createElement('div');
        let todoClass = `todo${++todoId}`;
        ul.appendChild(todoItem);
        todoItem.setAttribute('class', todoClass);
        
        //create and append list items
        let li = document.createElement('li');
        let hr = document.createElement('hr');
        li.textContent = todo;
        todoItem.appendChild(li);
        btn = document.createElement('button');
        todoItem.appendChild(btn);
        btn.setAttribute('class','remove');
        btn.textContent = "Delete";
        btn.classList.add(todoClass);
        btnDeleteAddListener(btn);

        btn = document.createElement('button');
        todoItem.appendChild(btn);
        btn.setAttribute('class','completed-btn');
        btn.textContent = "Completed";
        btn.classList.add(todoClass);
        todoItem.appendChild(hr);
        btnCompleteAddListener(btn);
    });
}


//remove from local storage
function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
