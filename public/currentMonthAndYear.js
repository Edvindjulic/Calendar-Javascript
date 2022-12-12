
function currentMonthAndYear() {
    const date = new Date();
    const month = document.getElementById("month");
    const year = document.getElementById("year");
    month.innerHTML = "";
    renderMonth(date, month);
    renderYear(date, year);
}

function renderYear(date, year) {
    const yearText = document.createElement("p");
    yearText.textContent = new Date().getFullYear(date);
    yearText.classList.add("current-year");
    year.append(yearText);
}

function renderMonth(date, month) {
    const monthText = document.createElement("p");
    monthText.textContent = getMonth(date);
    monthText.classList.add("current-month");
    month.append(monthText);
}


function getMonth(date) {
    const month = date.getMonth();

    switch (month) {
        case 0: return "Januari";
        case 1: return "Februari";
        case 2: return "Mars";
        case 3: return "April";
        case 4: return "Maj";
        case 5: return "Juni";
        case 6: return "Juli";
        case 7: return "Augusti";
        case 8: return "September";
        case 9: return "Oktober";
        case 10: return "November";
        case 11: return "December";
    }
}
