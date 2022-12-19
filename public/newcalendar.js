/**
 * A global variabel that changes if you change months by pressing buttons
 */
let nav = 0;

/**
 * Loading local storage into variable
 */
let todoListLocalStorage = [];

/**
 * A global list of all the days in a week
 */
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Loads at start and every time you change month
 */
function loadCalendar() {
    const date = new Date();

    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
      }
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfTheMonth = new Date(year, month, 1);
    const daysInAMonth = new Date(year, month + 1, 0).getDate();
    const dateToString = firstDayOfTheMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const emptyDaySquare = weekdays.indexOf(dateToString.split(', ')[0]);

    const monthAndYear = document.getElementById('monthAndYear');
    monthAndYear.innerText = `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
    monthAndYear.classList.add("current-month");
    
    renderDaySquare(emptyDaySquare, daysInAMonth, day, month, year);
}

/**
 * Renders every square in a month
 * @param {number} emptyDaySquare 
 * @param {number} daysInAMonth 
 * @param {number} day 
 * @param {number} month 
 * @param {number} year 
 */
function renderDaySquare(emptyDaySquare, daysInAMonth, day, month, year) {
    const calendar = document.getElementById("month-calendar");
    calendar.innerHTML = "";
    
    month = (month +1);
    if ((month) < 10) {
        month = '0' + month;
    } 

    for(let i = 1; i <= emptyDaySquare + daysInAMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day-square");

        if (i > emptyDaySquare) {
            daySquare.innerText = i - emptyDaySquare;

            if (daySquare.innerText < 10) {
                daySquare.id = year + "-" + (month) + "-0" + (i - emptyDaySquare);
            } else {
                daySquare.id = year + "-" + (month) + "-" + (i - emptyDaySquare);
            }

            if (i - emptyDaySquare === day && nav === 0) {
                daySquare.classList.add("today");
            }

        } else {
            daySquare.classList.add("empty")
        }

        const daySquareTodos = document.createElement("div");
        daySquareTodos.classList.add("day-square-activities");

        todoListLocalStorage = JSON.parse(localStorage.getItem("todo-list"));
        if (todoListLocalStorage == null) {

        } else {
            addTodoToCalendar(daySquareTodos, daySquare.id);
        }

        daySquare.appendChild(daySquareTodos);
        calendar.appendChild(daySquare);
    }
}

function addTodoToCalendar(calendarTodo, day) {
    for (var i = 0; i < todoListLocalStorage.length; i++) {;
        if (todoListLocalStorage[i].date == day) {
            if (todoListLocalStorage[i].completed == true) {
                
            } else if (calendarTodo.innerHTML == "") {
                calendarTodo.innerHTML = 1;
            } else {
                calendarTodo.innerHTML++;;
            }
        }
    }
}

/**
 * Function that makes <> buttons clickable, so that the month changes. 
 * When < is clicked nav decreases with 1, and when > is clicked nav increases with 1
 */
function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
      nav++;
      loadCalendar();
    });
  
    document.getElementById('backButton').addEventListener('click', () => {
      nav--;
      loadCalendar();
    });
  }