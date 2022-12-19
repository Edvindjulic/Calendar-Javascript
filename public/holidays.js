// Get the current month
// Fetch the api
// Find if a specific date has "helgdagar" in its array
// Display the days that have helgdagar in calendar

async function holidays() {

}

async function fetchHolidays(year, month) {
    const url = `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`
    const response = await fetch(url);
    const result = await response.json();

    for (const day of result.dagar) {
        if (day.includes("helgdag")) {

        }
    }

}

function renderHolidays(listOfHolidays) {
    const calendar = document.getElementById("month-calendar");
    for (const holiday of listOfHolidays) {
        if (holiday) {
            
        }
    }

}


async function getHolidays() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const url = `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const listOfHolidays = [];

    // Gå igenom varje dag i månaden och skriv ut de dagar som är helgdagar
    for (const day of data.dagar) {
      if (day.helgdag) {
        listOfHolidays.push;
        // console.log(`${day.datum} är en helgdag: ${day.helgdag}`);
      }
    }
  } catch (error) {
    console.error(error);
  }

  renderHolidays(listOfHolidays);
}

getHolidays();