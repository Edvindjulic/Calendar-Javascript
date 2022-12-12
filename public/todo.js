window.addEventListener("DOMContentLoaded", main);

function main () {

    // Variablar
    const addNewItemOtherDays = document.getElementById("tlod-activities");
    const addNewItemToday = document.getElementById("tlcd-activities");
    const addNewItemButton = document.getElementById("new-todo-add");

    // Grundläggande funktion för att lägga till en todo
        addNewItemButton.addEventListener("click", () => {
        const newTodo = document.createElement("li");
        const userInputTodo = document.getElementById("new-todo-activity");
        const userInputDate = document.getElementById("new-todo-date");
        const newTodoContent = document.createTextNode(userInputDate.value + " – " + userInputTodo.value);
        newTodo.appendChild(newTodoContent);
        addNewItemToday.appendChild(newTodo);
    });

}