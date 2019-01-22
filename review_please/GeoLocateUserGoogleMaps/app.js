function geoFindUser() {
    if(!("geolocation" in navigator)) {
        console.log("Error. Geolocation is not supported in your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function geoSuccess(position) {
   console.log(`User is located in coordinates: ${position.coords.latitude}, ${position.coords.longitude}`);
   var userPosition = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
   };

   map.setCenter(userPosition);
}

function geoError(err) {
    console.log(`Error getting user position: ${err.message}`);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        // Use any coordinates for initializing the map
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}

var map;

initMap();
geoFindUser();
