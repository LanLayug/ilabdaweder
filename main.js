window.onload = function(){
    // create a new request
    var myRequest = new XMLHttpRequest();

    // cache the url
    var owmJson = "https://api.openweathermap.org/data/2.5/weather?id=1729557&APPID=4be0bc4727ae10cfd65b7027eeb44b7e&units=metric";

    // do something with the url
    myRequest.open("GET", owmJson);

    // do something with the data
    myRequest.onload = function(){
        var myData = JSON.parse(myRequest.responseText);
        console.log(myData);
        
        var city = myData.name;
        var weather = myData.weather[0].description;
        var temp = myData.main.temp;
        var wind_speed = myData.wind.speed;
        var icon = myData.weather[0].icon;
        var weather_icon = "http://openweathermap.org/img/w/"+icon+".png";

        var el_city = document.getElementById("city");
        var el_weather = document.getElementById("weather");
        var el_temp = document.getElementById("temp");
        var el_wind_speed = document.getElementById("wind_speed");
        var el_icon = document.querySelector("img#icon");

        el_city.innerHTML = city;
        el_weather.innerHTML = weather;
        el_temp.innerHTML = temp;
        el_wind_speed.innerHTML = wind_speed;
        el_icon.src = weather_icon;
    };

    // send request
    myRequest.send();

};
