function replaceOldDataWithSearchedForData(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search-bar");
  inputValue = input.value;
  inputValueTrimmed = inputValue.trim();

  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = inputValueTrimmed;
}

function searchForCity(event) {
  event.preventDefault();
  let apiKey = "0bbe201oc9fead40c3t0cc4e349c3f4c";
  let citySearched = document.querySelector("#city-search-bar");
  let citySearchedValue = citySearched.value;
  let citySearchedLowerTrimmed = citySearchedValue.trim().toLowerCase();

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citySearchedLowerTrimmed}&key=${apiKey}`;
}

let submitButton = document.querySelector("#city-search-form");
submitButton.addEventListener("submit", replaceOldDataWithSearchedForData);
submitButton.addEventListener("submit", searchForCity);
