import { ADDRESS } from "./constants.js";
import {validation, patternEmail, patternPassword, patternName} from './validation.js';

const regForm = document.querySelector('#regform');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const messageBlock = document.querySelector('.message');
const name = document.querySelector('#name');
const pas=document.querySelector('#password');
const pas_repeat=document.querySelector('#password_repeat');
let flag = 0;

name.addEventListener ('input', () => {
    if (validation(name, patternName))
    {
        flag++;
        messageBlock.innerText = '';
    }
    else 
        messageBlock.innerText = name.title;
});

loginInput.addEventListener ('input', () => {
    if (validation(loginInput, patternEmail))
    {
        flag++;
        messageBlock.innerText = '';
    }
    else 
        messageBlock.innerText = loginInput.title;
});

pas.addEventListener ('input', () => {
   if ( validation(pas, patternPassword))
   {
        flag++;
        messageBlock.innerText = '';
    }
   else 
        messageBlock.innerText = pas.title;
});

pas_repeat.addEventListener ('input', () => {
    if (pas_repeat.value == pas.value) {
        pas_repeat.classList.add('valid');
        pas_repeat.classList.remove('invalid');
        flag++;
    }
    else {
        pas_repeat.classList.add('invalid');
        pas_repeat.classList.remove('valid');
        messageBlock.innerText = 'Пароли не совпадают';
    }
})

regForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    if (flag == 4){
        const data = {};
        data.login = loginInput.value;
        data.password = passwordInput.value;
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
            .catch((error) => {
                console.log(`ошибка ${error}`)
            })
        }
        else {
            messageBlock.innerHTML = "Заполните корректно все поля";

        }
}



