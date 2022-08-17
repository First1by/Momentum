//https://rolling-scopes-school.github.io/kislen-JSFEPRESCHOOL2022Q2/momentum
import playList from './playList.js';


const timeHolder = document.querySelector('.time');
const dateHolder = document.querySelector('.date');
const greetingHolder = document.querySelector('.greeting');
const nam = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

// weather переменные
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');


getLocalStorage();
//переменные для цитат
const changingQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

//переменные для аудиоплеера
let isPlay = false;
const audio = new Audio();
const playButton = document.querySelector('.play');
const prevPlayButton = document.querySelector('.play-prev');
const nextPlayButton = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
let playNum = 0;

// переменные для определения времени дня
const goodMorning = ['Good morning', 'Доброе утро', 'Добрай раніцы'];
const goodAfternoon = ['Good afternoon', 'Добрый день', 'Добры дзень'];
const goodEvning = ['Good evening', 'Добрый вечер', 'Добры вечар'];
const goodNight = ['Good night', 'Доброй ночи', 'Дабранач'];

let randomNum;
let timeOfDay = '';

playList.forEach(e => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = e.title;
    playListContainer.append(li);
})
const playlistItems = document.querySelectorAll('.play-item');



function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeHolder.innerHTML = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString('ru-RU', options);
    dateHolder.innerHTML = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        timeOfDay = 'morning';
        return goodMorning[1];

    }
    else if (hours >= 12 && hours < 18) {
        timeOfDay = 'afternoon';
        return goodAfternoon[1];
    }
    else if (hours >= 18 && hours < 24) {
        timeOfDay = 'evening';
        return goodEvning[1];
    }
    else {
        timeOfDay = 'night';
        return goodNight[1];
    }
}

function showGreeting() {
    let greeting = getTimeOfDay();
    greetingHolder.innerHTML = greeting;
}

function getRandomNumber() {
    randomNum = Math.ceil(Math.random() * 20);
}

function setBg() {
    let bgNum = randomNum.toString().padStart(2, 0);
    let urlBackground = `https://raw.githubusercontent.com/Kislen/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    const img = new Image();
    img.src = urlBackground;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`;
    };
}

function getSlideNext() {
    (randomNum === 20) ? randomNum = 1 : randomNum++;
    setBg();
}
function getSlidePrev() {
    (randomNum === 1) ? randomNum = 20 : randomNum--;
    setBg();
}

function setLocalStorage() {
    localStorage.setItem('name', nam.value);
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nam.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather();
    }
    else { city.value = 'Minsk'; getWeather(); }
}

async function getWeather() {
    try {
        weatherError.textContent = '';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=55d4184e0b679ed26487c509ef7eb15e&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    } catch {
        weatherError.textContent = 'ошибка загрузки';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
}
function setCity(event) {
    if (event.code === 'Enter') {
        if (city.value === '') { city.value = 'Minsk'; }
        getWeather();
        city.blur();
    }
}
async function getQuotes() {
    const quotes = 'https://type.fit/api/quotes';
    const res = await fetch(quotes);
    const data = await res.json();
    let randomQuot = Math.floor(Math.random() * data.length);
    quote.textContent = data[randomQuot].text;
    author.textContent = data[randomQuot].author;
}

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if (!isPlay) {
        audio.play();
        isPlay = true;
        if (!playButton.classList.contains('pause')) {
            playButton.classList.add('pause');
        };
    }
    else {
        audio.pause();
        isPlay = false;
        playButton.classList.remove('pause');
    }
}
function playNext() {
    (playNum === playList.length - 1) ? playNum = 0 : playNum++;
    isPlay = false;
    playAudio();
}
function playPrev() {
    (playNum === 0) ? playNum = playList.length - 1 : playNum--;
    isPlay = false;
    playAudio();
}

function changeStylePlayngTrack() {
    for (let e of playlistItems) {
        if (e.classList.contains('item-active')) { e.classList.remove('item-active'); }
    }
    playlistItems[playNum].classList.add('item-active');
}



city.addEventListener('keypress', setCity);
document.addEventListener('DOMContentLoaded', getWeather);

getQuotes();
getRandomNumber();
showTime();
setBg();
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
changingQuote.addEventListener('click', getQuotes);
playButton.addEventListener('click', playAudio);
nextPlayButton.addEventListener('click', playNext);
prevPlayButton.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);
audio.addEventListener('play', changeStylePlayngTrack);



//https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=55d4184e0b679ed26487c509ef7eb15e&units=metric
