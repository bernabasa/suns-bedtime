
var lon
var lat

var cityinput
var input




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

            var settemp = $("#temp");
            var setfeels = $("#feels");
            var setweather = $("#weather");
            var setdescription = $("#description");
            var sethumidity = $("#humidity");

            settemp.text(temp);
            setfeels.text(feels);
            setweather.text(weather);
            setdescription.text(description);
            sethumidity.text(humidity);

            var icon = response.current.weather[0].icon;
            var setimage = $("#weatherimage");
            console.log(icon);
            setimage.attr("src", "./assets/images/dolphinplaceholder.jpg");







        })





    })


}




$("#city-search").on('submit', function(e) {

    //not sure why this works but this guy says it does: https://stackoverflow.com/questions/22742194/form-validation-text-error-text-disappears  
    e.preventDefault();

    var cityinput = $("#city-input").val();
    console.log(cityinput);

    if (cityinput === "" || cityinput === null) {
    } else {
        input = cityinput.toLowerCase();
        console.log(input);
        forecast(input);
        //futureforecast(city);
    }

})










//var test = "washington";

//forecast(test);
