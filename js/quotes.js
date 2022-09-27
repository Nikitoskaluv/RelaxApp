
const quotes = [
    'Все, что я ищу, я нахожу',
    'У меня много блестящих идей',
    'Я достигаю целей, поставленных мне на работе',
    'Я получаю удовольствие от рабочего процесса',
    'Каждый день передо мной открываются новые возможности',
    'Мой опыт дает огромные преимущества',
    'Я всегда остаюсь уравновешенным во время стрессовых ситуаций'
];
const quoteHTML = document.querySelector('.quote');
const changeQuoteBtn = document.querySelector('.change-quote');
const toggleQuotes = document.querySelector('.quote-toggle');
const toggleQuotesBtn = document.querySelector('.quote-toggle-btn');

const getQuote = () => {
    if (quotes.length > 0) {
        let index = Math.floor(Math.random() * (quotes.length));
        quoteHTML.innerHTML = quotes[index];
    }
}
const getToggleQuotes = () => {
    toggleQuotes.classList.toggle('hide-element');
    toggleAdvices.classList.toggle('hide-element');
}

getQuote();

changeQuoteBtn.addEventListener('click', () => {
    getQuote();
})
toggleQuotesBtn.addEventListener('click', () => {
    getToggleQuotes();
})


