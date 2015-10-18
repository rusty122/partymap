var map = null;

var people = [
// test people right now, to use database later
    {lat: 43.705342, lng: -72.288601},
    {lat: 42.407857, lng: -71.1209772}
];

function initialize() {

  	var customMapType = new google.maps.StyledMapType([
	      {
	        stylers: [
	          {hue: '#5fade7'},
	          {visibility: 'simplified'},
	          {gamma: 0.5},
	          {weight: 0.5}
	        ]
	      },
	      {
	        elementType: 'labels',
	        stylers: [{visibility: 'off'}]
	      },
	      {
	        featureType: 'water',
	        stylers: [{color: '#5fade7'}]
	      }
	   ], 
      {name: 'Custom Style'});

  	var customMapTypeId = 'custom_style';

    var mapOptions = {
        center: new google.maps.LatLng(43.705342, -71.288601),
        zoom: 17,
        streetViewControl: false,
        mapTypeControl: false
    }

    var mapCanvas = document.getElementById('map');

    map = new google.maps.Map(mapCanvas, mapOptions)

    var geolocation = navigator.geolocation;

    recenterLoc();

    map.mapTypes.set(customMapTypeId, customMapType);
	  map.setMapTypeId(customMapTypeId);
    console.log(people);

    setMarkers(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

function setMarkers(map) {
//    var image = {
//        url: 'static/img/MapPinNormal.png',
//        size: new google.maps.Size(20, 32)
//        origin: new google.maps.Point(0, 0),
//        anchor: new google.maps.Point(0, 32)
    //};
    console.log("hello");
    console.log(people);
    for (var i = 0; i < people.length; i++) {
        
        addLoc(map, people[i]);
    }

}

function addLoc(map, person) {
    var marker = new google.maps.Marker({
    // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        icon: 'static/img/MapPinNormal3.png',
        position: person,
        map: map,
     });
}

// Recenter the map to current location
function recenterLoc(){
  	var geolocation = navigator.geolocation;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var currPos = {
                  lat: position.coords.latitude, 
                  lng: position.coords.longitude
                };
                people.push(currPos);
                console.log(people);
                map.setCenter(currPos);
                addLoc(map, currPos);
         });
    }
}





