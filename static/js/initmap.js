window.onload = function() {
    var mapCanvas = document.getElementById('map');
    var startPos;
    var geoOptions = {
        timeout:        10 * 1000,
        maximumAge: 5 * 60 * 1000,
    }

    var geoSuccess = function(position) {
        startPos = position;
        //console.log(position.coords.latitude,position.coords.longitude);
        //ajax post
        var mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
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

// <script type=text/javascript>
//   $(function() {
//     $('a#calculate').bind('click', function() {
//       $.getJSON($SCRIPT_ROOT + '/_add_numbers', {
//         a: $('input[name="a"]').val(),
//         b: $('input[name="b"]').val()
//       }, function(data) {
//         $("#result").text(data.result);
//       });
//       return false;
//     });
//   });
// </script>
// <h1>jQuery Example</h1>
// <p><input type=text size=5 name=a> +
//    <input type=text size=5 name=b> =
//    <span id=result>?</span>
// <p><a href=# id=calculate>calculate server side</a>
