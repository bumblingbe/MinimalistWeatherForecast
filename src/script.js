function replaceOldDataWithSearchedForData(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search-bar");
  inputValue = input.value;
  inputValueTrimmed = inputValue.trim();

  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = inputValueTrimmed;
}

let submitButton = document.querySelector("#city-search-form");
submitButton.addEventListener("submit", replaceOldDataWithSearchedForData);
