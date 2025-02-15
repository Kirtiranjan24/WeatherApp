const input = document.getElementById("cityInput");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const weatherBox = document.querySelector(".weather-box");
const errorAlert = document.getElementById("errorAlert");
const weatherCard = document.querySelector(".weather-card");
const dateInfo = document.getElementById("dateInfo");
const weeklyForecast = document.getElementById("weeklyForecast");
const forecastIcons = document.getElementById("forecastIcons");

btn.addEventListener("click", () => {
    const city = input.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

function getWeather(city) {
    const apiKey = 'ef6951751020e860f41e82df4489e7af';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            errorAlert.classList.add('d-none');
            weatherBox.classList.remove('d-none');

            const iconCode = data.weather[0].icon;
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon"/>`;

            const weatherCity = data.name;
            const weatherCountry = data.sys.country;
            weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

            const weatherTemp = data.main.temp;
            temperature.innerHTML = `${weatherTemp.toFixed(2)}°C`;

            const weatherDesc = data.weather[0].description;
            description.innerHTML = weatherDesc;

            const mainWeather = data.weather[0].main.toLowerCase();
            if (mainWeather.includes("cloud")) {
                weatherCard.classList = "card weather-card cloudy";
            } else if (mainWeather.includes("rain")) {
                weatherCard.classList = "card weather-card rainy";
            } else if (mainWeather.includes("snow")) {
                weatherCard.classList = "card weather-card snowy";
            } else if (mainWeather.includes("clear")) {
                weatherCard.classList = "card weather-card sunny";
            } else {
                weatherCard.classList = "card weather-card default";
            }

            displayForecast();
        })
        .catch(error => {
            errorAlert.classList.remove('d-none');
            weatherBox.classList.add('d-none');
            weatherCard.classList = "card weather-card default";
        });
}


function displayForecast() {
    weeklyForecast.classList.remove("d-none");
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    forecastIcons.innerHTML = '';
    daysOfWeek.forEach(day => {
        forecastIcons.innerHTML += `
            <div class="forecast-day">
                <p>${day}</p>
                <img src="http://openweathermap.org/img/wn/01d.png" alt="${day} Weather Icon">
            </div>
        `;
    });
}


function displayDate() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const date = now.getDate();
    const year = now.getFullYear();

    dateInfo.innerHTML = `${day}, ${month} ${date}, ${year}`;
}

displayDate();
