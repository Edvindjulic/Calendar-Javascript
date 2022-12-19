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
