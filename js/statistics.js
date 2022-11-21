import { Chart } from 'chart.js/auto';
import { ADDRESS } from "./constants.js";


let dailyStats = {};

function getDailyStats() {
    fetch(`${ADDRESS}/user/stats/daily`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('userToken'),
        },
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data, 'data');
        dailyStats = data;
        showDailyStats(dailyStats);
    }).catch((error) => {
        console.log(`ошибка ${error}`)
    })
}

window.onload = () => {
    getDailyStats();
    showWeeklyStats();
}
console.log(dailyStats, 'types')
let dayChart = document.querySelector('#dayStatistics').getContext('2d');

function showDailyStats(obj) {
    new Chart(dayChart, {
        type: 'pie',
        data: {
            labels: Object.keys(obj).map(value => {
                if (value === 'meditation') {
                    return `медитация ${secToHumanTime(Object.values(obj)[0])}`
                } if (value == 'rest') {
                    return `отдых ${secToHumanTime(Object.values(obj)[1])}`
                } if (value == 'work') {
                    return `работа ${secToHumanTime(Object.values(obj)[2])}`
                }
            }),
            datasets: [{
                data: Object.values(obj),
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'TEST'
                }
            }
        }
    });
}



const secondsArr = ['секунда', 'секунды', 'секунд'],
    minutesArr = ['минута', 'минуты', 'минут'],
    hoursArr = ['час', 'часа', 'часов'],
    daysArr = ['день', 'дня', 'дней'];

function secToHumanTime(totalSeconds) {
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const days = Math.floor(totalSeconds / (3600 * 24));

    const secondsStr = checkWord(seconds, secondsArr);
    const minutesStr = checkWord(minutes, minutesArr);
    const hoursStr = checkWord(hours, hoursArr);
    const daysStr = checkWord(days, daysArr);

    return `${days > 0 ? days + daysStr : ''} ${hours > 0 ? hours + hoursStr : ''} ${minutes > 0 ? minutes + minutesStr : ''} ${seconds > 0 ? seconds + secondsStr : ''}`;
}

function checkWord(number, titles) {
    let n = Math.abs(number) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) { return titles[2]; }
    if (n1 > 1 && n1 < 5) { return titles[1]; }
    if (n1 == 1) { return titles[0]; }
    return titles[2];
}

let weekChart = document.querySelector('#weekStatistics').getContext('2d');
function showWeeklyStats() {
    new Chart(weekChart, {
        type: 'bar',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets:
                [
                    {
                        label: 'Медитация',
                        fillColor: 'blue',
                        data: [3000, 4000, 5000, 3000, 4000, 5000, 4000]
                    },
                    {
                        label: 'Работа',
                        fillColor: 'green',
                        data: [5000, 8000, 9000, 7000, 5000, 8000, 9000]
                    },
                    {
                        label: 'Отдых',
                        fillColor: 'red',
                        data: [7000, 2000, 3000, 3000, 7000, 2000, 3000]
                    }
                ]
        },
        options: {
        }
    });
}














