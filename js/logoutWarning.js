const logoutButton = document.querySelector('.logout');
const loginButton = document.querySelector('.login');
const profileButton = document.querySelector('.profile_link');
const logoutWarningCofBtn = document.querySelector('.logout-warning-continue');
const logoutWarning = document.querySelector('.logout-warning')
const logoutWarningCancelBtn = document.querySelector('.logout-warning-cancel')

logoutWarningCofBtn.addEventListener("click",()=>{
    localStorage.removeItem('userToken')
    document.location.href = "/";
})
logoutWarningCancelBtn.addEventListener("click", ()=>{
    logoutWarning.classList.remove('logout-warning-show')
})


logoutButton && logoutButton.addEventListener("click", (e) => {
    logoutWarning.classList.add('logout-warning-show')

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
