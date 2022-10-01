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

const timeOfDay = getTimeOfDay();

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        return greeting.textContent = 'Доброе утро,'
    } else if (hours >= 12 && hours < 18) {
        return greeting.textContent = 'Добрый день,'
    } else if (hours >= 18 && hours < 24) {
        return greeting.textContent = 'Добрый вечер,'
    } else (hours >= 12 && hours < 6)
    return greeting.textContent = 'Доброй ночи,'
}

const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

const timerDiv = document.querySelector(".timer"),
    timerHead = document.querySelector("#timerH"),
    timerline = document.querySelector(".timerline"),
    wlessButton = document.querySelector("#wless"),
    wmoreButton = document.querySelector("#wmore"),
    rlessButton = document.querySelector("#rless"),
    rmoreButton = document.querySelector("#rmore"),
    langButton = document.querySelector("#lang"),
    workTimeDiv = document.querySelector("#workTime"),
    restTimeDiv = document.querySelector("#restTime"),
    launchButton = document.querySelector("#launch"),
    stopButton = document.querySelector("#stop"),
    clearButton = document.querySelector("#clear");

const settings = {
    work: 30,
    rest: 10,
    maxTime: 120,
    session: 'отдых',
    mainColors: ['#E3F2FD', '#3896d1'],
    lang: 'ru',
    langcontent: {
        ru: {
            'timer-w-head': 'Отдохни!',
            'timer-r-head': 'Перерыв!',
            'customize': 'Настройка таймера',
            'cust-w-head': 'Длина рабочей сессии',
            'cust-r-head': 'Длина перерыва',
        }
    }
};

let timer, fullW = settings.work * 60, remains = fullW, fullR = settings.rest * 60;

// show all initial numbers
workTimeDiv.innerHTML = settings.work;
clear();

// assign onclick functions to all buttons
launchButton.addEventListener('click', timerFunc);
stopButton.addEventListener('click', stop);
clearButton.addEventListener('click', clear);

[wlessButton, wmoreButton].forEach((button) => {
    assignSessionButtons(button);
});

function timerFunc() {
    clearInterval(timer);
    let bgarg

    if (settings.session === 'work') {
        bgarg = fullW;
        colors = settings.mainColors;
        remains = (remains <= 0) ? fullW : remains;
        timerHead.innerHTML = settings.langcontent[settings.lang]['timer-w-head'];
    } else if (settings.session === 'rest') {
        bgarg = fullR;
        colors = settings.mainColors.slice().reverse();
        remains = (remains <= 0) ? fullR : remains;
        timerHead.innerHTML = settings.langcontent[settings.lang]['timer-r-head'];
    }

    timerDiv.innerHTML = formatTime(remains);

    timer = setInterval(() => {
        remains--;
        timerDiv.innerHTML = formatTime(remains);
        setBg(bgarg, colors);
        // toggle work/rest sessions as one ends. Play sound if enabled
        if (remains === 0) {
            if (settings.soundOn) {
                settings.sound.play();
            }
            settings.session = (settings.session === 'work') ? 'rest' : 'work';
            timerFunc();
        }
    }, 1000);
}

function assignSessionButtons(button) {
    // figure out which button it is and where to show the number
    let operation = (button.id[1] === 'm') ? 'plus' : 'minus',
        session = (button.id[0] === 'w') ? 'work' : 'rest',
        div = (session === 'work') ? workTimeDiv : restTimeDiv;

    button.addEventListener('click', () => {
        // set timer
        if (operation === 'plus') {
            settings[session]++;
        } else {
            settings[session]--;
        }

        div.innerHTML = settings[session] = // don't set timers more than max or less than or equal to zero
            (settings[session] <= 0) ?
                1 :
                (settings[session] > settings.maxTime) ?
                    settings.maxTime :
                    settings[session];

        if (session === 'work') {
            // timer starts with work session, so these have to change
            remains = fullW = settings[session] * 60;
            timerDiv.innerHTML = formatTime(remains);
        } else {
            fullR = settings[session] * 60;
        }
    });
}

function stop() {
    clearInterval(timer);
}

function clear() {
    clearInterval(timer);
    settings.session = 'work';
    timerHead.innerHTML = '';
    colors = settings.mainColors;
    remains = fullW;
    timerDiv.innerHTML = formatTime(remains);
    setBg(fullW, settings.mainColors);
}


function formatTime(arg) {
    let minutes = Math.floor(arg / 60), seconds = Math.floor(arg % 60);
    return `${minutes.toString().length < 2 ? '0' + minutes : minutes}:${seconds.toString().length < 2 ? '0' + seconds : seconds}`
}

function setBg(arg, colors) {
    timerline.style.background = `linear-gradient(to right, ${colors[0]} 0%, ${colors[0]} ${(remains / arg) * 100}%, ${colors[1]} ${(remains / arg) * 100}%, ${colors[1]} 100%)`;
}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    lazy: true,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.slide-next',
        prevEl: '.slide-prev',
    },
});

