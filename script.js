//https://rolling-scopes-school.github.io/uttake-JSFEPRESCHOOL2022Q2/momentum/
const time = document.querySelector('.time')
const date = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const weatherIcon = document.querySelector('.weather-icon')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
let languages = 'en'
let apiChange = true
let daysEn = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Sunday']

let daysRu = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота']


    

// Time
function showTime() {
 const date = new Date()
 const currenTime = date.toLocaleTimeString()
 time.textContent = currenTime
 setTimeout(showTime, 1000)
 showDate()
 showGreeting()
}

showTime()
function showDate() {
 const nowDate = new Date();
 const day = nowDate.getDay()
 const options = {month: 'long', day: 'numeric'};
 if(languages == 'en') {
  const currentDateEn = nowDate.toLocaleDateString('en-En', options);
  date.textContent = `${daysEn[day]}, ${currentDateEn}` 
 } else if (languages == 'ru') {
  const currentDateRu = nowDate.toLocaleDateString('ru-Ru', options);
  date.textContent = `${daysRu[day]}, ${currentDateRu}`
 }
 
}

// Time


// Time of day

function getTimeOfDay() {
 const date = new Date()
 const hours = date.getHours()
  if (hours >= 0 && hours < 6) {
    return 'night' 
}
  else if(hours >= 6 && hours < 12) {
    return 'morning'
} else if (hours >= 12 && hours < 18) {
    return 'afternoon'
} else if (hours >= 18 && hours < 24) {
    return 'evening'
}
}

function getTimeOfDayRu() {
  const date = new Date()
  const hours = date.getHours()
   if (hours >= 0 && hours < 6) {
     return 'ночи' 
 }
   else if(hours >= 6 && hours < 12) {
     return 'утро'
 } else if (hours >= 12 && hours < 18) {
     return 'день'
 } else if (hours >= 18 && hours < 24) {
     return 'вечер'
 }
 }

 if(languages == 'en') {
  getTimeOfDay()
 } else if (languages == 'ru') {
  getTimeOfDayRu() 
 }

// Time of day

// Greeting
function placeHolderName() {
  if(languages == 'en') {
    name.placeholder = '[Enter name]'
  } else if (languages == 'ru'){
    name.placeholder = '[Введите имя]'
  }
}

placeHolderName()

function showGreeting() {
  if (languages == 'en') {
    greeting.textContent = `Good ${getTimeOfDay()}, `
  } else if(languages == 'ru') {
    if(getTimeOfDayRu() == 'утро') {
      greeting.textContent = `Доброе ${getTimeOfDayRu()}, `
    } else if (getTimeOfDayRu() == 'ночи') {
      greeting.textContent = `Доброй ${getTimeOfDayRu()}, `
    } else {
      greeting.textContent = `Добрый ${getTimeOfDayRu()}, `
    }
  }
  }
   
// Greeting

// Slaider

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNum
}
//https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/evening/04.jpg

const body = document.querySelector('body')
const slidePrev = document.querySelector('.slide-prev')
const sliderNext = document.querySelector('.slide-next')
let randomNum = getRandomNum(1, 20)

let timeOfDays = getTimeOfDay()
function setBg() {
  let timeOfDay = getTimeOfDay()
  let bgNum = randomNum.toString().padStart(2, '0')
  apiChange = false
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = () => {      
  body.style.backgroundImage = `url(${img.src})`
  }
}
setBg()



function getSliderNext() {
if(apiChange) {
  getLinkToImage()
  getQuotes()
} else {
  randomNum < 20 ? randomNum++ : randomNum = 1
  setBg()
  getQuotes()
}


}

function getSliderPrev() {
  if(apiChange) {
    getLinkToImage()
    getQuotes()
  } else {
    randomNum > 1 ? randomNum-- : randomNum = 20
    setBg()
    getQuotes()
  }
}

sliderNext.addEventListener('click', getSliderNext)
slidePrev.addEventListener('click', getSliderPrev)


// Slaider


// Weather

