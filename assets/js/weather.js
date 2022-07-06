
$(document).ready(function(){
    renderSearchHistory();
});


var historyContainerEl = $("#history");
//var currentForecastContainerEl = $("#currentForecast");
var currentForecastContainerEl = $("#weather-api");
var fiveDayContainerEl = $("#fiveDayForecast");
var citySearchEl = $("#city-search");
var cityEl = $("#city-input");
var cityNameEl = $("#cityName");
var currentDate = moment().format("L");
var searchBtnEl = $("#searchBtn");
const weatherdates = [];

var apiKey = "a96c9b1d9614e04af3a4f5f32e7c7b3e";


var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

var getWeather = function(currentCity){
    
    var cityQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial" + "&APPID=" + apiKey;
    
    fetch(cityQueryUrl).then(function(response){
        response.json().then(function(data){
            if (response.ok) {
                // console.log(data);

               
                var lat = data.coord.lat;
                var long = data.coord.lon;
    
                
               
                var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=hourly,daily&appid=" + apiKey;
        
                fetch(apiUrl).then((response) => {
                   
                    if (response.ok) {
                        response.json().then((data) => {
                               
                                var currentConditionsDiv = $("<div class='card bg-light shadow px-3 py-3 currentweatherContainer'>");
                                var currentConditionsCardBody = $("<div class='card-body'>");
                                var cityNameTitle = $("<h2 class='card-title text-left history-btn'>");

                                var nameofcity = capitalizeFirstLetter(currentCity);


                               
                                cityNameTitle.text(nameofcity);
                                var currentConditionsDate = $("<h5 class='card-title'>");
                                currentConditionsDate.text(currentDate);
                                var currentConditionsIcon = $("<img class='currentweatherIconWidth'>");
                                var currentConditionsTemp = $("<p class='card-text mb-0'>");
                                var currentConditionsHumidity = $("<p class='card-text mb-0'>");
                                var currentConditionsWind = $("<p class='card-text mb-0'>");
                                var currentConditionsUvIndex = $("<p class='card-text mb-0'>");
                                var currentConditionsUvIndexSpan = $("<span>");
                                currentConditionsUvIndexSpan.attr("id", "uvIndex")
                             
                                var iconcode = data.current.weather[0].icon;
                                console.log(iconcode);

                                //document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/dolphinplaceholder.jpg)";
                                if (iconcode === "01d" || iconcode === "01n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/clearsky.jpg)";
                                } else if (iconcode === "02d" || iconcode === "02n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/fewclouds.jpg)";
                                } else if (iconcode === "03d" || iconcode === "03n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/scatteredclouds.jpg)";
                                } else if (iconcode === "04d" || iconcode === "04n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/brokenclouds.jpg)";
                                } else if (iconcode === "09d" || iconcode === "09n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/lightrain.jpg)";
                                } else if (iconcode === "10d" || iconcode === "10n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/rain.jpg)";
                                } else if (iconcode === "11d" || iconcode === "11n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/thunderstorm.jpg)";
                                } else if (iconcode === "13d" || iconcode === "13n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/snow.jpg)";
                                } else if (iconcode === "50d" || iconcode === "50n") {
                                    document.getElementById('weatherapibox').style.backgroundImage="url(./assets/images/mist.jpg)";
                                } else {
                                    document.getElementById('weatherapibox').style.background="none";
                                }
                                document.getElementById('weatherapibox').style.backgroundSize = "100%";
            
                               
                                currentForecastContainerEl.append(currentConditionsDiv);
                                currentConditionsDiv.append(currentConditionsCardBody);
                                
                               
                                currentConditionsCardBody.append(cityNameTitle);
                                currentConditionsCardBody.append(currentConditionsDate);
                                currentConditionsCardBody.append(currentConditionsIcon);
                                currentConditionsCardBody.append(currentConditionsTemp);
                                currentConditionsCardBody.append(currentConditionsHumidity);
                                currentConditionsCardBody.append(currentConditionsWind);
                                currentConditionsCardBody.append(currentConditionsUvIndex);
            
                               
                                currentConditionsIcon.attr("src", "https://openweathermap.org/img/w/" + iconcode + ".png");
                                currentConditionsIcon.attr("alt", data.current.weather[0].description);
                                currentConditionsIcon.attr("title", data.current.weather[0].description);
            
                                
                                currentConditionsTemp.text(data.current.temp);
                                currentConditionsTemp.prepend("Temp: ");
                                currentConditionsTemp.append("&deg;F");
            
                                
                                currentConditionsHumidity.text(data.current.humidity);
                                currentConditionsHumidity.prepend("Humidity: ");
                                currentConditionsHumidity.append(" %");
            
                                
                                currentConditionsWind.text(data.current.wind_speed);
                                currentConditionsWind.prepend("Wind: ");
                                currentConditionsWind.append(" MPH");
            
                               
                                var uvIndex = data.current.uvi;
                                currentConditionsUvIndex.prepend("UV Index: ");
                                currentConditionsUvIndexSpan.text(uvIndex);
                                currentConditionsUvIndex.append(currentConditionsUvIndexSpan);
    
    
                                
                                if (uvIndex < 3) {
                                    currentConditionsUvIndexSpan.attr("class", "text-light bg-success mx-1 px-2 py-1 rounded");
                                } else if (uvIndex > 3 && uvIndex < 5) {
                                    currentConditionsUvIndexSpan.attr("class", "text-light bg-warning mx-1 px-2 py-1 rounded");
                                } else if (uvIndex > 5){
                                    // add safety warning for any index above the moderate index
                                    var uvIndexWarning = $("<p class='fst-italic text-muted pb-0'>");
                                    uvIndexWarning.text("UV Warning: high risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed.");
                                    currentConditionsUvIndexSpan.attr("class", "text-light bg-danger mx-1 px-2 py-1 rounded");
                                    currentConditionsUvIndex.append(uvIndexWarning);
                                }
    
                            });
                        } else {
                            
                            handleErrors();
                        }
                });

                
                var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + apiKey;
            
                fetch(forecastApiUrl).then((response) =>{
                    if (response.ok) {
                        response.json().then((data) => {
                           
                            for (var i = 2; i < data.list.length; i+=8) {
                                var forecastDateString = moment(data.list[i].dt_txt).format("L");
                             
                
                                var forecastCol = $("<div class='forecast-day px-3 py-1 my-0 weatherCard'>");
                                var forecastCard = $("<div class='card bg-secondary bg-gradient shadow suncard'>");
                                var forecastCardBody = $("<div class='card-body'>");
                                var forecastDate = $("<h5 class='card-title'>");
                                forecastDate.text(forecastDateString);
                                var forecastIcon = $("<img class='weatherIconWidth'>");
                                var forecastTemp = $("<p class='card-text mb-0'>");
                                var forecastWind = $("<p class='card-text mb-0'>");
                                var forecastHumidity = $("<p class='card-text mb-0'>");
                                //forecastCard.classList.add("column");
                
                                fiveDayContainerEl.append(forecastCol);
                                forecastCol.append(forecastCard);
                                forecastCard.append(forecastCardBody);
                
                                forecastCardBody.append(forecastDate);
                                forecastCardBody.append(forecastIcon);
                                forecastCardBody.append(forecastTemp);
                                forecastCardBody.append(forecastWind);
                                forecastCardBody.append(forecastHumidity);
                                
                                
                                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                                forecastIcon.attr("alt", data.list[i].weather[0].main);
                                forecastIcon.attr("title", data.list[i].weather[0].main);
    
    
                                
                                forecastTemp.text(data.list[i].main.temp);
                                forecastTemp.prepend("Temp: ");
                                forecastTemp.append("&deg;F");
    
                                
                                forecastWind.text(data.list[i].wind.speed);
                                forecastWind.prepend("Wind: ");
                                forecastWind.append(" MPH");
    
                              
                                forecastHumidity.text(data.list[i].main.humidity);
                                forecastHumidity.prepend("Humidity: ");
                                forecastHumidity.append(" %");
                            }

                            //var icon = data.list[i].weather[0].icon;
                            //var setimage = $("#weatherimage");
                            //console.log(icon);
                            //setimage.attr("src", "./assets/images/dolphinplaceholder.jpg");

                            //for (let i = 0; i < 5; i++) {
                        
                                //var fdate = moment().add(i, "day").format("M/D/YYYY");
                                //var ftemp = response.daily[i].temp.day;
                                //var fwind = response.daily[i].wind_speed;
                                //var fhumid = response.daily[i].humidity;
                
                               // var f1date = $("#futuredate"+i);
                               // var f1temp = $("#futuretemp"+i);
                               // var f1wind = $("#futurewind"+i);
                                //var f1humid = $("#futurehumidity"+i);
                
                                //f1date.text(fdate);
                               // f1temp.text("Temp: "+ftemp);
                               // f1wind.text("Wind: "+fwind);
                               // f1humid.text("Humidity: "+fhumid);
                             
                               // weatherdates[i] = fdate;
                                
                                
                            //}
























































































































                        })
                    } else {
                        handleErrors();
                    }

















                })

               
                saveCityName(currentCity);

            } else {
                
                var messageContainerEl = $("<div class='card bg-warning bg-gradient shadow px-3 py-3'>");
                var messageTitle = $("<h2 class='card-title text-center'>");
                messageTitle.text("Invalid Search Term")
                var messageContent = $("<p class='card-text mb-0'>");
                messageContent.text("Not a valid city search. Please check your spelling or try a different city.");

                messageContainerEl.append(messageTitle);
                messageContainerEl.append(messageContent);

                
                currentForecastContainerEl.append(messageContainerEl);
                
            }
        })
    });
};

