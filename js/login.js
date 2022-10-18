import { ADDRESS } from "./constants.js";
import {validation, patternEmail,patternPassword} from './validation.js';

const logInForm = document.querySelector('#loginform');
const logInEmail = document.querySelector('#email');
const logInPassword = document.querySelector('#password');
const messageBlock = document.querySelector('.message');
const submit_btn = document.querySelector('.loginButton');

logInEmail.addEventListener('input',  () =>{
    if (validation(logInEmail, patternEmail))
    {
        logInEmail.classList.add('valid');
        logInEmail.classList.remove('invalid');
        messageBlock.innerText = '';
    }
    else 
    {
        logInEmail.classList.add('invalid');
        logInEmail.classList.remove('valid');
        messageBlock.innerText = logInEmail.title;
    }
    check();
});

logInPassword.addEventListener('input', () =>{
    if (validation(logInPassword, patternPassword))
    {
        logInPassword.classList.add('valid');
        logInPassword.classList.remove('invalid');
        messageBlock.innerText = '';
    }
    else 
    {
        logInPassword.classList.add('invalid');
        logInPassword.classList.remove('valid');
        messageBlock.innerText = logInPassword.title;  
    }
        check();
});

const check = () =>{
    if ( validation(logInEmail, patternEmail) && validation(logInPassword, patternPassword))  
    {
        submit_btn.removeAttribute('disabled');
    }
    else {
        submit_btn.setAttribute('disabled', 'disabled');
    }
}

// checkEmailInput(logInEmail));

logInForm.addEventListener('submit', handleFormSubmit);

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