city.value = 'Minsk'
  async function getWeather() { 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${languages}&appid=2a93cae1bc856f2c1ee3c6b7d8226eb6&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf'; 
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if(languages == 'en') {
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`
    } else if (languages == 'ru') {
    wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`
    humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`
    }
}
getWeather()


city.addEventListener('change', () => {
  if(city.value == '') {
    alert('Некорректные данные')
  } else {
    getWeather()
  }
})


// Weather


// Qoute

const quote = document.querySelector('.quote')
const authors = document.querySelector('.author')
const btn = document.querySelector('.change-quote')

async function getQuotes() {  
  const quotes = 'https://favqs.com/api/qotd';
  const res = await fetch(quotes);
  const data = await res.json();
  quote.textContent = data.quote.body
  authors.textContent = data.quote.author
}
getQuotes();

btn.addEventListener('click', () => {
  getQuotes()
  btn.classList.toggle('change-quote-active')
  
})

// Qoute


// Player

const player = document.querySelector('.player')
const playPause = document.querySelector('.play')
const songName = document.querySelector('.song__name')
const songArtist = document.querySelector('.song__artist')
const nextTrackBtn = document.querySelector('.play-next')
const prevTrackBtn = document.querySelector('.play-prev')
const timeRange = document.querySelector('.time__range')
const volumeRange = document.querySelector('.volume__range')
const playList = document.querySelector('.play-list')
const muted = document.querySelector('.volume')

let currTrack = document.createElement('audio')
let currenTime = document.querySelector('.current__time')
let totalDuration = document.querySelector('.total__duration')

let trackIndex = 0
let isPlaying = false
let updateTimer
const musicList = [
  {
    name: 'Aqua Caelestis',
    artist: 'Aqua Caelestis',
    music : './assets/sounds/Aqua Caelestis.mp3',
    duration: '00:39',
    id: '0'
  },

  {
    name: 'Ennio Morricone',
    artist: 'Ennio Morricone',
    music : './assets/sounds/Ennio Morricone.mp3',
    duration: '01:37',
    id: '1'
  },
  {
    name: 'River Flows In You',
    artist: 'River Flows In You',
    music : './assets/sounds/River Flows In You.mp3',
    duration: '01:37',
    id: '2'
  },
  
  {
    name: 'Summer Wind',
    artist: 'Summer Wind',
    music : './assets/sounds/Summer Wind.mp3',
    duration: '01:50',
    id:'3'
  }
]



  musicList.forEach(el => {
  const li = document.createElement('li')
  li.classList.add('play-item')
  li.name = el.name
  li.artist = el.artist
  li.textContent = el.name
  li.src = el.music
  li.id = el.id
  const span = document.createElement('span')
  span.classList.add('duration')
  span.textContent= el.duration
  playList.append(li)
  li.append(span)
  })


const liItem = document.querySelectorAll('.play-item')
playList.addEventListener('click', PlayAudioFromPlayList)
function PlayAudioFromPlayList(e) {
  if(e.target.classList.contains('play-item_active')) { 
    if(isPlaying){
      e.target.classList.remove('play-item_active')
      currTrack.pause()
      isPlaying = false
      playPause.classList.remove('pause')
    }else{
      e.target.classList.add('play-item_active')
      currTrack.play()
      isPlaying = true
      playPause.classList.add('pause')
    }
  }
    else {
      liItem.forEach((el) => {
        el.classList.remove('play-item_active')
      })
      let id = e.target.id
      e.target.classList.add('play-item_active')
      songArtist.textContent = musicList[id].artist
      songName.textContent = musicList[id].name
      currTrack.src = musicList[id].music
      currTrack.play()
      isPlaying = true
      playPause.classList.add('pause')
    } 
}

loadTrack(trackIndex)
 
function loadTrack(trackIndex) {
  clearInterval(updateTimer)
  reset()

  currTrack.src = musicList[trackIndex].music
  currTrack.load()

  songArtist.textContent = musicList[trackIndex].artist
  songName.textContent = musicList[trackIndex].name
  updateTimer = setInterval(setUpdate, 1000)
  currTrack.addEventListener('ended', nextTrack)
}



function reset() {
  currenTime.textContent = '00:00'
  totalDuration.textContent = '00:00'
  timeRange.value = 0
}


function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack()
}
function playTrack() {
  currTrack.src = musicList[trackIndex].music
  currTrack.play()
  isPlaying = true
  playPause.classList.add('pause')
  for(let i = 0; i < liItem.length; i++) {
    if(i == trackIndex) {
      liItem[i].classList.add('play-item_active')
    }
  }
}


function pauseTrack() {
currTrack.pause()
isPlaying = false
playPause.classList.remove('pause')
liItem.forEach(el => {
  el.classList.remove('play-item_active')
})
}

function nextTrack() {
  if(trackIndex < musicList.length - 1) {
    trackIndex++
    for(let i = 0; i < liItem.length; i++) {
      if(i == trackIndex) {
        liItem[i - 1].classList.remove('play-item_active')
      }
    }
  } else {
    trackIndex = 0
    for(let i = 0; i < liItem.length; i++) {
      if(i == trackIndex) {
        liItem[i + 3].classList.remove('play-item_active')
      }
    }
  }
  
  loadTrack(trackIndex)
  playTrack()
}

function prevTrack() {
  if(trackIndex > 0) {
    trackIndex--
    for(let i = 0; i < liItem.length; i++) {
      if(i == trackIndex) {
        liItem[i + 1].classList.remove('play-item_active')
      }
    }
  } else {
    trackIndex = musicList.length - 1
    for(let i = 0; i < liItem.length; i++) {
      if(i == trackIndex) {
        liItem[i - 3].classList.remove('play-item_active')
      }
    }
  }
  loadTrack(trackIndex)
  playTrack()
}

function seekTo() {
  let seek = currTrack.duration * (timeRange.value / 100)
  currTrack.currentTime = seek
}

function setVolume() {
  currTrack.volume = volumeRange.value / 100
  if(currTrack.volume == 0) {
    muted.classList.add('volume_mute')
  } else {
    muted.classList.remove('volume_mute')
  }
}

function setUpdate() {
  let seekPosition = 0
  if(!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100/ currTrack.duration)
    timeRange.value = seekPosition

    let currentMinute = Math.floor(currTrack.currentTime / 60)
    let currentSeconds = Math.floor(currTrack.currentTime - currentMinute * 60)
    let durationsMinute = Math.floor(currTrack.duration / 60)
    let durationsSeconds = Math.floor(currTrack.duration - durationsMinute * 60)
    if(currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }
    if(durationsSeconds < 10) {
      durationsSeconds = `0${durationsSeconds}`
    }
    if(currentMinute < 10) {
      currentMinute = `0${currentMinute}`
    }
    if(durationsMinute < 10) {
      durationsMinute = `0${durationsMinute}`
    }

    currenTime.textContent = `${currentMinute}:${currentSeconds}`
    totalDuration.textContent = `${durationsMinute}:${durationsSeconds}`
  }
}
let volumeNow = volumeRange.value 
muted.addEventListener('click', () => {
  if(currTrack.muted) {
    muted.classList.remove('volume_mute')
    currTrack.muted = false
  } else  {
    currTrack.muted = true
    muted.classList.add('volume_mute')
  }
  
})

// Translate
const langRu = document.querySelector('.lang_ru')
const langEn = document.querySelector('.lang_en')
const labelEn = document.querySelectorAll('.label__en')
const labelRu = document.querySelectorAll('.label__ru')
const chooseLanguageRu = document.querySelector('.choose_ru')
const chooseLanguageEn = document.querySelector('.choose_en')
const checkTitleEn = document.querySelector('.checkbox__titleEn')
const checkTitleRu = document.querySelector('.checkbox__titleRu')
const apiCloseRu = document.querySelector('.api__closeRu')
const apiCloseEn = document.querySelector('.api__closeEn')
const apiTitleEn = document.querySelector('.api_titleEn')
const apiTitleRu = document.querySelector('.api_titleRu')


function changeLabel() {
if(languages == 'en') {
  labelEn.forEach(el => {
    el.classList.add('label__en-active')
  })
  labelRu.forEach(el => {
    el.classList.remove('label__ru-active')
  })
} else {
  labelEn.forEach(el => {
    el.classList.remove('label__en-active')
  })
  labelRu.forEach(el => {
    el.classList.add('label__ru-active')
  })
}
}
function chooseLang() {
  if(languages == 'en') {
    chooseLanguageEn.classList.add('choose_en-active')
    chooseLanguageRu.classList.remove('choose_ru-active')
    apiCloseEn.classList.add('api__closeEn-active')
    apiCloseRu.classList.remove('api__closeRu-active')
    apiTitleEn.classList.add('api_titleEn-active')
    apiTitleRu.classList.remove('api_titleRu-active')
  } else {
    chooseLanguageEn.classList.remove('choose_en-active')
    chooseLanguageRu.classList.add('choose_ru-active')
    apiCloseEn.classList.remove('api__closeEn-active')
    apiCloseRu.classList.add('api__closeRu-active')
    apiTitleEn.classList.remove('api_titleEn-active')
    apiTitleRu.classList.add('api_titleRu-active')
  }
}
function checkLang() {
  if(languages == 'en') {
    checkTitleEn.classList.add('checkbox__titleEn_active')
    checkTitleRu.classList.remove('checkbox__titleRu-active')
  } else {
    checkTitleEn.classList.remove('checkbox__titleEn_active')
    checkTitleRu.classList.add('checkbox__titleRu-active')
  }
}
changeLabel()
chooseLang()
checkLang()

function ruLanguage(e) {
  e.preventDefault()
  languages = 'ru'
  getWeather()
  showGreeting()
  placeHolderName()
  changeLabel()
  chooseLang()
  checkLang()
}
function engLanguage(e) {
  e.preventDefault()
  languages = 'en'
  getWeather()
  showGreeting()
  placeHolderName()
  changeLabel()
  chooseLang()
  checkLang()
 }
langRu.addEventListener('click', ruLanguage)
langEn.addEventListener('click', engLanguage)



// Translate



// Unsplash
const bgApi = document.querySelector('.apiName')
const apiAdd = document.querySelector('.api__add')
if(bgApi.value == '') {
  bgApi.value = getTimeOfDay()
}
async function getLinkToImage() {
  apiChange = true
  const url = `https://api.unsplash.com/photos/random?query=${bgApi.value}&client_id=rbNA23v7pUAgmQ4srr7vIiHVESr07ZfIwViZJldQH0E`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image()
  img.src = data.urls.regular
  img.onload = () => {
    body.style.backgroundImage = `url(${data.urls.regular})`
  }
  
 }

apiAdd.addEventListener('click', getLinkToImage)
bgApi.addEventListener('keydown', (e) => {
  if(e.keyCode == 13) {
    getLinkToImage()
    e.preventDefault()
    return false
  }
})
function closeApi() {
  apiChange = false
  setBg()
}
apiCloseEn.addEventListener('click', closeApi)
apiCloseRu.addEventListener('click', closeApi)
// Settings 


const timeHid = document.querySelector('.time_check')
const dateHid = document.querySelector('.date_check')
const greetid = document.querySelector('.greet_check')
const quoteHid = document.querySelector('.quote_check')
const weatherHid = document.querySelector('.weather_check')
const playerHid = document.querySelector('.player_check')
const settings = document.querySelector('.wrapper__settings')
const settingBtn = document.querySelector('.setting-ico')




timeHid.addEventListener('change', timeHidden)
dateHid.addEventListener('change', dateHidden)
greetid.addEventListener('change', greetHidden)
quoteHid.addEventListener('change', quoteHidden)
weatherHid.addEventListener('change', weatherHidden)
playerHid.addEventListener('change', playerHidden)


function timeHidden() {
  time.classList.toggle('time-hid')
}
function dateHidden() {
  date.classList.toggle('date-hid')
}
function greetHidden() {
  greeting.classList.toggle('greeting-hid')
  name.classList.toggle('name-hid')
}
function weatherHidden() {
  weather.classList.toggle('weather-hid')
}
function quoteHidden() {
  quote.classList.toggle('quote-hid')
  authors.classList.toggle('author-hid')
  btn.classList.toggle('change-quote-active')
}
function playerHidden() {
  player.classList.toggle('player-hid')
}

settingBtn.addEventListener('click', () => {
  settingBtn.classList.toggle('setting-ico-active')
  settings.classList.toggle('wrapper__settings_active')
})

document.addEventListener('click', (e) => {
  const settingsMenu = e.target = settings || settings.contains(target)
  const settingsIsActive = settings.classList.contains('wrapper__settings_active')
  if(!settingsMenu && settingsIsActive) {
    settingBtn.classList.toggle('setting-ico-active')
    settings.classList.toggle('wrapper__settings_active')
  }
})


function changeHandler(event) {
  let id = event.currentTarget.id;
  let state = event.currentTarget.checked ? "on" : undefined;
  checkbox_store.add(id, {
    id: id,
    state: state
  });
};

document.querySelectorAll('.check').forEach(function (item) {
  item.addEventListener("change", changeHandler);
});

// ToDo 
const toDoBtn = document.querySelector('.todo_btn')
const addlink = document.querySelector('.todo__value')
const toDoWrapper = document.querySelector('.todo__wrapper')
const toDoList = document.querySelector('.todo__list')

toDoBtn.addEventListener('click', (e) => {
  toDoWrapper.classList.toggle('todo__wrapper-active')
  toDoBtn.classList.toggle('todo_btn-active')
  if(!e.target.closest('.todo__wrapper-active') && !e.target.closest('.todo_btn')) {
    toDoWrapper.classList.remove('todo__wrapper-active')
    toDoBtn.classList.remove('todo_btn-active')  
  }
  e.preventDefault()
})



addlink.addEventListener('change', (e) => {
  const toDoListLi = document.createElement('li')
  const inputCheck = document.createElement('input')
  toDoListLi.classList.add('todo__item')
  inputCheck.classList.add('input__link')
  inputCheck.type = 'checkbox'
  inputCheck.value = 'yes'
  const labelToDo = document.createElement('label')
  labelToDo.classList.add('label__todo')
  const spanWrapper = document.createElement('span')
  spanWrapper.classList.add('span__wrapper')
  labelToDo.appendChild(inputCheck)
  toDoList.appendChild(toDoListLi)
  toDoListLi.appendChild(spanWrapper)
  const spanText = document.createElement('span')
  const deleteLink = document.createElement('a')
  spanText.classList.add('todo__txt')
  deleteLink.classList.add('todo_link-ico')
  spanText.textContent = addlink.value
  spanWrapper.appendChild(labelToDo)
  spanWrapper.appendChild(spanText)
  spanWrapper.appendChild(deleteLink)
  e.preventDefault()
  if (addlink.value == addlink.value) {
    addlink.value = '';
  } 
})
addlink.addEventListener('keydown', (e) => {
  if(e.keyCode == 13) {
    if(addlink.value === '') {
      e.preventDefault()
    } else { const toDoListLi = document.createElement('li')
    const inputCheck = document.createElement('input')
    toDoListLi.classList.add('todo__item')
    inputCheck.classList.add('input__link')
    inputCheck.type = 'checkbox'
    inputCheck.value = 'yes'
    const labelToDo = document.createElement('label')
    labelToDo.classList.add('label__todo')
    const spanWrapper = document.createElement('span')
    spanWrapper.classList.add('span__wrapper')
    labelToDo.appendChild(inputCheck)
    toDoList.appendChild(toDoListLi)
    toDoListLi.appendChild(spanWrapper)
    const spanText = document.createElement('span')
    const deleteLink = document.createElement('a')
    spanText.classList.add('todo__txt')
    deleteLink.classList.add('todo_link-ico')
    spanText.textContent = addlink.value
    spanWrapper.appendChild(labelToDo)
    spanWrapper.appendChild(spanText)
    spanWrapper.appendChild(deleteLink)
    e.preventDefault()
    if (addlink.value == addlink.value) {
      addlink.value = '';
    }}
  }
})
const toDoLink = document.querySelectorAll('.input__link')
const toDoTxt = document.querySelectorAll('.todo__txt')
const toDoItem = document.querySelectorAll('.todo__item')
const newItem = document.querySelectorAll('.input__link')
toDoList.onclick = function(event) {
  if (event.target.className != 'todo_link-ico') return;
      let pane = event.target.closest('.todo__item');
      pane.remove();
}

toDoList.addEventListener('change', (e) => {
if(e.target.className != 'input__link') return 
let checked = e.target.closest('.todo__item')
checked.classList.toggle('todo__item-active')
})
 


function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value)
  localStorage.setItem('languages', languages)
  localStorage.setItem('toDoItem', toDoLink.values)
  localStorage.setItem('time', timeHid.value)
  allCheckBox.forEach(el => {
    if(el.checked) {
      localStorage.setItem('check', el)
    }
  })
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
    city.value = localStorage.getItem('city')
  }
  languages = localStorage.getItem('languages')
  timeHid.value = localStorage.getItem('time')
  localStorage.getItem('toDoItem')
  localStorage.getItem('checked')
}
window.addEventListener('load', getLocalStorage)
