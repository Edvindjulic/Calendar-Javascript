window.addEventListener("DOMContentLoaded", main);

function main () {
    // Variabeldeklarationer
    const todoList = document.getElementById("todo-list-todos");
    const buttonAddNewTodo = document.getElementById("new-todo-add-button");
    const buttonClearNewTodo = document.getElementById("new-todo-clear-button");
    const todoListEmptyText = document.getElementById("todo-list-empty-text");
    const userInputTitle = document.getElementById("new-todo-title");
    const userInputDate = document.getElementById("new-todo-date");
    const addTodoContainer = document.getElementById("new-todo-container");
    const showAddTodoContainer = document.getElementById("todo-list-add-button");
    let todoListLocalStorage = [];

    // Setup
    blockPastDates();
    loadTodoList();
    buttonAddNewTodo.addEventListener("click", verifyInputFields);
    buttonClearNewTodo.addEventListener("click", clearInputFields);
    showAddTodoContainer.addEventListener("click", containerShowOrHide);

    // Visar eller gömmer container för tilläggning av ny aktivitet
    function containerShowOrHide() {
        
        if (showAddTodoContainer.innerHTML == "remove") {
            showAddTodoContainer.innerHTML = "add";
            addTodoContainer.style.display = "none";
        } else {
            showAddTodoContainer.innerHTML = "remove";
            addTodoContainer.style.display = "block";
        }
    }

    // Rensar inmatning
    function clearInputFields() {
        userInputTitle.value = "";
        userInputDate.value = "";
    }    

    // Kontrollerar att inputfälten är tomma
    function verifyInputFields() {
        const newTodoTitle = userInputTitle.value;
        const newTodoDate = userInputDate.value;

        if (newTodoTitle != "" && newTodoDate != "") {
            addToLocalStorage (newTodoTitle, newTodoDate);
            addTodo(newTodoTitle, newTodoDate);
        }
    }

    // Skapar och lägger till en aktivitet i aktivitetslistan
    function addTodo(title, date) {

        // Skapar ett nytt aktivitetsobjekt
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo");
        newTodo.id = (todoList.childElementCount + 1);

        // Skapar en datumbricka
        const badgeTodo = document.createElement("span");
        badgeTodo.classList.add("todo-badge");
        const badgeTodoContent = document.createTextNode(date);

        // Skapar en div för styling
        const newTodoContentDiv = document.createElement("span");
        newTodoContentDiv.classList.add("todo-text");
        const newTodoContent = document.createTextNode(title);

        // Skapar en borttagningsknapp
        const buttonDeleteTodo = document.createElement("button");
        buttonDeleteTodo.classList.add("todo-buttons", "material-symbols-outlined");
        buttonDeleteTodo.setAttribute("data-cy", "delete-todo-button");
        buttonDeleteTodo.innerHTML = "delete";
        buttonDeleteTodo.addEventListener('click', deleteTodo);
        
        // Skapar en avklarningsknapp
        const buttonCompleteTodo = document.createElement("button");
        buttonCompleteTodo.classList.add("todo-buttons", "material-symbols-outlined");
        buttonCompleteTodo.innerHTML = "done";
        buttonCompleteTodo.addEventListener('click', () => {
            completeTodo(buttonCompleteTodo);
        });

        // Skapar en ångraknapp (för avklarad aktivitet)
        const buttonUndoTodo = document.createElement("button");
        buttonUndoTodo.classList.add("todo-buttons", "material-symbols-outlined");
        buttonUndoTodo.innerHTML = "undo";
        buttonUndoTodo.style.display = "none";
        buttonUndoTodo.addEventListener('click', () => {
            completeTodo(buttonUndoTodo);
        });

        // Uppdaterar kalendern
        loadCalendar();
        
        // Samlar ihop all delar och pushar till DOM
        badgeTodo.appendChild(badgeTodoContent);
        newTodo.appendChild(badgeTodo);
        newTodoContentDiv.appendChild(newTodoContent);
        newTodo.appendChild(newTodoContentDiv);
        newTodo.appendChild(buttonUndoTodo);
        newTodo.appendChild(buttonCompleteTodo);
        newTodo.appendChild(buttonDeleteTodo);

        todoList.appendChild(newTodo);

        // Rensar inputfälten efter tilläggning
        todoListEmptyText.style.display = "none";
        userInputTitle.value = "";
        userInputDate.value = "";
        showAddTodoContainer.innerHTML = "add";
        addTodoContainer.style.display = "none";
    }

    // Lögger till aktivitet i lokal lagring
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

    // Tar bort en aktivitet
    function deleteTodo() {
        const todo = this.parentNode;
        todoList.removeChild(todo);
        deleteTodoInLocalStorage(todo.id);
        updateId();
        loadCalendar();

        if (todoList.innerText == "") {
            todoListEmptyText.style.display = "block";
        }
    }

    // Tar bort objekt i lokal lagring
    function deleteTodoInLocalStorage(todoId) {
        todoListLocalStorage.splice(todoId-1, 1);
        localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));
    }

    // Uppdaterar ID i både localStorage-objekt och i DOM-objekt
    function updateId () {
        id = 1;

        for (const todo of todoList.childNodes) {
            todo.removeAttribute("id");
            todo.id = id;
            todoListLocalStorage[id-1].id = id;
            id++;
        }
        
        localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));
    }

    // Markerar en aktivitet som avklarad eller oavklarad
    function completeTodo(button) {
        let todo = button.parentNode.firstChild.nextSibling;
        let todoId = button.parentNode.id-1;

        if (todo.style.textDecoration == "line-through") {
            todo.style.textDecoration = "none";
            button.style.display = "none";
            button.nextSibling.style.display = "block";

            todoListLocalStorage[todoId].completed = false;
            localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));
        } else {
            todo.style.textDecoration = "line-through";
            button.style.display = "none";
            button.previousSibling.style.display = "block";
            todoListLocalStorage[todoId].completed = true;
            localStorage.setItem("todo-list", JSON.stringify(todoListLocalStorage));
        }
    }

    // Laddar in aktivitetslista i DOM från lokal lagring
    function loadTodoList() {
        userInputTitle.value = "";
        userInputDate.value = "";

        if (localStorage.getItem("todo-list")) {
            todoListLocalStorage = JSON.parse(localStorage.getItem("todo-list"));

            for (var todoId = 0; todoId < todoListLocalStorage.length; todoId++) {
                addTodo(todoListLocalStorage[todoId].title, todoListLocalStorage[todoId].date);

                if (todoListLocalStorage[todoId].completed == true) {
                    completeTodo(todoList.lastChild.lastChild.previousSibling);
                }
            }
        }
    }

    // Begränsar användaren från att välja datum bakåt i tiden
    function blockPastDates() {
        let today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        if (dd < 10) {
           dd = '0' + dd;
        }

        if (mm < 10) {
           mm = '0' + mm;
        } 

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("new-todo-date").setAttribute("min", today);
    }
}