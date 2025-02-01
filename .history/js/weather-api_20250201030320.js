const weatherApi = "cb7b82a5235c0f2b978fd1250bf33261";
const location = "Calpe, Alicante, Spain";
const weatherWidget = document.getElementById("weather-widget");

fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${weatherApi}`
)
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      weatherWidget.innerHTML = "<p>Location not found.</p>";
      return;
    }

    const { lat, lon } = data[0]; // Destructuring for cleaner code

    fetch(
      `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${weatherApi}`
    )
      .then((response) => response.json())
      .then((forecastData) => {
        let weatherHTML = `<h3>${forecastData.city.name}</h3>`;

        for (let i = 0; i < 3; i++) {
          const dailyData = forecastData.list[i * 8];
          const date = new Date(dailyData.dt * 1000);
          const day = date.toLocaleDateString("en-GB", { weekday: "long" });

          weatherHTML += `
            <div class="forecast-day">
              <h4>${day}</h4>
              <img src="http://openweathermap.org/img/w/${dailyData.weather[0].icon}.png" alt="${dailyData.weather[0].description}">
              <p>${dailyData.main.temp_min}°C / ${dailyData.main.temp_max}°C</p>
              <p>${dailyData.weather[0].description}</p>
            </div>
          `;
        }

        weatherWidget.innerHTML = weatherHTML;
      })
      .catch((error) => {
        weatherWidget.innerHTML = "<p>Error fetching forecast data.</p>";
        console.error("Error fetching forecast:", error);
      });
  })
  .catch((error) => {
    weatherWidget.innerHTML = "<p>Error finding location.</p>";
    console.error("Error finding location:", error);
  });
