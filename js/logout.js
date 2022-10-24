const logoutButton = document.querySelector('.logout');
const loginButton = document.querySelector('.login');
const submit_btn = document.querySelector('.loginButton');
const messageBlock = document.querySelector('.message');

check();
logoutButton.addEventListener('click', logout);
function check() {
    const token = localStorage.getItem('userToken');
    if (token) {
        logoutButton.classList.add('visible');
        logoutButton.classList.remove('invisible');
        loginButton.classList.add('isDisabled');
    } else {
        if (submit_btn) {
            submit_btn.removeAttribute('disabled');
        }
        logoutButton.classList.add('invisible');
        logoutButton.classList.remove('visible');
        loginButton.classList.remove('isDisabled');
    }
}


function logout() {
    localStorage.setItem('userToken', '');
    logoutButton.classList.add('isDisabled');
    loginButton.classList.remove('isDisabled');
    alert("Вы хотите выйти из профиля");
    if (messageBlock) {
        messageBlock.innerHTML = ""
    }
    check();
}