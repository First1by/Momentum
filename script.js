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
    	return 'day'
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


