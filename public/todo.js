window.addEventListener("DOMContentLoaded", main);
window.addEventListener("DOMContentLoaded", blockPastDates);

function main () {
    // Variabeldeklarationer
    const todoListToday = document.getElementById("todo-list-today-activities");
    const buttonAddNewItem = document.getElementById("new-item-add");
    const buttonClearNewItem = document.getElementById("new-item-clear");
    const todoListEmptyTextToday = document.getElementById("todo-list-empty-text-today");

    // Setup av inputfälten
    const userInputActivity = document.getElementById("new-item-activity");
    userInputActivity.value = ""
    const userInputDate = document.getElementById("new-item-date");;
    userInputDate.value = "";

    // Grundläggande funktion för att lägga till en aktivitet
    buttonAddNewItem.addEventListener("click", () => {

        const newItemActivity = userInputActivity.value;
        const newItemDate = userInputDate.value;

        // Lägg till aktivitet om inputfälten inte är tomma
        if (newItemActivity != "" && newItemDate != "") {
    
            const newItem = document.createElement("li");
            newItem.classList.add("item");

            const badgeItem = document.createElement("span");
            badgeItem.classList.add("item-badge");
            const badgeItemContent = document.createTextNode(newItemDate);

            const newItemContentDiv = document.createElement("span");
            newItemContentDiv.classList.add("item-text");
            const newItemContent = document.createTextNode(newItemActivity);

            const buttonDeleteItem = document.createElement("button");
            buttonDeleteItem.classList.add("item-delete-button", "material-symbols-outlined");
            buttonDeleteItem.setAttribute("data-cy", "delete-todo-button");
            buttonDeleteItem.innerHTML = "delete";
            buttonDeleteItem.addEventListener('click', deleteItem);
            
            badgeItem.appendChild(badgeItemContent);
            newItem.appendChild(badgeItem);
            newItemContentDiv.appendChild(newItemContent);
            newItem.appendChild(newItemContentDiv);
            newItem.appendChild(buttonDeleteItem);
            todoListToday.appendChild(newItem);
            
            todoListEmptyTextToday.style.display = "none";
            userInputActivity.value = "";
            userInputDate.value = "";
        }
    });

    // Funktion för användaren att rensa inmatning
    buttonClearNewItem.addEventListener("click", () => {
        userInputActivity.value = "";
        userInputDate.value = "";
    });

    // Tar bort en aktivitet
    function deleteItem() {
        const item = this.parentNode;
        item.parentNode.removeChild(item);

        if (todoListToday.innerText == "") {
            todoListEmptyTextToday.style.display = "block";
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