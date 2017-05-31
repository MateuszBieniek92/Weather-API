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


                html = '<div class="textinfo"><p class="date">' + day + ', ' + date + '</p><br>';
                html += '<p class="city">' + city + ', ' + country + '</p><br>';
                html += '<p class="weatherCurrently">' + weatherCurrently + '</p></div>';
                html += '<div class="space">'+ '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////' + '</div>';
                html += '<i class="icon wi wi-yahoo-' + weather.code + '"></i>';
                html += '<div class=tempDeg><h2 class="temp">' + celciusDeg + '<sup>&deg;' + celciusUnits + '</sup></h2><h2 class="temp" style="display: none"><i class="wi wi-yahoo-' + weather.code + '"></i> ' + farenheitDeg + '&deg;' + farenheitUnits + '</div>';
                html += '<ul><li>' + windDirection + ' ' + windSpeed + ' ' + windSpeedUnit + '</li></ul>';
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