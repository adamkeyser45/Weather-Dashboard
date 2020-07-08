var search = document.querySelector("#user-form");
var cityInput = document.querySelector("#city");
var cityInfoContainer = document.querySelector("#city-data");
var fiveDayContainer = document.querySelector("#five-day");
var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

// function when button is clicked
var weatherSearch = function(event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();
    
    // check if the name is good
    if (cityName) {
        getWeatherData(cityName);
        get5Day(cityName);
        search.value = "";
    } else {
        alert("Please enetr an actual city name");
    }
};

// function to call CURRENT weather info for the submitted cityName
var getWeatherData = function(cityName) {
    // format the openWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=67b88f2f59e65e9ba6289a668ea0e4b1&units=imperial";

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

// function to call 5-DAY FORECAST for the submitted cityName
var get5Day = function(cityName) {
    // format the openweather api url NOTE THIS IS HARDCODED FOR ATLANTA
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=67b88f2f59e65e9ba6289a668ea0e4b1";

    // make the request
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                display5Day(data, cityName);
                });
        } else {
                alert("Error: " + response.statusText);
        }
    });
};


// function to display weather information to the page
var displayWeatherData = function(info, cityName) {

    cityInfoContainer.classList.add("border");

    // clear the search area
    cityInfoContainer.textContent = "";
    cityInput.value = "";

    // create cityName Heading
    var nameTitle = document.createElement("h4");
    nameTitle.textContent = cityName + " (" + date + ") ";
    cityInfoContainer.appendChild(nameTitle);

        // create span to hold icon of weather and add it on
        var imgSpan = document.createElement("img");
        var iconUrl = "http://openweathermap.org/img/wn/" + info.weather[0].icon + ".png";
        imgSpan.setAttribute("src", iconUrl);
        nameTitle.appendChild(imgSpan);

    // create and display temperature
    var tempDisplay = document.createElement("h6");
    tempDisplay.textContent = "Temperature: " + info.main.temp + "\u00B0";
    cityInfoContainer.appendChild(tempDisplay);

    // create and display humidity
    var humidityDisplay = document.createElement("h6");
    humidityDisplay.textContent = "Humidity: " + info.main.humidity + "%";
    cityInfoContainer.appendChild(humidityDisplay);

    // create and display windspeed
    var windSpeedDisplay = document.createElement("h6");
    windSpeedDisplay.textContent = "Wind Speed: " + info.wind.speed + " MPH";
    cityInfoContainer.appendChild(windSpeedDisplay);

    // fetch, create, and display uv index
    var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=67b88f2f59e65e9ba6289a668ea0e4b1&lat=" + info.coord.lat + "&lon=" + info.coord.lon;

    fetch(uvUrl).then(function(response) {
        response.json().then(function(data) {
            displayUv(data);
            });
    });

    var displayUv = function(info) {
        var uvDisplay = document.createElement("h6");
        uvDisplay.textContent = "UV Index: " + info.value;
        cityInfoContainer.appendChild(uvDisplay);

        // apply color to uv index to indicate favorable, moderate, or severe
        if (info.value <= 3) {
            uvDisplay.classList.add("text-success");
        } 
        else if ((info.value > 3) && (info.value < 8)) {
            uvDisplay.classList.add("text-warning");
        }
        else if (info.value >= 9) {
            uvDisplay.classList.add("text-danger");
        };
    };
};

// function to display 5-day forecast information to the page
var display5Day = function(info, cityName) {

    // clear area before adding new cards
    fiveDayContainer.textContent = "";

    // create heading
    var fiveDayHead = document.createElement("h4");
    fiveDayHead.textContent = "5-Day Forecast:";
    fiveDayContainer.appendChild(fiveDayHead);
};

search.addEventListener("submit", weatherSearch);