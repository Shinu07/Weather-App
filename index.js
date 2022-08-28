const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
    
const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    return showWeather(data),console.log(data);
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    weather.innerHTML = `
    <div class="weatherResult ">
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>Temprature: ${data.main.temp} ℃</h2>
            <h4>Weather: ${data.weather[0].main} </h4>
            <h7>Humidity: ${data.main.humidity}%</h7>
            <br>
            <h7>Wind Speed: ${data.wind.speed}km/hr</h7>
          
        </div>
    </div>
        `
}

form.addEventListener(
    "submit",
    function(event) {
        getWeather(search.value)
        event.preventDefault()
    }
)