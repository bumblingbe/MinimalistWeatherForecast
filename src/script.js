function handleSearch(event) {
  //fetch weather data, then direct to 'updateData' function
  event.preventDefault();

  let citySearched = document.querySelector("#city-search-bar");
  let citySearchedValue = citySearched.value;
  let citySearchedLowerTrimmed = citySearchedValue.trim().toLowerCase();

  unitsForUrl = askWhichUnits();

  let apiKey = "0bbe201oc9fead40c3t0cc4e349c3f4c";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citySearchedLowerTrimmed}&key=${apiKey}&units=${unitsForUrl}`;
  axios.get(apiUrl).then(updateData);
}

//ask which units & don't accept unless answer is 'imperial' or 'metric'
function askWhichUnits() {
  while (true) {
    let units = prompt("Units: metric or imperial?");
    units = units.trim().toLowerCase();
    if (units == "metric" || units == "imperial") {
      updateUnits(units);
      return units;
    } else {
      alert(`Please enter either 'metric' or 'imperial'.`);
    }
  }
}

//identify windspeed unit & temperature unit elements
function updateUnits(metricOrImperial) {
  var windspeedUnitElement = document.querySelector("#windspeed-unit");
  var tempUnitElement = document.querySelector("#temp-unit");

  //if specifies metric, update windspeed & temp units to 'km' & '°C'
  if (metricOrImperial == "metric") {
    let windspeedUnit = "km";
    windspeedUnitElement.innerHTML = windspeedUnit;
    let tempUnit = "°C";
    tempUnitElement.innerHTML = tempUnit;
  }

  //if specifies imperial units, update windspeed & temp units to 'mi' & '°F'
  if (metricOrImperial == "imperial") {
    let windspeedUnit = "mi";
    windspeedUnitElement.innerHTML = windspeedUnit;
    let tempUnit = "°F";
    tempUnitElement.innerHTML = tempUnit;
  }
}

//feed response data into updateCityName & updateTodayWeather functions
function updateData(response) {
  updateCityName(response);
  updateTodayWeatherIcon(response);
  updateTodayTemp(response);
  updateTodayWeatherDescription(response);
  updateTodayHumidity(response);
  updateTodayWindSpeed(response);
  updateDateTime(response);
}

function updateCityName(response) {
  let cityNameElement = document.querySelector("#city-name");
  let city = response.data.city;
  cityNameElement.innerHTML = city;
}

//update weather icon for today
function updateTodayWeatherIcon(response) {
  let tempIconElement = document.querySelector("#temp-icon-img");
  let tempIconUrl = response.data.condition.icon_url;
  let tempIconAlt = response.data.condition.icon;
  tempIconElement.src = tempIconUrl;
  tempIconElement.alt = tempIconAlt;
}

// update temperature for today
function updateTodayTemp(response) {
  let tempValueElement = document.querySelector("#temp-value");
  let tempValue = Math.round(response.data.temperature.current);
  tempValueElement.innerHTML = tempValue;
}

// update weather description for today
function updateTodayWeatherDescription(response) {
  let weatherConditionDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let weatherConditionDescription = response.data.condition.description;
  weatherConditionDescriptionElement.innerHTML = weatherConditionDescription;
}

// update humidity for today
function updateTodayHumidity(response) {
  let humidityValueElement = document.querySelector("#humidity-value");
  let humidityValue = Math.round(response.data.temperature.humidity);
  humidityValueElement.innerHTML = humidityValue;
}

// update wind speed for today
function updateTodayWindSpeed(response) {
  let windSpeedElement = document.querySelector("#windspeed-value");
  let windSpeed = response.data.wind.speed;
  windSpeedElement.innerHTML = windSpeed;
}

function updateDateTime(response) {
  let dateTime = new Date(response.data.time * 1000);

  updateDayOfWeek(dateTime);
  updateTime(dateTime);
}

function updateDayOfWeek(dateTime) {
  let dayElement = document.querySelector("#day-of-week");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayofWeekNumber = dateTime.getDay();
  let dayOfWeekWord = days[dayofWeekNumber];

  dayElement.innerHTML = dayOfWeekWord;
}

function updateTime(dateTime) {
  let timeElement = document.querySelector("#time-of-day");
  let hour = dateTime.getHours();
  let minute = dateTime.getMinutes();
  let formattedTime = `${hour}:${minute}`;

  timeElement.innerHTML = formattedTime;
}

let submitButton = document.querySelector("#city-search-form");
submitButton.addEventListener("submit", handleSearch);
