window.onload = function(){
    // WEATHER FORECAST 
    (function(){
        // create a new request
        var request = new XMLHttpRequest();
        // cache the url
        var owm_forecast = "https://api.openweathermap.org/data/2.5/forecast?id=1729557&APPID=4be0bc4727ae10cfd65b7027eeb44b7e&units=metric";
        // do something with the url
        request.open("GET", owm_forecast, true);
        // do something with the data
        request.onload = function(){
            if (request.status >= 200 && request.status < 400){
                var data = JSON.parse(request.responseText);
                console.log(data);
                var tmp = data.list[5].main.temp;
                console.log(tmp);
                var time = data.list[5].dt;
                console.log(time);
                console.log(convert_time(time));
            } else {
                console.log("connection established but server returned an error. Check the URL or your API calls");
            };
        };
        request.onerror = function(){
            console.log("error connecting to the server. Check the URL");
        };
        // send request
        request.send();
    })();

    // CURRENT WEATHER
    (function(){
        var request = new XMLHttpRequest();
        var owm_forecast = "https://api.openweathermap.org/data/2.5/weather?id=1729557&APPID=4be0bc4727ae10cfd65b7027eeb44b7e&units=metric";
        request.open("GET", owm_forecast, true);

        request.onload = function(){
            if (request.status >= 200 && request.status < 400){
                var myData = JSON.parse(request.responseText);
                var city = myData.name;
                var current_time = myData.dt;  
                var weather = myData.weather[0].description;
                var temp = myData.main.temp;
                var humidity = myData.main.humidity;
                var wind_speed = myData.wind.speed;
                var icon = myData.weather[0].icon;
                var weather_icon = "http://openweathermap.org/img/w/"+icon+".png";
                var el_city = document.getElementById("city");
                var el_weather = document.getElementById("weather");
                var el_time = document.getElementById("time")
                var el_temp = document.getElementById("temp");
                var el_humidity = document.getElementById("humidity");
                var el_wind_speed = document.getElementById("wind_speed");
                var el_icon = document.querySelector("img#icon");

                el_city.innerHTML = city+', Pampanga';
                el_time.innerHTML = convert_time(current_time);
                el_weather.innerHTML = weather;
                el_temp.innerHTML = 'Temperature: '+temp+'&deg;C';
                el_humidity.innerHTML = 'Humidity: '+humidity+'%';
                el_wind_speed.innerHTML = 'Wind Speed: '+convert_mps_kph(wind_speed)+' km/h';
                el_icon.src = weather_icon;
            } else {
                console.log("connection established but server returned an error. Check the URL or your API calls");
            };
        };
        request.onerror = function(){
            console.log("error connecting to the server. Check the URL");
        };
        request.send();
    })();

    var convert_time = function(unix_timestamp){
        var ms = new Date(unix_timestamp * 1000);
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var year = ms.getFullYear();
        var month = months[ms.getMonth()];
        var day = days[ms.getDay()];
        var date  = ms.getDate();
        var hours = ms.getHours();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        var hour = function(hours){
            var x = hours % 12;
            var y = x == 0 ? 12 : x;
            return y;
        };
        var min = ('0'+ms.getMinutes()).slice(-2);
        var time = day+' '+'<small>'+hour(hours)+':'+min+' '+ampm+'<br>'+month+' '+date+', '+year+'</small>';
        return time;
    };

    var convert_mps_kph = function(wind_speed){
        var kph = (wind_speed * 3600) / 1000;
        return kph;
    };
};
