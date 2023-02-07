const apiKey = "6d9ae548620c2f3c7a8653d254edffc0";
const weatherContainer = document.querySelector("#weatherContainer");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const weatherIcon = document.querySelector("#weatherIcon");

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const city = document.querySelector("#city").value;
  const state = document.querySelector("#state").value;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},US&appid=6d9ae548620c2f3c7a8653d254edffc0`)
    .then(response => response.json())
    .then(data => {

      const forecastList = data.list;
      const forecastData = {};

      forecastList.forEach(forecast => {
        const date = forecast.dt_txt.split(" ")[0];
        if (!forecastData[date]) {
          forecastData[date] = {
            temperature: 0,
            description: "",
            icon: ""
          };
        }
        forecastData[date].temperature += forecast.main.temp;
        forecastData[date].description = forecast.weather[0].description;
        forecastData[date].icon = forecast.weather[0].icon;
      });
      Object.keys(forecastData).forEach(date => {
        forecastData[date].temperature /= 8;
        forecastData[date].temperature = Math.round((forecastData[date].temperature - 273.15) * 9 / 5 + 32);
      });
      const forecastContainer = document.querySelector("#forecastContainer");
      forecastContainer.innerHTML = "";
      Object.keys(forecastData).forEach(date => {
        const forecast = forecastData[date];
        const forecastElement = document.createElement("div");
        forecastElement.innerHTML = `
          <h2>${date}</h2>
          <p>Temperature: ${forecast.temperature}°F</p>
          <p>Description: ${forecast.description}</p>
          <img src="http://openweathermap.org/img/wn/${forecast.icon}@2x.png"/>
        `;
        forecastContainer.appendChild(forecastElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
});
