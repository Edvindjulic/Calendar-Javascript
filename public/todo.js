/**
 * GLOBAL VARIABLES AND EVENT LISTENERS
 */

// Variable declarations
const todoList = document.getElementById("todo-list-todos");
const buttonAddNewTodo = document.getElementById("new-todo-add-button");
const buttonClearNewTodo = document.getElementById("new-todo-clear-button");
const todoListEmptyText = document.getElementById("todo-list-empty-text");
const userInputTitle = document.getElementById("new-todo-title");
const userInputDate = document.getElementById("new-todo-date");
const addTodoContainer = document.getElementById("new-todo-container");
const showAddTodoContainer = document.getElementById("todo-list-add-button");
let todoListLocalStorage = [];
let calendarSelectedDay = [];
window.localStorage.removeItem("selected-calendar-day");

// Initalizing event listeners
buttonAddNewTodo.addEventListener("click", verifyInputFields);
buttonClearNewTodo.addEventListener("click", clearInputFields);
showAddTodoContainer.addEventListener("click", containerShowOrHide);

/**
 * FUNCTIONS
 */

// Shows or hides the container when adding a new todo
function containerShowOrHide() {
    if (showAddTodoContainer.innerHTML == "remove") {
        showAddTodoContainer.innerHTML = "add";
        addTodoContainer.style.display = "none";
    } else {
        showAddTodoContainer.innerHTML = "remove";
        addTodoContainer.style.display = "block";
    }
}

// Clears the input
function clearInputFields() {
    userInputTitle.value = "";
    userInputDate.value = "";
}    

// Checks if the input fields are empty
function verifyInputFields() {
    const newTodoTitle = userInputTitle.value;
    const newTodoDate = userInputDate.value;
    if (newTodoTitle != "" && newTodoDate != "") {
        addToLocalStorage (newTodoTitle, newTodoDate);
        addTodo(newTodoTitle, newTodoDate, todoListLocalStorage.length+1);
        loadTodoList();
    }
}

// Creates and adds a new todo in the todo-list
function addTodo(title, date, filterId) {

    // Creates a new todo-object
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo");

    if (localStorage.getItem("selected-calendar-day") == null) {
        newTodo.id = (todoList.childElementCount + 1);
    } else {
        newTodo.id = filterId;
    }

    // Creates a badge for the date
    const badgeTodo = document.createElement("span");
    badgeTodo.classList.add("todo-badge");
    const badgeTodoContent = document.createTextNode(date);

    // Creates a hidden badge for the date
    const badgeTodoHidden = document.createElement("span");
    badgeTodoHidden.classList.add("todo-badge-hidden");
    const splitBadgeText = date.split("-");
    const badgeTodoHiddenContent = document.createTextNode(splitBadgeText[0] + " " + splitBadgeText[1] + "-" + splitBadgeText[2]);

    // Creates a div for styling
    const newTodoContentDiv = document.createElement("span");
    newTodoContentDiv.classList.add("todo-text");
    const newTodoContent = document.createTextNode(title);

    // Creates a delete button
    const buttonDeleteTodo = document.createElement("button");
    buttonDeleteTodo.classList.add("todo-buttons", "material-symbols-outlined");
    buttonDeleteTodo.setAttribute("data-cy", "delete-todo-button");
    buttonDeleteTodo.innerHTML = "delete";
    buttonDeleteTodo.addEventListener('click', deleteTodo);
    
    // Creates a done button
    const buttonCompleteTodo = document.createElement("button");
    buttonCompleteTodo.classList.add("todo-buttons", "material-symbols-outlined");
    buttonCompleteTodo.innerHTML = "done";
    buttonCompleteTodo.addEventListener('click', () => {
        completeTodo(buttonCompleteTodo);
    });

    // Creates a container for all the buttons
    const buttonContainer = document.createElement("span");
    buttonContainer.classList.add("todo-buttons-container");


    // Updates the calendar
    loadCalendar();
    
    // Gathers all the parts and pushes them to the DOM
    badgeTodo.appendChild(badgeTodoContent);
    badgeTodoHidden.appendChild(badgeTodoHiddenContent);
    newTodo.appendChild(badgeTodo);
    newTodo.appendChild(badgeTodoHidden);
    newTodoContentDiv.appendChild(newTodoContent);
    newTodo.appendChild(newTodoContentDiv);
    buttonContainer.appendChild(buttonCompleteTodo);
    buttonContainer.appendChild(buttonDeleteTodo);
    newTodo.appendChild(buttonContainer);
    todoList.appendChild(newTodo);

    // Clears the input fields after adding
    todoListEmptyText.innerHTML = "";
    userInputTitle.value = "";
    userInputDate.value = "";
    showAddTodoContainer.innerHTML = "add";
    addTodoContainer.style.display = "none";
}

