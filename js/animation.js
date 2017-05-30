$(function () {

    const $geo = $('.geolocation');

    // geolocation
    if ("geolocation" in navigator) {
        $geo.show();
    } else {
        $geo.hide();
    }

    // geolocation btn
    $geo.on('click', function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            loadWeather(position.coords.latitude + ',' + position.coords.longitude);
        });
        
    });
    
    // start location
    function init() {
        loadWeather('Cracow', '');
    };

    //load location
    function loadWeather(location, woeid) {
        const weatherUpdate = moment(weather.updated);
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: 'c',
            success: function (weather) {
                const date = weather.forecast[0].date;
                const day = weather.forecast[0].day;
                const celciusDeg = weather.temp;
                const celciusUnits = weather.units.temp;
                const farenheitDeg = weather.alt.temp;
                const farenheitUnits = weather.alt.unit;
                const city = weather.city;
                const country = weather.country;
                const weatherCurrently = weather.currently;
                const windDirection = weather.wind.direction;
                const windSpeed = weather.wind.speed;
                const windSpeedUnit = weather.units.speed;
                const sunrise = weather.sunrise;
                const sunset = weather.sunset;


                html = '<p>' + day + ', ' + date + '</p>';
                html += '<h2 class="temp"><i class="wi wi-yahoo-' + weather.code + '"></i> ' + celciusDeg + '&deg;' + celciusUnits + '</h2><h2 class="temp" style="display: none"><i class="wi wi-yahoo-' + weather.code + '"></i> ' + farenheitDeg + '&deg;' + farenheitUnits + '</h2>';
                html += '<ul><li>' + city + ', ' + country + '</li>';
                html += '<li class="currently">' + weatherCurrently + '</li>';
                html += '<li>' + windDirection + ' ' + windSpeed + ' ' + windSpeedUnit + '</li></ul>';
                html += '<p> Weather updated at ' + weatherUpdate.format('MM/DD/YY HH:mm a') + '</p>';
                html += '<p><i class="wi wi-sunrise"></i> ' + sunrise + ' <i class="wi wi-sunset"></i> ' + sunset + '</p>';


                $("#weather").html(html);
                const $temp = $('.temp');
                $temp.click(function () {
                    $temp.slideToggle('fast');
                });
            },
            error: function (error) {
                $("#weather").html('<p>' + 'cos poszlo nie tak' + '</p>');
            }
        });

    };

    
    init();

});