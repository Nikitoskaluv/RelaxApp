import { ADDRESS } from "./constants.js";
import { validation, patternEmail, patternPassword, patternName } from './validation.js';

//inputs
const profileForm = document.querySelector('#profileForm');
const messageBlock = document.querySelector('.message');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const newPasswordInput = document.querySelector('#password-new');
const repeatNewPasswordInput = document.querySelector('#password-new-repeat');
const name = document.querySelector('#username');
const pas = document.querySelector('#password-new');
const pas_repeat = document.querySelector('#password-new-repeat');
//buttons
const save_btn = document.querySelector('#save-button');
const change_btn = document.querySelector('#change-button');


//clicks on buttons
save_btn.addEventListener('click', submit);
change_btn.addEventListener('click', change);
//

function submit(){
    usernameInput.disabled = true
    emailInput.disabled = true
    newPasswordInput.disabled = true
    repeatNewPasswordInput.disabled = true
    console.log(usernameInput.value, '-username')
    console.log(emailInput.value, '-email')
    console.log(newPasswordInput.value, '-new password')
    console.log(repeatNewPasswordInput.value, '-new password repeated')
    debugger
}

function change(){
    debugger
    usernameInput.disabled = false
    emailInput.disabled = false
    newPasswordInput.disabled = false
    repeatNewPasswordInput.disabled = false
}

//валидации
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

if (usernameInput) {
    usernameInput.addEventListener('input', () => {
        checkField(usernameInput, validation(usernameInput, patternEmail));
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
    if (validation(name, patternName) && validation(usernameInput, patternEmail) && validation(pas, patternPassword) &&
        pas_repeat.value == pas.value) {
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
    const data = {};
    data.login = usernameInput.value;
    data.password = newPasswordInput.value;
    console.log(data.login, 'login')
    console.log(data.password, 'password')
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
