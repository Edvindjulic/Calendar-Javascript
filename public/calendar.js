const calendar = document.getElementById("calendar");
const weekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

function load() {
    const date = new Date();

    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfTheMonth = new Date(year, month, 1);
    const daysinMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfTheMonth.toLocaleDateString('sv-se', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    console.log(paddingDays);
}