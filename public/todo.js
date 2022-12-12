window.addEventListener("DOMContentLoaded", main);

function main () {

    // Variablar
    const showAddTodo = document.getElementById("todo-list-add-button");
    const hideAddTodo = document.getElementById("todo-list-hide-button");
    const todoList = document.getElementById("new-todo");
    const addNewItemOtherDays = document.getElementById("tlod-activities");
    const addNewItemToday = document.getElementById("tlcd-activities");
    const addNewItemButton = document.getElementById("new-todo-add");
    const addNewItemButtonClear = document.getElementById("new-todo-clear");

    // Setup av inputfälten
    const userInputTodo = document.getElementById("new-todo-activity");
    const userInputDate = document.getElementById("new-todo-date");
    userInputTodo.value = "";
    userInputDate.value = "";
    const userInputErrorTodo = document.getElementById("new-todo-activity-error-message");
    const userInputErrorDate = document.getElementById("new-todo-date-error-message");
    hideAddTodo.style.display = "none";

    // Gömmer och visar tilläggningsfunktionen

    showAddTodo.addEventListener("click", () => {
        todoList.style.display = "block";
        showAddTodo.style.display = "none"
        hideAddTodo.style.display = "block";
    })

    hideAddTodo.addEventListener("click", () => {
        todoList.style.display = "none";
        showAddTodo.style.display = "block"
        hideAddTodo.style.display = "none";
        userInputTodo.value = "";
        userInputDate.value = "";
        userInputErrorDate.style.display = "none";
        userInputErrorTodo.style.display = "none";
    });

    // Grundläggande funktion för att lägga till en todo
    addNewItemButton.addEventListener("click", () => {

        userInputErrorDate.style.display = "none";
        userInputErrorTodo.style.display = "none";

        // Lägg till todo om inputfälten inte är tomma
        if (userInputTodo.value != "" && userInputDate.value != "") {
            const newTodo = document.createElement("li");

            const date = new Date();
            const todaysDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
            const todoDate = new Date(document.getElementById('new-todo-date').value);

            //Väljer om todon ska hamna i "idag"-kolumnen eller "kommande"-kolumnen
            if(todaysDate.toLocaleDateString() == todoDate.toLocaleDateString()) {
                const newTodoContent = document.createTextNode(userInputTodo.value);
                newTodo.appendChild(newTodoContent);
                addNewItemToday.appendChild(newTodo);
            } else {
                const newTodoContent = document.createTextNode(userInputDate.value + " – " + userInputTodo.value);
                newTodo.appendChild(newTodoContent);
                addNewItemOtherDays.appendChild(newTodo);
            }

        
            userInputTodo.value = "";
            userInputDate.value = "";

        // Varna om inputfält är tomt
        } else {
            if (userInputTodo.value == "") {
                userInputErrorTodo.style.display = "block";
            } 
            if (userInputDate.value == ""){
                userInputErrorDate.style.display = "block";
            }
        }
    });

    // Funktion för användaren att rensa inmatning
    addNewItemButtonClear.addEventListener("click", () => {
        userInputTodo.value = "";
        userInputDate.value = "";
        userInputErrorDate.style.display = "none";
        userInputErrorTodo.style.display = "none";
    });
}