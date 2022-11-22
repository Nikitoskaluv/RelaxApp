const { v4: uuidv4 } = require('uuid');
const { ADDRESS } = require("./constants");

const timerWarning = document.querySelector('.timer-warning'),
    timerWarningContinue = document.getElementById("timerContinue")

const settings = {
    work: 30,       // in minutes
    rest: 10,       // in minutes
    maxTime: 120,   // in minutes
    mainColors: ['#E3F2FD', '#3896d1'],
    lang: 'ru',
    langcontent: {
        ru: {
            'timer-w-head': 'Работаем!',
            'timer-r-head': 'Перерыв!',
            'timer-m-head': 'Медитируем',
            'customize': 'Настройка таймера',
            'cust-w-head': 'Длина рабочей сессии',
            'cust-r-head': 'Длина перерыва',
        }
    }
};

const timerValueAdjusterElement = document.querySelector("#workTime"),
    meditationCheckbox = document.getElementById('radioMeditation');

timerValueAdjusterElement.innerHTML = settings.work;
meditationCheckbox.checked = false;
meditationCheckbox.parentElement.style.visibility = 'hidden';


let session = {
    name: 'work',
    remains: 0,                     // in seconds
    fullTime: settings.work * 60,   // in seconds
    timerId: undefined,
    timer: 0,
    state: undefined
}


updateProgressBar(session.fullTime, session.fullTime, settings.mainColors);
updateTimerLabel(session.fullTime);

meditationCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        session = {
            name: 'meditation',
            remains: 0,                     // in seconds
            fullTime: settings.rest * 60,   // in seconds
            timerId: undefined,
            timer: 0
        }
    } else {
        session = {
            name: 'rest',
            remains: 0,                     // in seconds
            fullTime: settings.rest * 60,   // in seconds
            timerId: undefined,
            timer: 0
        }

    }
    timerValueAdjusterElement.innerHTML = settings.rest;
    updateTimerLabel(session.fullTime);
});

document.getElementsByName('session-group').forEach(el => el.addEventListener('change', (e) => {
    if (e.target.id === 'radioWork') {
        session = {
            name: 'work',
            remains: 0,                     // in seconds
            fullTime: settings.work * 60,   // in seconds
            timerId: undefined,
            timer: 0
        }
        timerValueAdjusterElement.innerHTML = settings.work;
        meditationCheckbox.checked = false;
        meditationCheckbox.parentElement.style.visibility = 'hidden';
    } else if (e.target.id === 'radioRest') {
        session = {
            name: 'rest',
            remains: 0,                     // in seconds
            fullTime: settings.rest * 60,   // in seconds
            timerId: undefined,
            timer: 0
        }
        timerValueAdjusterElement.innerHTML = settings.rest;
        meditationCheckbox.parentElement.style.visibility = 'unset';
    }

    updateTimerLabel(session.fullTime);
}));


// 'plus' button handler
document.querySelector("#wmore").addEventListener('click', () => {
    // adjustments should only work only when the timer is stopped
    if (session.timerId) {
        return;
    }
    if (session.fullTime < settings.maxTime * 60) {
        session.fullTime += 60;
    }
    timerValueAdjusterElement.innerHTML = session.fullTime / 60;
    updateTimerLabel(session.fullTime)
});

// 'minus' button handler
document.querySelector("#wless").addEventListener('click', () => {
    // adjustments should only work only when the timer is stopped
    if (session.timerId) {
        return;
    }
    if (session.fullTime > 0) {
        session.fullTime -= 60;
    }
    // timerValueAdjusterElement.innerHTML = session.fullTime / 60;
    // updateTimerLabel(session.fullTime)
});
timerValueAdjusterElement.addEventListener('input', () => {
    if (session.timerId || timerValueAdjusterElement.value >= 121 || timerValueAdjusterElement.value <= 0) {
        return;
    }
    // if (timerValueAdjusterElement.value >= 121 || timerValueAdjusterElement.value <= 0){
    //     return;
    // }
    session.fullTime = timerValueAdjusterElement.value * 60
    updateTimerLabel(session.fullTime)
    console.log(timerValueAdjusterElement.value)
})

// start timer handler
const startTimerBtn = document.querySelector("#launch");

function startTimer() {

    let colors;

    if (session.timerId) {
        // we are in 'pause' state

    } else {
        // new session
        // generate new unique timer id for every timer started
        session.timerId = uuidv4();
        session.remains = session.fullTime;
    }

    if (session.name === 'work') {
        colors = settings.mainColors;
        updateSessionHeader('timer-w-head');
    } else if (session.name === 'rest') {
        colors = settings.mainColors.slice().reverse();
        updateSessionHeader('timer-r-head');
    }
    else if (session.name === 'meditation') {
        colors = settings.mainColors.slice().reverse();
        updateSessionHeader('timer-m-head');
    }

    updateTimerLabel(session.remains);


    session.timer = setInterval(() => {
        session.remains--;
        updateTimerLabel(session.remains);
        updateProgressBar(session.fullTime, session.remains, colors);

        if (session.remains <= 0) {

            if (settings.soundOn) {
                settings.sound.play();
            }
        }
        session.state = 'IN_PROGRESS';
        updateStorage();
    }, 1000);



    session.state = 'IN_PROGRESS';
    updateStorage();


    startTimerBtn.disabled = true;
    stopTimerBtn.disabled = false;
    pauseTimerBtn.disabled = false;
}

