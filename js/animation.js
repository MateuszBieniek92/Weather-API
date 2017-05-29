$(function () {




    $(document).ready(function () {
        $.simpleWeather({
            location: 'Austin, TX',
            woeid: '',
            unit: 'f',
            success: function (weather) {
                html = '<h2 class="temp"><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2><h2 class="temp" style="display: none">' + weather.alt.temp + '&deg;' + weather.alt.unit + '</h2>';
                html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
                html += '<li class="currently">' + weather.currently + '</li>';
                html += '<li>' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</li></ul>';

                $("#weather").html(html);
                const $temp = $('.temp');
                $temp.click(function () {
                    $temp.slideToggle('fast');
                });
            },
            error: function (error) {
                $("#weather").html('<p>' + error + '</p>');
            }
        });

    });



});