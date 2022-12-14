import { ADDRESS } from "./constants.js";
import { validation, patternEmail, patternPassword } from './validation.js';

const logInForm = document.querySelector('#loginform');
const logInEmail = document.querySelector('#email');
const logInPassword = document.querySelector('#password');
const messageBlock = document.querySelector('.message');
const submit_btn = document.querySelector('.loginButton');



logInEmail.addEventListener('input', () => {
    if (validation(logInEmail, patternEmail)) {
        logInEmail.classList.add('valid');
        logInEmail.classList.remove('invalid');
        messageBlock.innerText = '';
    }
    else {
        logInEmail.classList.add('invalid');
        logInEmail.classList.remove('valid');
        messageBlock.innerText = 'не верный email';
    }
    check();
});


if (logInPassword) {
    logInPassword.addEventListener('input', () => {
        if (validation(logInPassword, patternPassword)) {
            logInPassword.classList.add('valid');
            logInPassword.classList.remove('invalid');
            messageBlock.innerText = '';
        }
        else {
            logInPassword.classList.add('invalid');
            logInPassword.classList.remove('valid');
            messageBlock.innerText = 'не верный пароль';
        }
        check();
    });
}


const check = () => {
    if (validation(logInEmail, patternEmail) && validation(logInPassword, patternPassword)) {
        submit_btn.removeAttribute('disabled');
    }
    else {
        submit_btn.setAttribute('disabled', 'disabled');
    }
}

// checkEmailInput(logInEmail));
if (logInForm) {
    logInForm.addEventListener('submit', handleFormSubmit);

}

function handleFormSubmit(event) {
    event.preventDefault();

    const data = {};
    data.login = logInEmail.value;
    data.password = logInPassword.value;

    fetch(`${ADDRESS}/auth`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    }).then(r => r.json().then(data => ({ status: r.status, body: data })))
        .then(data => {
            if (data.status !== 200) {
                messageBlock.innerHTML = data.body.message;
            } else {
                localStorage.setItem('userToken', data.body.token);
                document.location.href = "/";
            }
        })
        .catch((error) => {
            console.log(`ошибка ${error}`)
        })
}



