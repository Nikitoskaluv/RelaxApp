const time = document.querySelector('.time');
const dates = document.querySelector('.date');
let colors
function showDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString('ru-RU', options);
    dates.textContent = currentDate;
}

const greeting = document.querySelector('.greeting');

// const timeOfDay = getTimeOfDay();

// function getTimeOfDay() {
//     const date = new Date();
//     const hours = date.getHours();
//     if (hours >= 6 && hours < 12) {
//         return greeting.textContent = 'Доброе утро,'
//     } else if (hours >= 12 && hours < 18) {
//         return greeting.textContent = 'Добрый день,'
//     } else if (hours >= 18 && hours < 24) {
//         return greeting.textContent = 'Добрый вечер,'
//     } else (hours >= 12 && hours < 6)
//     return greeting.textContent = 'Доброй ночи,'
// }

// const name = document.querySelector('.name');

// function setLocalStorage() {
//     localStorage.setItem('name', name.value);
// }
// window.addEventListener('beforeunload', setLocalStorage)

// function getLocalStorage() {
//     if (localStorage.getItem('name')) {
//         name.value = localStorage.getItem('name');
//     }
// }
// window.addEventListener('load', getLocalStorage)