// Adds todo in local storage
function addToLocalStorage (todoTitle, todoDate) {        
    const todo = {
        id: todoListLocalStorage.length+1,
        title: todoTitle,
        date: todoDate,
        completed: false
    };

    todoListLocalStorage.push(todo);
    localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));
}

// Removes a todo
function deleteTodo() {
    const todo = this.parentNode.parentNode;
    todoList.removeChild(todo);
    deleteTodoInLocalStorage(todo.id);
    updateId();
    loadCalendar();
    loadTodoList();

    if (todoList.innerText == "") {
        todoList.innerText == "You have no planned todos";
    }
}

// Check if todo-list is empty
function checkIfTodoListIsEmpty() {
    if (todoList.innerHTML == "" && localStorage.getItem("selected-calendar-day") != null) {
    todoListEmptyText.innerHTML = "You have no planned todos on this date";
    } else if (todoList.innerHTML == "") {
        todoListEmptyText.innerHTML = "You have no planned todos";
    }
}

// Removes object in local storage
function deleteTodoInLocalStorage(todoId) {
    todoListLocalStorage.splice(todoId-1, 1);
    localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));
}

// Updates the ID in the local storage and DOM object
function updateId () {
    id = 1;

    if (localStorage.getItem("selected-calendar-day") == null) {
        for (const todo of todoList.childNodes) {
            todo.removeAttribute("id");
            todo.id = id;
            todoListLocalStorage[id-1].id = id;
            id++;
        }

    } else {
        for (let i = 0; i < todoListLocalStorage.length; i++) {
            todoListLocalStorage[id-1].id = id;
            id++;
        }
    }
    
    localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));
}

// Marks a todo as completed or not
function completeTodo(button) {
    let todo = button.parentNode.parentNode.firstChild.nextSibling.nextSibling;
    let todoId = button.parentNode.parentNode.id-1;

    if (todo.style.textDecoration == "line-through") {
        todo.style.textDecoration = "none";
        button.innerHTML = "done";
        todoListLocalStorage[todoId].completed = false;
        localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));

    } else {
        todo.style.textDecoration = "line-through";
        button.innerHTML = "undo";
        todoListLocalStorage[todoId].completed = true;
        localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));
    }

    loadCalendar();
}

// Creates empty local storage key if no local storage is found
function checkIfLocalStorageIsEmpty() {
    if (localStorage.getItem("todo-list") == null) {
        todoListLocalStorage = localStorage.setItem("todo-list", "[]");
    }
}

// Loads the todo-list in the DOM from local storage
function loadTodoList() {
    userInputTitle.value = "";
    userInputDate.value = "";
    clearTodoList();

    // Checks if the todo-list is empty before trying to load
    if (localStorage.getItem("todo-list")) {
        todoListLocalStorage = JSON.parse(localStorage.getItem("todo-list"));

        for (var todoId = 0; todoId < todoListLocalStorage.length; todoId++) {

            // Loads all todos if no calendar day is selected
            if (localStorage.getItem("selected-calendar-day") == null) {
                addTodo(todoListLocalStorage[todoId].title, todoListLocalStorage[todoId].date);

                if (todoListLocalStorage[todoId].completed == true) {
                    completeTodo(todoList.lastChild.lastChild.lastChild.previousSibling);
                }

            // Loads todos related to selected calendar day only
            } else if (localStorage.getItem("selected-calendar-day") !== null) {

                if (todoListLocalStorage[todoId].date == localStorage.getItem("selected-calendar-day")) {
                    addTodo(todoListLocalStorage[todoId].title, todoListLocalStorage[todoId].date, todoId+1);

                    if (todoListLocalStorage[todoId].completed == true) {
                        completeTodo(todoList.lastChild.lastChild.lastChild.previousSibling);
                    }
                }
            }
        }
    }
    checkIfTodoListIsEmpty();
}

function clearTodoList() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
}

// Blocks the user from chosing an earlier date
function blockPastDates() {
    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const datePicker = document.getElementById("new-todo-date");

    if (dd < 10) {
       dd = '0' + dd;
    }

    if (mm < 10) {
       mm = '0' + mm;
    } 

    today = yyyy + '-' + mm + '-' + dd;
    datePicker.setAttribute("min", today);
}