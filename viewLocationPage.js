// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var currentLocation;
var locationIndex;
var currentDate;
var map;
var marker;
var currentGeolocation = {};

var CURRENT_LOCATION_STR = 'Current Location';

var loadLocation = function()
{
	locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
	if (locationIndex !== null && locationIndex != -1)
	{
		currentLocation = locationWeatherCache.locationAtIndex(locationIndex);
	    // If a location name was specified, use it for header bar title.
	    document.getElementById("headerBarTitle").textContent = currentLocation.nickname;

	    // Init map
	    var locationPosition = {lat: currentLocation.latitude, lng: currentLocation.longitude};
	    buildMap(locationPosition);

	    // Date and weather info
	    currentDate = new Date();
		updateFields();
	} 
	else if (locationIndex == -1) 
	{
		document.getElementById("headerBarTitle").textContent = CURRENT_LOCATION_STR;

		// setup geolocation
		if (!navigator.geolocation)
		{
		  alert("Geolocation is not supported by your browser");
		}
		var success = function(position, hasMap) 
		{
		    var latitude  = parseFloat(position.coords.latitude);
		    var longitude = parseFloat(position.coords.longitude);
		    currentGeolocation.latitude = latitude;
		    currentGeolocation.longitude = longitude;
		    var locationPosition = {lat: latitude, lng: longitude};
		    if (!hasMap) {
		    	buildMap(locationPosition);
		    } else {
		    	changeCenter(locationPosition);
		    }

		    locationIndex = locationWeatherCache.addLocation(latitude, longitude, CURRENT_LOCATION_STR);

		    currentDate = new Date();
			updateFields();
		};

		var watch_success = function(position)
		{
			var latitude  = parseFloat(position.coords.latitude);
		    var longitude = parseFloat(position.coords.longitude);
		    if (currentGeolocation.latitude == latitude && currentGeolocation.longitude == longitude) {
		    	// console.log('No location change');
		    	return;
		    } else {
		    	clearCurrentPosition();
				success(position, true);
			}
		}

		var error = function() 
		{
			alert("Unable to retrieve your location");
		};

		navigator.geolocation.getCurrentPosition(success, error);

		var options = {
		  enableHighAccuracy: true, 
		  maximumAge        : 30000, 
		  timeout           : 27000
		};
		navigator.geolocation.watchPosition(watch_success, error, options);

		// disable remove button
		document.getElementById('removeBtn').disabled = true;
	}
}

var clearCurrentPosition = function()
{
    locationWeatherCache.removeLocationAtIndex(locationIndex);
    locationIndex = -1;
}

var buildMap = function(locationPosition)
{
	map = new google.maps.Map(document.getElementById('map'), {
	  center: locationPosition,
	  zoom: 8
	});
	marker = new google.maps.Marker({
	  map: map,
	  position: locationPosition,
	});
}

var changeCenter = function(locationPosition)
{
	map.setCenter(locationPosition);
	marker.setMap(null);
	marker = new google.maps.Marker({
	  map: map,
	  position: locationPosition,
	});
}

var updateFields = function()
{
	updateCurrentDate();
	updateWeatherInfo();
}

var updateWeatherInfo = function() 
{
	var weatherSummaryEl = document.getElementById('weatherSummary');
	weatherSummaryEl.innerHTML = '<span>Loading...</span>';

	if (locationIndex == -1) {
		return;
	}

	locationWeatherCache.getWeatherAtIndexForDate(locationIndex, currentDate, updateWeatherSummary); //passes in callback function
}

var updateCurrentDate = function()
{
	document.getElementById('dateField').innerHTML = currentDate.simpleDateString();
}

var updateWeatherSummary = function(index, weatherData)
{
	if (!weatherData) {
		// console.log("N/a weather data");
		return;
	}
	var weatherSummaryEl = document.getElementById('weatherSummary');
	var weatherCondition = weatherData.data[0].summary;
	var minTemp = farenheitToCelcius(weatherData.data[0].temperatureMin);
	var maxTemp = farenheitToCelcius(weatherData.data[0].temperatureMax);
	var humidity = (weatherData.data[0].humidity * 100).toFixed(1);
	var windSpeed = (weatherData.data[0].windSpeed / 0.62137).toFixed(1); //convert to km/h from mph
	weatherSummaryEl.innerHTML = '<span class="mdl-list__item-text-body">' + weatherCondition + '</br> <b>Min temperature:</b> ' + minTemp + '&deg;C</br><b>Max temperature:</b> ' + maxTemp + '&deg;C<br/><b>Humidity:</b> ' + humidity + '%</br><b>Wind speed:</b> ' + windSpeed + 'km/h</span>';
}

var updateDate = function()
{
	var sliderEl = document.getElementById('dateSlider');
	var dateToSubtract = sliderEl.value - 30; //necessary subtraction amount to find desired date
	currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + dateToSubtract); //subtracts despite plus sign due to negative dateToSubtract
	updateFields();
}

var removeLocation = function()
{
	locationWeatherCache.removeLocationAtIndex(locationIndex);
	back();
}

var back = function()
{
	location.href = 'index.html';
}

loadLocations();
