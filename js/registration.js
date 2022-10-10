import { ADDRESS } from "./constants.js";


const regForm = document.querySelector('#regform');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const messageBlock = document.querySelector('.message');



regForm.addEventListener('submit', handleFormSubmit);


function handleFormSubmit(event) {
    event.preventDefault()
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



