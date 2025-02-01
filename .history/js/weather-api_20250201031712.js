const weatherApi = "cb7b82a5235c0f2b978fd1250bf33261";
const weatherLocation = "Calpe,ES"; // Use a more precise format (City,CountryCode)
const weatherWidget = document.getElementById("weather-widget");

async function fetchWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    weatherLocation
  )}&appid=${weatherApi}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.statusText} - ${errorText}`
      );
    }
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    weatherWidget.innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
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
    const weatherIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`; // Higher quality icon

    forecastDay.innerHTML = `
      <h4>${dayName}</h4>
      <img src="${weatherIcon}" alt="${weatherDescription}">
      <div>
        <p>${temperature}°C</p>
        <p>${weatherDescription}</p>
      </div>
    `;

    weatherWidget.appendChild(forecastDay);
  });
}

fetchWeatherData();
