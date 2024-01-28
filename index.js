
const API_KEY = 'd06f674efc4629982063135b6f4dc817';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
const urlWithApiKey = (city) => `${baseURL}${city}&appid=${API_KEY}`;

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search-button")
const weatherIcon = document.querySelector(".weather-icon")
const weatherDisplay = document.querySelector(".weather")
const card = document.querySelector(".card")
const errorMessage = document.querySelector(".error-message")

async function checkWeather(city) {
    try {
        const response = await fetch(urlWithApiKey(city));
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        updateWeatherDisplay(data);
        clearErrorMessage();
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        clearWeather()
        displayErrorMessage('City not found. Please enter a valid city.');
    }
}

function updateWeatherDisplay(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
     //to show weather icon
    setWeatherIcon(data.weather[0].main);
    // display the information after a valid city search
    weatherDisplay.style.display = "block";
}

function setWeatherIcon(weatherMain) {
    const weatherIcons = {
        "Clouds": "clouds.png",
        "Clear": "clear.png",
        "Rain": "rain.png",
        "Drizzle": "drizzle.png",
        "Humidity": "humidity.png",
        "Mist": "mist.png",
        "Wind": "wind.png",
        "Snow": "snow.png",
        "Fog": "fog.png"
    };

    const iconSrc = weatherIcons[weatherMain] || "default.png";
    weatherIcon.src = `images/${iconSrc}`;
}
function clearWeather(){
        weatherDisplay.style.display = "none";
    }

function displayErrorMessage(message) {
    errorMessage.innerHTML = message;
    errorMessage.style.display = "block";
}

function clearErrorMessage() {
    errorMessage.innerHTML = '';
    errorMessage.style.display = "none";
}


searchBtn.addEventListener('click',handleSearch);
searchBox.addEventListener('keypress',handleSearch)

function handleSearch(event){
    if(event.type === "click" || event.key === "Enter"){
               checkWeather(searchBox.value)
    }
}