// on city search, handle data and push to functions
var formSubmitHandler = function(event) {
    event.preventDefault();

    // clear old content
    currentForecastContainerEl.html("");
    fiveDayContainerEl.html("");

    // get value from input, change to lowercase to avoid duplication errors further into functions
    var currentCity = cityEl.val().trim().toLowerCase();
    // console.log(currentCity);

    // clear old content
    cityEl.val("");

    // send value as parameter for getWeather
    getWeather(currentCity);
};

// save city name to localstorage
var saveCityName = function(currentCity){
    // grab city name
    var cityString = currentCity;

    // grab "cityHistoryArr" key from localstorage
    var cityHistoryArr = localStorage.getItem("cityHistoryArr");
    
    // load cityHistoryArr, if empty create empty array, otherwise parse data
    if (cityHistoryArr === null) {
        cityHistoryArr = [];
    } else {
        cityHistoryArr = JSON.parse(cityHistoryArr);
    }

    // check for duplicates in array, only push to array AND to generate button function if none found
    if (!cityHistoryArr.includes(cityString)) {
        cityHistoryArr.push(cityString);
        generateHistoryButton(currentCity);
        console.log("no duplicate found");
    } else {
        console.log("duplicate found");
    }

    var newSavedCity = JSON.stringify(cityHistoryArr);
    localStorage.setItem("cityHistoryArr", newSavedCity);
    // console.log(cityHistoryArr);
};

