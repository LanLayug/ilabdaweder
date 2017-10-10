window.onload = function(){
/******************   CURRENT WEATHER  *****************************/
    (function(){
        // create a new request
        var request = new XMLHttpRequest();
        // cache the url
        var owm_current = "https://api.openweathermap.org/data/2.5/weather?id=1729557&APPID=4be0bc4727ae10cfd65b7027eeb44b7e&units=metric";
        // do something with the url
        request.open("GET", owm_current, true);
        // do something with the data
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
                var el_current = document.getElementById("current");
                weather_current_html(el_current, city, current_time, icon, weather, temp, humidity, wind_speed);
            } else {
                console.log("connection established but server returned an error. Check the URL or your API calls");
            };
        };
        request.onerror = function(){
            console.log("error connecting to the server. Check the URL");
        };
        request.send();
    })();

/**********************  5 DAY WEATHER FORECAST  *********************************/
    (function(){
        var request = new XMLHttpRequest();
        var owm_forecast = "https://api.openweathermap.org/data/2.5/forecast?id=1729557&APPID=4be0bc4727ae10cfd65b7027eeb44b7e&units=metric";
        request.open("GET", owm_forecast, true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400){
                var data = JSON.parse(request.responseText);
                console.log(data);
                //var data_array = data.list;
                var el_forecast = document.getElementById("forecast");
                for (let i = 0; i < data.list.length; i++){
                    var next_date = (convert_time(data.list[i].dt));
                    var f_icon = data.list[i].weather[0].icon;
                    var f_temp = Math.round(data.list[i].main.temp);
                    weather_forecast_html(el_forecast, next_date, f_icon, f_temp);
                };
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

    var convert_time = function(unix_timestamp){
        var ms = new Date(unix_timestamp * 1000);
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var year = ms.getFullYear();
        var month = months[ms.getMonth()];
        var day = days[ms.getDay()];
        var date  = ms.getDate();
        var hours = ms.getHours();
        var ampm = hours >= 12 ? "PM" : "AM";
        var hour = function(hours){
            var x = hours % 12;
            var y = x == 0 ? 12 : x;
            return y;
        };
        var min = ("0"+ms.getMinutes()).slice(-2);
        var time = day+" "+"<small>"+hour(hours)+":"+min+" "+ampm+"<br>"+month+" "+date+", "+year+"</small>";
        return time;
    };

    var convert_mps_kph = function(wind_speed){
        var kph = (wind_speed * 3600) / 1000;
        return kph;
    };

    var weather_current_html = function(el, city, time, icon, desc, temp, humid, wind){
        var output_html = el.innerHTML  = 
        '<div class="column">'+
            '<h4>'+city+', Pampanga'+'</h4>'+
            '<h6>'+convert_time(time)+'</h6>'+
            '<img src="http://openweathermap.org/img/w/'+icon+'.png"/>'+'<span>'+desc+'</span>'+
            '<h6>'+'Temperature: '+Math.round(temp)+'&nbsp;&deg;C'+
            '<h6>'+'Humidity: '+humid+'%'+
            '<h6>'+'Wind: '+Math.round(convert_mps_kph(wind))+' km/h'+
        '</div>';
        return output_html;
    };

    var weather_forecast_html = function(el, date, icon, temp){
        var output_html = el.innerHTML +=
        '<div class="column is-narrow">'+
            '<h6>'+date+'</h6>'+'<img src="http://openweathermap.org/img/w/'+icon+'.png"/>'+
            '<h6>'+temp+'&nbsp;'+'&deg;C'+'</h6>'+
        '</div>';
        return output_html;
    };
};
