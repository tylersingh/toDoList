//defining variable to access Web API
const storageKey = "to do list";

// var localStorage: Storage; tried to define localStorage as Chrome would not recognize Web API

const convertStringToObj = (str) => JSON.parse(str) || [];

const convertObjToString = (obj) => JSON.stringify(obj) || '';

//function to get To-Do tasks and have them return in an array
const getTasks = () => convertStringToObj(localStorage.getItem(storageKey));


//function to add a task to the To-Do list
const addTask = (todo) => localStorage.setItem(storageKey, convertObjToString([...getTasks(), todo]));

//function to delete tasks
const deleteTasks = (todo) => localStorage.setItem(storageKey, convertObjToString(getTasks().filter(_todo => _todo !== todo)));


//function to create list items
const buildTodoEl = (todo) => {
    const el = document.createElement("li");
    el.classList.add("list-group-item");
    el.innerText = todo;
    return el;
}

//function to inject list item into unordered list from the DOM
const appendLiToDom = (el) => document.getElementById("todo-list-container").appendChild(el); 

//function to instantly see whenever we add or delete list item
const clearTodoListDisplay = () => document.getElementById("todo-list-container").innerHTML = "";

//clearing text field
const clearInput = () => document.getElementById("new-todo-input").value = "";

//function to display to do tasks
const displayTasks = () => {
    clearInput();
    clearTodoListDisplay();
    //get the tasks in an array and append them as a list to the DOM
    getTasks().forEach(_todo => appendLiToDom(buildTodoEl(_todo)));
    initClickListeners();
}

//click event;  when user clicks on one of the to do tasks JS begins to run
const initClickListeners = () => {
    Array.from(document.getElementsByClassName("list-group-item")).forEach(_item => {
        _item.addEventListener("click", ($event) => {
            const todo = $event.target.innerText;
            //2 step confirmation so that user does not acidentally delete data
            if(window.confirm("Did you complete this task: " + todo)) {
                deleteTasks(todo);
                displayTasks();
            }
        });
    });
}

// whenever the DOM loads it displays the To Do tasks
document.addEventListener("DOMContentLoaded", () => displayTasks());

// when click event occurs, new task is submitted
document.getElementById("submit-new-todo-btn").addEventListener("click", ($event) => {
    const newTodoInput = document.getElementById("new-todo-input");
    if(newTodoInput.value) {
        addTask(newTodoInput.value.trim());
        displayTasks();
    }
});

// listens for clicks on local storage and resets
document.getElementById("reset-storage-btn").addEventListener("click", ($event) => {
    localStorage.removeItem(storageKey);
    displayTasks();
});