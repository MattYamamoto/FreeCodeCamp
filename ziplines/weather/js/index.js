$(document).ready(function() {
  var apiKeyStr = '&appid=4f4e98d53946958b89b7a7bbdcdc8064',
      apiKey = '4f4e98d53946958b89b7a7bbdcdc8064',
      today,
      forecast,
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
      ],
      backgrounds = {
                 default: {url:'https://farm7.staticflickr.com/6181/6159118656_42ea72b2c0_b.jpg',
                             name: 'Gary Dicer',
                             origLink: 'https://www.flickr.com/photos/gdicer/6159118656/in/photolist-aog6oY-aaqUbQ-4gZrKQ-aodkkX-g6JYr-3bad1a-5rhdmi-2kNXj-6CHgvV-LvuFg-5unPmY-77DfPg-pGeJmY-dfEYy5-6GhZUj-7eSY7K-bjKXJ3-acFFuY-4pq11g-3beFuC-6mYLhU-nwAgwx-5vQftV-6DHCMA-GyXQW-9iMXoN-6hxnTS-ay6mJs-nTJRhG-5Y6rkU-a3YvEq-7PFVjV-48im52-6DDrbB-6jt5pY-bFKvQ-2kNZh-7w9jAW-p2HoGn-oN6uhB-5Ko9eH-kVrfEK-6Go6Lu-iTkqZ4-ay3Crn-s6ArHX-JwwMZ-9woqiE-6n2vH1-s1i5y5'},
                 thunderstorm: {url: 'https://farm5.staticflickr.com/4143/4914282680_b292f5676f_b.jpg',
                                  name: 'Bo Insogna',
                                  origLink: 'https://www.flickr.com/photos/lurw/4914282680/in/photolist-8ufZ2J-9TLa7w-4TuBLR-7beGV3-k8D9Nt-pejAy7-4E2PcS-a37f1h-4uH5iB-fo6Wh3-fYs2tV-w8CJWj-6SHKPh-ou7f1V-u5r5rA-hB14mX-nkqT98-n5P6oH-nVVbmz-d1SKSj-nVPDL5-9gqzM-odNJWk-ur7wHP-pkUxXg-8GVvsM-ff3Wap-fo6Uio-h9yuMW-sZspxc-2rvbHT-bQKpKV-8YgQe3-nDrGK4-fhYFo2-tLm9he-4VT9jg-9TLa9u-w6XZzq-TJ1b1-rjLMrr-onHR6k-d1jAXJ-9jcKxj-6NSURT-ddVoce-4PDFy-6bvv57-pcTt1B-8s1gUn'},
                 drizzle: {url: 'https://farm8.staticflickr.com/7278/7733552820_4af8d50cdc_b.jpg',
                             name: 'Anant Nath Sharma',
                             origLink: 'https://www.flickr.com/photos/anantns/7733552820/in/photolist-cMotPA-qt5xUy-5Utoxz-4McxiY-8ucrbd-7JmyFs-8qi6Q7-6TQAnC-dDWG3g-8aP1pD-dHtvY6-9nJuoG-8zEcwF-nkDMQ-9fHRYM-5YBour-dUcZ6C-b8YKwT-dfHVKc-4dpMDD-d2tb5u-94Haa7-57WFSU-dNRuB-pjK1Pf-uNeRfH-7QHpnm-aZRxcX-pAXw6V-7tJ3sV-9Gsu2x-8CYuw4-78vkoC-a7ZPFr-j559Jk-fzkD3L-dcSssY-8V2U4K-oo6XUS-dU7maB-e3Y5LJ-86WoE6-aXeAt2-aXej9R-aXegXF-79KNs4-74HVyE-74HVe9-74HUU5-5Y3tGG'},
                 rain: {url: 'https://farm7.staticflickr.com/6182/6132260807_8f2acff010_b.jpg',
                          name: 'Vinoth Chandar',
                          origLink: 'https://www.flickr.com/photos/vinothchandar/6132260807/in/photolist-akTruB-ozH6nu-axamgz-bVJFJb-aAvBve-ekmsCR-9fHLzs-ebsxQo-ppFZNk-hSTFxU-nxab3K-avkRF4-aGoMB2-pMJGRD-bg4pYM-bCBFFH-nRYit2-nMHY9v-oroWfu-oQKnsW-gFe4sr-gp9ybn-hhQsxn-f2BLW1-cbjSU1-qAzo14-9jpS2t-fmYkUM-8b5Luw-groEM1-gzze73-8BxjkT-acSzSg-bbDAbx-bWBW7s-a9gyTq-4qWhxS-ntQYon-qLeC4d-c2zASY-khD2GF-shsxMr-ax2NfE-9fPJa3-a9q5iy-dkkjv7-9tsfwG-omLrbm-rNb9mV-nTuYvi'},
                 snow: {url: 'https://farm1.staticflickr.com/41/76809981_bab566151e_b.jpg',
                          name: 'Thomas Quine',
                          origLink: 'https://www.flickr.com/photos/quinet/76809981/in/photolist-7MEW2-qcqkY7-rBkgo3-dBkJAY-5Y6dz2-cHQhgJ-9r7f5o-qJrvjs-dQ1EHr-7Bcdyh-dAFhxx-dBFQd8-dCzUTx-9aT4PM-dNxcVW-dB3tXn-pqBz4R-64X3My-65fTkx-e8dnj2-joUcM2-r5rg9F-dFhYZZ-dNLPvg-iEDtsS-bi3k2K-pCLUHS-rpLXkk-qHmPjj-dCnaKo-prmcxy-8W9Thw-dNerJ5-bo8NSW-qdvN2Z-qzGLkA-aZo8Tc-ibNqmc-sDZTL-kssGxr-e5smwt-bqwbu7-qJz7tk-dL9nMu-dKUnon-kCr2DM-iXekZm-q3pKKV-dWrJ5t-9W5u5o'},
                 clouds: {url: 'https://farm3.staticflickr.com/2587/3715630964_86b99810b0_b.jpg',
                            name: 'Daniel Spiess',
                            origLink: 'https://www.flickr.com/photos/deegephotos/3715630964/in/photolist-6EkzCQ-4nXfwv-n9qJvH-8XteqS-4HJt6j-9RQkdN-3jgZVF-84o2ER-ehyhPC-6Ekjid-qYGC2C-qRdTgK-gmpTob-dhtwtk-j6H5mo-d2hjzJ-8esaXa-csMQXb-cbzyB5-pWQsJC-bDevbz-84r6Mo-dsNv2H-ofaVC1-oCLPDV-hkLuPi-jzbfAp-oCs3tU-9RqBfq-ackuTC-4nvqBz-53owm5-nUQGYN-36sady-6Xw3Mq-hxb2xb-p8EBZ2-8MjyE5-qkxvpX-7u8sVQ-oBJ7Kq-6kQYpE-5qFgPP-4KJEB-MjBaP-nDFMcz-rEqdKA-dBQRNH-oqJqTF-wzfrwL'},
                 fog: {url: 'https://farm9.staticflickr.com/8186/8120123255_25d42566b9_b.jpg',
                         name: 'Nicklas Malmsjö',
                         origLink: 'https://www.flickr.com/photos/malmsjo/8120123255/in/photolist-dnxKK6-5jwfWA-5Us4tW-oFiibU-4t1QVt-oNxsoJ-eB36Ti-5Kshab-7nB7zu-4TEuuB-4odDoG-WhGG-4sGKBF-hcFXxp-dQLBwR-hcDEKd-n2jJ5B-dyD2nM-Dr6y5-9drBYa-EpBsM-dpXDhU-qZpiGU-pSFNMP-msY382-rrbzSv-7BskNQ-s4k1AC-6bSM34-aNrU3-qo9CKc-dysMR5-aFRvQD-bGf23k-7CwpEo-5YraLu-dLrjEj-ifuCzn-saDtxF-utpKK4-hcDbTa-7ge3Jh-ifvqwv-dJJKbT-5bhgVt-4DvBw1-7AZjfc-v2Ubbu-pc7Huj-fNNPe7'},
                 smoke: {url: 'https://farm3.staticflickr.com/2851/8776185274_b51babbd11_b.jpg',
                           name: 'Bureau of Land Management Oregon and Washington',
                           origLink: 'https://www.flickr.com/photos/blmoregon/8776185274/in/photolist-enwf8d-nuk1Ap-9EAzCM-6UK34z-cmTsn7-wTdV9a-vpfH82-cjqp77-vQ299C-8yTZG7-cmTr4y-c6unAC-aene52-uTfYSz-cmTrCs-c6sZ6A-eLrLNL-nqyrxr-cmTrns-pz4JjB-6VQxQ4-adcz9U-xiWwrZ-8d6qTu-9zZz7D-kZxVQ-9EDcjY-fyaCjT-oaC5Jh-pcFqae-9EDbX7-ajJNGJ-77FpKK-cnPCpE-9AgC19-nvLwmu-weeeGG-qwKpn1-9AgDGj-cXCbzs-c8ibpC-8szjCW-9AdJRH-mY4ofK-enwr6Q-vYVWVA-9EAnLD-cjfXLm-fT5pJR-owfE85'},
                 volcanicAsh: {url: 'https://farm4.staticflickr.com/3666/13423890975_6089e05482_b.jpg',
                                 name: 'U.S. Geological Survey',
                                 origLink: 'https://www.flickr.com/photos/usgeologicalsurvey/13423890975/in/photolist-msdX78-99N1pk-99R9QE-hiYLae-99Ra4S-99N15c-9ViCdu-a8yaJs-9GFL3p-9GJBdU-99R8R7-icW4aF-a8vsKM-a8vdZ2-a8vdhD-827VXx-91BhRp-efeHLV-efkQFo-qP8tH2-dRFNfH-2fBm9C-dW95on-dRoLWv-a8yrY5-a8vxCr-a8vrVk-9xn18U-gZ8pgD-gZ8MSF-a8ykJJ-a8vybV-a8ybMQ-9xj22T-dRoMhe-a8vv9T-9xj2Lc-efferR-icVodA-a8y39W-7P7GTY-o7fucL-gZ9x1x-icWxjY-dRoMae-ekRz9s-icVtfN-dRumou-7P7BAL-a8xv2b'},
                 tornado: {url: 'https://farm8.staticflickr.com/7188/6838776050_ae02b01a4b_b.jpg',
                             name: 'NSSL NOAA',
                             origLink: 'https://www.flickr.com/photos/noaanssl/6838776050/in/photolist-bqjvRU-4G7Vgy-eoLUzQ-4MoS4Z-4MoRAt-4MoRkn-4Mt23h-4Mt1Nm-7PNyLM-nEUWwX-EBioP-fwBetf-6VSw9h-a6qxFK-evBDcm-2KmRox-c8VQqG-9J7yzq-8JaMBc-nqd65D-eEQnnd-eEJfve-8aX7jt-aeL18g-9EWVXs-eAdR9T-wiQMh-9DbjqC-9D8osK-8y1pT5-bDerkX-n7uG1W-9Dbjhb-9c2Qav-9D8oBM-9CM7yr-a5s4hM-9Rgsx2-9STUXY-bmYUDj-bzTJXV-bmYUyh-9CM9rx-dgaMfC-anoUjk-2ASnkM-o4CETQ-o4CnrU-o4rxja-o4JNea'},
                 hurricane: {url: 'https://farm5.staticflickr.com/4105/4994478045_d2b16f4da5_b.jpg',
                               name: 'NASA\'s Marshall Space Flight Center',
                               origLink: 'https://www.flickr.com/photos/nasamarshall/4994478045/in/photolist-8Bm1jr-ceLYvE-drrj7a-5mUnub-8xp2q6-afMn4j-8Bp4Ub-dqFS29-ahLJ9C-dpvQe3-aahBYC-agQ6pj-agenUg-dxmiHE-afZwGe-ah6o55-oXTNkK-8xs7E7-dt1Q9p-agws2k-8xp9Yz-cXZyZ9-jXCAbo-8xsdYo-doQSr3-drru93-5TwKjz-agLepw-d1xJyL-pFTQQ6-ahHYVX-d9xPGQ-agTq8E-agzC2s-dwYf5a-8zRDxu-oNpWvj-9oWCdq-8CUqxa-doZzt8-dqTLVg-d2H8Mm-afMPMk-t8k2nB-aJeUVx-a6UEsn-yp11w-ajUDof-ds9yrY-5mifxS'}
                 },
      $forecast = $('.forecast-container'),
      $today = $('.today'),
      latitude,
      longitude,
      map;

  //Let's get it all started
  (function initialize() {
    getLocation();
    temperatureSwitch();
    detailsFlip();
    blankMap();
    //handle user resizing window
    $(window).resize(function() {
      $('.today').css("height", "auto");
      $('.today-front').css("height", "auto");
      $('.today-back').css("height", "auto");
      fixHeight();
    });
    searchLocation();
  })();

  //get location from browser
  function getLocation() {

    //success function if location data available
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      }

    //handle location not supporterd or blocked by presenting input field
    //to find city
    function error(){
      $('.loading').css("visibility", "hidden");
      //fixHeight();
      $('.main').css('visibility', 'visible');
      $('.today').css('opacity','1');
      $('#city').css("visibility", "hidden");
      $('.search').css("visibility", "visible");
      $('#locationSearch').focus();
    }

    //get location if possible
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success,error);
    } else {
        error();
    }
  }

  //handle json requests for weather/location data for provided lat/lon
  function getWeather(lat, lon) {
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather',
        weatherApiData = {
          lat: lat,
          lon:  lon,
          appid: apiKey
        },
        locationApiUrl = 'http://maps.googleapis.com/maps/api/geocode/json',
        locationApiData = {
          latlng: lat + ',' + lon
        },
        forecastApiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily',
        forecastApiData = {
          lat: lat,
          lon: lon,
          appid: apiKey
        };


    //get weather info from openweathermap by lat lon
    $.getJSON(weatherApiUrl, weatherApiData)
      .then(function(weatherData) {
        //today object holds current weather daata
        today = weatherData;

        //get location info from google api
        return $.getJSON(locationApiUrl, locationApiData);
      })
      .then(function(locationData) {
          //use location data
          formatLocationData(locationData);

          //get forecast data from openweathermap
          return   $.getJSON(forecastApiUrl, forecastApiData);
      })
      .then(formatForecast);

      // function to use and format location data returned from google API
      function formatLocationData(locationData) {
        var stateAbbr,
            countryAbbr,
            abbr,
            city,
            icon = today.weather[0].icon,
            condition = today.weather[0].main;

        //set country and/or state abbreviations
        countryAbbr = $.grep(locationData.results[0].address_components,
          function(geocode){
            return geocode.types[0] === "country";
          })[0].short_name;

        // abbreviation to be used should either by US State
        // (assuming US users here...sorry), or country if not US
        if(countryAbbr !== "US"){
          abbr = countryAbbr;
        } else {
          stateAbbr = $.grep(locationData.results[0].address_components,
            function(geocode){
              return geocode.types[0] === "administrative_area_level_1";
            })[0].short_name;
          abbr = stateAbbr;
        }

        city = today.name + ", " + abbr;
        //hide loading element as data is about to be displayed
        $('.loading').css("visibility", "hidden");

        //set appropriate background image
        backgroundImage();
        //dispaly weather content
        displayCurrentConditions('F', abbr);
        $('#city h1').html(city);
        $('.current-icon').html('<img src="http://openweathermap.org/img/w/' +
          icon + '.png">');
        $('.current-condition').html(condition);
        $('.main').css('visibility', 'visible');
        dayProgressMeter();
        weatherMap();
        fixHeight();
        // hides forecast tiles to handle case that city was changed and page
        //  is being redisplayed
        $('.forecast').css({
          'opacity': '0',
          'transform': 'rotateY(90deg)'
        });
        $forecast.queue('forecastAnim', function() {
          $('.today').css('opacity', '1');
          $forecast.dequeue('forecastAnim');
        }).delay(2000, 'forecastAnim');
      }

    //Set forecast data returned from openweathermpa API and animate forecast tiles
    function formatForecast(data) {
        forecast = data;
        displayForecastTemps('F');
        //ensure data divs are empty
        $('.date').empty();

        //get the 3-day forecast by looping through known forecast object
        for (i = 1; i < 4; i++) {
          $('.date-' + i).html(getDateToDisplay(forecast.list[i].dt) +
                               '<span class="icon icon-' + i + '"></span>');
          $('.icon-' + i).append('<img src="http://openweathermap.org/img/w/' +
            forecast.list[i].weather[0].icon + '.png">');
        }
        animateForecast();
      }


  }

  //handle dispalying current condition data
  function displayCurrentConditions(type, abbr) {
    var LongitudeDirection,
      longitudeAdjusted,
      currentTempK = today.main.temp,
      currentTemp = convertTemp(today.main.temp, type),
      pressureString = today.main.pressure + " mb",
      humidityString = today.main.humidity + " %",
      cloudsString = today.weather[0].description,
      windString = windDirection(today.wind.deg) + " " + today.wind.speed + " mph",
      cityString = today.name + (abbr !== "undefined" ? ", " + abbr : "");

    //use E or W instead of negative longitude
    if (longitude < 0) {
      LongitudeDirection = " W";
      longitudeAdjusted = -longitude;
    } else {
      LongitudeDirection = " E";
      longitudeAdjusted = longitude;
    }

    //populate data to "details" view on back of main tile
    $('.details-location').html('<h3 class="details-location-city"></h3>' +
      '<span class="details-location-latlon">Latitude: ' + toDegMinSecString(latitude) + " N</span>" +
      '<span class="details-location-latlon">Longitude: ' + toDegMinSecString(longitudeAdjusted) +
      LongitudeDirection + '</span>');
    $('.details-location-city').html(cityString);
    $('.details-current-pressure').html(pressureString);
    $('.details-current-humidity').html(humidityString);
    $('.details-current-clouds').html(cloudsString);
    $('.details-current-wind').html(windString);

    $('.current-temp').html(currentTemp).attr("tempK", currentTempK);
    $('.details-current-temp').html(currentTemp).attr("tempK", currentTempK);

  }

  //handle chnage location or location search
  function searchLocation() {
    var suggestions = [];

    //delay function
    var delay = (function() {
      var timer = 0;
      return function(callback, ms) {
        window.clearTimeout(timer);
        timer = window.setTimeout(callback, ms);
      };
    })();

    //when "change location" is clicked, show input field (and hide city name)
    $('.change-location').click(function(event) {
      $('#city').css("visibility", "hidden");
      $('.search').css("visibility", "visible");
      //bring focus to input field so user can type
      $('#locationSearch').focus();

      //if search area is populated, resume previous search by showing autocomplete suggestions
      if ($('#locationSearch').val().length > 0) {
        $('#searchAutoComplete').css('visibility', 'visible');
      }
    }).css("cursor", "pointer");

    //a click anywhere other than the change search area and the input area will close/hide the searchbox
    $(document).on('click', function(event) {
      if (!$(event.target).closest('#city').length &&
        !$(event.target).closest('.search').length &&
        !$(event.target).closest('.change-location').length) {
        $('#city').css("visibility", "visible");
        $('.search').css("visibility", "hidden");
        $('#searchAutoComplete').css("visibility", "hidden");
      }
    });

    //button to clear the search box
    $('.clearSearch').click(function() {
      $('#locationSearch').val("");
      $('#locationSearch').keyup();
    }).css("cursor", "pointer");

    //monitor search area for input
    $('#locationSearch').keyup(function() {
      //make sure autocomplete area is empty if search input is empty
      if ($('#locationSearch').val() === "") {
        $('#searchAutoComplete').empty();
      }
      //delay after keyup to prevent sending too many unnecssary queries to the api
      delay(function() {
        var searchTerm = $('#locationSearch').val();

        //handle displaying autocomplete suggestions from array containing search results
        function suggestionList(arr) {
          var searchLat, searchLon;

          //ensure autocomplete area and suggestion array are empty at begining of process
          $('#searchAutoComplete').empty();
          suggestions = [];

          //loop through array and obtain google gecode info for each item
          $.each(arr, function(ind, item) {
            searchLat = item.coord.lat;
            searchLon = item.coord.lon;

            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + searchLat + ',' + searchLon,
                      (function(lat,lon){
              return function(data) {
                  var stateAbbr,
                      country,
                      countryAbbr,
                      countryLong,
                      abbr;

                //determine the country from geocode info
                country = $.grep(data.results[0].address_components, function(geocode){
                      return geocode.types[0] === "country";
                    });
                  countryAbbr = country[0].short_name;
                  countryLong = country[0].long_name;

                  //if country is US, use state abbreviation, otherwise use country name (again, assuming US audience...sorry)
                  if(countryAbbr !== "US"){
                    abbr = countryLong;
                  } else {
                    stateAbbr = $.grep(data.results[0].address_components, function(geocode){
                        return geocode.types[0] === "administrative_area_level_1";
                      })[0].short_name;
                    abbr = stateAbbr;
                  }
                  //add resolved info to sugestions array
                  suggestions.push({"name": item.name, "abbr": abbr, "lat": lat, "lon": lon});

                  //sort suggestions to be in alphabetical order
                  suggestions.sort(function (a, b) {
                    var first = a.name + a.abbr,
                        second = a.name + a.abbr;
                    if (first > second) {
                      return 1;
                    }
                    if (first < second) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  });

                  //empty autocomplete area since it is going to be repopulated
                  $('#searchAutoComplete').empty();

                  //loop through suggestions and create list elements for display.  lat and lon attributes
                  //are added to hold that info as data for use later
                  $.each(suggestions, function(ind, item) {
                    $('#searchAutoComplete').append('<li lat="' + item.lat + '" lon="' +
                                                    item.lon + '">' + item.name + ", " + item.abbr + '</li>');
                  });

                  //if li is clicked retrieve lat/lon data from attributes and convert to float
                  //get weather for that lat/lon, then empty search area as user has made a selection
                  $('#searchAutoComplete li').click(function(){
                    latitude = parseFloat($(this).attr("lat"));
                    longitude = parseFloat($(this).attr("lon"));
                    getWeather(latitude, longitude);
                    $('#locationSearch').val("");
                    $('#locationSearch').keyup();
                  });
                };
            })(searchLat, searchLon));

          });
        }

        //only autocomplete after 2 characters have been enetered
        if (searchTerm.length > 2) {
          $('#searchAutoComplete').css('visibility', 'visible');
          $.getJSON("http://api.openweathermap.org/data/2.5/find?q=" +
            searchTerm + "&type=like" + apiKeyStr).
          done(function(query) {
            suggestionList(query.list);
          });
        }
      }, 200);
    });


  }

  //set and display the day progress graphic
  function dayProgressMeter() {
    var sunrise = new Date(today.sys.sunrise * 1000),
      sunset = new Date(today.sys.sunset * 1000),
      currentTime = new Date(),
      timeOffset,
      sunriseDecimal,
      sunsetDecmial,
      currentTimeDecimal,
      riseAngle,
      setAngle,
      riseTextAngle,
      setTextAngle,
      currentAngle,
      currentProgress,
      percentDayFromSunrise,
      r = $('#meter circle').attr('r');

    //return decimal time from date object
    function decimalTime(date) {
      return date.getHours() + date.getMinutes() / 60;
    }

    //use google timezone api to get timezone offset.
    //handles case where user is viewing city other than current location
    $.getJSON('https://maps.googleapis.com/maps/api/timezone/json?location=' + latitude +
              ',' + longitude +'&timestamp=' + currentTime.getTime()/1000).
    done(function(data){
      var currentOffset = currentTime.getTimezoneOffset() * 60,
          zoneOffset = data.rawOffset + data.dstOffset;

      timeOffset = (currentOffset + zoneOffset) * 1000;
      //get sunrise and sunset corrected for local time (local to displayed location)
      sunrise = new Date(sunrise.getTime() + timeOffset);
      sunset = new Date(sunset.getTime() + timeOffset);
      currentTime = new Date(currentTime.getTime() + timeOffset);

      sunriseDecimal = decimalTime(sunrise);
      sunsetDecmial = decimalTime(sunset);
      currentTimeDecimal = decimalTime(currentTime);

      //set sunrise marker. 0 deg = 0600
      riseAngle = (sunriseDecimal - 6) * 15;
      //set sunset marker. 0 deg = 1800
      setAngle = (sunsetDecmial - 18) * 15;
      //current time progress bar.  0deg starts at 1800
      currentAngle = (sunriseDecimal - 18) * 15;
      percentDayFromSunrise = (((currentTimeDecimal - sunriseDecimal) + 24) / 24) % 1;
      currentProgress = (2 * Math.PI * r) * (1 - percentDayFromSunrise);

      $('.day-meter').css({
        'transform': 'scale(1,1)',
        'opacity': '1'
      });
      setTimeout(function() {
        //set the marker locations
        $('#sunrise_marker line').css('transform', 'rotate(' + riseAngle + 'deg)');
        $('#sunset_marker line').css('transform', 'rotate(' + setAngle + 'deg)');
        $('.meter-progress').css({
          'transform': 'rotate(' + currentAngle + 'deg)',
          '-webkit-transform': 'rotate(' + currentAngle + 'deg)',
          'stroke-dashoffset': currentProgress
        });

        setTimeout(function() {
          riseTextAngle = riseAngle;
          setTextAngle = setAngle + 180;

          function getTimeString(time) {
            var ampm,
              hour = time.getHours(),
              min = time.getMinutes();
            if (hour > 12) {
              ampm = "PM";
              hour = hour - 12;
            } else {
              ampm = "AM";
            }
            min = min < 10 ? "0" + min : min;
            return hour + ":" + min + " " + ampm;
          }
          //populate sunrise time and rotate into position
          $('.sunrise-time').empty().append(getTimeString(sunrise));
          $('.sunrise-text-container').css('transform', 'rotate(' + riseTextAngle + 'deg)');
          $('.sunrise-text').css('transform', 'rotate(' + -riseTextAngle + 'deg)');

          //populate sunset time and rotate into position
          $('.sunset-time').empty().append(getTimeString(sunset));
          $('.sunset-text-container').css('transform', 'rotate(' + setTextAngle + 'deg)');
          $('.sunset-text').css('transform', 'rotate(' + -setTextAngle + 'deg)');

          //Everything is set, show the text
          $('.meter-text-container').css('opacity', '1');
        }, 750);
      }, 1000);
    });
  }

  //temperature conversion switch functionality
  function temperatureSwitch() {
    $('.switch-label-F').click(function() {
      $('.switch-selection').css("left", "2px");
      $('.temperature').each(function() {
        $(this).html(convertTemp($(this).attr("tempK"), "F"));
      });
    });
    $('.switch-label-C').click(function() {
      $('.switch-selection').css("left", "52px");
      $('.temperature').each(function() {
        $(this).html(convertTemp($(this).attr("tempK"), "C"));
      });
    });
  }

  //handle displaying 3 day forecst tiles
  function displayForecastTemps(type) {
    var currentHi = forecast.list[0].temp.max,
        currentLo = forecast.list[0].temp.min;

    $('.current-high-lo').html('<span class="temperature" tempK="' + currentHi + '">' +
      convertTemp(currentHi, type) + '</span> / <span class="temperature" tempK="' +
      currentLo + '">' + convertTemp(currentLo, type) + "</span>");
    //loop through forecast and get hi/lo for each of the 3 days
    for (i = 1; i < 4; i++) {
      $('.forecast-hi-' + i).html(convertTemp(forecast.list[i].temp.max, type)).attr("tempK", forecast.list[i].temp.max);
      $('.forecast-low-' + i).html(convertTemp(forecast.list[i].temp.min, type)).attr("tempK", forecast.list[i].temp.min);
    }
  }

  //hanlde rotation of main section for detail view
  function detailsFlip() {
    $('.details-toggle').click(function() {
      $today.toggleClass('flipped');
      //couldn't seem to get map controls backside hidden to work,
      //so this is a workaround
      $('.ol-control').toggle(1000);
    }).css('cursor', 'pointer');
  }

  //animate the 3-day forecast tiles
  function animateForecast() {
    function fadeIn(elem, id) {
      elem.css({
        'opacity': '1',
        'transform': 'rotateY(0deg)'
      });
      $forecast.dequeue('forecastAnim');
    }

    $forecast.queue('forecastAnim', function() {
      fadeIn($('.forecast-1'), 1);
    }).delay(200, 'forecastAnim');
    $forecast.queue('forecastAnim', function() {
      fadeIn($('.forecast-2'), 2);
    }).delay(200, 'forecastAnim');
    $forecast.queue('forecastAnim', function() {
      fadeIn($('.forecast-3'), 3);
    });

    $forecast.dequeue('forecastAnim');
  }

  //Set height of main section to whichever side is largest
  function fixHeight() {
    var frontHeight = $('.today-front').outerHeight(),
      backHeight = $('.today-back').outerHeight(),
      todayHeight;

    if(frontHeight > backHeight) {
      todayHeight = frontHeight;
    } else {
      todayHeight = backHeight;
    }

    $('.today').outerHeight(todayHeight);
    $('.today-front').outerHeight(todayHeight);
    $('.today-back').outerHeight(todayHeight);
  }

  //set background image according to current conditions
  function backgroundImage(){
    var $body = $('body'),
        main = today.weather[0].main,
        id = today.weather[0].id;

    //set the image and change atrribution link
    //image is pre-loaded to a placeholder img tag (which is promptly removed to prevent memory leak)
    function setImage(pictureObj){
      $('<img/>').attr('src', backgrounds[pictureObj].url).load(function(){
        $(this).remove();
        $body.css({
          "background": "url(" + backgrounds[pictureObj].url + ") no-repeat center center fixed",
          "background-size": "cover"
        });
        $('.background-attribution').html(
          'Background image by <a href="' + backgrounds[pictureObj].origLink + '" target="_blank">' +
          backgrounds[pictureObj].name + '</a>'
        );
      });
    }

    if(main === 'Thunderstorm'){
      setImage('thunderstorm');
    } else if(main === 'Drizzle'){
      setImage('drizzle');
    } else if(main === 'Rain'){
      setImage('rain');
    } else if(main === 'Snow'){
      setImage('snow');
    } else if(main === 'Clouds'){
      setImage('clouds');
    } else if(id === 741){
      setImage('fog');
    } else if(id === 711){
      setImage('smoke');
    } else if(id === 762){
      setImage('volcanicAsh');
    } else if(id === 781 || id === 900){
      setImage('tornado');
    } else if(id === 902){
      setImage('hurrican');
    } else {
      setImage('default');
    }
  }

  //convert decimal angle to deg-min-sec string for dispaly
  function toDegMinSecString(angle) {
    var deg, minDecimal, min, sec;

    deg = Math.floor(angle);
    minDecimal = (angle - deg) * 60;
    min = Math.floor(minDecimal);
    sec = ((minDecimal - min) * 60).toFixed(2);
    return deg + "º " + min + "\" " + sec + "\'";
  }

  //converts 'temp' from Kelvin to 'type'
  function convertTemp(temp, type) {
    var tempC = Math.round((temp - 273.15) * 10) / 10;
    var tempF = Math.round((tempC * 9 / 5 + 32) * 10) / 10;
    switch (type) {
      case 'K':
        return temp;
      case 'C':
        return tempC + "&deg;";
      case 'F':
        return tempF + "&deg;";
      default:
        break;
    }
  }

  //get cardinal directions from input angle. Values in array represent upper bound
  //for given direction
  function windDirection(angle) {
    var cardinalRanges = [
        [11.25, "N"],
        [33.75, "NNE"],
        [56.25, "NE"],
        [78.75, "ENE"],
        [101.25, "E"],
        [123.75, "ESE"],
        [146.25, "SE"],
        [168.75, "SSE"],
        [191.25, "S"],
        [213.75, "SSW"],
        [236.25, "SW"],
        [258.75, "WSW"],
        [281.25, "W"],
        [303.75, "WNW"],
        [326.25, "NW"],
        [348.75, "NNW"],
        [360, "N"]
      ],
      cardinalTemp = cardinalRanges,
      dir;

    //handle binary search for direction
    (function getDir(angle) {
      var setLength = cardinalTemp.length,
        step = Math.floor(setLength / 2);

      if (setLength === 1) {
        dir = cardinalTemp[0][1];
        return;
      }
       if (angle > cardinalTemp[step - 1][0]) {
        cardinalTemp = cardinalTemp.slice(step, setLength);
        getDir(angle);
      } else {
        cardinalTemp = cardinalTemp.slice(0, step);
        getDir(angle);
      }
    })(angle);

    return dir;
  }

  //return a "month day" formate for a give date(in seconds)
  function getDateToDisplay(secDate) {
    var day, mon,
      date = new Date(secDate * 1000);

    day = date.getDate();
    mon = date.getMonth();

    return months[mon] + " " + day;
  }

  //create a blank Open Street Map center on US
  function blankMap() {
    map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      controls: ol.control.defaults().extend([
        new ol.control.MousePosition({
          coordinateFormat: function(coord) {
            var longitudeDirection,
                longitdueDisplayValue = toDegMinSecString(coord[0]),
                latlonString;

            if (coord[0] < 0) {
              longitudeDirection = " W";
              longitdueDisplayValue = longitdueDisplayValue.slice(1);
            } else {
              longitudeDirection = " E";
            }

            latlonString = '<span class="map-latlon">' + toDegMinSecString(coord[1]) + ' N</span>' +
              '<span class="map-latlon">' + longitdueDisplayValue + longitudeDirection + '</span>';

            return latlonString;
          },
          projection: 'EPSG:4326'
        })
      ]),
      view: new ol.View({
        center: ol.proj.fromLonLat([-98.5795, 39.8282]),
        zoom: 3
      })
    });
  }

  //center map on location and show precipitation layer
  function weatherMap() {
    var precipitation = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "http://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png"
      }),
      opacity: 0.2
    });
    map.setView(new ol.View({
      center: ol.proj.fromLonLat([longitude, latitude]),
      zoom: 8
    }));
    map.addLayer(precipitation);

    //re-center map on current city's locatin if lat/lon text is clicked
    $('.details-location-latlon').click(function() {
      map.setView(new ol.View({
        center: ol.proj.fromLonLat([longitude, latitude]),
        zoom: 8
      }));
    }).css("cursor", "pointer");
  }

});
