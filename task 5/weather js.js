const apiKey = '0e18f10d36d42187cddcdf4ed7919afd'; // Replace with your actual OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    });
  }
});

function fetchWeatherByCoords(lat, lon) {
  console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log('Weather data for coordinates:', data);
      if (data && data.weather && data.main) {
        displayWeather(data);
      } else {
        console.error('Error: Unexpected data format', data);
      }
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherByCity() {
  const city = document.getElementById('city').value;
  console.log(`Fetching weather for city: ${city}`);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log('Weather data for city:', data);
      if (data && data.weather && data.main) {
        displayWeather(data);
      } else {
        console.error('Error: Unexpected data format', data);
      }
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
  document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('weatherInfo').style.display = 'block';
}
