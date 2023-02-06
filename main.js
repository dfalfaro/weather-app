const apiKey = "6d9ae548620c2f3c7a8653d254edffc0";
const weatherContainer = document.querySelector("#weatherContainer");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const weatherIcon = document.querySelector("#weatherIcon");

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  const city = document.querySelector("#city").value;
  const state = document.querySelector("#state").value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&appid=6d9ae548620c2f3c7a8653d254edffc0`)
    .then(response => response.json())
    .then(data => {
    weatherContainer.style.display = "block";
    cityName.innerHTML = data.name;
    temperature.innerHTML = `${Math.round((data.main.temp - 273.15) * 9/5 + 32)}°F`;
    description.innerHTML = data.weather[0].description;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    windSpeed.innerHTML = `Wind Speed: ${data.wind.speed}m/s`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  })
  .catch(error => {
    console.error(error);
  });
});
