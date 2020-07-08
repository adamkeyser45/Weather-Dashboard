var search = document.querySelector("#user-form");
var cityInput = document.querySelector("#city");
var cityInfoContainer = document.querySelector("#city-data");

// function when button is clicked
var weatherSearch = function(event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();
    
    // check if the name is good
    if (cityName) {
        getWeatherData(cityName);
        search.value = "";
    } else {
        alert("Please enetr an actual city name");
    }
};

// function to call weather info for the submitted cityName
var getWeatherData = function(cityName) {
    // format the openWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=67b88f2f59e65e9ba6289a668ea0e4b1";

    // make the request
    fetch(apiUrl).then(function(response) {
        // if the request was ok, send the info to displayWeatherData, if not display an error
        if (response.ok) {
        response.json().then(function(data) {
            displayWeatherData(data, cityName);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// function to display weather information to the page
var displayWeatherData = function(info, cityName) {

    // clear the search area
    cityInfoContainer.textContent = "";
    cityInput.value = "";

    // create cityName Heading
    var nameTitle = document.createElement("h4");
    nameTitle.textContent= cityName;
    cityInfoContainer.appendChild(nameTitle);

};


search.addEventListener("submit", weatherSearch);