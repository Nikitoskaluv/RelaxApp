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
        console.log("res", res);
        return res.json()
    })
        .then(data => console.log(`Статус ${data}`))
        .catch((error) => {
            console.log(`ошибка ${error}`)
        })
}



