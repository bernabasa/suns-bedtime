var searchButton = document.getElementById("searchBtn");
var city = document.getElementById("city-input");
var sunCity= document.querySelector(".sunCity")
var sunCardContainer = document.querySelector(".sunCardContainer")
var sunCard = document.querySelector(".sunCard")

// for (let i = 0; i < 4; i++) {

//     // sunCard.style.backgroundImage = "url('./assets/images/suncard'"+i+"'.jpeg')"
//     sunCardBackground.src = "url('./assets/images/suncard'"+i+"'.jpeg')"
//     console.log(sunCardBackground);
// }
// backgroundImageArray = ["./assets/images/suncard0.jpeg","./assets/images/suncard1.jpeg","./assets/images/suncard2.jpeg","./assets/images/suncard3.jpeg","./assets/images/suncard4.jpeg"]

function sunRiseSet() {

    // first fetch start
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&APPID=869a3796e787dba42b7607508ecc71e0")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    
        lon = data.coord.lon;
        lat = data.coord.lat;
        // timezone = data.timezone
        // cityname = data.name;
        console.log(lon);
        console.log(data.coord.lat);



        // first fetch nino start



        // first fetch nino end



        // first fetch bernabas start



        // first fetch bernabas end




            // second fetch start
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&units=imperial&appid=ede08bcde83c2fa795daf3201714e151")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                console.log(data)
                timezone = data.timezone
            



                // second fetch nino start



                // second fetch nino end



                // second fetch bernabas start



                // second fetch bernabas end




                        
                        // for loop start
                        for (var i = 0;  i < dates.length; i++) {
                            
                            // third fetch start
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
                                            var estSunrise = utcSunrise.toLocaleString("en-US", {timeZone: timezone});
                                                console.log('USA time: '+ estSunrise)
                                            
                                            // convert UTC sunset to EST sunset
                                            var utcSunset = new Date(sunset);
                                                console.log('UTC Time: ' + utcSunset.toISOString());
                                            var estSunset = utcSunset.toLocaleString("en-US", {timeZone: timezone});
                                                console.log('USA time: '+ estSunset)
                                        // stack overflow end

                                                    // split date & time
                                                    var sunriseSplit = estSunrise.split(" ");
                                                    var date = sunriseSplit[0];
                                                        console.log(date);
                                                        // console.log(typeof date)
                                                    
                                                    // sunrise split date & comma
                                                    var splitComma = date.split(",");
                                                        console.log(splitComma);
                                                    var newDate = splitComma[0];
                                                        console.log(newDate);

                                                    // sunrise time
                                                    var sunriseTime = sunriseSplit[1] + " AM";
                                                        console.log(sunriseTime);

                                                    // sunset time
                                                    var sunsetSplit = estSunset.split(" ");
                                                    var sunsetTime = sunsetSplit[1] + " PM";
                                                        console.log(sunsetTime); 


                                                    // console.log(typeof estSunrise)
                                
                            // print to web
                            var sunDateBox = document.createElement("h3");                                
                            var sunriseImg = document.createElement("img");
                            var sunriseTxt = document.createElement("h4");
                            var sunriseRealTime = document.createElement("h5");
                            var sunsetImg = document.createElement("img");
                            var sunsetTxt = document.createElement("h4");
                            var sunsetRealTime = document.createElement("h5");

                            // add bulma class
                            var sunCard = document.createElement("div");
                            sunCard.classList.add("sunCard", "column", "card", "bg-light", "shadow", "px-3", "py-3", "my-6", "is-size-3-mobile")
                            // card bg-light shadow px-3 py-3
                            
                            sunDateBox.classList.add("sunDateBox");
                            sunriseImg.classList.add("sunriseImg");
                            sunsetImg.classList.add("sunsetImg");
                            sunriseTxt.classList.add("sunriseTxt");
                            sunsetTxt.classList.add("sunsetTxt");
                            sunriseRealTime.classList.add("sunriseRealTime");
                            sunsetRealTime.classList.add("sunsetRealTime");
                            
                            sunCity.textContent = "Sunrise & Sunset"
                            sunDateBox.textContent = newDate;                                
                            sunriseImg.src = "./assets/images/sunrise-100px.svg";
                            sunriseTxt.textContent = "Sunrise Time:";
                            sunriseRealTime.textContent = sunriseTime;
                            sunsetImg.src = "./assets/images/sunset-100px.svg";
                            sunsetTxt.textContent = "Sunset Time:";
                            sunsetRealTime.textContent = sunsetTime;
                            
                            
                            // printBackgroundImg.style.backgroundImage = 
                            // for (let i = 0; i < 5; i++) {
                        
                            //     // sunCard.style.backgroundImage = "url('./assets/images/suncard'"+i+"'.jpeg')"
                            //     sunCardBackground.src = "url('./assets/images/suncard'"+i+"'.jpeg')"
                            //     sunCard.append(sunCardBackground);
                                                                
                            // }

                            // sunCardContainer.sunCard.style.backgroundImage = "url('./assets/images/suncard'"+i+"'.jpeg')"
                            // sunCardContainer.style.backgroundImage = "url('./assets/images/sunbackground.jpeg')"

                            sunCardContainer.append(sunCard);
                            sunCard.append(sunDateBox);
                            sunCard.append(sunriseImg);
                            sunCard.append(sunriseTxt);
                            sunCard.append(sunriseRealTime);
                            sunCard.append(sunsetImg);
                            sunCard.append(sunsetTxt);
                            sunCard.append(sunsetRealTime);

                            console.log(sunCardContainer);





                            // third fetch nino start






                            // third fetch nino end



                            // third fetch bernabas start




                            

                            // third fetch bernabas end





                            });
                            // third fetch end

                        };
                        // for loop end


            });
            // second fetch end
             

    });
    // first fetch end
 


    console.log("clicked");
    console.log(city.value);


    sunCardContainer.textContent = "";

}

searchButton.addEventListener("click", sunRiseSet);
