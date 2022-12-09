window.addEventListener("DOMContentLoaded", main);

/**
 * Function that loads when the dom is loaded
 */
 function main() {
    startClock();
}

/**
 * Makes it so that the clock can tick, updates every second
 */
function startClock() {
    setInterval(startWelcomeSegment, 1000)
}

/**
 * Gets the date of the day, starts all functions that is needed for welcome segment
 */
function startWelcomeSegment() {
    const date = new Date();
    const welcomeSegement = document.getElementById("welcome-segment");
    welcomeSegement.innerHTML = "";
    renderWeekday(date, welcomeSegement);
    renderTodaysDate(date, welcomeSegement);
    getAndRenderTime(date, welcomeSegement);
}

/**
 * Renders the weekday on the side
 * @param {Date} date 
 * @param {HTMLDivElement} welcomeSegement 
 */
function renderWeekday(date, welcomeSegement) {
    const weekdayText = document.createElement("p");
    weekdayText.textContent = getWeekday(date);
    weekdayText.classList.add("welcome-segment-day")
    welcomeSegement.append(weekdayText);
}

/**
 * Gets the day of the week
 * @param {Date} date 
 * @returns 
 */
function getWeekday(date) {
    const weekday = date.getDay();

    switch (weekday) {
        case 0: return "Söndag";
        case 1: return "Måndag";
        case 2: return "Tisdag";
        case 3: return "Onsdag";
        case 4: return "Torsdag";
        case 5: return "Fredag";
        case 6: return "Lördag";
    }
}

/**
 * Gets the full date in year-month-day
 * @param {Date} date 
 */
function getTodaysDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const todaysDate = year + "-" + month + "-" + day;
    return todaysDate;

}

/**
 * Renders the full date on to the side
 * @param {Date} date 
 */
function renderTodaysDate(date, welcomeSegement) {
    const dateText = document.createElement("p");
    dateText.textContent = getTodaysDate(date);
    dateText.classList.add("welcome-segment-date")
    welcomeSegement.append(dateText);
}

/**
 * Get and renders the time
 * @param {Date} date 
 */
function getAndRenderTime(date, welcomeSegement) {
    const time = date.toTimeString().split(" ")[0];

    const timeText = document.createElement("p");
    timeText.textContent = time;
    timeText.classList.add("welcome-segment-date")
    welcomeSegement.append(timeText);
    
}