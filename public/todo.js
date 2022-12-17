window.addEventListener("DOMContentLoaded", main);

function main () {
    // Variabeldeklarationer
    const todoListToday = document.getElementById("todo-list-today-activities");
    const buttonAddNewItem = document.getElementById("new-item-add");
    const buttonClearNewItem = document.getElementById("new-item-clear");
    const todoListEmptyTextToday = document.getElementById("todo-list-empty-text-today");
    const userInputActivity = document.getElementById("new-item-activity");
    const userInputDate = document.getElementById("new-item-date");
    let todoListLocalStorage = [];

    // Setup
    blockPastDates();
    loadTodoList();
    buttonAddNewItem.addEventListener("click", controlInputFields);
    buttonClearNewItem.addEventListener("click", clearInputFields);

    // Funktion för användaren att rensa inmatning
    function clearInputFields() {
        userInputActivity.value = "";
        userInputDate.value = "";
    }    

    // Kontrollerar att inputfälten är tomma
    function controlInputFields() {
        const newItemActivity = userInputActivity.value;
        const newItemDate = userInputDate.value;

        if (newItemActivity != "" && newItemDate != "") {
            addToLocalStorage (newItemActivity, newItemDate);
            addTodo(newItemActivity, newItemDate);
        }
    }

    // Funktion för att lägga till en todo
    function addTodo(activity, date) {

        // Skapar ny aktivitet
        const newItem = document.createElement("li");
        newItem.classList.add("item");
        newItem.id = (todoListToday.childElementCount + 1);

        // Skapar datumbadge
        const badgeItem = document.createElement("span");
        badgeItem.classList.add("item-badge");
        const badgeItemContent = document.createTextNode(date);

        // Skapar en div för styling
        const newItemContentDiv = document.createElement("span");
        newItemContentDiv.classList.add("item-text");
        const newItemContent = document.createTextNode(activity);

        // Skapar en borttagningsknapp
        const buttonDeleteItem = document.createElement("button");
        buttonDeleteItem.classList.add("item-buttons", "material-symbols-outlined");
        buttonDeleteItem.setAttribute("data-cy", "delete-todo-button");
        buttonDeleteItem.innerHTML = "delete";
        buttonDeleteItem.addEventListener('click', deleteItem);
        
        // Skapar en avklarningsknapp
        const buttonCompleteItem = document.createElement("button");
        buttonCompleteItem.classList.add("item-buttons", "material-symbols-outlined");
        buttonCompleteItem.innerHTML = "done";
        buttonCompleteItem.addEventListener('click', () => {
            completeItem(buttonCompleteItem);
        });

        // Skapar en ångraknapp (för avklarad aktivitet)
        const buttonUndoItem = document.createElement("button");
        buttonUndoItem.classList.add("item-buttons", "material-symbols-outlined");
        buttonUndoItem.innerHTML = "undo";
        buttonUndoItem.style.display = "none";
        buttonUndoItem.addEventListener('click', () => {
            completeItem(buttonUndoItem);
        });

        // Lägger till aktivitet i kalendern
        const addItemToCalendar = document.getElementById(date);
        
        if (addItemToCalendar.lastChild.innerHTML == "") {
            addItemToCalendar.lastChild.innerHTML = 1;
        } else {
            addItemToCalendar.lastChild.innerHTML++;
        }

        // Samlar ihop allt och pushar till DOM
        badgeItem.appendChild(badgeItemContent);
        newItem.appendChild(badgeItem);
        newItemContentDiv.appendChild(newItemContent);
        newItem.appendChild(newItemContentDiv);
        newItem.appendChild(buttonUndoItem);
        newItem.appendChild(buttonCompleteItem);
        newItem.appendChild(buttonDeleteItem);
        todoListToday.appendChild(newItem);
        
        // Rensar inputfälten efter tilläggning
        todoListEmptyTextToday.style.display = "none";
        userInputActivity.value = "";
        userInputDate.value = "";
    }

    // Lögger till aktivitet i local storage
    function addToLocalStorage (activityTitle, activityDate) {        
        const todo = {
            id: todoListLocalStorage.length+1,
            title: activityTitle,
            date: activityDate,
            completed: false
        };

        todoListLocalStorage.push(todo);
        localStorage.setItem("lista", JSON.stringify(todoListLocalStorage));
    }

    // Tar bort en aktivitet
    function deleteItem() {
        const itemDate = this.parentNode.firstChild.innerText;
        const daySquare = document.getElementById(itemDate);

        if (daySquare.lastChild.innerHTML == "1") {
            daySquare.lastChild.innerHTML = "";
        } else {
            daySquare.lastChild.innerHTML--;
        }

        const item = this.parentNode;
        item.parentNode.removeChild(item);
        updateId(this.parentNode.id);

        if (todoListToday.innerText == "") {
            todoListEmptyTextToday.style.display = "block";
        }
    }

    // Uppdatera ID i både localStorage-objekt och i DOM-objekt
    function updateId (activityId) {
        todoListLocalStorage.splice(activityId-1, 1);
        localStorage.setItem("lista", JSON.stringify(todoListLocalStorage));

        i = 1;
        for (const node of todoListToday.childNodes) {
            node.removeAttribute("id");
            node.id = i;
            todoListLocalStorage[i-1].id = i;
            i++;
        }
        
        localStorage.setItem("lista", JSON.stringify(todoListLocalStorage));
    }

    // Markerar en aktivitet som avklarad eller oavklarad
    function completeItem(knapp) {
        let item = knapp.parentNode.firstChild.nextSibling;
        if (item.style.textDecoration == "line-through") {
            item.style.textDecoration = "none";
            knapp.style.display = "none";
            knapp.nextSibling.style.display = "block";

            todoListLocalStorage[knapp.parentNode.id-1].completed = false;
            localStorage.setItem("lista", JSON.stringify(todoListLocalStorage));

        } else {
            item.style.textDecoration = "line-through";
            knapp.style.display = "none";
            knapp.previousSibling.style.display = "block";
            todoListLocalStorage[knapp.parentNode.id-1].completed = true;
            localStorage.setItem("lista", JSON.stringify(todoListLocalStorage));
        }
    }

    // Laddar in aktivitetslista i DOM från lokal lagring
    function loadTodoList() {
        userInputActivity.value = ""
        userInputDate.value = "";

        if (localStorage.getItem("lista")) {
            todoListLocalStorage = JSON.parse(localStorage.getItem("lista"));
            for (var i = 0; i < todoListLocalStorage.length; i++) {
                addTodo(todoListLocalStorage[i].title, todoListLocalStorage[i].date);
                if (todoListLocalStorage[i].completed == true) {
                    completeItem(todoListToday.lastChild.lastChild.previousSibling);
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
        document.getElementById("new-item-date").setAttribute("min", today);
    }
}