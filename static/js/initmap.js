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
        
        center: new google.maps.LatLng(43.705342, -72.288601),
        zoom: 16,

        mapTypeControlOptions: {
      		mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    	}
    }

    var mapCanvas = document.getElementById('map');

    var map = new google.maps.Map(mapCanvas, mapOptions)

    map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);
}
google.maps.event.addDomListener(window, 'load', initialize);

