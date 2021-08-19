
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
   let mainIcon = document.querySelector("#main-icon");
   mainIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   mainIcon.setAttribute("alt", response.data.weather[0].description);
   if(response.data.rain === undefined){
     document.querySelector("#precipitation").innerHTML= 0;}
     else{
       document.querySelector("#precipitation").innerHTML = response.data.rain["1h"];
     }
   fahrenheitTemp = response.data.main.temp;
   document.querySelector("#location").innerHTML = response.data.name;
   document.querySelector("#description").innerHTML = response.data.weather[0].description;
   document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
   document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
   document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
   document.querySelector("#high-of").innerHTML=Math.round(response.data.main.temp_max);
   document.querySelector("#low-of").innerHTML=Math.round(response.data.main.temp_min);
   document.querySelector("#todays-date").innerHTML=formatDate(response.data.dt * 1000);
  
   }
 
 
 
 
 
 function searchCity(city) {
   let apiKey = "ae392b466a0914493e8f74cba2d5458a";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
   axios.get(apiUrl).then(showCity);
 }
 
 function inquiry(event) {
   console.log(event);
   event.preventDefault();
   let inquireInput = document.querySelector("#inquire");
   let apiKey = "ae392b466a0914493e8f74cba2d5458a";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inquireInput.value}&appid=${apiKey}&units=imperial`;
   axios.get(apiUrl).then(showCity);
 }
 
 
 function displayCurrentTemp(response) {
   console.log(response.data);
 let mainIcon = document.querySelector("#main-icon");
 mainIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 mainIcon.setAttribute("alt", response.data.weather[0].description);
 if(response.data.rain === undefined){
   document.querySelector("#precipitation").innerHTML= 0 ;}
   else{
     document.querySelector("#precipitation").innerHTML = response.data.rain["1h"];
   }
   fahrenheitTemp = response.data.main.temp;
   document.querySelector("#location").innerHTML = response.data.name;
   document.querySelector("#description").innerHTML = response.data.weather[0].description;
   document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
   document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
   document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
   document.querySelector("#high-of").innerHTML=Math.round(response.data.main.temp_max);
   document.querySelector("#low-of").innerHTML=Math.round(response.data.main.temp_min);
   document.querySelector("#todays-date").innerHTML=formatDate(response.data.dt * 1000);
   cument.querySelector("#precipitation").innerHTML = response.data.rain["1h"];
     }
 
 
 function showLocation(position) {
   console.log(position);
   let lat = position.coords.latitude;
   let lon = position.coords.longitude;
   let units = "imperial";
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
 
 
 
 
 function displayCelsius(event) {
   event.preventDefault();
   let tempElement = document.querySelector("#temp");
   celsiusLink.classList.add("active");
   fahrenheitLink.classList.remove("active");
   let celsiusTemp = ((fahrenheitTemp - 32) * 5)/9;
   tempElement.innerHTML = Math.round(celsiusTemp);
 }
 
 function displayFahrenheit(event) {
 event.preventDefault();
 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");
 let tempElement = document.querySelector("#temp");
 tempElement.innerHTML = Math.round(fahrenheitTemp);
 }
 
 
 
 
 let fahrenheitTemp = null;
 
 let searchForm = document.querySelector("#search-form");
 searchForm.addEventListener("submit", inquiry);
 
 let currentButton = document.querySelector("#current-location");
 currentButton.addEventListener("click", getCurrentLocation);
 
 let celsiusLink = document.querySelector("#celsius");
 celsiusLink.addEventListener("click", displayCelsius);
 
 let fahrenheitLink = document.querySelector("#fahrenheit");
 fahrenheitLink.addEventListener("click", displayFahrenheit);
 
 searchCity("New York");