
function renderCalender() {
    let date = new Date();
    
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    let firstDayOfTheMonth = new Date(year, month, 1);
    console.log(firstDayOfTheMonth);
}