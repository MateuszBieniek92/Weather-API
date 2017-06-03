$(function () {

    const $geo = $('.geolocation').first();

    console.log($geo);

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
                html += '<div class="space">' + '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////' + '</div>';
                html += '<i class="icon wi wi-yahoo-' + weather.code + '"></i>';
                html += '<div class=tempDeg><h2 class="temp">' + celciusDeg + '<sup>&deg;' + celciusUnits + '</sup></h2><h2 class="temp" style="display: none">' + farenheitDeg + '<sup>&deg;' + farenheitUnits + '</h2></sup></div>';

                html += '<ul><li><i class="wi wi-wind wi-towards-' + windDirection.toLowerCase() + '"></i><p class="liText">' + windDirection + '</p></li>';
                html += '<li><i class="wi wi-strong-wind"></i><p class="liText">' + windSpeed + ' ' + windSpeedUnit + '</p></li>';

                html += '<li><i class="wi wi-sunrise"></i><p class="liText">' + sunrise + '</p></li>';
                html += '<li><i class = "wi wi-sunset"></i><p class="liText">' + sunset + '</p></li ></ul>';
                

                html += '<ul class="forecastSection">';
                for (var i = 1; i < 8; i++) {
                    html += '<ul><li>' + weather.forecast[i].day + '</li>';
                    html += '<li><i class="forecastIcon wi wi-yahoo-' + weather.forecast[i].code + '"></i></li>';
                    html += '<li>' + weather.forecast[i].high + '<sup>&deg;' + celciusUnits + '</sup></li></ul>';
                };
                html += '</ul>';
                html += '<p class="update"> Weather updated at ' + weatherUpdate.format('MM/DD/YY HH:mm a') + '</p>';

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