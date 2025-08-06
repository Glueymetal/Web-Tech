const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");
const forecastSection = document.getElementById("forecast");
const forecastContainer = document.getElementById("forecast-container");
const welcome = document.getElementById("welcome");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const icon = document.getElementById("weather-icon");

const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const todayDate = document.getElementById("today-date");
todayDate.textContent = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const API_KEY = "461a55369837006b3f341fdfde6a7a1b"; // Replace with your OpenWeatherMap API key

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    welcome.classList.add("hidden");

    // Fetch current weather
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // New: Fill min/max/sunrise/sunset
    minTemp.textContent = `${Math.round(data.main.temp_min)} °C`;
    maxTemp.textContent = `${Math.round(data.main.temp_max)} °C`;
    sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const weatherType = data.weather[0].main.toLowerCase();
    const validTypes = ["clear", "clouds", "rain", "snow", "thunderstorm"];
    const imageFile = validTypes.includes(weatherType) ? `${weatherType}.png` : "default.png";
    document.body.style.backgroundImage = `url('images/${imageFile}')`;

    weatherDisplay.classList.remove("hidden");

    // Fetch 3-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!forecastRes.ok) throw new Error("Forecast not available");
    const forecastData = await forecastRes.json();

    forecastContainer.innerHTML = "";
    const dailyForecasts = {};
    forecastData.list.forEach(item => {
      const [date, time] = item.dt_txt.split(" ");
      if (time === "12:00:00" && Object.keys(dailyForecasts).length < 3) {
        dailyForecasts[date] = item;
      }
    });

    Object.values(dailyForecasts).forEach(day => {
      const card = document.createElement("div");
      card.className = "forecast-card";
      card.innerHTML = `
        <h4>${new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}</h4>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon"/>
        <p>${Math.round(day.main.temp)}°C</p>
        <small>${day.weather[0].main}</small>
      `;
      forecastContainer.appendChild(card);
    });

    forecastSection.classList.remove("hidden");

  } catch (error) {
    alert(error.message);
    weatherDisplay.classList.add("hidden");
    forecastSection.classList.add("hidden");
    welcome.classList.remove("hidden");
  }
});
