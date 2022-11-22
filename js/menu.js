const menu = document.querySelector("#menu");
const drop = document.querySelector("#drop");
const active = document.querySelector("#active");
const hidden = document.querySelector(".burger__hidden");

function openMenu() {
    if (menu.addEventListener("click", () => {
        toggleMenu()
    }));
}

function menuExit() {
    if (active.addEventListener("click", () => {
        toggleMenu()
    }));
}

function toggleMenu() {
    hidden.classList.toggle("burger__hidden");
    drop.classList.toggle("drop");
    active.classList.toggle("active-menu");
}

menu.onclick = openMenu();
active.onclick = menuExit();