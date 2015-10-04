window.onload = function() {
    var mapCanvas = document.getElementById('map');
    var startPos;
    var geoOptions = {
        timeout:        10 * 1000,
        maximumAge: 5 * 60 * 1000,
    }

    var geoSuccess = function(position) {
        startPos = position;
        // post data asynchronously
        var mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        // Get request
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
        }
        var data = {lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    type: "party"}
        xmlHttp.open("POST", 'postloc', true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlHttp.send(JSON.stringify({lat: position.coords.latitude,
                                     lon: position.coords.longitude,
                                     type: "party"}));

        // draw map
        var map = new google.maps.Map(mapCanvas, mapOptions)
    };
    var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
