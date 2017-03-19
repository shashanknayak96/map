// https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=AIzaSyCDcA1Z5_0IfX6XYz7f5nI0rVs7S136DIY
var e = window.event;
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
        center: { lat: 19.397, lng: 72.644 }
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