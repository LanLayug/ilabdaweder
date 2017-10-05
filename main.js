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
        console.log(myData.name);
        console.log(myData.weather[0].description);
        console.log(myData.main.temp);
        console.log(myData.main.temp_min);
        console.log(myData.main.temp_max);
    };

    // send request
    myRequest.send();
};
