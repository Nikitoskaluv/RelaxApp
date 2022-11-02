
import '../css/style.css'

const logoutButton = document.querySelector('.logout');
const loginButton = document.querySelector('.login');
const profileButton = document.querySelector('.profile_link');


logoutButton && logoutButton.addEventListener("click", (e) => {
    localStorage.removeItem('userToken')
    document.location.href = "/";
});


const token = localStorage.getItem('userToken');
if (token) {
    loginButton && (loginButton.style.display = 'none');
    logoutButton && (logoutButton.style.display = 'block');
    profileButton && (profileButton.style.display = 'block');
} else {
    loginButton && (loginButton.style.display = 'block');
    logoutButton && (logoutButton.style.display = 'none');
    profileButton && (profileButton.style.display = 'none');
}


