async function getHoliday() {
  const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/2022/12`);
  const holidays = await response.json();
  const listOfHolidays = []

  for (const holiday of holidays.dagar) {
    if (holiday.helgdag) {
      
      listOfHolidays.push(holiday);
    }
  }

  renderHolidays(listOfHolidays);
  console.log(listOfHolidays);
}


function renderHolidays(listOfHolidays) {
  for (const i = 0; i <= listOfHolidays; i++) {
    const date = new Date();
    const day = date.getDate();
    console.log("hallå");

    if (listOfHolidays[i].date == day) {
      const div = document.createElement("div");
      div.style.backgroundColor = "red";
      console.log("hallå");
      document.appendChild(div);
    }

  }
}