window.addEventListener("DOMContentLoaded", main);
window.addEventListener("DOMContentLoaded", blockPastDates);

function main () {
    // Variabeldeklarationer
    const todoListToday = document.getElementById("todo-list-today-activities");
    const buttonAddNewItem = document.getElementById("new-item-add");
    const buttonClearNewItem = document.getElementById("new-item-clear");

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
            const newItem = document.createElement("li");

            //Väljer om aktiviteten ska hamna i "idag"-kolumnen eller "kommande"-kolumnen
                const newItemContent = document.createTextNode(newItemDate + " – " + newItemActivity);
                const buttonDeleteItem = document.createElement("button");
                buttonDeleteItem.setAttribute("data-cy", "delete-todo-button");
                buttonDeleteItem.innerHTML = "Ta bort";
                buttonDeleteItem.addEventListener('click', deleteItem);
                newItem.appendChild(newItemContent);
                newItem.appendChild(buttonDeleteItem);
                todoListToday.appendChild(newItem);

            userInputActivity.value = "";
            userInputDate.value = "";
    });

    // Funktion för användaren att rensa inmatning
    buttonClearNewItem.addEventListener("click", () => {
        userInputActivity.value = "";
        userInputActivityError.style.display = "none";
        userInputDate.value = "";
        userInputDateError.style.display = "none";
    });

    // Tar bort en aktivitet
    function deleteItem() {
        const item = this.parentNode;
        item.parentNode.removeChild(item);
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