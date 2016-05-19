// Code for the Add Location page.
////////////////////////////////////////////////
function iMap() {
    //call the google map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: -34.397, lng: 150.644}//set the center, as the center is changed by the user's idea, so just set any      coordinates.
  });
  var geocoder = new google.maps.Geocoder();
  document.getElementById('address').addEventListener('click', function() {
  geocodeAddress(geocoder, map);//call the geocoder and map function
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById("Address").value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location//get the position we asked in the addlocation webpage.
      });
          var string = JSON.stringify(results[0].geometry.location)//transfer the data into the sting style
          localStorage.setItem("address",string)//store the string we get into the local storage
    }
      else {
      alert('Geocode was not successful for the following reason: ' + status);//In case any situation appear.
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


