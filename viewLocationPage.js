// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.
var locationsList = localStorage.getItem("addedLocations");
var locationWeatherCache = new LocationWeatherCache();

var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
if (locationIndex !== null)
{
    var locationNames = [ "Monash University Clayton", "Monash University Caulfield" ];
    // If a location name was specified, use it for header bar title.
    document.getElementById("headerBarTitle").textContent = locationNames[locationIndex];
}
var div = document.getElementById('locationSummary');

div.innerHTML += '<ul class="mdl-list" id="locationSummary">\
                             <span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0"\ src="images/loading.png" class="list-avatar" />\
                             <span> <b>' + locationWeatherCache.getStorage()[0].nick + '</b></span>\
                             <span></br><b>'+ 'Address: </b>' + locationWeatherCache.getStorage()[0].addr + '</span>\
                             <span></br><b>'+ 'Weather summary </b>' + '' + '</span>\
                             <span></br><b>'+ 'Minimum temperature: </b>' + '' + '&deg;C' + '</span>\
                             <span></br><b>'+ 'Maximum temperature: </b>' + '' + '&deg;C' + '</span>\
                             <span></br><b>'+ 'Humidity: </b>' + '' + '%' + '</span>\
                             <span></br><b>'+ 'Windspeed: </b>' + '' + 'km/h' + '</span>';

function iMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: parseFloat(locationWeatherCache.getStorage()[0].lat), lng: parseFloat(locationWeatherCache.getStorage()[0].long)}
    });
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow({
    content: 'test'
    });
}
iMap();



