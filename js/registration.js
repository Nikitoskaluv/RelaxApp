import { ADDRESS } from "./constants.js";


const regForm = document.querySelector('#regform');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');




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
        console.log("res", res);
        return res.json()
    })
        .then(data => console.log(`Статус ${data}`))
        .catch((error) => {
            console.log(`ошибка ${error}`)
        })
}



