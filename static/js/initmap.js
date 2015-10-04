
var map = null; 

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
	    ], {
	      name: 'Custom Style'
	});

  	var customMapTypeId = 'custom_style';

    var mapOptions = {
        
        center: new google.maps.LatLng(43.705342, -71.288601),
        zoom: 16,

        mapTypeControlOptions: {
      		mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    	}
    }

    var mapCanvas = document.getElementById('map');

    map = new google.maps.Map(mapCanvas, mapOptions)

    var geolocation = navigator.geolocation;
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(initialLocation);
         });
    }

    map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);

    setMarkers(map);
}
google.maps.event.addDomListener(window, 'load', initialize);

var people = [
    [43.705342, -72.288601],
    [42, -70]
];

function setMarkers(map) {
//    var image = {
//        url: 'static/img/MapPinNormal.png',
        //size: new google.maps.Size(20, 32)
//        origin: new google.maps.Point(0, 0),
//        anchor: new google.maps.Point(0, 32)
    //};
    console.log("hello");
    for (var i = 0; i < people.length; i++) {
        var person = people[i];
        console.log(JSON.stringify(person));
        map.setCenter({lat: person[0], lng:person[1]});
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var marker = new google.maps.Marker({
            icon: 'static/img/MapPinNormal3.png',
            position: {lat:person[0], lng:person[1]},
            map: map,
            title: 'Hello World!'
         });
//        var marker = new google.maps.Marker({
//            position: {lat: person[0], lng: person[1]},
//            map: map,
//            icon: image

//        });
    }
}

//            zIndex: person[2] //put time instead here

google.maps.event.addDomListener(window, 'load', initialize);

/*
var locNew = document.getElementById('recenter');
locNew.onclick = initialize();

getLoc = getElementById('recenter');
getLoc.onclick = recenter();
*/


function recenterLoc(){
	var geolocation = navigator.geolocation;
	    if (navigator.geolocation) {
	         navigator.geolocation.getCurrentPosition(function (position) {
	             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	             console.log('Hi'); 
	             map.setCenter(initialLocation);
	         });
	    }
}
