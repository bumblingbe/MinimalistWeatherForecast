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
    metricOrImperial = prompt("Units: metric or imperial?");
    metricOrImperial = metricOrImperial.trim().toLowerCase();
    if (metricOrImperial == "metric" || metricOrImperial == "imperial") {
      updateUnits(metricOrImperial);
      return metricOrImperial;
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
    speedUnit = "km/hr";
    tempUnit = "°C";
  }

  //if specifies imperial units, update windspeed & temp units to 'mi' & '°F'
  if (metricOrImperial == "imperial") {
    speedUnit = "mph";
    tempUnit = "°F";
  }

  windspeedUnitElement.innerHTML = speedUnit;
  tempUnitElement.innerHTML = tempUnit;
}

//feed response data into updateCityName & updateTodayWeather functions
function updateData(response) {
  updateCityName(response);
  updateTodayWeatherIcon(response);
  updateTodayTemp(response);
  updateTodayWeatherDescription(response);
  updateTodayHumidityAndWindSpeed(response);
  updateDateTime(response);
  displayForecast(response);
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

// update humidity and windspeed for today
function updateTodayHumidityAndWindSpeed(response) {
  let humidityValueUnitAndWindspeedValueElement = document.querySelector(
    "#wind-and-humidity-info"
  );
  let humidityValue = Math.round(response.data.temperature.humidity);
  let windSpeedValue = response.data.wind.speed;
  humidityValueUnitAndWindspeedValueElement.innerHTML = `Humidity: <strong id="humidity-value">${humidityValue}</strong>%, Wind:
          <strong id="windspeed-value">${windSpeedValue}</strong>`;
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

  dayOfWeekTodayNumber = dateTime.getDay();

  let dayOfWeekWord = days[dayOfWeekTodayNumber];

  dayElement.innerHTML = dayOfWeekWord;

  createNextXDaysArray(dayOfWeekTodayNumber);
}

function createNextXDaysArray(dayOfWeekTodayNumber) {
  var daysArray = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  var i = 1;
  var numberOfDaysForecastProvidedFor = 7;
  while (i <= numberOfDaysForecastProvidedFor) {
    let nextDayIndexInDaysSequence = (dayOfWeekTodayNumber + i) % 7;
    let nextDayWordInDaysSequence = daysArray[nextDayIndexInDaysSequence];
    console.log(`nextDayWordInDaysSequence is: ${nextDayWordInDaysSequence}
nextXDaysArray is: ${nextXDaysArray}`);
    nextXDaysArray.push(nextDayWordInDaysSequence);
    console.log(`AFTER most recent push, nextXDaysArray is: ${nextXDaysArray}`);

    if (i == numberOfDaysForecastProvidedFor) {
      console.log(
        `AFTER ${numberOfDaysForecastProvidedFor} iterations, nextXDaysArray is: ${nextXDaysArray}`
      );
      //nextXDaysArray.forEach(concatenateForecast);
    }

    i++;
  }
}

function updateTime(dateTime) {
  let timeElement = document.querySelector("#time-of-day");
  let hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let formattedTime = `${hour}:${minute}`;

  timeElement.innerHTML = formattedTime;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-section");
}

function concatenateForecast(day) {
  forecastElement.innerHTML =
    forecastElement.innerHTML +
    `<div class="forecast-single-day">
          <div><strong>${day}</strong></div>
          <div class="icon"><img src ="${iconUrl}" alt="${iconDescription}"></div>
          <div class="forecast-temp">
            <strong><span class="forecast-max-temp">${maxTemp}</span
            ><span class="forecast-temp-unit">${tempUnit}</span></strong>
            <span class="forecast-min-temp">${minTemp}</span
            ><span class="forecast-temp-unit">${tempUnit}</span>
          </div>
        </div>`;
}

function getForecast(city) {
  let apiKey = "0bbe201oc9fead40c3t0cc4e349c3f4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${metricOrImperial}
`;
  axios.get(apiUrl).then(displayForecast);
}

//global config
var speedUnit = "";
var tempUnit = "";
var metricOrImperial = "";
var dayOfWeekTodayNumber = "";
var iconUrl = "";
var iconDescription = "";
var minTemp = "";
var maxTemp = "";
var nextXDaysArray = [];

let submitButton = document.querySelector("#city-search-form");
submitButton.addEventListener("submit", handleSearch);
