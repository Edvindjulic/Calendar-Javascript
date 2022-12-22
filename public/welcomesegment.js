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
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
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
 * @param {HTMLDivElement} welcomeSegement 
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
 * @param {HTMLDivElement} welcomeSegement 
 */
function getAndRenderTime(date, welcomeSegement) {
    const time = date.toTimeString().split(" ")[0];

    const timeText = document.createElement("p");
    timeText.textContent = time;
    timeText.classList.add("welcome-segment-date")
    welcomeSegement.append(timeText);
    
}