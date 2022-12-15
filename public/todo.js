window.addEventListener("DOMContentLoaded", main);
window.addEventListener("DOMContentLoaded", blockPastDates);

function main () {
    // Variabeldeklarationer
    const addItemContainer = document.getElementById("new-item");
    const buttonShowAddItem = document.getElementById("todo-list-add-button");
    const buttonHideAddItem = document.getElementById("todo-list-hide-button");
    const todoListToday = document.getElementById("tlcd-activities");
    const todoListOtherDays = document.getElementById("tlod-activities");
    const buttonAddNewItem = document.getElementById("new-item-add");
    const buttonClearNewItem = document.getElementById("new-item-clear");
    const todoListEmptyTextToday = document.getElementById("todo-list-empty-text-today");
    const todoListEmptyTextOtherDays = document.getElementById("todo-list-empty-text-other-days");

    // Setup av inputfälten
    const userInputActivity = document.getElementById("new-item-activity");
    userInputActivity.value = ""
    const userInputDate = document.getElementById("new-item-date");;
    userInputDate.value = "";
    const userInputActivityError = document.getElementById("new-item-activity-error-message");
    const userInputDateError = document.getElementById("new-item-date-error-message");
    buttonHideAddItem.style.display = "none";

    // Gömmer och visar tilläggningsfunktionen
    buttonShowAddItem.addEventListener("click", () => {
        addItemContainer.style.display = "block";
        buttonShowAddItem.style.display = "none"
        buttonHideAddItem.style.display = "block";
    })

    buttonHideAddItem.addEventListener("click", () => {
        addItemContainer.style.display = "none";
        buttonShowAddItem.style.display = "block"
        buttonHideAddItem.style.display = "none";
        userInputActivity.value = "";
        userInputDate.value = "";
        userInputDateError.style.display = "none";
        userInputActivityError.style.display = "none";
    });

    // Grundläggande funktion för att lägga till en aktivitet
    buttonAddNewItem.addEventListener("click", () => {

        userInputDateError.style.display = "none";
        userInputActivityError.style.display = "none";

        const newItemActivity = userInputActivity.value;
        const newItemDate = userInputDate.value;

        // Lägg till aktivitet om inputfälten inte är tomma
        if (newItemActivity != "" && newItemDate != "") {
            const newItem = document.createElement("li");

            const date = new Date();
            const todaysDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
            const itemDate = new Date(document.getElementById('new-item-date').value);

            //Väljer om aktiviteten ska hamna i "idag"-kolumnen eller "kommande"-kolumnen
            if (todaysDate.toLocaleDateString() == itemDate.toLocaleDateString()) {
                const newItemContent = document.createTextNode(newItemActivity);
                const buttonDeleteItem = document.createElement("button");
                buttonDeleteItem.innerHTML = "Ta bort";
                buttonDeleteItem.addEventListener('click', deleteItem);
                newItem.appendChild(newItemContent);
                newItem.appendChild(buttonDeleteItem);
                todoListToday.appendChild(newItem);
                todoListEmptyTextToday.style.display = "none";
                
            } else {
                const newItemContent = document.createTextNode(newItemDate + " – " + newItemActivity);
                const buttonDeleteItem = document.createElement("button");
                buttonDeleteItem.innerHTML = "Ta bort";
                buttonDeleteItem.addEventListener('click', deleteItem);
                newItem.appendChild(newItemContent);
                newItem.appendChild(buttonDeleteItem);
                todoListOtherDays.appendChild(newItem);
                todoListEmptyTextOtherDays.style.display = "none";
            }

            addItemContainer.style.display = "none";
            buttonShowAddItem.style.display = "block"
            buttonHideAddItem.style.display = "none";
            userInputActivity.value = "";
            userInputDate.value = "";

        // Varna om inputfält är tomt
        } else {
            if (userInputActivity.value == "") {
                userInputActivityError.style.display = "block";
            } 
            if (userInputDate.value == ""){
                userInputDateError.style.display = "block";
            }
        }
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
        
        if (todoListToday.innerText == "") {
            todoListEmptyTextToday.style.display = "block";
        }
        if (todoListOtherDays.innerText == "") {
            todoListEmptyTextOtherDays.style.display = "block";
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