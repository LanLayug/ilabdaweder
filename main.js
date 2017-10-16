window.onload = function(){
/******************   CURRENT WEATHER  *****************************/
    (function(){
        var request = new XMLHttpRequest();
        var owm_current = "https://api.openweathermap.org/data/2.5/weather?id=1729557&APPID=4be0bc4727ae10cfd65b7027eeb44b7e&units=metric";
        request.open("GET", owm_current, true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400){
                var myData = JSON.parse(request.responseText);
                var city = myData.name;
                var current_time = convert_time(myData.dt);
                var weather = myData.weather[0].description;
                var temp = myData.main.temp;
                var humidity = myData.main.humidity;
                var wind_speed = convert_mps_kph(myData.wind.speed);
                var wind_direction = convert_deg_direction(myData.wind.deg);
                var icon = myData.weather[0].icon;
                var el_current = document.getElementById("weather-current");
                weather_current_html(el_current, city, current_time, icon, weather, temp, humidity, wind_speed, wind_direction);
            } else {
                console.log("connection established but server returned an error. Check the URL or your API calls");
                alert("connection established but server returned an error. Check the URL or your API calls");
            };
        };
        request.onerror = function(){
            console.log("error connecting to the server. Check your internet connection or the URL");
            alert("error connecting to the server. Check your internet connection or the URL");
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
                var el_forecast = document.getElementById("weather-forecast");
                for (let i = 0, l = data.list.length; i < l; i++){
                    var next_date = (convert_time(data.list[i].dt));
                    var f_icon = data.list[i].weather[0].icon;
                    var f_temp = Math.round(data.list[i].main.temp);
                    var f_weather = data.list[i].weather[0].description;
                    weather_forecast_html(el_forecast, next_date, f_icon, f_temp, f_weather, bg_color(f_temp));
                };
            } else {
                console.log("connection established but server returned an error. Check the URL or your API calls");
                alert("connection established but server returned an error. Check the URL or your API calls");
            };
        };
        request.onerror = function(){
            console.log("error connecting to the server. Check your internet connection or the URL");
            alert("error connecting to the server. Check your internet connection or the URL");
        };
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
        var ampm = hours >= 12 ? "pm" : "am";
        var hour = function(hours){
            var x = hours % 12;
            var y = x == 0 ? 12 : x;
            return y;
        };
        var min = ("0"+ms.getMinutes()).slice(-2);
        var time = [day, hour(hours), min, ampm, month, date, year];
        return time;
    };

    var convert_mps_kph = function(wind_speed){
        var kph = (wind_speed * 3600) / 1000;
        return kph;
    };

    var convert_deg_direction = function(wind_deg){
        if ((wind_deg >= 348.75 && wind_deg <= 360) || (wind_deg >= 0 && wind_deg < 11.25)){return '&#x2191'+'N';}
        else if (wind_deg >= 11.25 && wind_deg < 33.75){return '&#x2197'+' NNE';}
        else if (wind_deg >= 33.75 && wind_deg < 56.25){return '&#x2197'+' NE';}
        else if (wind_deg >=  56.25 && wind_deg < 78.75){return '&#x2197'+' ENE';}
        else if (wind_deg >=  78.75 && wind_deg < 101.25){return '&#x2192'+' E';}
        else if (wind_deg >=  101.25 && wind_deg < 123.75){return '&#x2198'+' ESE';}
        else if (wind_deg >=  123.75 && wind_deg < 146.25){return '&#x2198'+' SE';}
        else if (wind_deg >=  146.25 && wind_deg < 168.75){return '&#x2198'+' SSE';}
        else if (wind_deg >=  168.75 && wind_deg < 191.25){return '&#x2193;'+' S';}
        else if (wind_deg >=  191.25 && wind_deg < 213.75){return '&#x2199;'+' SSW';}
        else if (wind_deg >=  213.75 && wind_deg < 236.25){return '&#x2199;'+' SW';}
        else if (wind_deg >=  236.25 && wind_deg < 258.75){return '&#x2199;'+' WSW';}
        else if (wind_deg >=  258.75 && wind_deg < 281.25){return '&#x2190;'+' W';}
        else if (wind_deg >=  281.25 && wind_deg < 303.75){return '&#x2196;'+' WNW';}
        else if (wind_deg >=  303.75 && wind_deg < 326.25){return '&#x2196;'+' NW';}
        else if (wind_deg >=  326.25 && wind_deg < 348.75){return '&#x2196;'+' NNW';}
    };

    var weather_current_html = function(el, city, time, icon, desc, temp, humid, wind, degree){
        var output_html = el.innerHTML  = 
        '<div class="col">'+
            '<h4 class="">'+city+', Pampanga'+'</h4>'+
            '<h5><span>'+time[0]+'</span><small>'+'&nbsp;'+time[1]+':'+time[2]+'&nbsp;'+time[3]+
            ' '+time[4]+'&nbsp;'+time[5]+',&nbsp;'+time[6]+'</small></h5>'+
            '<h5 class="text-capitalize">'+desc+'</h5>'+
            '<h4><img src="https://openweathermap.org/img/w/'+icon+'.png"/><span>'+'&nbsp;'+Math.round(temp)+'&nbsp;&deg;C</span></h4>'+
            '<h6>Humidity:&nbsp;'+humid+'%'+
            '<h6>Wind:&nbsp;'+Math.round(wind)+'&nbsp;km/h'+'&nbsp;'+degree+
        '</div>';
        return output_html;
    };

    var weather_forecast_html = function(el, date, icon, temp, forecast, bg){
        var output_html = el.innerHTML +=
        '<div class="box text-center pt-4 pb-4 col-6 col-sm-4 col-md-3 col-lg-2" style="background-color:'+bg+'">'+
            '<h6>'+date[0]+'&nbsp;'+ date[1]+':'+date[2]+'&nbsp;'+date[3]+'</h6>'+
            '<img src="https://openweathermap.org/img/w/'+icon+'.png" ontouchstart title="'+forecast+'"/>'+
            '<h6>'+temp+'&nbsp;'+'&deg;C'+'</h6>'+
        '</div>';
        return output_html;
    };

    var bg_color = function(temp){
        var cool = ['19aeff', '0084c8', '005c94', '364e59', '0e232e', '009100', 'ba00ff'];
        var warm = ['ff4141', 'dc0000', 'b50000', 'ff9900', 'ff6600', 'b88100', '804d00'];

        if (temp > 28){
            var bg = Math.floor(Math.random()*(warm.length));
            return '#'+warm[bg];
        } else {
            var bg = Math.floor(Math.random()*(cool.length));
            return '#'+cool[bg];
        };
    };
};
