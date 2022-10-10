import { ADDRESS } from "./constants.js";

const logInForm = document.querySelector('#loginform');
const logInEmail = document.querySelector('#email');
const logInPassword = document.querySelector('#password');


logInForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault()
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
        .then(data => console.log(`Статус ${data.message}`))
        .catch((error) => {
            console.log(`ошибка ${error}`)
        })
}



