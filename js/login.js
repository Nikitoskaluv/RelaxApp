import { ADDRESS } from "./constants.js";
import {validation, patternEmail,patternPassword} from './validation.js';

const logInForm = document.querySelector('#loginform');
const logInEmail = document.querySelector('#email');
const logInPassword = document.querySelector('#password');
const messageBlock = document.querySelector('.message');

let flag = 0;

logInEmail.addEventListener('input',  () =>{
    if (validation(logInEmail, patternEmail))
    {
        flag++;
        messageBlock.innerText = '';
    }
    else 
        messageBlock.innerText = logInEmail.title;
});

logInPassword.addEventListener('input', () =>{
    if (validation(logInPassword, patternPassword))
    {
        flag++;
        messageBlock.innerText = '';
    }
    else 
        messageBlock.innerText = logInPassword.title;
});

// checkEmailInput(logInEmail));

logInForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    if (flag==2) {
        const data = {};
        data.login = logInEmail.value;
        data.password = logInPassword.value;

        fetch(`${ADDRESS}/auth`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
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
}



