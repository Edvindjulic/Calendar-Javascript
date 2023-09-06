require('./style.css');
require('./calendar.css');
require('./mediaqueries.css');
const startWelcomeSegment = require('./welcomesegment.js');
const loadCalendar = require('./newcalendar.js');


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
