// Code for the Add Location page.
////////////////////////////////////////////////
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

/*function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    console.log();
}

*/

function iMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();
  var infowindow = new google.maps.InfoWindow({
    content: 'test'
  });


  document.getElementById('address').addEventListener('click', function() {
    geocodeAddress(geocoder, map, true, infowindow);
  });
  document.getElementById('Address').addEventListener('input', function() {
    geocodeAddress(geocoder, map, false, infowindow);
  });

}

function geocodeAddress(geocoder, resultsMap, isClicked, infowindow) {
  var address = document.getElementById('Address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK && isClicked == true) {
      isClicked = false;
      resultsMap.setCenter(results[0].geometry.location);
      //console.log(results[0].formatted_address)
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      var infowindow = new google.maps.InfoWindow;
      infowindow.setContent(results[0].formatted_address);
      infowindow.open(resultsMap, marker);
      //infowindow.open(map, marker);
      var string = JSON.stringify(results[0].geometry.location)//transfer the data into the sting style
      localStorage.setItem("address",string)//store the string we get into the local storage
      //infowindow.open(map, marker);
    }
    else if(status === google.maps.GeocoderStatus.OK && isClicked == false){
        resultsMap.setCenter(results[0].geometry.location);
        //var marker = new google.maps.Marker({
          //map: resultsMap,
          //position: results[0].geometry.location
      //});
    }
    else {
      if(isClicked === true){
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }
  });
}

var nickname = document.getElementById('submitname').value;
var nickString= JSON.stringify(nickname);
localStorage.setItem("nickname",nickString);
                                        
function returnAndSave()
{
    locationList.innerHTML = getstorage();
}

var output= "";
var str;
var result;
function getstorage (){
    str1 = localStorage.getItem("nickname");//Find the storage in the localstorge by searching the "key"
    str2 = localStorage.getItem("address");
    result1 = JSON.parse(str1);//transfer the string back to the object again
    result2 = JSON.parse(str2);
    output+= result1 + "</br>" + result2 + "</br>";
}

