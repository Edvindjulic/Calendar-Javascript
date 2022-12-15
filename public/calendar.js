let clicked = null;
let nav = 0;

const calendar = document.getElementById("month-calendar");
// const weekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function loadCalendar() {
    const date = new Date();

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

    const fillerDays = weekdays.indexOf(dateToString.split(', ')[0]);

    calendar.innerHTML = "";
    renderDaySquare(day, month, year, fillerDays, daysInAMonth);
}

function renderDaySquare(day, month, year, fillerDays, daysInAMonth) {
    for(let i = 1; i <= fillerDays + daysInAMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day-square");

        const dayString = `${month + 1}/${i - fillerDays}/${year}`;

        if (i > fillerDays) {
            daySquare.innerText = i - fillerDays;
            // const eventForDay = events.find(e => e.date === dayString);
      
            if (i - fillerDays === day && nav === 0) {
              daySquare.id = 'currentDay';
            }
      
            // if (eventForDay) {
            //   const eventDiv = document.createElement('div');
            //   eventDiv.classList.add('event');
            //   eventDiv.innerText = eventForDay.title;
            //   daySquare.appendChild(eventDiv);
            // }
      
        //     daySquare.addEventListener('click', () => openModal(dayString));
        //   } else {
            daySquare.classList.add('padding');
          }
        document.body.appendChild(daySquare);   
    }
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
      nav++;
      load();
    });
  
    document.getElementById('backButton').addEventListener('click', () => {
      nav--;
      load();
    });
}