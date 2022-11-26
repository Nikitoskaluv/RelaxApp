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
        weeklyStats = data;
        console.log(weeklyStats, 'ws');
        showMeditationStats(weeklyStats);
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
        type: 'doughnut',

        data: {
            labels: Object.keys(obj).map(value => {
                if (value === 'meditation') {
                    return `МЕДИТАЦИЯ ${secToHumanTime(Object.values(obj)[0])}`
                } if (value == 'rest') {
                    return `ОТДЫХ ${secToHumanTime(Object.values(obj)[1])}`
                } if (value == 'work') {
                    return `РАБОТА ${secToHumanTime(Object.values(obj)[2])}`
                }
            }),
            datasets: [{
                data: Object.values(obj),
                backgroundColor: ['#96BEF3',
                    '#D8C0CD',
                    '#7ADBBE']
            }],

        },
        options: {
            plugins: {
                legend: {

                    labels: {
                        usePointStyle: true,
                        size: 6,
                        padding: 50,

                    },

                    position: 'right',
                },
                tooltips: {
                    mode: 'index'
                }
            },
            aspectRatio: 3,
            layout: {
                padding: {
                    left: 0,
                    right: 0,

                }
            },
            responsive: true,
            cutoutPercentage: 65,


        }
    });
}



const secondsArr = [' секунда', ' секунды', ' секунд'],
    minutesArr = [' минута', ' минуты', ' минут'],
    hoursArr = [' час', ' часа', ' часов'],
    daysArr = [' день', ' дня', ' дней'];

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
                        label: `МЕДИТАЦИЯ`,
                        backgroundColor: '#96BEF3',
                        data: returnTime(arr, 'meditation'),

                    },
                    {
                        label: 'ОТДЫХ',
                        backgroundColor: '#D8C0CD',
                        data: returnTime(arr, 'rest')
                    },
                    {
                        label: 'РАБОТА',
                        backgroundColor: '#7ADBBE',
                        data: returnTime(arr, 'work')
                    }
                ]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItems) {
                            console.log('sec', tooltipItems)

                            return `${tooltipItems.dataset.label}: ${secToHumanTime(tooltipItems.parsed.y)}`;
                        }
                    }
                }
            }
        },

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
    console.log(arr2, 'arr2');
    return arr2;
}


function showMeditationStats(arr) {
    arr.forEach(obj => {
        const box = document.createElement('div');
        box.classList.add('box');

        const icon = document.createElement('div');
        box.appendChild(icon);
        icon.classList.add('icon');
        const dateBox = document.createElement('div');
        box.appendChild(dateBox);
        dateBox.classList.add('dateBox');

        dateBox.innerHTML = `<p>${formatDate(obj.date)}</p>`
        const container = document.querySelector('.checkContainer');
        container.appendChild(box);



        if (obj.data.meditation <= 0) {
            icon.style.backgroundImage = 'url(../assets/icons/spare_icon.svg)';
            icon.style.width = '100px'
            icon.style.height = '100px'
        } else {
            icon.style.backgroundImage = 'url(../assets/icons/checked_icon.svg)'
            icon.style.width = '100px'
            icon.style.height = '100px'
        }

    })

}




