startTimerBtn.addEventListener('click', () => playButton());

// pause timer handler
const pauseTimerBtn = document.querySelector("#pause")
pauseTimerBtn.addEventListener('click', () => {
    clearInterval(session.timer);
    startTimerBtn.disabled = false;
    stopTimerBtn.disabled = false;
    pauseTimerBtn.disabled = false;
    session.state = 'PAUSED';
    updateStorage();
});

// stop timer handler
const stopTimerBtn = document.querySelector("#stop")
stopTimerBtn.addEventListener('click', () => {
    clearInterval(session.timer);
    updateTimerLabel(session.fullTime)
    updateProgressBar(session.fullTime, session.fullTime, settings.mainColors);



    startTimerBtn.disabled = false;
    stopTimerBtn.disabled = false;
    pauseTimerBtn.disabled = false;

    session.state = 'FINISHED';
    updateStorage();

    session.timerId = undefined;
    updateSessionHeader();
});

function updateStorage() {
    if (session.timerId) {
        let timerFromStorageStr = localStorage.getItem(`timer_${session.timerId}`);
        let timer;
        if (timerFromStorageStr) {
            timer = JSON.parse(timerFromStorageStr);
        } else {
            timer = {
                id: session.timerId,
                type: session.name
            }
        }
        timer.lastUpdateTime = new Date().getTime();
        timer.state = session.state;
        timer.seconds = session.fullTime - session.remains;
        localStorage.setItem(`timer_${session.timerId}`, JSON.stringify(timer));
    }
}

function formatTime(arg) {
    let minutes = Math.floor(arg / 60), seconds = Math.floor(arg % 60);
    return `${minutes.toString().length < 2 ? '0' + minutes : minutes}:${seconds.toString().length < 2 ? '0' + seconds : seconds}`
}

function updateTimerLabel(time) {
    const el = document.querySelector(".timer")
    if (el) {
        el.innerHTML = formatTime(time);
    }
}

function updateSessionHeader(val) {
    const el = document.querySelector("#timerH");
    if (el) {
        if (val && val.length) {
            el.innerHTML = settings.langcontent[settings.lang][val];
        } else {
            el.innerHTML = '';
        }
    }
}

function updateProgressBar(full, current, colors) {
    const el = document.querySelector(".timerline")
    if (el) {
        el.style.background = `linear-gradient(to right, ${colors[0]} 0%, ${colors[0]} ${(current / full) * 100}%, ${colors[1]} ${(current / full) * 100}%, ${colors[1]} 100%)`;
    }
}


const SEND_DELAY = 5000;
let sendProcessCount = 0;
setTimeout(senderProcess, SEND_DELAY);

function senderProcess() {
    if (sendProcessCount > 0) {
        return;
    }


    for (let key of Object.keys(localStorage).filter(key => key.startsWith('timer_'))) {
        const timer = JSON.parse(localStorage.getItem(key));
        if (timer.state != 'PAUSED') {
            sendProcessCount++;
            postTimerEventToServer(timer)
                .then(() => {
                    sendProcessCount--;
                    if (timer.state === 'FINISHED') {
                        localStorage.removeItem(key);
                    }

                    // remove timer if it's 'last update time' more than 5 minutes
                    if (Math.abs(new Date().getTime() - timer.lastUpdateTime) > 1000 * 60 * 5) {
                        localStorage.removeItem(key);
                    }
                })
                .catch((e) => {
                    sendProcessCount--;
                });
        }
    }

    setTimeout(senderProcess, SEND_DELAY);
}

async function postTimerEventToServer(timer) {
    return new Promise((resolve, reject) => {
        fetch(`${ADDRESS}/timer`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'authorization': localStorage.getItem('userToken')
            },
            body: JSON.stringify(timer)
        }).then((res) => {
            if (res.status === 200) {
                resolve()
            } else {
                reject();
            }
        })

            .catch((error) => {
                console.log(`ошибка ${error}`)
                reject();
            })
    });
}

function hideWarning() {
    timerWarning.style.display = 'none'
}


function playButton() {
    if (!localStorage.getItem('userToken')) {
        timerWarning.style.display = 'flex';
    }
    else
        startTimer();
}

timerWarningContinue.addEventListener('click', startTimer);
timerWarningContinue.addEventListener('click', hideWarning);