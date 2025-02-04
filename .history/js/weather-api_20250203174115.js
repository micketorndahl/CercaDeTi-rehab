const weatherApi = "cb7b82a5235c0f2b978fd1250bf33261";
const weatherLocation = "Calpe,ES"; // Use a more precise format (City,CountryCode)
const weatherWidget = document.getElementById("weather-widget");

async function fetchWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    weatherLocation
  )}&appid=${weatherApi}&units=metric&lang=sv`;

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

function getWeatherIcon(weatherId) {
  if (weatherId >= 200 && weatherId < 300) {
    return { icon: "wi-thunderstorm", color: "gray" };
  } else if (weatherId >= 300 && weatherId < 500) {
    return { icon: "wi-sleet", color: "blue" };
  } else if (weatherId >= 500 && weatherId < 600) {
    return { icon: "wi-rain", color: "blue" };
  } else if (weatherId >= 600 && weatherId < 700) {
    return { icon: "wi-snow", color: "blue" };
  } else if (weatherId >= 700 && weatherId < 800) {
    return { icon: "wi-fog", color: "gray" };
  } else if (weatherId === 800) {
    return { icon: "wi-day-sunny", color: "yellow" };
  } else if (weatherId > 800) {
    return { icon: "wi-cloudy", color: "gray" };
  }
}

function displayWeather(data) {
  const uniqueDays = {};

  data.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString("sv-SE", { weekday: "long" });
    const monthDay = date.toLocaleDateString("sv-SE", {
      month: "long",
      day: "numeric",
    });

    if (!uniqueDays[day]) {
      const iconData = getWeatherIcon(forecast.weather[0].id);

      uniqueDays[day] = {
        date: date,
        temperature: Math.round(forecast.main.temp),
        description: forecast.weather[0].description,
        icon: iconData.icon,
        color: iconData.color,
        monthDay: monthDay,
      };
    }
  });

  Object.keys(uniqueDays)
    .slice(0, 1)
    .forEach((day) => {
      const forecast = uniqueDays[day];
      const forecastDay = document.createElement("div");
      forecastDay.className = "forecast-day";

      forecastDay.innerHTML = `
      <h4>${day}</h4>
      <p>${forecast.monthDay}</p>
      <i class="wi ${forecast.icon} weather-icon ${forecast.color}"></i>
      <div>
        <p>${forecast.temperature}°C</p>
        <p>${forecast.description}</p>
      </div>
    `;

      weatherWidget.appendChild(forecastDay);
    });
}

fetchWeatherData();
