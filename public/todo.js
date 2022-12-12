window.addEventListener("DOMContentLoaded", main);

function main () {

    // Setup av inputfälten
    const userInputTodo = document.getElementById("new-todo-activity");
    const userInputDate = document.getElementById("new-todo-date");
    userInputTodo.value = "";
    userInputDate.value = "";
    const userInputErrorTodo = document.getElementById("new-todo-activity-error-message");
    const userInputErrorDate = document.getElementById("new-todo-date-error-message");

    // Variablar
    const addNewItemOtherDays = document.getElementById("tlod-activities");
    const addNewItemToday = document.getElementById("tlcd-activities");
    const addNewItemButton = document.getElementById("new-todo-add");
    const addNewItemButtonCancel = document.getElementById("new-todo-cancel");

    // Grundläggande funktion för att lägga till en todo
        addNewItemButton.addEventListener("click", () => {

        userInputErrorDate.style.display = "none";
        userInputErrorTodo.style.display = "none";

        // Lägg till todo om inputfälten inte är tomma
        if (userInputTodo.value != "" && userInputDate.value != "") {
            const newTodo = document.createElement("li");
            const newTodoContent = document.createTextNode(userInputDate.value + " – " + userInputTodo.value);
            newTodo.appendChild(newTodoContent);
            addNewItemToday.appendChild(newTodo);
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

    // Funktion för användaren att avbryta skapande av en todo
    addNewItemButtonCancel.addEventListener("click", () => {
        userInputTodo.value = "";
        userInputDate.value = "";
        userInputErrorDate.style.display = "none";
        userInputErrorTodo.style.display = "none";
    });
}