var searchButton = document.getElementById("searchBtn");
var city = document.getElementById("city-input");

var sunContainer = document.querySelector(".sunCards")


function sunRiseSet() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&APPID=869a3796e787dba42b7607508ecc71e0")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    
        lon = data.coord.lon;
        lat = data.coord.lat;
        // cityname = data.name;
        console.log(lon);
        console.log(data.coord.lat);


                // for loop start
                for (var i = 0;  i < dates.length; i++) {
                    
                    fetch("https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lon + "&formatted=0" + "&date=" +  dates[i])
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);

                            sunrise = data.results.sunrise
                            sunset = data.results.sunset
                            
                                // stack overflow start: "https://stackoverflow.com/questions/64863646/convert-date-from-utc-to-est-javascript-html"
                                    // convert UTC sunrise to EST sunrise
                                    var utcSunrise = new Date(sunrise);
                                        console.log('UTC Time: ' + utcSunrise.toISOString());
                                    var estSunrise = utcSunrise.toLocaleString("en-US", {timeZone: "America/New_York"});
                                        console.log('USA time: '+ estSunrise)
                                    
                                    // convert UTC sunset to EST sunset
                                    var utcSunset = new Date(sunset);
                                        console.log('UTC Time: ' + utcSunset.toISOString());
                                    var estSunset = utcSunset.toLocaleString("en-US", {timeZone: "America/New_York"});
                                        console.log('USA time: '+ estSunset)
                                // stack overflow end

                                            // // split date & time
                                            var sunriseSplit = estSunrise.split(" ");
                                            var date = sunriseSplit[0];
                                                console.log(date);
                                            //     console.log(typeof date)
                                            
                                            // // sunrise split date & comma
                                            var splitComma = date.split(",");
                                                console.log(splitComma);
                                            var newDate = splitComma[0];
                                                console.log(newDate);

                                            // // sunrise time
                                            var sunriseTime = sunriseSplit[1] + " AM";
                                                console.log(sunriseTime);

                                            // // sunset time
                                            var sunsetSplit = estSunset.split(" ");
                                            var sunsetTime = sunsetSplit[1] + " PM";
                                                console.log(sunsetTime); 


                                            // console.log(typeof estSunrise)

                        var sunDateBox = document.createElement("p");
                        var sunriseTimeBox = document.createElement("p");
                        var sunsetTimeBox = document.createElement("p");

                        sunDateBox.textContent = newDate;
                        sunriseTimeBox.textContent = sunriseTime;
                        sunsetTimeBox.textContent = sunsetTime;

                        sunContainer.append(sunDateBox);
                        sunContainer.append(sunriseTimeBox);
                        sunContainer.append(sunsetTimeBox);

                    });
                    
                    // console.log(printDates);



                    console.log(data)
                    


                };
                // for loop end



    });

 


    console.log("clicked");
    console.log(city.value);


}

searchButton.addEventListener("click", sunRiseSet);
               