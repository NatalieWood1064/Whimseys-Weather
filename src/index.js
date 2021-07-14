let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = `${day}, ${month} ${date}, ${year}. ${hours}:${minutes}`;

function showCity(response) {
  console.log(response);
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
}
function searchCity(city) {
  let apiKey = "ae392b466a0914493e8f74cba2d5458a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCity);
}

function inquiry(event) {
  console.log(event);
  event.preventDefault();
  let inquireInput = document.querySelector("#inquire");
  let apiKey = "ae392b466a0914493e8f74cba2d5458a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inquireInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCity);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", inquiry);

function displayCurrentTemp(response) {
  console.log(response.data);

  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function showLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "ae392b466a0914493e8f74cba2d5458a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayCurrentTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Edinburg");
