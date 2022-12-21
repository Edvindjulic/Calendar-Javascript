async function getHoliday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`);
  const holidays = await response.json();
  const listOfHolidays = []

  for (const holiday of holidays.dagar) {
    if (holiday.helgdag) {
      
      listOfHolidays.push(holiday);

      listOfHolidays.forEach(function(holiday) {
        const calendarHoliday = document.createElement('div');
        calendarHoliday.innerHTML = holiday.helgdag;
        calendarHoliday.style.backgroundColor = "red";
        calendar.appendChild(calendarHoliday);
      });
    }
  }
}

// async function getHoliday() {
//   const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/2022/12`);
//   const holidays = await response.json();
//   const listOfHolidays = []

//   const date = new Date()


//   for (const holiday of holidays.dagar) {
//     if (holiday.helgdag) {
      
//       listOfHolidays.push(holiday);

//       listOfHolidays.forEach(function(holiday) {
//         const daySquareHoliday = document.createElement("div");

//         if (todoListLocalStorage == null) {

//         } else {
//             addHolidayToCalendar(daySquareHoliday, daySquare.id);
//         }
//         daySquare.appendChild(daySquareHoliday);
//         calendar.appendChild(daySquare);

//   console.log(listOfHolidays);
//       });
//     }
//   }
// }

// function addHolidayToCalendar(daySquareHoliday, day) {
//   for (var i = 0; i < todoListLocalStorage.length; i++) {;
//     if (todoListLocalStorage[i].date == day) {
//         if (todoListLocalStorage[i].completed == true) {
            
//         } else if (calendarTodo.innerHTML == "") {
//             calendarTodo.innerHTML = 1;
//         } else {
//             calendarTodo.innerHTML++;;
//         }
//     }
// }
// }



// function renderHolidays(listOfHolidays) {
//   for (const i = 0; i <= listOfHolidays; i++) {
//     const date = new Date();
//     const day = date.getDate();
//     console.log("hallå");

//     if (listOfHolidays[i].date == day) {
//       const div = document.createElement("div");
//       div.style.backgroundColor = "red";
//       console.log("hallå");
//       document.appendChild(div);
//     }

//   }
// }