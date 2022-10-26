
import '../css/style.css'
import '../css/stylesRegistrationAndLogIn.css'

const logoutButton = document.querySelector('.logout');
const loginButton = document.querySelector('.login');
window.onload = () => {
    checkTokenExist();
};

function checkTokenExist() {
    const token = localStorage.getItem('userToken');
    if (token) {
        loginButton?.classList.add('isDisabled');
        logoutButton?.classList.remove('isDisabled');
    } else {
        loginButton?.classList.remove('isDisabled');
        logoutButton?.classList.add('isDisabled');

    }
}