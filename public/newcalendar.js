let nav = 0;

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Laddas vid start samt när man navigerar mellan månader
function loadCalendar() {
    const date = new Date();

    // Bestämmer vilken månad det är baserat på var i navigeringen man är (nav ändras med 1 om man trycker på pilarna)
    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
      }
    // Sparar nuvarande datum i variablar
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Räknar ut vilken veckodag första dagen i given månad är
    const firstDayOfTheMonth = new Date(year, month, 1);
    
    // Räknar ut hur många dagar det är i given månad
    const daysInAMonth = new Date(year, month + 1, 0).getDate();
    // Förvandlar veckodagen för första dagen i månaden till en sträng
    const dateToString = firstDayOfTheMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    console.log(dateToString);
    // Bestämmer hur många rutor i kalendergriden som är tomma innan första dagen i månaden
    // (t.ex. tre tomma rutor om första dagen i månaden är en torsdag)
    const emptyDaySquare = weekdays.indexOf(dateToString.split(', ')[0]);
    console.log(emptyDaySquare);

    document.getElementById('monthAndYear').innerText = 
    `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
    
    // Rensar kalenderdiven innan den ritas upp på nytt
    
    renderDaySquare(emptyDaySquare, daysInAMonth, day, month, year);
    

}

// Renderar varje dag i given månad
function renderDaySquare(emptyDaySquare, daysInAMonth, day, month, year) {
    const calendar = document.getElementById("month-calendar");
    calendar.innerHTML = "";
    
    for(let i = 1; i <= emptyDaySquare + daysInAMonth; i++) {
        // Skapar en div med klassen "day" (d.v.s. en ruta i kalendern)
        const daySquare = document.createElement("div");
        daySquare.classList.add("day-square");
        // Kontrollerar om rutan som ska ritas upp ska vara tom eller inte
        if (i > emptyDaySquare) {
            // Ritar ut dagens nummer i rutan
            daySquare.innerText = i - emptyDaySquare;
            // Om dagen som ritas upp är dagens datum så får den id-stylingen "currentDay" (blir ljusblå)
            if (i - emptyDaySquare === day && nav === 0) {
                daySquare.id = "today";
            }

        } else {
            daySquare.classList.add("empty")
        }
            
        // Lägger till rutan i DOM
        calendar.appendChild(daySquare);
    }
}

function initButtons() {
    // Gör byt månad-knapparna funktionella
    document.getElementById('nextButton').addEventListener('click', () => {
      nav++;
      loadCalendar();
    });
  
    document.getElementById('backButton').addEventListener('click', () => {
      nav--;
      loadCalendar();
    });
  }