const time = document.querySelector('.time');
const data = document.querySelector('.date');
const date = new Date();
const hours = date.getHours();
const currentTime = date.toLocaleTimeString();
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const currentDate = date.toLocaleDateString('en-EN', options);
const greeting = document.querySelector('.greeting');
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;
const name = document.querySelector('.name');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


showTime();

function showTime() {
  time.innerHTML = new Date().toLocaleTimeString();
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

function showDate() {
  data.innerHTML = new Date().toLocaleDateString('en-EN', options);
}

function getTimeOfDay() {
  switch(Math.floor(hours/6)) {
    case 0:
    	return 'night'
    break;
    case 1:
    	return 'morning'
    break;
    case 2:
    	return 'afternoon'
    break;
    case 3:
    	return 'evening'
    break;
  }
}

function showGreeting () {
  greeting.innerHTML = greetingText;
}

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);


let resultNumPicture = bgNum();

function getRandomNum() { 
  
   randomNum = Math.floor(Math.random()*20);
   return randomNum;
}

function bgNum() {
    let resultNumRandom = getRandomNum();
    if(resultNumRandom != 0) {
        return String(resultNumRandom).padStart(2, "0");
    } else {
        return String(resultNumRandom + 1).padStart(2, "0");
    }
}

setBg1();

function setBg1() {
    getRandomNum();
    bgNum();
    const img = new Image();
img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum()}.jpg`;
img.onload = () => {
document.body.style.backgroundImage = `url(${img.src})`;
	};
    
    setTimeout(setBg1, 3000);
}

function setBg() {
  let a = '';

  if(randomNum != 0) {
    a = String(randomNum).padStart(2, "0");
} else {
     a = String(randomNum + 1).padStart(2, "0");
}
const img = new Image();
img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${a}.jpg`;
img.onload = () => {
document.body.style.backgroundImage = `url(${img.src})`;
	};
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

function getSlideNext() {
    if(randomNum < 20) {
      randomNum = randomNum + 1;
    } else if (randomNum === 20) {
      randomNum = 1;
    }
    setBg();
}

function getSlidePrev() {
    if(randomNum > 1) {
      randomNum = randomNum - 1;
    } else if (randomNum === 0) {
      randomNum = 20;
    }
  setBg();
}
