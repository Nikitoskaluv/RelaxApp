let viewport = document.querySelector(".stereo_pictures_eyes__picture").offsetWidth;
let btnNext = document.getElementById("next");
let btnPrev = document.getElementById("prev");
let slider = document.querySelector("div.slider");
let viewSliders = document.querySelectorAll(".slide");
let viewSlide = 0;
 
let count = viewSliders.length;

btnNext.addEventListener("click", function () {
    // console.log('=>');
    if (viewSlide < count-1) { 
        viewSlide++;
    } else {
        viewSlide = 0;
    }
    // Меняем позицию всего слайда
    slider.style.left = -viewSlide * viewport + "px";
});
 
btnPrev.addEventListener("click", function () {
    // console.log('<=');
    if (viewSlide > 0) { 
        viewSlide--; 
    } else { 
        viewSlide = count-1; 
    }
    slider.style.left = -viewSlide * viewport + "px";
});
const modal = document.querySelector('#modalSlider');
const modalClose = document.querySelector('.modalSlider_close');
const modalSlider_content_img = document.querySelector('.modalSlider_content_img');

modalClose.addEventListener ('click', ()=>{
    modal.style.display = "none";
})
slider.addEventListener ('click', ()=> {
    console.log(viewSliders[viewSlide])
    let d = viewSliders[viewSlide].querySelector('img');
    document.body.style.overflow = 'hidden';
    modal.style.display = "block";
    modalSlider_content_img.innerHTML = ` <img src='${d.src}' width='100vh' class='modal-content'>`;
    // modalSlider_content_img.innerHTML = `<div class='modal-content'>
    //     <div class="stereo_pictures_eyes__button"><img src="../assets/img/stereo_left_arrow.png" alt="" id="prev"></div>
    //     <img src='${d.src}' width='100vh' class='modal-content__picture'>
    //     <div class="stereo_pictures_eyes__button"><img src="../assets/img/stereo_right_arrow.png" alt=""  id="next"></div>
    // </div>`;
})

window.onclick = function (event) {
    if (event.target ==modal)
    modal.style.display = "none";
    document.body.style.overflow='scroll';
}