// https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=AIzaSyCDcA1Z5_0IfX6XYz7f5nI0rVs7S136DIY

    var styler = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];
var pos;
var mapDiv = document.getElementById('map');
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        draggable: true,
        panControl: false,
        scrollwheel: false,
        zoomControl: false,
        zoomControlOptions: false,
        streetViewControl: false,
        mapTypeControl: false,
        center: { lat: 19.397, lng: 72.644 }        ,
        styles: styler
    });
    var geocoder = new google.maps.Geocoder();
    //Find the location
    document.getElementById('userInput').addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            document.getElementById('userInputButton').click();
        }
    });

    document.getElementById('userInputButton').addEventListener('click', function () {
        geocodeAddress(geocoder, map);

    });

    //Current location
    document.getElementById('currentLocation').addEventListener('click', function () {
        test(map);
    });
}
function test(map1) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);
            alert(myLatlng);
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                draggable: true,
                panControl: false,
                scrollwheel: false,
                zoomControl: false,
                zoomControlOptions: false,
                streetViewControl: false,
                mapTypeControl: false,
                styles: styler
            });
            map.setCenter(pos);

            var marker = new google.maps.Marker(
                {
                    position: myLatlng,
                    map: map
                });

        });

    }
}







function geocodeAddress(geocoder, resultsMap) {

    var address = document.getElementById('userInput').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                draggable: true,
                panControl: false,
                scrollwheel: false,
                zoomControl: false,
                zoomControlOptions: false,
                streetViewControl: false,
                mapTypeControl: false,
                styles: styler
            });
            map.setCenter(results[0].geometry.location);            
            alert(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true
            });
            
            google.maps.event.addListener(marker, 'drag',function(){
                document.getElementById('lat').value = marker.position.lat();
                document.getElementById('lng').value = marker.position.lng();
                
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}