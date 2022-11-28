import { ADDRESS } from "./constants.js";
import { validation, patternEmail, patternPassword, patternName } from './validation.js';

//inputs
const profileForm = document.querySelector('#profileForm');
const passwordForm = document.querySelector('#passwordForm');
const messageBlock = document.querySelector('.message');
const emailInput = document.querySelector('#email');
const name = document.querySelector('#username');
const pas = document.querySelector('#password-new');
const pas_repeat = document.querySelector('#password-new-repeat');
//buttons
const save_profile_btn = document.querySelector('#save-profile-button');
const save_password_btn = document.querySelector('#save-password-button');

let user_info;

getUserData();



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
}

if (name) {
    name.addEventListener('input', () => {
        checkField(name, validation(name, patternName));
        profileFormValidation();
    });
}

if (pas) {
    pas.addEventListener('input', () => {
        checkField(pas, validation(pas, patternPassword));
        passwordFormValidation();
    });
}

if (pas_repeat) {
    pas_repeat.addEventListener('input', () => {
        checkField(pas_repeat, pas_repeat.value == pas.value);
        passwordFormValidation();
    })
}

const profileFormValidation = () => {
    if (validation(name, patternName) && (name.value != user_info.name)) {
        save_profile_btn.removeAttribute('disabled');
    }
    else {
        save_profile_btn.setAttribute('disabled', 'disabled');
    }
}

// проверка заполнения всех полей ввода
const passwordFormValidation = () => {
    if (validation(pas, patternPassword) && pas_repeat.value == pas.value) {
        save_password_btn.removeAttribute('disabled');
    }
    else {
        save_password_btn.setAttribute('disabled', 'disabled');
    }
}

// отправка данных на бэк
if (profileForm) {
    profileForm.addEventListener('submit', handleProfileFormSubmit);
}

if (passwordForm) {
    passwordForm.addEventListener('submit', handlePasswordFormSubmit);
}

function handlePasswordFormSubmit(event) {
    event.preventDefault();
    user_info.password = pas.value;


    fetch(`${ADDRESS}/user/password`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('userToken'),
        },
        body: JSON.stringify(user_info)
    }).then((res) => res.json())
        .then(data => messageBlock.innerHTML = data.message)
        .catch((error) => {
            console.log(`ошибка ${error}`)
        })

}


function handleProfileFormSubmit(event) {
    event.preventDefault();
    user_info.name = name.value;


    fetch(`${ADDRESS}/user`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('userToken'),
        },
        body: JSON.stringify(user_info)
    }).then((res) => res.json())
        .then(data => messageBlock.innerHTML = data.message)
        .catch((error) => {
            console.log(`ошибка ${error}`)
        })

}


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
        // console.log(data);
        if (data.login === undefined) {
            // no response?
            document.location.href = "/404.html"
        }
        emailInput.value = data.login;
        name.value = data.name;
        user_info = data;
    }).catch((error) => {
        console.log(`ошибка ${error}`);
        document.location.href = "/404.html"
    })
}
