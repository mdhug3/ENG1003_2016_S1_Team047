// Code for the Add Location page.
locationsList =[];
locationWeatherCache = new LocationWeatherCache();

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
    geocodeAddress(geocoder, map, true, infowindow, locationsList);
  });
  document.getElementById('Address').addEventListener('input', function() {
    geocodeAddress(geocoder, map, false, infowindow);
  });

}

function geocodeAddress(geocoder, resultsMap, isClicked, infowindow, locationList) {
  var address = document.getElementById('Address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK && isClicked === false) {
      isClicked = false;
      resultsMap.setCenter(results[0].geometry.location);
      var nickname = document.getElementById('submitname').value;
      returnAndSave(locationList);
      var lat = results[0].geometry.location.lat();
      var long = results[0].geometry.location.lng();
      //var addr = results[0].formatted_address;
      
      
      
      var test;
      
      //console.log(results[0].formatted_address)
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      var infowindow = new google.maps.InfoWindow;
      infowindow.setContent(results[0].formatted_address);
      infowindow.open(resultsMap, marker);
      resultsMap.setCenter(results[0].geometry.location);
      //infowindow.open(map, marker);
      
    }
    else {
      if(isClicked === true){
          var nickname = document.getElementById('submitname').value;
          returnAndSave(locationList);
          var lat = results[0].geometry.location.lat();
          var long = results[0].geometry.location.lng()
          var formattedAddress = document.getElementById('Address').value;
          locationWeatherCache.addLocation(lat, long, nickname, formattedAddress);
          /*for(var i = 0; i < locationWeatherCache.length(locationsList); i++){
                var theDiv = document.getElementById("locationList");
                var content = document.createTextNode('class=mdl-list__item mdl-list__item--two-line" onclick="viewLocation(1);">\
                            <span class="mdl-list__item-primary-content">\
                              <img class="mdl-list__item-icon" id="icon1" src="images/loading.png" class="list-avatar" />\
                              <span>Location B</span>\
                              <span id="weather1" class="mdl-list__item-sub-title">Weather summary</span>\
                            </span>');
                theDiv.appendChild(content);
            }
          console.log("child should be appended");*/
          document.location.href = "index.html";
      }
    }
  });
}


                                        
function returnAndSave(locationList)
{
    locationListItem = getstorage();
    locationsList.push(locationListItem);
    //console.log(locationList[0] + locationList[1]);
    
}

var output= "";
var str;
var result;
function getstorage (){
    
}
