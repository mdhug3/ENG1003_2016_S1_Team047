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
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

this.weatherinformation = function(day){
if(day.currently.icon === "rain"){
    document.getElementById("icon").innerHTML= "<i class='wi wi-day-cloudy'></i>"
    document.getElementById("sky").innerHTML= "rain"
}
    
   
if(day.currently.icon === "partly-cloudy-day"){
    document.getElementById("icon").innerHTML= "<i class='wi wi-day-cloudy'></i>"
    document.getElementById("sky").innerHTML= "rain"
}
document.getElementById("maxtemp").innerHTML= "Minimum Temperature:" + day.daily.data[0].temperatureMax;
document.getElementById("mintemp").innerHTML= "Minimum tempertature:" + day.daily.data[0].temperatureMin;
document.getElementById("wind").innerHTML = "Windspeed:"+ day.currently.windSpeed
document.getElementById("humidity").innerHTML = "Humidity: " + day.currently.humidity + " %"
document.getElementById("icon").innerHTML
}
