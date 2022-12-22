// async function getHoliday(daySquare, calendar) {

//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();

//   const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`);

//   const holidays = await response.json();
//   const listOfHolidays = []

//   for (const holiday of holidays.dagar) {
//     if (holiday.helgdag) {
      
//       listOfHolidays.push(holiday);

//       const daySquareHoliday = document.createElement('div');
//         daySquareHoliday.innerHTML = holiday.helgdag;
//         daySquareHoliday.style.backgroundColor = "red";
//         daySquare.appendChild(daySquareHoliday);
//         calendar.appendChild(daySquare);
//     } 
    
// }
// }