// generate buttons with city name function
var generateHistoryButton = function(currentCity) {
    
    // create button with id set to currentCity's value (city name)
    var historyBtn = $("<button>");
    historyBtn.attr("class", "btn btn-outline-secondary w-100 mb-2 history-btn");
    historyBtn.attr("type", "button");
    historyBtn.attr("id", currentCity);
    historyBtn.text(currentCity);
    // prepend new buttons to the top of the history container
    historyContainerEl.prepend(historyBtn);
};

// load search history function
var renderSearchHistory = function() {
    // get city name from localstorage, parse data
    var cityHistoryArr = localStorage.getItem("cityHistoryArr");
    cityHistoryArr = JSON.parse(cityHistoryArr);

    // if array is NOT empty, create buttons with name value from array
    if (cityHistoryArr !== null) {
        for (i = 0; i < cityHistoryArr.length; i++) {
            var historyBtn = $("<button>");
            historyBtn.attr("class", "btn btn-outline-secondary w-100 mb-2 history-btn");
            historyBtn.attr("type", "button");
            historyBtn.attr("id", cityHistoryArr[i]);
            historyBtn.text(cityHistoryArr[i]);
            historyContainerEl.prepend(historyBtn);
        };
    }
};

// EVENT HANDLERS //
// new city search
citySearchEl.on("submit", formSubmitHandler);
// searchBtnEl.on("click", formSubmitHandler);

// clear search history
$("#clearHistory").on("click", function(event){
    // clear localstorage
    localStorage.clear();

    // clear all content in containers
    historyContainerEl.html("");
    currentForecastContainerEl.html("");
    fiveDayContainerEl.html("");
    // console.log("clear button clicked");
    document.getElementById('weatherapibox').style.background="none";

    // michael start
    // clear sunrise sunset data
    sunCity.style.display = "none";
    sunCardContainer.style.display = "none";
    // michael end


});

// clicking on city button in search history re-runs getWeather
$("#history").on("click", function(event){
    event.preventDefault();
    var targetEl = event.target;
    // console.log("history button clicked");
    
    // clear old content
    currentForecastContainerEl.html("");
    fiveDayContainerEl.html("");

    // if button clicked matches class 'history-btn' (to avoid bubbling)
    if (targetEl.matches (".history-btn")) {
        // grab city name that was set as the button's id
        var currentCity = targetEl.getAttribute("id");
        // console.log(currentCity);
        
        // pass to getWeather to re-run call
        getWeather(currentCity);

        // michael start
        // set city.value to currentCity and recall sunRiseSet in api2.js
        city.value = currentCity
        sunRiseSet();
        // michael end
    }
});
  
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
