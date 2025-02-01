const weatherApi = "cb7b82a5235c0f2b978fd1250bf33261";
const location = "Calpe, Alicante, Spain";
const weatherWidget = document.getElementById("weather-widget");

async function fetchWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    location
  )}&appid=${weatherApi}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(data) {
  const forecastList = data.list.slice(0, 5); // Get the first 5 forecast entries (3-hour intervals)

  forecastList.forEach((forecast) => {
    const forecastDay = document.createElement("div");
    forecastDay.className = "forecast-day";

    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString("sv-SE", { weekday: "long" });
    const temperature = Math.round(forecast.main.temp);
    const weatherDescription = forecast.weather[0].description;
    const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

    forecastDay.innerHTML = `
      <h4>${dayName}</h4>
      <img src="${weatherIcon}" alt="${weatherDescription}">
      <p>${temperature}°C</p>
      <p>${weatherDescription}</p>
    `;

    weatherWidget.appendChild(forecastDay);
  });
}

fetchWeatherData();
