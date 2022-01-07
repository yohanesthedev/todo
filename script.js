//validation
function validateInput(e){

    e.preventDefault();
    var valid = true;
  
    //display warning if empty
    if(todo.item.value ===""){
      document.querySelector("#inputError").textContent = "cannot be empty";
      valid = false;
    }
    return valid;
}


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

//create todo list
function createTodo(){

    let input = getInput();
    if(input !== ''){
        let ul = document.querySelector(".todo-list");
        let li = document.createElement('li');
        let hr = document.createElement('hr');
        li.textContent = `${input}`;
        ul.appendChild(li);
        ul.appendChild(hr);
    }
    
}



//events
document.querySelector(".add").addEventListener('click', validateInput)
document.querySelector(".add").addEventListener('click', createTodo)