const advices = [
    'Просто поморгайте в течение примерно двух минут. ' +
    'Важно делать это быстро, но без напряжения глазных мышц',
    'Водите открытыми глазами, повторяя силуэт цифры восемь. Повторите эти движения 5-7 раз',
    'Плавно двигайте глазами, будто рисуете в воздухе различные геометрические фигуры,' +
    ' вертикальные и горизонтальные дуги, букву S, стрелки, направленные в разные стороны',
    'Выберите несколько предметов, которые вас окружают. ' +
    'Обведите взглядом их контуры. Повторите упражнение 5-8 раз',
    'Зажмурьтесь на 3-5 секунд, после широко откройте глаза. Выполните упражнение 7-8 раз',
    'Совершайте круговые движения глазами. Сначала 10 раз по часовой стрелке, ' +
    'затем еще 10 раз – в противоположном направлении. После выполнения закройте глаза и отдохните в течение минуты',
    'Аккуратно помассируйте закрытые веки кончиками пальцев в течение минуты',
    'Плотно сомкните веки. Закройте глаза ладонями. Посидите так примерно минуту, ' +
    'потом уберите ладони от лица и откройте глаза. Повторите все 3-5 раз'
];

const adviceHTML = document.querySelector('.advice');
const changeAdviceBtn = document.querySelector('.change-advice');
const toggleAdvices = document.querySelector('.advice-toggle');
const toggleAdvicesBtn = document.querySelector('.advice-toggle-btn');

let i = 0;

const getAdvice = () => {
    if (i < advices.length) {
        adviceHTML.innerHTML = advices[i++];
    }else {
        i = 0;
        adviceHTML.innerHTML = advices[i++];
    }
}
const getToggleAdvices = () => {
    toggleQuotes.classList.toggle('hide-element');
    toggleAdvices.classList.toggle('hide-element');
}

getAdvice();

changeAdviceBtn.addEventListener('click', () => {
    getAdvice();
})
toggleAdvicesBtn.addEventListener('click', () => {
    getToggleAdvices();
})