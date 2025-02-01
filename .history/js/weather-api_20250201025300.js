console.log("test");
const weatherApi = "cb7b82a5235c0f2b978fd1250bf33261";
const location = "Calpe, Alicante, Spain";
const weatherWidget = document.getElementById("weather-widget");

// Geocoding to get latitude and longitude
fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${weatherApi}`
)
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      weatherWidget.innerHTML = "<p>Location not found.</p>";
      return;
    }

    const lat = data[0].lat;
    const lon = data[0].lon;

    // Fetching the forecast data using the provided URL structure
    fetch(
      `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${weatherApi}`
    )
      .then((response) => response.json())
      .then((forecastData) => {
        // Process and display the forecast data
        let weatherHTML = `<h3>${forecastData.city.name}</h3>`;

        // Example: Displaying a few days of forecast
        for (let i = 0; i < 3; i++) {
          // Display 3 days
          const dailyData = forecastData.list[i * 8]; // Data points are 3 hours apart, 8 points per day.
          const date = new Date(dailyData.dt * 1000); // Convert timestamp to date
          const day = date.toLocaleDateString("en-GB", { weekday: "long" }); // Get the day of the week

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
