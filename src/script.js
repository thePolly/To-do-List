let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
let list =document.getElementById("task-list");
console.log(todoItems);

for(x in todoItems){
    renderTodo([todoItems[x].name, todoItems[x].id, todoItems[x].checked]);
}
printDoneToDos();


function addTodo(text) {
    let id = String(Date.now())
    todoItems.push({
        name: text,
        checked: false,
        id: id
    });
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    console.log(todoItems)
    renderTodo([text, id, false]);
}
function printDoneToDos(){
    let element = document.getElementById("number-of-done-todos");
    let numberOfAll = todoItems.length;
    console.log(todoItems.filter((item)=> item.checked===true))
    let numberOfDone = todoItems.filter((item)=> item.checked===true).length;
    element.innerText=numberOfDone +"/"+numberOfAll;
}

function renderTodo([todo, id, checked]) {
    // Select the first element with a class of task
    let task_list = document.getElementById("task-list");
    // Create an `li` element and assign it to `node`
    let node = document.createElement("li");
    node.setAttribute("id", id);
    node.setAttribute("class", ".flex-row .align-items-md-stretch");
    node.addEventListener("click", function (){
        if (span.style.textDecoration==="line-through"){
            makeToDoUndone();
            input.checked=false;
        }
        else {
            makeToDoDone();
            input.checked=true;
        }
    })

    let container =document.createElement("div");
    container.setAttribute("class", "container1");


    let span = document.createElement("span");
    span.setAttribute("class", "task");
    span.appendChild(document.createTextNode(todo));


    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "form-check-input");

    if (checked) {
        span.style.textDecoration="line-through";
        input.checked=true;
        node.style.background="#54c254";
    }

    function makeToDoDone(){
        node.style.background="#54c254";
        span.style.textDecoration="line-through";
        let  index = todoItems.findIndex((item) => item.id === id)
        todoItems[index]={
            name: todo,
            checked: true,
            id: id
        };
        localStorage.setItem('todoItems', JSON.stringify(todoItems))
        printDoneToDos();
    }
    function makeToDoUndone(){
        node.removeAttribute("style");
        span.style.textDecoration="none";
        let  index = todoItems.findIndex((item) => item.id === id)
        todoItems[index]={
            name: todo,
            checked: false,
            id: id
        };
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
        printDoneToDos();
    }


    input.addEventListener("change", function changeCheckbox(){
        if (this.checked) {
            makeToDoDone();
            }
         else {
            makeToDoUndone()
        }
    });
    container.appendChild(input);
    container.appendChild(span);

    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-light float-right");
    button.appendChild(document.createTextNode("Delete"));
    button.addEventListener("click", function (){
        todoItems = todoItems.filter(
            function (value, index, arr){
                if (value.id!=node.id){
                    return value;
                }
            });

        localStorage.setItem('todoItems', JSON.stringify(todoItems))
        node.parentNode.removeChild(node);
        printDoneToDos();
    })
    container.appendChild(button);
    node.appendChild(container);
    task_list.appendChild(node);
}



let add_task_button = document.getElementById("add-task-button");
add_task_button.onclick = function () {
    addNewToDo();
};

function addNewToDo(){
    let input_task = document.getElementById("input-task");
    const text = input_task.value.trim();
    if (text !== '') {
        addTodo(text);
        input_task.value="";
    }
    printDoneToDos();
}


document.addEventListener("keypress", function (event) {
    if(event.code==="Enter"){
        addNewToDo();
    }
})
