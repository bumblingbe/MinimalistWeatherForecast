function replaceOldDataWithSearchedForData(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search-bar");
  inputValue = input.value;
  inputValueTrimmed = inputValue.trim();

  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = inputValueTrimmed;
}

function askWhichUnits() {
  let units = prompt("Units: metric or imperial?");
  units = units.trim().toLowerCase();
  if (units != "metric" && units != "imperial") {
    alert(`Please enter either 'metric' or 'imperial'.`);
    askWhichUnits();
  } else {
    let windspeedUnitElement = document.querySelector("#windspeed-unit");
    let tempUnitElement = document.querySelector("#temp-unit");
    if (units == "metric") {
      let windspeedUnit = "km";
      windspeedUnitElement.innerHTML = windspeedUnit;

      let tempUnit = "°C";
      tempUnitElement.innerHTML = tempUnit;
    } else if (units == "imperial") {
      let windspeedUnit = "mi";
      windspeedUnitElement.innerHTML = windspeedUnit;

      let tempUnit = "°F";
      tempUnitElement.innerHTML = tempUnit;
    } else {
      let windspeedUnit = "CHECK";
      windspeedUnitElement.innerHTML = windspeedUnit;

      let tempUnit = "CHECK";
      tempUnitElement.innerHTML = tempUnit;
    }
    return units;
  }
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

function updateData(response) {
  updateCityName(response);
  updateTodayWeather(response);
}

function searchForCity(event) {
  event.preventDefault();
  let apiKey = "0bbe201oc9fead40c3t0cc4e349c3f4c";
  let citySearched = document.querySelector("#city-search-bar");
  let citySearchedValue = citySearched.value;
  let citySearchedLowerTrimmed = citySearchedValue.trim().toLowerCase();
  let units = askWhichUnits();

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citySearchedLowerTrimmed}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateData);
}

let submitButton = document.querySelector("#city-search-form");
submitButton.addEventListener("submit", replaceOldDataWithSearchedForData);
submitButton.addEventListener("submit", searchForCity);
