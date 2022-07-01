
var lon
var lat








function forecast(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=869a3796e787dba42b7607508ecc71e0')
    .then(response => response.json())
    .then(function(response) {
        lon = response.coord.lon;
        lat = response.coord.lat;
        cityname = response.name;
        console.log(lon);
        console.log(lat);

        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,hourly,alerts&units=imperial&appid=ede08bcde83c2fa795daf3201714e151')
        .then(response => response.json())
        .then(function(response) {

            var temp = response.current.temp;
            var feels = response.current.feels_like;
            var weather = response.current.weather[0].main;
            var description = response.current.weather[0].description;
            var humidity = response.current.humidity;

            console.log(temp);
            console.log(feels);
            console.log(weather);
            console.log(description);
            console.log(humidity);





        })











    })






}

var test = "washington";

forecast(test);
