// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.
//global varibles
var currentLocation;
var locationIndex;
var currentDate;
var map;
var marker;
var currentGeolocation = {};

//current location string for current location
var CURRENT_LOCATION_STR = 'Current Location';

//function to build the location 
var loadLocation = function()
{
	locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
    //function built to use cache details for a location
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
    //finding the current location
	else if (locationIndex == -1) 
	{
		document.getElementById("headerBarTitle").textContent = CURRENT_LOCATION_STR;

		// setup geolocation
        //failsafe
		if (!navigator.geolocation)
		{
		  alert("Geolocation is not supported by your browser");
		}
        //if success then it will use the geocode location to find your location 
		var success = function(position, hasMap) 
		{
            //creating the logitude and latitude of the location
		    var latitude  = parseFloat(position.coords.latitude);
		    var longitude = parseFloat(position.coords.longitude);
		    currentGeolocation.latitude = latitude;
		    currentGeolocation.longitude = longitude;
		    var locationPosition = {lat: latitude, lng: longitude};
		   //failsafe
            if (!hasMap) {
		    	buildMap(locationPosition);
		    } 
            //placing the center of the map at the intende location
            else {
		    	changeCenter(locationPosition);
		    }
            
            //adding curend location to index
		    locationIndex = locationWeatherCache.addLocation(latitude, longitude, CURRENT_LOCATION_STR);

		    currentDate = new Date();
			updateFields();
		};
		
		        //updating the current location
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
        //failsafe
		var error = function() 
		{
			alert("Unable to retrieve your location");
		};

		navigator.geolocation.getCurrentPosition(success, error);
        //runtime limitation
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

//getting rid of the current position in the location index
var clearCurrentPosition = function()
{
    //removes the location index in the cache
    locationWeatherCache.removeLocationAtIndex(locationIndex);
    locationIndex = -1;
}

//creating map from google api systems
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

//changes the center to the location that is given in the location postion of the index
var changeCenter = function(locationPosition)
{
	map.setCenter(locationPosition);
	marker.setMap(null);
	marker = new google.maps.Marker({
	  map: map,
	  position: locationPosition,
	});
}


//updating the date with the current date as given by the slider bar
var updateFields = function()
{
	updateCurrentDate();
	updateWeatherInfo();
}

var updateWeatherInfo = function() 
{
    //create id
	var weatherSummaryEl = document.getElementById('weatherSummary');
    //gives loading string as the information loads
	weatherSummaryEl.innerHTML = '<span>Loading...</span>';
    
    //failsafe
	if (locationIndex == -1) {
		return;
	}

    //get weather for the location and date
	locationWeatherCache.getWeatherAtIndexForDate(locationIndex, currentDate, updateWeatherSummary); //passes in callback function
}

//chaneges the current date into proper formate via locationweathercache
var updateCurrentDate = function()
{
	document.getElementById('dateField').innerHTML = currentDate.simpleDateString();
}



var updateWeatherSummary = function(index, weatherData)
{
    //falesafe
	if (!weatherData) {
		// console.log("N/a weather data");
		return;
	}
    //creats and id
	var weatherSummaryEl = document.getElementById('weatherSummary');
    //gets the written weather summary for the day
	var weatherCondition = weatherData.data[0].summary;
    //gets the minimum temperature after converting it from ferenheit to celcius which has the function on the location weather cache
	var minTemp = farenheitToCelcius(weatherData.data[0].temperatureMin);
    //gets the maximum temperature after converting it from ferenheit to celcius which has the function on the location weather cache
	var maxTemp = farenheitToCelcius(weatherData.data[0].temperatureMax);
    // get the humidity humidity percentage for the day to an accuracy 0f 0.1 decimals
	var humidity = (weatherData.data[0].humidity * 100).toFixed(1);
    // get the windspeed
	var windSpeed = (weatherData.data[0].windSpeed / 0.62137).toFixed(1); //convert to km/h from mph
	//summerise the information into one variable
    weatherSummaryEl.innerHTML = '<span class="mdl-list__item-text-body">' + weatherCondition + '</br> <b>Min temperature:</b> ' + minTemp + '&deg;C</br><b>Max temperature:</b> ' + maxTemp + '&deg;C<br/><b>Humidity:</b> ' + humidity + '%</br><b>Wind speed:</b> ' + windSpeed + 'km/h</span>';
}

//function to update the weather according to date
var updateDate = function()
{
    //creation of ide
	var sliderEl = document.getElementById('dateSlider');
    //necessary subtraction amount to find desired date
	var dateToSubtract = sliderEl.value - 30; 
    //create a new date 
	currentDate = new Date();
    //get current data for past date
    //subtracts despite plus sign due to negative dateToSubtract
	currentDate.setDate(currentDate.getDate() + dateToSubtract); 
    //update 
	updateFields();
}

//function to delete lcation from location list
var removeLocation = function()
{
    
	locationWeatherCache.removeLocationAtIndex(locationIndex);
	back();
}

var back = function()
{
	location.href = 'index.html';
}

//loads the location at the end
loadLocations();




