// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var viewLocation = function(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}

var buildLocationLists = function() 
{
	var list = document.getElementById('locationList');
	for (var i = 0; i < locationWeatherCache.length(); i++) {
		var li = buildLocationDefaultListItem(i);
		list.appendChild(li);
		var date = new Date();
		locationWeatherCache.getWeatherAtIndexForDate(i, date, updateWeather);
	}
}

var updateWeather = function(index, weatherData) 
{
	// stop loading spinner
	var spinner = document.getElementById('spinner' + index);
	spinner.className = 'mdl-spinner mdl-spinner--single-color mdl-js-spinner';

	// update icon
	var icon = document.getElementById('icon' + index);
	icon.setAttribute('src', 'images/' + weatherData.data[0].icon + '.png');

	// update temparatures info
	var temperatures = document.getElementById('weather' + index);
	temperatures.innerHTML = 'Low: ' + farenheitToCelcius(weatherData.data[0].temperatureMin) + '&deg;C | ' + 'High: ' + farenheitToCelcius(weatherData.data[0].temperatureMax) + '&deg;C'; //ASCII code for degree sign
}

var buildLocationDefaultListItem = function(index) 
{
	// create li element
	var li = document.createElement('li');
	li.className = 'mdl-list__item mdl-list__item--two-line';
	li.setAttribute('onClick', 'viewLocation(' + index +')');

	// create li's child div element
	var div = document.createElement('div');
	div.className = 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active';
	div.setAttribute('id', 'spinner' + index);

	// create li's child span element
	var span = buildDefaultListItemChildSpan(index);

	// appending child elements to li
	li.appendChild(div);
	li.appendChild(span);
	return li;
}

var buildDefaultListItemChildSpan = function(index) 
{
	var location = locationWeatherCache.locationAtIndex(index);

	// create span element
	var span = document.createElement('span');
	span.className = 'mdl-list__item-primary-content';

	// create span's child img element
	var childImg = document.createElement('img');
	childImg.className = 'mdl-list__item-icon list-avatar';
	childImg.setAttribute('id', 'icon' + index);
	childImg.setAttribute('src', 'images/loading.png');

	// create span's first child span element
	var childSpan = document.createElement('span');
	childSpan.setAttribute('id', 'locName' + index);
	childSpan.innerHTML = location.nickname;

	// create span's second child span element
	var childSpan2 = document.createElement('span');
	childSpan2.className = 'mdl-list__item-sub-title';
	childSpan2.setAttribute('id', 'weather' + index);
	childSpan2.innerHTML = 'Loading Low/High temperatures...';

	// append child elements to span
	span.appendChild(childImg);
	span.appendChild(childSpan);
	span.appendChild(childSpan2);
	return span;
}

loadLocations();
buildLocationLists();
