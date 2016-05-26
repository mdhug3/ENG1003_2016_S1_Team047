// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
if (locationIndex !== null)
{
    var locationNames = [ "Monash University Clayton", "Monash University Caulfield" ];
    // If a location name was specified, use it for header bar title.
    document.getElementById("headerBarTitle").textContent = locationNames[locationIndex];
}

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -37.9116, lng: 145.1340},
    zoom: 13
  });
    var marker = new google.maps.Marker({
    position: {lat: -37.9116, lng: 145.1340},
    map: map,
    title: "uni"
  });
}

this.weatherinformation = function(day){
if(day.currently.icon === "rain"){
    var image = document.getElementById("icon").innerHTML ;
    
    document.getElementById("sky").innerHTML= "Current Weather: Rain";
} 
if(day.currently.icon === "partly-cloudy-day"){
    document.getElementById("icon").innerHTML= ""
    document.getElementById("sky").innerHTML= "Current Weather: Partly Cloudy Day"
}
if(day.currently.icon === "partly-cloudy-night"){
    document.getElementById("icon").innerHTML= ""
    document.getElementById("sky").innerHTML= "Current Weather: Partly Cloudy Night"
}
if(day.currently.icon === "wind"){
    document.getElementById("icon").innerHTML= ""
    document.getElementById("sky").innerHTML= "Current Weather: Wind"
}
if(day.currently.icon === "sleet"){
    document.getElementById("icon").innerHTML= '<img  scr="sleet.png">'
    document.getElementById("sky").innerHTML= "Current Weather: Sleet"
}
if(day.currently.icon === "fog"){
    document.getElementById("icon").innerHTML= ""
    document.getElementById("sky").innerHTML= "Current Weather: Fog"
}
if(day.currently.icon === "clear-night"){
    document.getElementById("icon").innerHTML= ""
    document.getElementById("sky").innerHTML= "Current Weather: Clear Night";
}
if(day.currently.icon === "snow"){
    document.getElementById("icon").innerHTML= "";
    document.getElementById("sky").innerHTML= "Current Weather: Snow";
}

    
document.getElementById("maxtemp").innerHTML= "Maximum Temperature:" + day.daily.data[0].temperatureMax;
document.getElementById("mintemp").innerHTML= "Minimum tempertature:" + day.daily.data[0].temperatureMin;
document.getElementById("wind").innerHTML = "Windspeed:"+ day.currently.windSpeed;
document.getElementById("humidity").innerHTML = "Humidity: " + day.currently.humidity + " %";
}
