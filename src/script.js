function handleSearch(event) {
  //fetch weather data
  event.preventDefault();
  let apiKey = "0bbe201oc9fead40c3t0cc4e349c3f4c";
  let citySearched = document.querySelector("#city-search-bar");
  let citySearchedValue = citySearched.value;
  let citySearchedLowerTrimmed = citySearchedValue.trim().toLowerCase();
  unitsForUrl = askWhichUnits();

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citySearchedLowerTrimmed}&key=${apiKey}&units=${unitsForUrl}`;
  //fetch weather data, then direct to 'updateData' function
  axios.get(apiUrl).then(updateData);
}

function askWhichUnits() {
  //ask which units &
  //don't continue until answer is 'imperial' or 'metric'
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

function updateUnits(metricOrImperial) {
  //update windspeed & temp units to 'km' & '°C'
  function updateMetricUnits() {
    let windspeedUnit = "km";
    windspeedUnitElement.innerHTML = windspeedUnit;
    let tempUnit = "°C";
    tempUnitElement.innerHTML = tempUnit;
  }

  function updateImperialUnits() {
    //update windspeed & temp units to 'mi' & '°F'
    windspeedUnitElement.innerHTML = windspeedUnit;
    let tempUnit = "°F";
    tempUnitElement.innerHTML = tempUnit;
  }

  //identify windspeed unit & temperature unit elements
  var windspeedUnitElement = document.querySelector("#windspeed-unit");
  var tempUnitElement = document.querySelector("#temp-unit");

  //if specifies metric units, update to metric units
  if (metricOrImperial == "metric") {
    updateMetricUnits();
  }

  //if specifies imperial units, update to imperial units
  if (metricOrImperial == "imperial") {
    updateImperialUnits();
  }
}

function updateData(response) {
  //feed response data into updateCityName & updateTodayWeather functions
  updateCityName(response);
  updateTodayWeather(response);
}

function updateCityName(response) {
  let cityNameElement = document.querySelector("#city-name");
  let city = response.data.city;
  cityNameElement.innerHTML = city;
}

function updateTodayWeather(response) {
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

  updateTodayWeatherIcon(response);
  updateTodayTemp(response);
  updateTodayWeatherDescription(response);
  updateTodayHumidity(response);
  updateTodayWindSpeed(response);
}

function updateDateTime() {
  function updateDayOfWeek(now) {
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

    let dayofWeekNumber = now.getDay();
    let dayOfWeekWord = days[dayofWeekNumber];

    dayElement.innerHTML = dayOfWeekWord;
  }

  function updateTime(now) {
    let timeElement = document.querySelector("#time-of-day");

    let hour = now.getHours();
    let minute = now.getMinutes();

    let formattedTime = `${hour}:${minute}`;

    timeElement.innerHTML = formattedTime;
  }

  let now = new Date();

  updateDayOfWeek(now);
  updateTime(now);
}
//DATE
updateDateTime();
//TIME

let submitButton = document.querySelector("#city-search-form");
submitButton.addEventListener("submit", handleSearch);
