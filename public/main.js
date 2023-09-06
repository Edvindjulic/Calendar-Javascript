require('./style.css');
require('./calendar.css');
require('./mediaqueries.css');

window.addEventListener("DOMContentLoaded", main);

/**
 * Setting up the app
 */
function main() {
    checkIfLocalStorageIsEmpty();
    startWelcomeSegment();
    startClock();
    loadCalendar();
    initButtons();
    blockPastDates();
    loadTodoList();
}
