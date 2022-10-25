import { ADDRESS } from "./constants.js";
import { validation, patternEmail, patternPassword, patternName } from './validation.js';

const regForm = document.querySelector('#regform');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const messageBlock = document.querySelector('.message');
const name = document.querySelector('#name');
const pas = document.querySelector('#password');
const pas_repeat = document.querySelector('#password_repeat');
const submit_btn = document.querySelector('.regButton');

// проверка корректности ввода и заполнения полей
const checkField = (elem, value) => {
    if (value) {
        elem.classList.add('valid');
        elem.classList.remove('invalid');
        messageBlock.innerText = '';
    }
    else {
        elem.classList.add('invalid');
        elem.classList.remove('valid');
        messageBlock.innerText = elem.title;
    }
    check();
}
if (name) {
    name.addEventListener('input', () => {
        checkField(name, validation(name, patternName));
    });
}

if (loginInput) {
    loginInput.addEventListener('input', () => {
        checkField(loginInput, validation(loginInput, patternEmail));
    });
}

if (pas) {
    pas.addEventListener('input', () => {
        checkField(pas, validation(pas, patternPassword));
    });
}


if (pas_repeat) {
    pas_repeat.addEventListener('input', () => {
        checkField(pas_repeat, pas_repeat.value == pas.value);
    })
}


// проверка заполнения всех полей ввода
const check = () => {
    if (validation(name, patternName) && validation(loginInput, patternEmail) && validation(pas, patternPassword) &&
        pas_repeat.value == pas.value) {
        submit_btn.removeAttribute('disabled');
    }
    else {
        submit_btn.setAttribute('disabled', 'disabled');
    }
}

// отправка данных на бэк
if (regForm) {
    regForm.addEventListener('submit', handleFormSubmit);
}


function handleFormSubmit(event) {
    event.preventDefault();
    const data = {};
    data.login = loginInput.value;
    data.password = passwordInput.value;
    data.name = name.value;
    fetch(`${ADDRESS}/registration`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    }).then((res) => {
        const result = res.json()
        return result
    })
        .then(data => messageBlock.innerHTML = data.message)
        .then(document.location.href = "/login.html")
        .catch((error) => {
            console.log(`ошибка ${error}`)
        })

}

