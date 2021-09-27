const api = {
  key: '04e64a40ad758e35302f96401af1cf70',
  base: 'https://api.openweathermap.org/data/2.5/',
}

const search = document.querySelector('.search')
const button = document.querySelector('.button')
button.addEventListener('click', getInput)

function getInput(event) {
  //prevents page from refreshing when submit is clicked
  event.preventDefault()
  if (event.type === 'click') {
    getData(search.value)
    console.log(search.value)
  }
}

function getData() {
  fetch(`${api.base}weather?q=${search.value}&units=imperial&appid=${api.key}`)
    .then((response) => {
      return response.json()
    })
    .then(displayData)
}

function displayData(response) {
  console.log(response)
  if (response.cod === '404') {
    //Selected error class to show after it was hidden if a 404 code comes up
    document.querySelector('.error').style.display = 'block'
    //Originally there was an issue with the error message not going away even after a valid city was added. This setTimeout function now makes the error go away after 3 seconds.
    setTimeout(function () {
      document.querySelector('.error').style.display = 'none'
    }, 3000)
    //search.value is cleared after submitting an invalid city.
    search.value = ''
  } else {
    const city = document.querySelector('.city')
    city.innerText = `${response.name}, ${response.sys.country}`

    const today = new Date()
    document.querySelector('.date').innerText = today.toDateString()

    const temp = document.querySelector('.temp')
    temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°F</span>`

    const weather = document.querySelector('.weather')
    weather.innerText = `Weather: ${response.weather[0].description}`

    const tempRange = document.querySelector('.temp-range')
    tempRange.innerText = `${Math.round(
      response.main.temp_min,
    )} °F / ${Math.round(response.main.temp_max)} °F`

    const weatherIcon = document.querySelector('.weather-icon')
    const iconURL = 'http://openweathermap.org/img/w/'
    weatherIcon.src = iconURL + response.weather[0].icon + '.png'

    search.value = ''
  }
}
