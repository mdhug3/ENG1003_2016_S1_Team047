// Code for the Add Location page.

var map;
var geocoder;
var infowindow;
var currentLocation;
var marker;

var initMap = function() 
{
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

var updateMap = function()
{
  if (infowindow) {
    infowindow.close();
  }
  var newLocation = document.getElementById('locationInput').value;
  if (!newLocation) {
    currentLocation = null;
    return;
  }
  geocoder.geocode({ 'address': newLocation}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      currentLocation = results[0];
      map.setCenter(currentLocation.geometry.location);
      if (marker) {
        marker.setMap(null);
      }
      marker = new google.maps.Marker({
          map: map,
          position: currentLocation.geometry.location,
      });
      infowindow = new google.maps.InfoWindow({
        content: currentLocation.formatted_address
      });
      infowindow.open(map, marker);
    } else {
      currentLocation = null;
      alert("No results found! Please try again")
      console.log("Geocoding error: " + status);
    }
  });
}

var addLocation = function() 
{
  var nickname = document.getElementById('nicknameInput').value;
  if (!nickname) {
    nickname = document.getElementById('locationInput').value;
  }
  if (!currentLocation) {
    alert("Invalid Location or No Location To Add!");
  } else {
    locationWeatherCache.addLocation(currentLocation.geometry.location.lat(), currentLocation.geometry.location.lng(), nickname);
    // Return to main page
    location.href = 'index.html';
  }
}

loadLocations();
