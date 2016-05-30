
// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    
    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}


// Code for LocationWeatherCache class and other shared code.

farenheitToCelcius = function(deg) 
{
    return ((deg - 32) / 1.8).toFixed(1); // Convert from farenheit to celcius
}

// Prefix to use for Local Storage.
var APP_PREFIX = "WeatherApp"; 

function LocationWeatherCache()
{
    // Private attributes:
    var locations = [];
    var callbacks = [];

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() 
    {
        return locations.length;
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) 
    {
        if (0 <= index && index < locations.length) {
            return locations[index];
        } else {
            return null; // IndexOutOfBound
        }
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(lat, long, nick)
    {
        var locationIndex = indexForLocation(lat, long);
        if (locationIndex != -1) { // if location already existed
            return locationIndex;
        } else {
            var addedLocation = {
                nickname: nick,
                latitude: lat,
                longitude: long,
                forecasts: {}
            }
            locations.push(addedLocation); // newLocation is added to the end of the array, return previous length
                                         // since array is 0-indexed
            saveLocations();
            return locations.length;
        }
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        if (0 <= index && index < locations.length) {
            locations.splice(index, 1);
        }
        saveLocations();
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() 
    {
        return locations;
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) 
    {
        locations = locationWeatherCachePDO;
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(index, date, callback) 
    {
        var formattedDate = date.forecastDateString();
        var location = this.locationAtIndex(index);
        if (!location) {
            return;
        }
        var locObjAttribute = [location.latitude, location.longitude, formattedDate].join(',');
        if (location.forecasts.hasOwnProperty(locObjAttribute)) {
            callback(index, location.forecasts[locObjAttribute]);
        } else {
            var rawDate =  Math.round((new Date(formattedDate)).getTime() / 1000);
            callbacks.push({
                index: index,
                date: formattedDate,  // formattedDate could lead to error in date due to forecast.io API will get timezone by latitude and longitude provided
                rawDate: rawDate,
                callback: callback
            });
            var forecastURL = 'https://api.forecast.io/forecast/985804686aaa036b3c0400ed94e854d1/';
            var query = String('' + location.latitude + ',' + location.longitude + ',' + rawDate);
            var callback = '?callback=locationWeatherCache.weatherResponse';
            var options = '&exclude=[minutely,hourly,alerts,flags]';
            var el = document.createElement('script');
            el.setAttribute('type', 'text/javascript');
            el.src = forecastURL + query + callback + options;
            document.body.appendChild(el);
        }
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) 
    {
        var latitude = response.latitude;
        var longitude = response.longitude;
        var date = response.currently.time; // use currently time to check for callback at that time
        var index = indexForLocation(latitude, longitude);
        if (index == -1) {
            return;
        } else {
            var obj = callbacks.find(function(e) {
                return e.index == index && e.rawDate == date; // use rawDate to check for date instead of formattedDate due to possible error from API
            });
            if (obj) {
                callback = obj.callback;
                var locObjAttribute = String('' + latitude + ',' + longitude + ',' + obj.date);
                locations[index].forecasts[locObjAttribute] = response.daily;
                saveLocations();
                callback(index, response.daily);
            };
        }
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
        return locations.findIndex(function(e) {
            return e.latitude == latitude && e.longitude == longitude;
        });
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
    var localData = localStorage.getItem(APP_PREFIX);
    locationWeatherCache = new LocationWeatherCache();
    if (localData) {
        locations = JSON.parse(localStorage.getItem(APP_PREFIX));
        locationWeatherCache.initialiseFromPDO(locations);
    }
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
    localStorage.setItem(APP_PREFIX, JSON.stringify(locationWeatherCache.toJSON()));
}
