import { ADDRESS } from "./constants.js";
import { validation, patternEmail, patternPassword, patternName } from './validation.js';

//inputs
const profileForm = document.querySelector('#profileForm');
const messageBlock = document.querySelector('.message');
const emailInput = document.querySelector('#email');
const name = document.querySelector('#username');
const pas = document.querySelector('#password-new');
const pas_repeat = document.querySelector('#password-new-repeat');
//buttons
const save_btn = document.querySelector('#save-button');
const change_btn = document.querySelector('#change-button');

let user_info = {
    'login': 'user@mail.ru',
    'name': 'username'
}
window.addEventListener('load', getUserData());

change_btn.addEventListener('click', change);

function change() {
    name.disabled = false
    emailInput.disabled = false
    pas.disabled = false
    pas_repeat.disabled = false
    check();
}

//валидации
const checkField = (elem, value) => {

    if (value) {
        elem.classList.add('valid');
        elem.classList.remove('invalid');
        messageBlock.innerText = '';
        // console.log('valid');
    }
    else {
        elem.classList.add('invalid');
        elem.classList.remove('valid');
        messageBlock.innerText = elem.title;
        // console.log('invalid');
    }
    check();
}

if (name) {
    name.addEventListener('input', () => {
        checkField(name, validation(name, patternName));
    });
}

if (emailInput) {
    emailInput.addEventListener('input', () => {
        checkField(emailInput, validation(emailInput, patternEmail));
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
    if (validation(name, patternName) && validation(emailInput, patternEmail) && validation(pas, patternPassword) &&
        pas_repeat.value == pas.value && (name.value != user_info.name || emailInput.value != user_info.login || pas.value != user_info.password)) {
        save_btn.removeAttribute('disabled');

    }
    else {
        save_btn.setAttribute('disabled', 'disabled');
    }
}

// отправка данных на бэк
if (profileForm) {
    profileForm.addEventListener('submit', handleFormSubmit);
}


function handleFormSubmit(event) {
    event.preventDefault();
    user_info.name = name.value;
    user_info.password = pas.value;
    user_info.login = emailInput.value;
    // console.log(user_info);
    // fetch(`${ADDRESS}/registration`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    //     body: JSON.stringify(data)
    // }).then((res) => {
    //     const result = res.json()
    //     return result
    // })
    //     .then(data => messageBlock.innerHTML = data.message)
    //     .catch((error) => {
    //         console.log(`ошибка ${error}`)
    //     })

}

window.onload(getUserData());

function getUserData() {
    fetch(`${ADDRESS}/user`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('userToken'),
        },
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        emailInput.value = data.login;
        name.value = data.name;
        return data;
    }).catch((error) => {
        console.log(`ошибка ${error}`)
    })
}