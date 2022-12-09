window.addEventListener("DOMContentLoaded", main);

function main () {

    // Variablar
    const addNewItemButton = document.getElementById("todo-list-add-new-item");
    const addNewItem = document.getElementById("tlod-new-item");


    // Grundläggande funktion för att lägga till text i aktivitetslistan
    addNewItemButton.addEventListener("click", () => {
        const newTodo = document.createElement("li");
        const userInput = prompt("Vilken aktivitet vill du lägga till?");
        const newTodoContent = document.createTextNode(userInput);
        newTodo.appendChild(newTodoContent);
        addNewItem.appendChild(newTodo);
    });

}