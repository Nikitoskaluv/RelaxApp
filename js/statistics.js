import { Chart } from 'chart.js/auto';
import { ADDRESS } from "./constants.js";


let dailyStats = {};
let weeklyStats = [];
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
        console.log(data, 'daily data');
        dailyStats = data;
        showDailyStats(dailyStats);
    }).catch((error) => {
        console.log(`ошибка ${error}`)
    })
}

function getWeeklyStats() {
    fetch(`${ADDRESS}/user/stats/weekly`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('userToken'),
        },
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data, 'weekly data');
        weeklyStats = data;
        console.log(weeklyStats, 'ws')
        showWeeklyStats(weeklyStats);
    }).catch((error) => {
        console.log(`ошибка ${error}`)
    })
}

window.onload = () => {
    getDailyStats();
    // showWeeklyStats();
    getWeeklyStats();
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
                    text: 'СТАТИСТИКА ЗА ДЕНЬ'
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

function showWeeklyStats(arr) {
    new Chart(weekChart, {
        type: 'bar',
        data: {
            labels: arr.map(obj => {
                return formatDate(obj.date);
            }),
            datasets:
                [
                    {
                        label: `${Object.keys((arr[0].data))[0] == 'meditation' ? 'Медитация' : 0}`,
                        fillColor: 'blue',
                        data: returnTime(arr, 'meditation')
                    },
                    {
                        label: `${Object.keys((arr[0].data))[1] == 'rest' ? 'Отдых' : 0}`,
                        fillColor: 'green',
                        data: returnTime(arr, 'rest')
                    },
                    {
                        label: `${Object.keys((arr[0].data))[2] == 'work' ? 'Работа' : 0}`,
                        fillColor: 'red',
                        data: returnTime(arr, 'work')
                    }
                ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'СТАТИСТИКА ЗА НЕДЕЛЮ'
                }
            }
        }
    });
}

function formatDate(string) {
    let date = new Date(string);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const dateLine = `${dd}.${mm}`;
    return dateLine
}

function returnTime(arr, string) {
    let arr2 = [];
    arr.map(obj => {
        arr2.push(obj.data[string])
    })
    console.log(arr2);
    return arr2;
}

//   {
//     date: 2022-11-20T19:00:00.000Z,
//     data: { meditation: 10, rest: 23, work: 53 }
//   }

















