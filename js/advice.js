// const advices = [
//     'Просто поморгайте в течение примерно двух минут. ' +
//     'Важно делать это быстро, но без напряжения глазных мышц',
//     'Водите открытыми глазами, повторяя силуэт цифры восемь. Повторите эти движения 5-7 раз',
//     'Плавно двигайте глазами, будто рисуете в воздухе различные геометрические фигуры,' +
//     ' вертикальные и горизонтальные дуги, букву S, стрелки, направленные в разные стороны',
//     'Выберите несколько предметов, которые вас окружают. ' +
//     'Обведите взглядом их контуры. Повторите упражнение 5-8 раз',
//     'Зажмурьтесь на 3-5 секунд, после широко откройте глаза. Выполните упражнение 7-8 раз',
//     'Совершайте круговые движения глазами. Сначала 10 раз по часовой стрелке, ' +
//     'затем еще 10 раз – в противоположном направлении. После выполнения закройте глаза и отдохните в течение минуты',
//     'Аккуратно помассируйте закрытые веки кончиками пальцев в течение минуты',
//     'Плотно сомкните веки. Закройте глаза ладонями. Посидите так примерно минуту, ' +
//     'потом уберите ладони от лица и откройте глаза. Повторите все 3-5 раз'
// ];

// const quotes = [
//     'Все, что я ищу, я нахожу',
//     'У меня много блестящих идей',
//     'Я достигаю целей, поставленных мне на работе',
//     'Я получаю удовольствие от рабочего процесса',
//     'Каждый день передо мной открываются новые возможности',
//     'Мой опыт дает огромные преимущества',
//     'Я всегда остаюсь уравновешенным во время стрессовых ситуаций'
// ];

// const quoteBlock = document.querySelector('.quote');

// const changeQuoteBtn = document.querySelector('.change-quote');

// const advicesBtn = document.querySelector('.advice-toggle-btn');
// const quotesBtn = document.querySelector('.quote-toggle-btn');

// let quoteIndex = 0;
// let adviceIndex = 0;

// quoteBlock.innerHTML = advices[0];

// advicesBtn.addEventListener('click', () => {
//     adviceIndex++;
//     if (adviceIndex >= advices.length) {
//         adviceIndex = 0;
//     }

//     quoteBlock.innerHTML = advices[adviceIndex];
// });

// quotesBtn.addEventListener('click', () => {
//     quoteIndex++;
//     if (quoteIndex >= quotes.length) {
//         quoteIndex = 0;
//     }

//     quoteBlock.innerHTML = quotes[quoteIndex];
// });

