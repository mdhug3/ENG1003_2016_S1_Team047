// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.
locationsList = localStorage.getItem("addedLocations");
var locationWeatherCache = new LocationWeatherCache(locationsList);
function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
} 

/*for(var i = 0; i < locationWeatherCache.length(); i++){
    var theDiv = document.getElementById("locationList");
    var content = document.createTextNode('class=mdl-list__item mdl-list__item--two-line" onclick="viewLocation(1);">\
                <span class="mdl-list__item-primary-content">\
                  <img class="mdl-list__item-icon" id="icon1" src="images/loading.png" class="list-avatar" />\
                  <span>Location B</span>\
                  <span id="weather1" class="mdl-list__item-sub-title">Weather summary</span>\
                </span>');
    theDiv.appendChild(content);
}
*/
//locationsList = locationWeatherCache.getStorage("addedLocations");
var div = document.getElementById('locationList');

//for(var i = 0; i < locationWeatherCache.getStorage().length(); i++){
for(var i = 0; i < locationWeatherCache.getStorage().length; i++){
    console.log("count");
    div.innerHTML += '<ul class="mdl-list" id="locationList">\
                             <li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation('+ i +')">\
                             <span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0"\ src="images/loading.png" class="list-avatar" />\
                             <span>'+ locationWeatherCache.getStorage()[i].nick + '</span>\
                             <span id="weather0" class="mdl-list__item-sub-title">Click here for weather information...</span></span></li>';

}
//localStorage.setItem("storedDiv", div.innerHTML);
console.log("child should be appended");
