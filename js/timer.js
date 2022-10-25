const { v4: uuidv4 } = require('uuid');
const {ADDRESS} = require("./constants");

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
controllPlay = document.getElementById("launch");
controllPause = document.getElementById("stop");
controllStop = document.getElementById("clear");


let radioBtns = document.querySelectorAll("input[name='r1']")
// let selectedRadio = document.getElementById("selectedRadio")
let findSelected = () => {
    let selected = document.querySelector("input[name='r1']:checked").value
    // selectedRadio.textContent = `${selected}`
    settings.session = selected
    if (settings.session === 'work'){
        document.getElementById("radioMeditation").checked = false //заготовки для чекбокса
        document.getElementById("radioMeditation").disabled = true
        remains = fullW = settings.work * 60;
        timerDiv.innerHTML = formatTime(remains);

    }
    else if (settings.session === 'rest'){
        if (document.getElementById("radioMeditation").checked){
            settings.session = 'meditation'
            remains = fullR = settings.rest * 60;
            timerDiv.innerHTML = formatTime(remains)
        }
        document.getElementById("radioMeditation").disabled = false
        remains = fullR = settings.rest * 60;
        timerDiv.innerHTML = formatTime(remains);
    }


    console.log('set to -', settings.session)

}


radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("change", findSelected)
})

function lockRadio(arg) {
    radioBtns.forEach(function (cb){
        cb.disabled = arg
    })
}

function lockControls(btn, disabled){
    btn.disabled = disabled
}



document.addEventListener("DOMContentUnloaded", ()=>{})



function handleTimerSubmit(status) {
    // event.preventDefault()
    const data = {};
    data.type = settings.session;
    data.time = new Date();
    data.status = status;
    data.id = settings.newID;
    console.log(data)

    fetch(`${ADDRESS}/timer`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('userToken')
        },
        body: JSON.stringify(data)
    }).then((res) => {
        const d = res.json();
        console.log("res", d);
        return d
    })
        .then(data => {
            messageBlock.innerHTML = data.message;
            localStorage.setItem('userToken', data.token);
        })
        .catch((error) => {
            console.log(`ошибка ${error}`)
        })
}


const settings = {
    work: 30,
    rest: 10,
    maxTime: 120,
    session: 'work',
    paused: false,
    newID: '',
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

let timer, fullW = settings.work * 60, remains = fullW, fullR = settings.rest * 60;
// clear();
// show all initial numbers
// debugger
// workTimeDiv.innerHTML = settings.work;
findSelected()


// assign onclick functions to all buttons
launchButton.addEventListener('click', timerFunc);
stopButton.addEventListener('click', stop);
clearButton.addEventListener('click', clear);

[wlessButton, wmoreButton].forEach((button) => {
    assignSessionButtons(button);
});

function unPause(){
    // debugger
    if (settings.paused === true){
        settings.paused = false
        handleTimerSubmit('resume')
        console.log('снято с паузы -', settings.paused)
        // return
    }
}

function timerFunc() {
    clearInterval(timer);
    let bgarg

    if (settings.newID ==='') {
        settings.newID = uuidv4()
    }


    console.log(settings.newID, '- создалось при старте')


    if (settings.session === 'work') {
        bgarg = fullW;
        colors = settings.mainColors;
        remains = (remains <= 0) ? fullW : remains;
        timerHead.innerHTML = settings.langcontent[settings.lang]['timer-w-head'];
        document.getElementById("radioWork").checked = true
        if (settings.paused === true) {
            unPause()
        }
        else
            handleTimerSubmit("start")
    } else if (settings.session === 'rest') {
        bgarg = fullR;
        colors = settings.mainColors.slice().reverse();
        remains = (remains <= 0) ? fullR : remains;
        timerHead.innerHTML = settings.langcontent[settings.lang]['timer-r-head'];
        document.getElementById("radioRest").checked = true
        if (settings.paused === true) {
            unPause()
        }
        else
            handleTimerSubmit("start")
    }
    else if (settings.session === 'meditation') {
        bgarg = fullR;
        colors = settings.mainColors.slice().reverse();
        remains = (remains <= 0) ? fullR : remains;
        timerHead.innerHTML = settings.langcontent[settings.lang]['timer-m-head'];
        document.getElementById("radioMeditation").checked = true
        if (settings.paused === true) {
            unPause()
        }
        else
            handleTimerSubmit("start")
    }

    timerDiv.innerHTML = formatTime(remains);

    timer = setInterval(() => {
        remains--;
        timerDiv.innerHTML = formatTime(remains);
        setBg(bgarg, colors);
        // sound
        if (remains === 0) {
            if (settings.soundOn) {
                settings.sound.play();
            }
            clear()

        }
    }, 1000);
    lockRadio(true)
    lockControls(controllPlay, true)
    lockControls(controllPause, false)
    lockControls(controllStop, false)
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
    settings.paused = true
    console.log('поставленно на паузу', settings.paused)
    handleTimerSubmit("pause")
    console.log(settings.newID, '- ид на паузе')
    clearInterval(timer);
    lockControls(controllPlay, false)
    lockControls(controllPause, true)
    lockControls(controllStop, false)
}

function clear() {
    if (settings.session === 'work'){
        console.log(fullW - remains, 'diff work')
        console.log(settings.session, settings.newID, '- остановленно, проверка ид, work')
        console.log(settings.newID, '- должно быть пусто')
        remains = fullW
        timerDiv.innerHTML = formatTime(remains);
        setBg(fullW, settings.mainColors);
        handleTimerSubmit("stop")
        settings.newID = ''
    }
    else if (settings.session === 'rest'){
        console.log(fullR - remains, 'diff rest')
        console.log(settings.session, settings.newID, '- остановленно, проверка ид, rest')
        console.log(settings.newID, '- должно быть пусто')
        remains = fullR
        timerDiv.innerHTML = formatTime(remains);
        setBg(fullR, settings.mainColors);
        handleTimerSubmit("stop")
        settings.newID = ''
    }
    else if (settings.session === 'meditation'){
        console.log(fullR - remains, 'diff meditation')
        console.log(settings.session, settings.newID, '- остановленно, проверка ид, meditation')
        console.log(settings.newID, '- должно быть пусто')
        remains = fullR
        timerDiv.innerHTML = formatTime(remains);
        setBg(fullR, settings.mainColors);
        handleTimerSubmit("stop")
        settings.newID = ''
    }
    timerHead.innerHTML = '';
    colors = settings.mainColors;
    lockRadio(false)
    lockControls(controllPlay, false)
    lockControls(controllPause, true)
    lockControls(controllStop, true)
    findSelected()
    clearInterval(timer);

}



function formatTime(arg) {
    let minutes = Math.floor(arg / 60), seconds = Math.floor(arg % 60);
    return `${minutes.toString().length < 2 ? '0' + minutes : minutes}:${seconds.toString().length < 2 ? '0' + seconds : seconds}`
}

function setBg(arg, colors) {
    timerline.style.background = `linear-gradient(to right, ${colors[0]} 0%, ${colors[0]} ${(remains / arg) * 100}%, ${colors[1]} ${(remains / arg) * 100}%, ${colors[1]} 100%)`;
}
lockControls(controllPause, true)
lockControls(controllStop, true)
// document.onunload = clear()
// window.addEventListener("unload", (event)=>{
//     // debugger
//     clear()
// })

window.onbeforeunload = function(){
    debugger
    if (settings.newID !== ''){
        clear()
    }
}
